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
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  loading: boolean,
): void => {
  const { appendFileToTitle } = useTitle(id);
  const [emulator, setEmulator] = useState<Record<string, V86Starter>>({});
  const { exists, mkdirRecursive, readFile, updateFolder, writeFile } =
    useFileSystem();
  const {
    processes: { [id]: { closing = false } = {} },
  } = useProcesses();

  const saveStateAsync = useCallback(
    (diskImageUrl: string): Promise<ArrayBuffer> =>
      new Promise((resolve, reject) => {
        emulator[diskImageUrl]?.save_state((error, state) =>
          error ? reject(error) : resolve(state),
        );
      }),
    [emulator],
  );

  const closeDiskImage = useCallback(
    async (diskImageUrl: string): Promise<void> => {
      const saveName = `${basename(diskImageUrl)}${saveExtension}`;

      if (!(await exists(SAVE_PATH))) await mkdirRecursive(SAVE_PATH);

      if (
        await writeFile(
          join(SAVE_PATH, saveName),
          Buffer.from(new Uint8Array(await saveStateAsync(diskImageUrl))),
          true,
        )
      ) {
        emulator[diskImageUrl].destroy();
        updateFolder(SAVE_PATH, saveName);
      }
    },
    [emulator, exists, mkdirRecursive, saveStateAsync, updateFolder, writeFile],
  );

  const loadDiskImage = useCallback(async () => {
    const [currentUrl] = Object.keys(emulator);

    if (currentUrl) await closeDiskImage(currentUrl);

    const imageContents = await readFile(url);
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
    const savePath = join(SAVE_PATH, `${basename(url)}${saveExtension}`);
    const saveContents = (await exists(savePath))
      ? bufferToUrl(await readFile(savePath))
      : undefined;

    if (saveContents) v86StarterConfig.initial_state = { url: saveContents };

    const v86 = new window.V86Starter(v86StarterConfig);

    v86.add_listener("emulator-loaded", () => {
      appendFileToTitle(url);
      cleanUpBufferUrl(bufferUrl);

      if (v86StarterConfig.initial_state) {
        cleanUpBufferUrl(v86StarterConfig.initial_state.url);
      }
    });

    containerRef.current?.addEventListener("click", v86.lock_mouse);

    setEmulator({ [url]: v86 });
  }, [
    appendFileToTitle,
    closeDiskImage,
    containerRef,
    emulator,
    exists,
    readFile,
    url,
  ]);

  useV86ScreenSize(id, containerRef, emulator[url]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (loading)
      loadFiles(libs).then(() => {
        const checkVideoJs = (): void => {
          if (window.V86Starter === undefined) {
            timeoutId = setTimeout(checkVideoJs, 100);
          } else {
            setLoading(false);
          }
        };
        checkVideoJs();
      });

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [loading, setLoading]);

  useEffect(() => {
    if (!loading && url && !emulator[url]) {
      loadDiskImage();
    }

    return () => {
      if (url && closing) closeDiskImage(url);
    };
  }, [
    closeDiskImage,
    closing,
    emulator,
    loadDiskImage,
    loading,
    readFile,
    url,
  ]);
};

export default useV86;
