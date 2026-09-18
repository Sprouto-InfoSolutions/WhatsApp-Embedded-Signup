import js from "@eslint/js"
import pluginNext from "@next/eslint-plugin-next"
import eslintConfigPrettier from "eslint-config-prettier"
import pluginReact from "eslint-plugin-react"
import pluginReactHooks from "eslint-plugin-react-hooks"
import globals from "globals"
import tseslint from "typescript-eslint"

import { config as baseConfig } from "./base.js"

/**
 * A custom ESLint configuration for libraries that use Next.js.
 *
 * @type {import("eslint").Linter.Config}
 * */
export const nextJsConfig = [
  ...baseConfig,
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  {
    ...pluginReact.configs.flat.recommended,
    languageOptions: {
      ...pluginReact.configs.flat.recommended.languageOptions,
      globals: {
        ...globals.serviceworker,
      },
    },
  },
  {
    plugins: {
      "@next/next": pluginNext,
    },
    rules: {
      ...pluginNext.configs.recommended.rules,
      ...pluginNext.configs["core-web-vitals"].rules,
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-empty": "off",
      // @next/next/no-html-link-for-pages only catches literal hrefs that match a
      // real page file, so it misses the common case: <a href={someVariable}>
      // pointing at an internal route built from a variable. Catch those too -
      // any <a> without target="_blank" (our convention for outbound links) is
      // either meant to be a <Link> (prefetching, client-side nav) or is missing
      // the target/rel that marks it as intentionally external.
      "no-restricted-syntax": [
        "warn",
        {
          selector:
            "JSXOpeningElement[name.name='a']:not(:has(JSXAttribute[name.name='target'])):not(:has(JSXAttribute[name.name='download'])):not(:has(JSXAttribute[name.name='href'] Literal[value=/^(mailto:|tel:|#)/]))",
          message:
            "Raw <a> without target=\"_blank\" - use next/link's <Link> for internal navigation (keeps prefetching and client-side routing). If this is genuinely external, add target=\"_blank\" rel=\"noopener noreferrer\".",
        },
      ],
    },
  },
  {
    plugins: {
      "react-hooks": pluginReactHooks,
    },
    settings: { react: { version: "detect" } },
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
      // React scope no longer necessary with new JSX transform.
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
    },
  },
]
