import vantaWaves from "@/components/system/Desktop/vanta";

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
        disabled: "fill-titlebar-button-disabled",
        backgroundActive: "bg-titlebar-backgroundActive",
        closeActive: "bg-titlebar-closeActive",
        buttonInactive: "fill-titlebar-buttonInactive",
        disabledInactive: "fill-titlebar-button-disabledInactive",
      },
      fileEntry: {
        text: "#fff",
        border: "border-file-border",
        background: "bg-file-background",
        borderFocused: "border-file-borderFocused",
        backgroundFocused: "bg-file-backgroundFocused",
        borderFocusedHover: "border-file-borderFocusedHover",
        backgroundFocusedHover: "bg-file-backgroundFocusedHover",
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
      contextMenu: {
        boxShadow: `1px 1px 1px hsla(0, 0%, 20%, 70%),
    2px 2px 2px hsla(0, 0%, 10%, 70%)`,
      },
    },
    sizes: {
      contextMenu: {
        subMenuOffset: 3,
      },
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
        outline: "hsl(0deg 0% 25% / 75%)",
        outlineInactive: "hsl(0deg 0% 30% / 75%)",
        lineHeight: "14px",
        boxShadow: "0 0 20px 0 rgba(0, 0, 0, 50%)",
        boxShadowInactive: "0 0 12px 0 rgba(0, 0, 0, 50%)",
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
    wallpaper: vantaWaves({
      color: 0x192b34,
      shininess: 35,
      waveHeight: 15,
      waveSpeed: 0.25,
      zoom: 0.9,
    }),
  },
};

export default themes;
