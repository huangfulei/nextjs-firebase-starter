import type { Config } from "tailwindcss";

import base from "@pomotrack/tailwind-config/base";

export default {
  // We need to append the path to the UI package to the content array so that
  // those classes are included correctly.
  content: [...base.content, "../../packages/ui/**/*.{ts,tsx}"],
  presets: [base],
  theme: {
    extend: {
      // fontFamily: {
      //   sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      //   mono: ["var(--font-geist-mono)", ...fontFamily.mono],
      // },
    },
  },
} satisfies Config;
