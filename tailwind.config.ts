import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        carbon: "#070707",
        ink: "#101010",
        ember: "#ff5a1f",
        chandra: "#b11226",
        marigold: "#ff9f1c"
      },
      boxShadow: {
        glow: "0 0 40px rgba(255, 90, 31, 0.18)"
      }
    }
  },
  plugins: []
};

export default config;
