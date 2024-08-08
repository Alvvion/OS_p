import type { CommandInterface } from "emulators";
import type { DosInstance } from "emulators-ui/dist/types/js-dos";
import { basename, join } from "path";
import { useCallback, useEffect, useState } from "react";

import { useFileSystem } from "@/context/FileSystem";
import { useProcesses } from "@/context/Process";
import useTitle from "@/hooks/useTitle";
import { SAVE_PATH } from "@/utils/constants";
import { bufferToUrl, cleanUpBufferUrl } from "@/utils/functions";
import { cleanUpGlobals } from "@/utils/globals";

import { globals, saveExtension } from "./config";
import { addJSDOSConfig } from "./functions";

const useDosCI = (
  id: string,
  url: string,
  containerRef: React.MutableRefObject<HTMLDivElement | null>,
  dosInstance?: DosInstance,
): CommandInterface | undefined => {
  const { appendFileToTitle } = useTitle(id);
  const { exists, mkdirRecursive, readFile, updateFolder, writeFile } =
    useFileSystem();
  const {
    linkElement,
    processes: { [id]: { closing = false } = {} },
  } = useProcesses();
  const [dosCI, setDosCI] = useState<Record<string, CommandInterface>>({});

  const closeBundle = useCallback(
    async (bundleUrl: string, closeInstance = false): Promise<void> => {
      const saveName = `${basename(bundleUrl)}${saveExtension}`;

      if (!(await exists(SAVE_PATH))) await mkdirRecursive(SAVE_PATH);

      if (
        await writeFile(
          join(SAVE_PATH, saveName),
          Buffer.from(await dosCI[bundleUrl]?.persist()),
          true,
        )
      ) {
        if (closeInstance) dosInstance?.stop();
        updateFolder(SAVE_PATH, saveName);
      }
    },
    [dosCI, dosInstance, exists, mkdirRecursive, updateFolder, writeFile],
  );

  const loadBundle = useCallback(async () => {
    const [currentUrl] = Object.keys(dosCI);

    if (currentUrl) closeBundle(currentUrl);

    const bundleURL = bufferToUrl(
      await addJSDOSConfig(await readFile(url), readFile),
    );
    const savePath = join(SAVE_PATH, `${basename(url)}${saveExtension}`);
    const stateUrl = (await exists(savePath))
      ? bufferToUrl(await readFile(savePath))
      : undefined;
    // NOTE: js-dos v7 appends `?dt=` (Removed in lib, for now...)
    const ci = await dosInstance?.run(bundleURL, stateUrl);

    if (ci) {
      const canvas = containerRef.current?.querySelector("canvas");
      if (canvas instanceof HTMLCanvasElement) {
        linkElement(id, "peekElement", canvas);
        setDosCI({ [url]: ci });
        appendFileToTitle(url);
        cleanUpBufferUrl(bundleURL);
        if (stateUrl) cleanUpBufferUrl(stateUrl);
        cleanUpGlobals(globals);
      }
    }
  }, [
    appendFileToTitle,
    closeBundle,
    containerRef,
    dosCI,
    dosInstance,
    exists,
    id,
    linkElement,
    readFile,
    url,
  ]);

  useEffect(() => {
    if (dosInstance && url && !dosCI[url]) loadBundle();

    return () => {
      if (url && closing) closeBundle(url, closing);
    };
  }, [closeBundle, closing, dosCI, dosInstance, loadBundle, url]);

  return dosCI[url];
};

export default useDosCI;
