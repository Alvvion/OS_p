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
        "file-background": "hsl(207deg 30% 72% / 25%)",
        "file-backgroundFocused": "hsl(207deg 60% 72% / 30%)",
        "file-backgroundFocusedHover": "hsl(207deg 90% 72% / 35%)",
        "context-background": "rgb(43,43,43)",
        "context-sperator": "rgb(128,128,128)",
        "context-fig-hover": "rgb(65,65,65)",
        startmenu: "#242424",
      },
      fill: {
        "titlebar-button-disabled": "rgb(50,50,50)",
        "titlebar-button-disabledInactive": "rgb(60,60,60)",
        "titlebar-buttonInactive": "rgb(128,128,128)",
      },
      borderColor: {
        "file-border": "hsl(207deg 30% 72% / 30%)",
        "file-borderFocused": "hsl(207deg 60% 72% / 35%)",
        "file-borderFocusedHover": "hsl(207deg 90% 72% / 40%)",
        "context-border": "rgb(160,160,160)",
        "rename-box-border": "rgb(100,100,100)",
      },
      gridTemplateColumns: {
        filemanager: "repeat(auto-fill, 74px)",
        startmenu: "repeat(6, 1fr)",
      },
      gridTemplateRows: {
        filemanager: "repeat(auto-fill, 85px)",
      },
    },
  },
  plugins: [],
};
export default config;
