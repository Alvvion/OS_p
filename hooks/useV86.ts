import { extname } from "path";
import { useCallback, useEffect, useState } from "react";

import { useFileSystem } from "@/contexts/fileSystem";
import type {
  NavigatorWithMemory,
  V86,
  V86Starter,
  WindowWithV86Starter,
} from "@/types/components/apps/V86";
import { bufferToUrl, loadFiles } from "@/utils/functions";
import { BOOT_CD_FD_HD, BOOT_FD_CD_HD, V86Config } from "@/utils/V86Config";

const useV86 = (
  url: string,
  ref: React.MutableRefObject<HTMLDivElement | null>
): V86 => {
  const [emulator, setEmulator] = useState<V86Starter | null>(null);
  const lockMouse = useCallback(() => emulator?.lock_mouse?.(), [emulator]);

  const { fs } = useFileSystem();

  useEffect(() => {
    if (!emulator) {
      fs?.readFile(url, (_err, contents = Buffer.from("")) => {
        loadFiles(["/libs/v86/libv86.js"]).then(() => {
          const extention = extname(url).toLowerCase();
          const isISO = extention === ".iso";
          const { deviceMemory = 8 } = navigator as NavigatorWithMemory;

          const memoryRatio = deviceMemory / 8;

          setEmulator(
            new (window as WindowWithV86Starter).V86Starter({
              memory_size: memoryRatio * 1024 * 1024 * 1024,
              vga_memory_size: memoryRatio * 32 * 1024 * 1024,
              boot_order: isISO ? BOOT_CD_FD_HD : BOOT_FD_CD_HD,
              [isISO ? "cdrom" : "fda"]: { url: bufferToUrl(contents) },
              screen_container: ref.current,
              ...V86Config,
            })
          );
        });
      });
    }

    return () => emulator?.destroy?.();
  }, [emulator, ref, url, fs]);

  return { emulator, lockMouse };
};

export default useV86;
