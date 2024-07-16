import type { RefObject } from "react";
import { useCallback, useEffect } from "react";

import { useFileSystem } from "@/context/FileSystem";
import { useSession } from "@/context/Session";
import { useTheme } from "@/context/Theme";
import { bufferToUrl, cleanUpBufferUrl } from "@/utils/functions";

import { cssFit } from "./contant";

const useWallpaper = (refElement: RefObject<HTMLElement>): void => {
  const { wallpaper } = useTheme();
  const { fs } = useFileSystem();
  const { sessionLoaded, wallpaperImage, wallpaperFit } = useSession();

  const loadThemeWallpaper = useCallback(() => {
    refElement.current?.setAttribute("style", "");
    wallpaper?.(refElement.current);
  }, [refElement, wallpaper]);

  useEffect(() => {
    if (sessionLoaded) {
      if (wallpaperImage) {
        fs?.readFile(wallpaperImage, (error, contents = Buffer.from("")) => {
          if (error) {
            loadThemeWallpaper();
          } else {
            const [, currentWallpaperUrl] =
              refElement.current?.style.backgroundImage.match(/"(.*?)"/) || [];

            if (currentWallpaperUrl) cleanUpBufferUrl(currentWallpaperUrl);

            wallpaper?.();
            refElement.current?.setAttribute(
              "style",
              `
            background-image: url("${bufferToUrl(contents)}");
            ${cssFit[wallpaperFit]}
            `,
            );
          }
        });
      } else {
        loadThemeWallpaper();
      }
    }
  }, [
    refElement,
    fs,
    wallpaper,
    wallpaperFit,
    wallpaperImage,
    sessionLoaded,
    loadThemeWallpaper,
  ]);
};

export default useWallpaper;
