import baseConfig, { restrictEnvAccess } from "@pomotrack/eslint-config/base";
import nextjsConfig from "@pomotrack/eslint-config/nextjs";
import reactConfig from "@pomotrack/eslint-config/react";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: [".next/**"],
  },
  ...baseConfig,
  ...reactConfig,
  ...nextjsConfig,
  ...restrictEnvAccess,
];
