import colors from "./default/colors";
import formats from "./default/formats";
import sizes from "./default/sizes";
import wallpaper from "./default/wallpaper";
import type { DefaultTheme } from "./types";

type Themes = {
  [key: string]: DefaultTheme;
};

const themes: Themes = {
  default: {
    colors,
    sizes,
    formats,
    wallpaper,
  },
};

export default themes;
