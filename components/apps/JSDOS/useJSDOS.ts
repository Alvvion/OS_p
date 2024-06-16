import { useEffect, useState } from "react";

import { closeWithTransition } from "@/components/system/Window/RndWindow/functions";
import useTitle from "@/components/system/Window/RndWindow/useTitle";
import { useFileSystem } from "@/context/FileSystem";
import { useProcesses } from "@/context/Process";
import useWindowSize from "@/hooks/useWindowSize";
import { bufferToUrl, cleanUpBufferUrl, loadFiles } from "@/utils/functions";

import { libs, pathPrefix } from "./config";
import { addJSDOSConfig, cleanUpLoader } from "./functions";
import type { DosCI } from "./types";

const useJSDOS = (
  id: string,
  url: string,
  ref: React.MutableRefObject<HTMLDivElement | null>
): void => {
  const { appendFileToTitle } = useTitle(id);
  const { updateWindowSize } = useWindowSize(id);
  const [dos, setDos] = useState<DosCI>();
  const { fs } = useFileSystem();
  const { closeProcess } = useProcesses();

  useEffect(() => {
    if (!dos && fs && url) {
      fs.readFile(url, (_err, contents = Buffer.from("")) =>
        loadFiles(libs).then(async () => {
          const objectURL = bufferToUrl(await addJSDOSConfig(contents, fs));

          if (ref?.current && window.emulators) {
            window.emulators.pathPrefix = pathPrefix;

            window
              .Dos(ref.current)
              .run(objectURL)
              .then((ci) => {
                setDos(ci);
                appendFileToTitle(url);
                cleanUpBufferUrl(objectURL);
                cleanUpLoader();
              });
          }
        })
      );
    }

    return () => {
      if (dos) {
        dos.exit?.();
        window.SimpleKeyboardInstances?.emulatorKeyboard?.destroy?.();
      }
    };
  }, [appendFileToTitle, dos, fs, ref, url]);

  useEffect(() => {
    if (dos) {
      updateWindowSize(dos.frameHeight, dos.frameWidth);

      dos.events().onMessage((_msgType, _eventType, command, message) => {
        if (command === "LOG_EXEC") {
          const [dosMessage] = message
            .replace("Parsing command line: ", "")
            .split(" ");

          if (dosMessage.toUpperCase() === "EXIT")
            closeWithTransition(closeProcess, id);
        }
      });

      dos
        .events()
        .onFrameSize((width, height) =>
          updateWindowSize(height * 2, width * 2)
        );
    }
  }, [closeProcess, dos, id, updateWindowSize]);
};

export default useJSDOS;
