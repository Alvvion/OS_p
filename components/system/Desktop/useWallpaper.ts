import type { RefObject } from "react";
import { useCallback, useEffect } from "react";

import { useFileSystem } from "@/context/FileSystem";
import { useSession } from "@/context/Session";
import { useTheme } from "@/context/Theme";
import { bufferToUrl, cleanUpBufferUrl } from "@/utils/functions";

import { cssFit } from "./contant";

const useWallpaper = (refElement: RefObject<HTMLElement>): void => {
  const { wallpaper } = useTheme();
  const { readFile } = useFileSystem();
  const { sessionLoaded, wallpaperImage, wallpaperFit } = useSession();

  const loadThemeWallpaper = useCallback(() => {
    refElement.current?.setAttribute("style", "");
    wallpaper?.(refElement.current);
  }, [refElement, wallpaper]);

  const loadFileWallpaper = useCallback(async () => {
    const [, currentWallpaperUrl] =
      refElement.current?.style.backgroundImage.match(/"(.*?)"/) || [];

    if (currentWallpaperUrl) cleanUpBufferUrl(currentWallpaperUrl);

    wallpaper?.();

    refElement.current?.setAttribute(
      "style",
      `
        background-image: url("${bufferToUrl(await readFile(wallpaperImage))}");
        ${cssFit[wallpaperFit]}
      `,
    );
  }, [refElement, readFile, wallpaper, wallpaperFit, wallpaperImage]);

  useEffect(() => {
    if (sessionLoaded) {
      if (wallpaperImage) {
        try {
          loadFileWallpaper();
        } catch {
          loadThemeWallpaper();
        }
      } else {
        loadThemeWallpaper();
      }
    }
  }, [loadFileWallpaper, loadThemeWallpaper, sessionLoaded, wallpaperImage]);
};

export default useWallpaper;
