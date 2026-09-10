import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    screens: {
      sm: "640px",
      md: "1024px",
    },
    extend: {
      colors: {
        navy900: "#0A1830",
        navy800: "#0F1F3D",
        gold500: "#F0A824",
        gold600: "#D6921A",
        blue600: "#0288D1",
        blue700: "#026CA8",
        green600: "#16A34A",
        red600: "#E5231B",
        bgPage: "#F6F8FB",
        surface: "#FFFFFF",
        textPrimary: "#0F172A",
        textSecondary: "#6B7280",
        border: "#E5E9F0",
        strikethrough: "#9CA3AF",
      },
      borderRadius: {
        card: "12px",
        btn: "8px",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};

export default config;
