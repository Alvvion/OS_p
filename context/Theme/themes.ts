import type { DefaultTheme } from "./types";

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
        buttonHover: "bg-taskbar-button-hover",
        searchBgColor: "#3C3C3C",
      },
      titlebar: {
        bgColor: "#202020",
        text: "#E2E2E2",
        backgroundHover: "bg-titlebar-backgroundHover",
        closeHover: "bg-titlebar-closeHover",
        disabled: "bg-titlebar-button-disabled",
      },
      fileEntry: {
        text: "#fff",
        textShadow: `
      0 0 1px rgba(0, 0, 0, 75%),
      0 0 2px rgba(0, 0, 0, 50%),
      0 0 3px rgba(0, 0, 0, 25%),

      0 1px 1px rgba(0, 0, 0, 75%),
      0 1px 2px rgba(0, 0, 0, 50%),
      0 1px 3px rgba(0, 0, 0, 25%),

      0 2px 1px rgba(0, 0, 0, 75%),
      0 2px 2px rgba(0, 0, 0, 50%),
      0 2px 3px rgba(0, 0, 0, 25%)`,
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
        search: {
          iconTop: "12px",
          iconLeft: "5px",
          height: "31px",
          width: "200px",
          borderRadius: "25px",
          fontSize: "14px",
          margin: "6px 0 0 0",
          padding: "0 0 0 30px",
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
        letterSpacing: "0.25px",
      },
      fileExplorer: {
        height: "51px",
      },
      window: {
        outline: "1px solid rgba(0, 0, 0, 20%)",
        lineHeight: "14px",
        boxShadow: "0 0 20px 0 rgba(0, 0, 0, 50%)",
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
