import type { RefObject } from "react";
import { useEffect } from "react";

import { useTheme } from "@/context/Theme";

const useWallpaper = (refElement: RefObject<HTMLElement>) => {
  const {
    currentTheme: { wallpaper },
  } = useTheme();

  useEffect(() => wallpaper?.(refElement?.current), [refElement, wallpaper]);
};

export default useWallpaper;
