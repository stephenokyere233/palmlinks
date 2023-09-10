import type { Config } from 'tailwindcss'

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
      colors: {
        primary: "#6B46C1",
        secondary: "#F7FAFC",
        accent: " #9F7AEA",
        accentLight: "#D6BCFA",
        gray: "#A0AEC0",
        grayLight: "#E5E7EB",
      },
    },
  },
  plugins: [],
};
export default config
