import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Extend the core recommended and Next.js-specific ESLint configs
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Allow unused variables if they start with `_`
      "@typescript-eslint/no-unused-vars": [
        "warn", // Set to "warn" to show warnings, or "off" to disable completely
        {
          vars: "all",
          args: "after-used",
          ignoreRestSiblings: true,
          varsIgnorePattern: "^_", // Ignore unused variables starting with `_`
          argsIgnorePattern: "^_", // Ignore unused arguments starting with `_`
        },
      ],
      // Avoid "any" type usage but allow controlled exceptions
      "@typescript-eslint/no-explicit-any": [
        "warn", // Warn instead of erroring
        {
          fixToUnknown: true, // Suggest `unknown` instead of `any`
          ignoreRestArgs: false, // Disallow `any` in rest arguments
        },
      ],
      // Enforce consistent import order for better readability
      "import/order": [
        "warn",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
      // Enforce consistent indentation
      "indent": ["warn", 2, { SwitchCase: 1 }],
      // Disable PropTypes as we're using TypeScript for type checking
      "react/prop-types": "off",
      // Other useful rules
      "no-console": "warn", // Warn for console logs
      "react/react-in-jsx-scope": "off", // Not needed for Next.js
    },
  },
  {
    // Apply specific configurations for TypeScript files
    files: ["**/*.ts", "**/*.tsx"], // Match TypeScript files
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2023,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
  {
    // Additional settings for JavaScript files
    files: ["**/*.js", "**/*.jsx"],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2023,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
];

export default eslintConfig;
