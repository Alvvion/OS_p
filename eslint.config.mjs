import path from "node:path";
import { fileURLToPath } from "node:url";

import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import jest from "eslint-plugin-jest";
import react from "eslint-plugin-react";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import unicorn from "eslint-plugin-unicorn";
import globals from "globals";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

const esLint = [
  {
    ignores: [
      ".next",
      "lib",
      "node_modules",
      ".swc",
      "postcss.config.mjs",
      "tailwind.config.ts",
      "public",
      "next-env.d.ts",
      "utils/fs2json.js",
    ],
  },
  ...fixupConfigRules(
    compat.extends(
      "airbnb",
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:react/recommended",
      "plugin:react-hooks/recommended",
      "plugin:unicorn/recommended",
      "prettier",
      "next/core-web-vitals",
    ),
  ),
  {
    plugins: {
      "@typescript-eslint": fixupPluginRules(typescriptEslint),
      jest,
      react: fixupPluginRules(react),
      "simple-import-sort": simpleImportSort,
      unicorn: fixupPluginRules(unicorn),
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.jest,
        ...globals.node,
        React: "readonly",
      },

      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",
    },

    rules: {
      "@next/next/no-img-element": "off",

      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
        },
      ],

      "@typescript-eslint/explicit-function-return-type": [
        "error",
        {
          allowExpressions: true,
        },
      ],

      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],

      "comma-dangle": "off",

      "import/extensions": [
        "error",
        "ignorePackages",
        {
          ts: "never",
          tsx: "never",
        },
      ],

      "import/no-cycle": "off",

      "import/no-extraneous-dependencies": [
        "error",
        {
          devDependencies: [
            "*.config.ts",
            "e2e/**",
            "__tests__/**",
            "*.setup.js",
            "lib/**",
          ],
        },
      ],

      "jsx-a11y/click-events-have-key-events": "off",
      "jsx-a11y/control-has-associated-label": "off",
      "jsx-a11y/no-static-element-interactions": "off",
      "linebreak-style": ["error", "windows"],
      "no-restricted-syntax": [
        "error",
        "ForInStatement",
        "LabeledStatement",
        "WithStatement",
      ],
      "no-underscore-dangle": "off",
      "no-unsafe-optional-chaining": "error",
      quotes: ["error", "double"],
      "react/function-component-definition": "off",

      "react/jsx-filename-extension": [
        "error",
        {
          extensions: [".tsx"],
        },
      ],

      "react/jsx-props-no-spreading": "off",
      " react/jsx-no-useless-fragment": "off",
      semi: ["error", "always"],
      "simple-import-sort/exports": "error",
      "simple-import-sort/imports": "error",
      "unicorn/filename-case": "off",
      "unicorn/import-style": "off",
      "unicorn/no-array-for-each": "off",
      "unicorn/no-array-reduce": "off",
      "unicorn/numeric-separators-style": "off",
      "unicorn/prefer-dom-node-append": "off",
      "unicorn/prefer-module": "off",
      "unicorn/prefer-node-protocol": "off",
      "unicorn/prevent-abbreviations": "off",
      "unicorn/prefer-blob-reading-methods": "off",
    },
  },
];

export default esLint;
