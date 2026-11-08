import type { Config } from "tailwindcss";
export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: { ink: "#203d34", paper: "#f8f7f2" },
      fontFamily: {
        sans: ["DM", "Arial", "sans-serif"],
        serif: ["Editorial", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
