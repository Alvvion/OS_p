import type { DefaultTheme } from "styled-components/dist/types";

type Themes = {
  [key: string]: DefaultTheme;
};

const themes: Themes = {
  default: {
    colors: {
      primary: "#008000",
      window: "#808080",
      backgroundcolor: "#000",
      taskbar: "#1d1c1d",
      taskbarText: "#fff",
      taskbarLangHover: "#c1c0c0",
      taskbarButtonHover: "rgba(255, 255, 255, 0.1)",
    },
    sizes: {
      taskbar: {
        height: "2.8em",
        clock: {
          width: "120px",
        },
        startButton: {
          width: "50px",
        },
        entry: {
          width: "80px",
        },
      },
    },
    formats: {
      date: {
        day: "numeric",
        month: "numeric",
        year: "numeric",
      },
      time: {
        hour: "numeric",
        minute: "2-digit",
        hour12: false,
      },
      tooltip: {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      },
    },
  },
};

export default themes;
