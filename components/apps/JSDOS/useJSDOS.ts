import type { CommandInterface } from "emulators";
import type { DosInstance } from "emulators-ui/dist/types/js-dos";
import { basename, join } from "path";
import { useEffect, useState } from "react";

import { closeWithTransition } from "@/components/system/Window/RndWindow/functions";
import { useFileSystem } from "@/context/FileSystem";
import { useProcesses } from "@/context/Process";
import useTitle from "@/hooks/useTitle";
import useWindowSize from "@/hooks/useWindowSize";
import { SAVE_PATH } from "@/utils/constants";
import { bufferToUrl, cleanUpBufferUrl, loadFiles } from "@/utils/functions";

import { dosOptions, libs, pathPrefix, saveExtension } from "./config";
import { addJSDOSConfig, cleanUpLoader } from "./functions";

const useJSDOS = (
  id: string,
  url: string,
  containerRef: React.MutableRefObject<HTMLDivElement | null>,
): void => {
  const { appendFileToTitle } = useTitle(id);
  const { updateWindowSize } = useWindowSize(id);
  const [dosCI, setDosCI] = useState<CommandInterface>();
  const [dosInstance, setDosInstance] = useState<DosInstance>();
  const { fs } = useFileSystem();
  const { closeProcess, linkElement } = useProcesses();

  useEffect(() => {
    if (!dosInstance && containerRef.current) {
      loadFiles(libs).then(() => {
        window.emulators.pathPrefix = pathPrefix;

        setDosInstance(
          window.Dos(containerRef.current as HTMLDivElement, dosOptions),
        );
      });
    }
  }, [containerRef, dosInstance]);

  useEffect(() => {
    if (dosInstance && !dosCI && fs && url) {
      fs.readFile(url, async (_urlError, urlContents = Buffer.from("")) => {
        const bundleURL = bufferToUrl(await addJSDOSConfig(urlContents, fs));

        fs.readFile(
          join(SAVE_PATH, `${basename(url)}${saveExtension}`),
          (_saveError, saveContents = Buffer.from("")) => {
            const optionalChangesUrl = bufferToUrl(saveContents);

            // NOTE: js-dos v7 appends `?dt=` (Removed in lib, for now...)
            dosInstance.run(bundleURL, optionalChangesUrl).then((ci) => {
              const canvas = containerRef.current?.querySelector("canvas");

              linkElement(id, "peekElement", canvas as HTMLCanvasElement);
              setDosCI(ci);
              appendFileToTitle(url);
              cleanUpBufferUrl(bundleURL);
              cleanUpBufferUrl(optionalChangesUrl);
              cleanUpLoader();
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
              () => dosInstance?.stop(),
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
    url,
  ]);

  useEffect(() => {
    if (dosCI) {
      updateWindowSize(dosCI.height(), dosCI.width());

      dosCI.events().onMessage((_msgType, _eventType, command, message) => {
        if (command === "LOG_EXEC") {
          const [dosCommand] = message
            .replace("Parsing command line: ", "")
            .split(" ");

          if (dosCommand.toUpperCase() === "EXIT") {
            closeWithTransition(closeProcess, id);
          }
        }
      });

      dosCI
        .events()
        .onFrameSize((width, height) =>
          updateWindowSize(height * 2, width * 2),
        );

      dosCI
        .events()
        .onExit(() =>
          window.SimpleKeyboardInstances?.emulatorKeyboard?.destroy?.(),
        );
    }
  }, [closeProcess, dosCI, id, updateWindowSize]);
};

export default useJSDOS;
