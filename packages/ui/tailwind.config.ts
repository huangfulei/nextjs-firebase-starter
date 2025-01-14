/*
 * This file is not used for any compilation purpose, it is only used
 * for Tailwind Intellisense & Autocompletion in the source files
 */
import type { Config } from "tailwindcss";
import base from "@pomotrack/tailwind-config/base";

export default {
  content: ["./src/**/*.tsx"],
  presets: [base],
} satisfies Config;
