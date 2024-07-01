import type { RefObject } from "react";
import { useEffect } from "react";

import { useFileSystem } from "@/context/FileSystem";
import { useSession } from "@/context/Session";
import { useTheme } from "@/context/Theme";
import { bufferToUrl, cleanUpBufferUrl } from "@/utils/functions";

import { cssFit } from "./contant";

const useWallpaper = (refElement: RefObject<HTMLElement>) => {
  const {
    currentTheme: { wallpaper },
  } = useTheme();
  const { fs } = useFileSystem();
  const { wallpaperImage, wallpaperFit } = useSession();

  useEffect(() => {
    if (wallpaperImage) {
      fs?.readFile(wallpaperImage, (error, contents = Buffer.from("")) => {
        if (!error) {
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
      refElement.current?.setAttribute("style", "");
      wallpaper?.(refElement.current);
    }
  }, [refElement, fs, wallpaper, wallpaperFit, wallpaperImage]);
};

export default useWallpaper;
