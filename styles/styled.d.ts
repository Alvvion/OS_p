import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: string;
      window: string;
      backgroundcolor: string;
      taskbar: string;
      taskbarText: string;
      taskbarLangHover: string;
      taskbarButtonHover: string;
    };
    sizes: {
      taskbar: {
        height: string;
        clock: {
          width: string;
        };
        startButton: {
          width: string;
        };
        entry: {
          width: string;
        };
      };
    };
    formats: {
      date: Intl.DateTimeFormatOptions;
      time: Intl.DateTimeFormatOptions;
      tooltip: Intl.DateTimeFormatOptions;
    };
  }
}
