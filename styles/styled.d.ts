import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: string;
      window: string;
      desktopBgColor: string;
      taskbar: {
        bgColor: string;
        text: string;
        langHover: string;
        buttonHover: string;
      };
      titlebar: {
        bgColor: string;
        text: string;
        buttonHover: string;
      };
    };
    sizes: {
      taskbar: {
        height: string;
        clock: {
          width: string;
          fontSize: string;
        };
        startButton: {
          width: string;
        };
        entry: {
          width: string;
        };
      };
      titlebar: {
        buttonIconWidth: string;
        buttonWidth: string;
        fontSize: string;
        height: string;
        iconMargin: string;
      };
      window: {
        outline: string;
        lineHeight: string;
      };
      fileEntry: {
        fontSize: string;
        iconSize: string;
      };
    };
    formats: {
      date: Intl.DateTimeFormatOptions;
      time: Intl.DateTimeFormatOptions;
      tooltip: Intl.DateTimeFormatOptions;
    };
  }
}
