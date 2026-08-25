import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--color-bg)",
        text: "var(--color-text)",
      },
      spacing: {
        6: "var(--space-6)",
      },
      fontSize: {
        hero: ["var(--text-hero)", { lineHeight: "var(--text-hero-line-height)", fontWeight: "var(--text-hero-weight)" }],
      },
    },
  },
  plugins: [],
};

export default config;
