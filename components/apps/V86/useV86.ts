import { basename, extname, join } from "path";
import { useCallback, useEffect, useState } from "react";

import { useFileSystem } from "@/context/FileSystem";
import { useProcesses } from "@/context/Process";
import useTitle from "@/hooks/useTitle";
import { SAVE_PATH } from "@/utils/constants";
import { bufferToUrl, cleanUpBufferUrl, loadFiles } from "@/utils/functions";

import {
  BOOT_CD_FD_HD,
  BOOT_FD_CD_HD,
  config,
  libs,
  saveExtension,
} from "./config";
import { getImageType } from "./funtions";
import type { V86Config, V86ImageConfig, V86Starter } from "./types";
import useV86ScreenSize from "./useV86ScreenSize";

const useV86 = (
  id: string,
  url: string,
  containerRef: React.MutableRefObject<HTMLDivElement | null>,
): void => {
  const { appendFileToTitle } = useTitle(id);
  const [emulator, setEmulator] = useState<Record<string, V86Starter>>({});
  const { fs, mkdirRecursive, updateFolder } = useFileSystem();
  const {
    processes: { [id]: { closing = false } = {} },
  } = useProcesses();

  const closeDiskImage = useCallback(
    (diskImageUrl: string): Promise<void> =>
      new Promise((resolve) => {
        emulator[diskImageUrl]?.save_state((_e, newState) =>
          mkdirRecursive(SAVE_PATH, () => {
            const saveName = `${basename(diskImageUrl)}${saveExtension}`;
            fs?.writeFile(
              join(SAVE_PATH, saveName),
              Buffer.from(new Uint8Array(newState)),
              () => {
                emulator[diskImageUrl].destroy();
                updateFolder(SAVE_PATH, saveName);
                resolve();
              },
            );
          }),
        );
      }),
    [emulator, fs, mkdirRecursive, updateFolder],
  );

  useV86ScreenSize(id, containerRef, emulator[url]);

  useEffect(() => {
    if (fs && url && !emulator[url]) {
      fs.readFile(url, (_imageError, imageContents = Buffer.from("")) => {
        loadFiles(libs).then(() => {
          const isISO = extname(url).toLowerCase() === ".iso";
          const bufferUrl = bufferToUrl(imageContents);
          const v86ImageConfig: V86ImageConfig = {
            [isISO ? "cdrom" : getImageType(imageContents.length)]: {
              async: false,
              size: imageContents.length,
              url: bufferUrl,
              use_parts: false,
            },
          };
          const v86StarterConfig: V86Config = {
            boot_order: isISO ? BOOT_CD_FD_HD : BOOT_FD_CD_HD,
            screen_container: containerRef.current,
            ...v86ImageConfig,
            ...config,
          };

          fs.readFile(
            join(SAVE_PATH, `${basename(url)}${saveExtension}`),
            (saveError, saveContents = Buffer.from("")) => {
              const [currentUrl] = Object.keys(emulator);
              const loadEmulator = (): void => {
                if (!saveError) {
                  v86StarterConfig.initial_state = {
                    url: bufferToUrl(saveContents),
                  };
                }

                if (window.V86Starter) {
                  const v86 = new window.V86Starter(v86StarterConfig);

                  v86.add_listener("emulator-loaded", () => {
                    appendFileToTitle(url);
                    cleanUpBufferUrl(bufferUrl);
                    if (v86StarterConfig.initial_state) {
                      cleanUpBufferUrl(v86StarterConfig.initial_state.url);
                    }
                  });

                  containerRef.current?.addEventListener(
                    "click",
                    v86.lock_mouse,
                  );

                  setEmulator({ [url]: v86 });
                }
              };

              if (currentUrl) {
                closeDiskImage(currentUrl).then(loadEmulator);
              } else loadEmulator();
            },
          );
        });
      });
    }

    return () => {
      if (closing) closeDiskImage(url);
    };
  }, [
    appendFileToTitle,
    closeDiskImage,
    closing,
    containerRef,
    emulator,
    fs,
    url,
  ]);
};

export default useV86;
