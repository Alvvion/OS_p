import type { CommandInterface } from "emulators";
import type { DosInstance } from "emulators-ui/dist/types/js-dos";
import { basename, join } from "path";
import { useEffect, useState } from "react";

import { useFileSystem } from "@/context/FileSystem";
import { useProcesses } from "@/context/Process";
import useTitle from "@/hooks/useTitle";
import { SAVE_PATH } from "@/utils/constants";
import { bufferToUrl, cleanUpBufferUrl } from "@/utils/functions";

import { saveExtension } from "./config";
import { addJSDOSConfig, cleanUpLoader } from "./functions";

const useDosCI = (
  id: string,
  url: string,
  containerRef: React.MutableRefObject<HTMLDivElement | null>,
  dosInstance?: DosInstance,
): CommandInterface | undefined => {
  const { appendFileToTitle } = useTitle(id);
  const { fs, updateFolder } = useFileSystem();
  const { linkElement } = useProcesses();
  const [dosCI, setDosCI] = useState<CommandInterface>();

  useEffect(() => {
    if (dosInstance && !dosCI && fs && url) {
      fs.readFile(url, async (_urlError, urlContents = Buffer.from("")) => {
        const bundleURL = bufferToUrl(await addJSDOSConfig(urlContents, fs));

        fs.readFile(
          join(SAVE_PATH, `${basename(url)}${saveExtension}`),
          (saveError, saveContents = Buffer.from("")) => {
            let optionalChangesUrl = "";

            if (!saveError) {
              optionalChangesUrl = bufferToUrl(saveContents);
            }

            // NOTE: js-dos v7 appends `?dt=` (Removed in lib, for now...)
            dosInstance.run(bundleURL, optionalChangesUrl).then((ci) => {
              const canvas = containerRef.current?.querySelector("canvas");

              if (canvas instanceof HTMLCanvasElement) {
                linkElement(id, "peekElement", canvas);
                setDosCI(ci);
                appendFileToTitle(url);
                cleanUpBufferUrl(bundleURL);
                if (optionalChangesUrl) cleanUpBufferUrl(optionalChangesUrl);
                cleanUpLoader();
              }
            });
          },
        );
      });
    }

    return () => {
      if (dosCI && fs && url) {
        dosCI.persist().then((saveZip) => {
          fs.mkdir(SAVE_PATH, () =>
            fs.writeFile(
              join(SAVE_PATH, `${basename(url)}${saveExtension}`),
              Buffer.from(saveZip),
              () => {
                dosInstance?.stop();
                updateFolder(SAVE_PATH);
              },
            ),
          );
        });
      }
    };
  }, [
    appendFileToTitle,
    containerRef,
    dosCI,
    dosInstance,
    fs,
    id,
    linkElement,
    updateFolder,
    url,
  ]);

  return dosCI;
};

export default useDosCI;
