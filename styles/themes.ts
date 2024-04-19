import type { DefaultTheme } from "styled-components/dist/types";

type Themes = {
  [key: string]: DefaultTheme;
};

const themes: Themes = {
  default: {
    colors: {
      primary: "#008000",
      window: "#808080",
      desktopBgColor: "#000",
      taskbar: {
        bgColor: "#1d1c1d",
        text: "#fff",
        langHover: "#c1c0c0",
        buttonHover: "rgba(255, 255, 255, 0.1)",
      },
      titlebar: {
        bgColor: "#202020",
        text: "#E2E2E2",
        buttonHover: "#2D2D2D",
      },
    },
    sizes: {
      taskbar: {
        height: "2.8em",
        clock: {
          width: "120px",
          fontSize: "12px",
        },
        startButton: {
          width: "50px",
        },
        entry: {
          width: "80px",
        },
      },
      titlebar: {
        fontSize: "11.5px",
        buttonIconWidth: "16px",
        height: "29px",
        iconMargin: "8px",
        buttonWidth: "45px",
      },
      fileEntry: {
        fontSize: "11.5px",
        iconSize: "48px",
      },
      window: {
        outline: "1px solid rgba(0, 0, 0, 20%)",
        lineHeight: "14px",
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
