import type colors from "./default/colors";
import type formats from "./default/formats";
import type sizes from "./default/sizes";

export interface DefaultTheme {
  colors: typeof colors;
  sizes: typeof sizes;
  formats: typeof formats;
  wallpaper?: (el?: HTMLElement | null) => void;
}

export type ThemeContextType = {
  currentTheme: DefaultTheme;
  setCurrentTheme: React.Dispatch<React.SetStateAction<DefaultTheme>>;
};

export type ThemeHook = DefaultTheme & {
  setCurrentTheme: React.Dispatch<React.SetStateAction<DefaultTheme>>;
};
