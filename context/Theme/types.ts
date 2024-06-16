import type colors from "./default/colors";
import type sizes from "./default/sizes";

export interface DefaultTheme {
  colors: typeof colors;
  sizes: typeof sizes;
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
