import { defaultRehypePlugins, type StreamdownProps } from "streamdown";

const sanitizeEntry = defaultRehypePlugins.sanitize;
const hardenEntry = defaultRehypePlugins.harden;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const sanitizePlugin = (Array.isArray(sanitizeEntry) ? sanitizeEntry[0] : sanitizeEntry) as any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const hardenPlugin = (Array.isArray(hardenEntry) ? hardenEntry[0] : hardenEntry) as any;

/**
 * GitHub sanitizer schema plus protocols the widget actually emits:
 * - tel: phone handoff links
 * - streamdown: remend's incomplete-link sentinel while markdown is still streaming
 *
 * Must replace the whole `protocols` map (hast-util-sanitize shallow-merges
 * top-level keys only). Omitting src/cite would allow javascript: images.
 */
const chatSafeSanitizeSchema = {
  protocols: {
    cite: ["http", "https"],
    href: ["http", "https", "irc", "ircs", "mailto", "xmpp", "tel", "streamdown"],
    longDesc: ["http", "https"],
    src: ["http", "https"],
  },
};

/**
 * Streamdown rehype pipeline for untrusted chat / AI markdown:
 * - omits rehype-raw so raw HTML is not parsed into the DOM
 * - keeps rehype-sanitize
 * - hardens link/image protocols (no javascript:, no data: images)
 *
 * rehype-harden compares `URL.protocol` (`https:`, not `https`) and treats
 * unknown schemes — including Streamdown's `streamdown:incomplete-link` — as
 * unsafe, replacing the <a> with "link text [blocked]".
 */
export const chatSafeRehypePlugins: NonNullable<StreamdownProps["rehypePlugins"]> =
  [
    [sanitizePlugin, chatSafeSanitizeSchema],
    [
      hardenPlugin,
      {
        // Keep "*" prefixes (no defaultOrigin required). Protocol allowlist
        // still blocks javascript:/data: etc. for untrusted chat markdown.
        allowedImagePrefixes: ["*"],
        allowedLinkPrefixes: ["*"],
        allowedProtocols: ["http:", "https:", "mailto:", "tel:", "streamdown:"],
        allowDataImages: false,
      },
    ],
  ].filter(Boolean) as NonNullable<StreamdownProps["rehypePlugins"]>;
