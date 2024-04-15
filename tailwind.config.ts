import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    screens: {
      ss: { max: "290px" },
      sm: { max: "320px" },
      m: { max: "767px" },
      xl: { min: "768px", max: "1023px" },
      xxl: { min: "1024px", max: "1279px" },
      xxxl: { min: "1280px" },
      ultra: { min: "1500px" },
    },
  },
  plugins: [],
};
export default config;
