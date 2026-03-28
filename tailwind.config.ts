import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#041627",
        "primary-container": "#1A2B3C",
        "tertiary-fixed": "#6BFE9C",
        "tertiary-fixed-dim": "#4AE183",
        tertiary: "#001A08",
        surface: "#F7F9FB",
        "surface-low": "#F2F4F6",
        "on-surface": "#191C1E",
        "on-surface-variant": "#44474C",
        outline: "#74777D",
        "outline-variant": "#C4C6CD",
        "secondary-fixed": "#DDE3ED",
        "on-tertiary-container": "#00A656",
        "primary-fixed-dim": "#B7C8DE",
        "on-tertiary-fixed": "#00210C",
        "on-tertiary-fixed-variant": "#005228",
        error: "#BA1A1A",
        "error-container": "#FFDAD6",
        secondary: "#595F67",
      },
      fontFamily: {
        headline: ["var(--font-manrope)", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
