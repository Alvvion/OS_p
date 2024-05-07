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
      searchBgColor: string;
    };
    titlebar: {
      bgColor: string;
      text: string;
      backgroundHover: string;
      closeHover: string;
      disabled: string;
      backgroundActive: string;
      closeActive: string;
      buttonInactive: string;
      disabledInactive: string;
    };
    fileEntry: {
      text: string;
      textShadow: string;
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
      search: {
        iconTop: string;
        iconLeft: string;
        width: string;
        height: string;
        margin: string;
        borderRadius: string;
        padding: string;
        fontSize: string;
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
      boxShadow: string;
      outlineInactive: string;
      boxShadowInactive: string;
    };
    fileExplorer: {
      height: string;
    };
    fileEntry: {
      fontSize: string;
      iconSize: string;
      letterSpacing: string;
    };
  };
  formats: {
    date: Intl.DateTimeFormatOptions;
    time: Intl.DateTimeFormatOptions;
    tooltip: Intl.DateTimeFormatOptions;
  };
  wallpaper?: (el: HTMLElement | null) => void;
}

export type ThemeContextType = {
  currentTheme: DefaultTheme;
  setCurrentTheme: React.Dispatch<React.SetStateAction<DefaultTheme>>;
};
