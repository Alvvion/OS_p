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
import type { V86, V86Starter } from "./types";

const useV86 = (
  id: string,
  url: string,
  containerRef: React.MutableRefObject<HTMLDivElement | null>
): V86 => {
  const [emulator, setEmulator] = useState<V86Starter>();

  const { fs } = useFileSystem();

  const { appendFileToTitle } = useTitle(id);

  useEffect(() => {
    if (!emulator && fs && url) {
      fs.readFile(url, (_err, contents = Buffer.from("")) => {
        loadFiles(libs).then(() => {
          if (containerRef?.current) {
            const extention = extname(url).toLowerCase();
            const isISO = extention === ".iso";
            const { deviceMemory = 8 } = navigator;

            const memoryRatio = deviceMemory / 8;
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
              memory_size: memoryRatio * 1024 * 1024 * 1024,
              vga_memory_size: memoryRatio * 32 * 1024 * 1024,
              boot_order: isISO ? BOOT_CD_FD_HD : BOOT_FD_CD_HD,
              screen_container: containerRef.current,
              ...v86ImageType,
              ...v86Config,
            });

            v86.add_listener("emulator-loaded", () => {
              appendFileToTitle(url);
              cleanUpBufferUrl(bufferUrl);
            });

            setEmulator(v86);
          }
        });
      });
    }

    return () => emulator?.destroy?.();
  }, [emulator, containerRef, url, fs, appendFileToTitle]);

  return { emulator, lockMouse: emulator?.lock_mouse };
};

export default useV86;
