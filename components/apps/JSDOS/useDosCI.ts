import type { CommandInterface } from "emulators";
import type { DosInstance } from "emulators-ui/dist/types/js-dos";
import { basename, join } from "path";
import { useCallback, useEffect, useState } from "react";

import { useFileSystem } from "@/context/FileSystem";
import { useProcesses } from "@/context/Process";
import useTitle from "@/hooks/useTitle";
import { EMPTY_BUFFER, SAVE_PATH } from "@/utils/constants";
import {
  bufferToUrl,
  cleanUpBufferUrl,
  cleanUpGlobals,
} from "@/utils/functions";

import { globals, saveExtension } from "./config";
import { addJSDOSConfig } from "./functions";

const useDosCI = (
  id: string,
  url: string,
  containerRef: React.MutableRefObject<HTMLDivElement | null>,
  dosInstance?: DosInstance,
): CommandInterface | undefined => {
  const { appendFileToTitle } = useTitle(id);
  const { fs, mkdirRecursive, updateFolder } = useFileSystem();
  const {
    linkElement,
    processes: { [id]: { closing = false } = {} },
  } = useProcesses();
  const [dosCI, setDosCI] = useState<Record<string, CommandInterface>>({});

  const closeBundle = useCallback(
    (bundleUrl: string, closeInstance = false): void => {
      dosCI[bundleUrl]?.persist().then((saveZip) =>
        mkdirRecursive(SAVE_PATH, () => {
          const saveName = `${basename(bundleUrl)}${saveExtension}`;

          fs?.writeFile(join(SAVE_PATH, saveName), Buffer.from(saveZip), () => {
            if (closeInstance) dosInstance?.stop();
            updateFolder(SAVE_PATH, saveName);
          });
        }),
      );
    },
    [dosCI, dosInstance, fs, mkdirRecursive, updateFolder],
  );

  useEffect(() => {
    if (dosInstance && fs && url && !dosCI[url]) {
      fs.readFile(url, async (_urlError, urlContents = EMPTY_BUFFER) => {
        const bundleURL = bufferToUrl(await addJSDOSConfig(urlContents, fs));

        fs.readFile(
          join(SAVE_PATH, `${basename(url)}${saveExtension}`),
          (saveError, saveContents = EMPTY_BUFFER) => {
            const [currentUrl] = Object.keys(dosCI);
            let optionalChangesUrl = "";

            if (!saveError) {
              optionalChangesUrl = bufferToUrl(saveContents);
            }

            if (currentUrl) closeBundle(currentUrl);

            // NOTE: js-dos v7 appends `?dt=` (Removed in lib, for now...)
            dosInstance.run(bundleURL, optionalChangesUrl).then((ci) => {
              const canvas = containerRef.current?.querySelector("canvas");

              if (canvas instanceof HTMLCanvasElement) {
                linkElement(id, "peekElement", canvas);
                setDosCI({ [url]: ci });
                appendFileToTitle(url);
                cleanUpBufferUrl(bundleURL);
                if (optionalChangesUrl) cleanUpBufferUrl(optionalChangesUrl);
                cleanUpGlobals(globals);
              }
            });
          },
        );
      });
    }

    return () => {
      if (closing) closeBundle(url, closing);
    };
  }, [
    appendFileToTitle,
    closeBundle,
    closing,
    containerRef,
    dosCI,
    dosInstance,
    fs,
    id,
    linkElement,
    mkdirRecursive,
    updateFolder,
    url,
  ]);

  return dosCI[url];
};

export default useDosCI;
