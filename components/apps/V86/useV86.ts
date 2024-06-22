import { extname } from "path";
import { useEffect, useState } from "react";

import { useFileSystem } from "@/context/FileSystem";
import useTitle from "@/hooks/useTitle";
import { bufferToUrl, cleanUpBufferUrl, loadFiles } from "@/utils/functions";

import {
  BOOT_CD_FD_HD,
  BOOT_FD_CD_HD,
  config as v86Config,
  libs,
} from "./config";
import { getImageType } from "./funtions";
import type { V86Starter } from "./types";
import useV86ScreenSize from "./useV86ScreenSize";

const useV86 = (
  id: string,
  url: string,
  containerRef: React.MutableRefObject<HTMLDivElement | null>,
): void => {
  const [emulator, setEmulator] = useState<V86Starter>();

  const { fs } = useFileSystem();

  const { appendFileToTitle } = useTitle(id);

  useEffect(() => {
    if (!emulator && fs && url) {
      fs.readFile(url, (_err, contents = Buffer.from("")) => {
        loadFiles(libs).then(() => {
          if (containerRef?.current) {
            const isISO = extname(url).toLowerCase() === ".iso";
            const bufferUrl = bufferToUrl(contents);

            const v86ImageType = {
              [getImageType(isISO, contents.length)]: {
                async: false,
                size: contents.length,
                url: bufferUrl,
                use_parts: false,
              },
            };

            const v86 = new window.V86Starter({
              boot_order: isISO ? BOOT_CD_FD_HD : BOOT_FD_CD_HD,
              screen_container: containerRef.current,
              ...v86ImageType,
              ...v86Config,
            });

            v86.add_listener("emulator-loaded", () => {
              appendFileToTitle(url);
              cleanUpBufferUrl(bufferUrl);
            });
            containerRef.current.addEventListener("click", v86.lock_mouse);

            setEmulator(v86);
          }
        });
      });
    }

    return () => emulator?.destroy?.();
  }, [emulator, containerRef, url, fs, appendFileToTitle]);

  useV86ScreenSize(id, containerRef, emulator);
};

export default useV86;
