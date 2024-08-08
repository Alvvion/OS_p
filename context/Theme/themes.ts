import vantaWaves from "@/components/system/Desktop/vanta";

import colors from "./default/colors";
import formats from "./default/formats";
import sizes from "./default/sizes";
import type { DefaultTheme } from "./types";

type Themes = {
  [key: string]: DefaultTheme;
};

const themes: Themes = {
  default: {
    colors,
    sizes,
    formats,
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
