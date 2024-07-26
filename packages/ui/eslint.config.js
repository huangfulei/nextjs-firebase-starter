import baseConfig from "@pomotrack/eslint-config/base";
import reactConfig from "@pomotrack/eslint-config/react";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: [],
  },
  ...baseConfig,
  ...reactConfig,
];
