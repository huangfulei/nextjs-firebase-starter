import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";
import daisyui from "daisyui";
import * as tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: ["src/**/*.{ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [daisyui, typography, tailwindcssAnimate],
  daisyui: {
    styled: true,
    // themes: ["light", "dark"],
    themes: false,
    base: true,
    utils: true,
    logs: true,
    prefix: "",
  },
} satisfies Config;
