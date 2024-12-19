import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Adjust the rule to only show warnings or disable it for specific scenarios
      "@typescript-eslint/no-unused-vars": [
        "warn", // Change to "off" to completely disable
        {
          vars: "all",
          args: "after-used",
          ignoreRestSiblings: true,
          varsIgnorePattern: "^_", // Ignore variables starting with _
          argsIgnorePattern: "^_", // Ignore function arguments starting with _
        },
      ],
    },
  },
];

export default eslintConfig;
