import { defaultRehypePlugins, type StreamdownProps } from "streamdown";

const hardenEntry = defaultRehypePlugins.harden;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const hardenPlugin = (Array.isArray(hardenEntry) ? hardenEntry[0] : hardenEntry) as any;

/**
 * Streamdown rehype pipeline for untrusted chat / AI markdown:
 * - omits rehype-raw so raw HTML is not parsed into the DOM
 * - keeps rehype-sanitize
 * - hardens link/image protocols (no javascript:, no data: images)
 */
export const chatSafeRehypePlugins: NonNullable<StreamdownProps["rehypePlugins"]> =
  [
    defaultRehypePlugins.sanitize,
    [
      hardenPlugin,
      {
        // Keep "*" prefixes (no defaultOrigin required). Protocol allowlist
        // still blocks javascript:/data: etc. for untrusted chat markdown.
        allowedImagePrefixes: ["*"],
        allowedLinkPrefixes: ["*"],
        allowedProtocols: ["http", "https", "mailto", "tel"],
        allowDataImages: false,
      },
    ],
  ].filter(Boolean) as NonNullable<StreamdownProps["rehypePlugins"]>;
