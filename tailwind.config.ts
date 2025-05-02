import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#263aff",
        secondary: "#FBBF24",
      },
    },
  },
  plugins: [],
};

export default config;