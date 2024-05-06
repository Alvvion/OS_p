import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      backgroundColor: {
        "taskbar-button-hover": "#292929",
        "titlebar-backgroundHover": "#373737",
        "titlebar-closeHover": "#E81123",
        "titlebar-backgroundActive": "rgb(51,51,51)",
        "titlebar-closeActive": "rgb(139,10,20)",
      },

      fill: {
        "titlebar-button-disabled": "rgb(50,50,50)",
        "titlebar-button-disabledInactive": "rgb(60,60,60)",
        "titlebar-buttonInactive": "rgb(128,128,128)",
      },
    },
  },
  plugins: [],
};
export default config;
