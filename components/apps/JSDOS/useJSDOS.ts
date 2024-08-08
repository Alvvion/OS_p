import type { DosInstance } from "emulators-ui/dist/types/js-dos";
import { useEffect, useState } from "react";

import { closeWithTransition } from "@/components/system/Window/RndWindow/functions";
import { useProcesses } from "@/context/Process";
import useWindowSize from "@/hooks/useWindowSize";
import { loadFiles } from "@/utils/functions";

import { dosOptions, libs, pathPrefix } from "./config";
import useDosCI from "./useDosCI";

const useJSDOS = (
  id: string,
  url: string,
  containerRef: React.MutableRefObject<HTMLDivElement | null>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
): void => {
  const { updateWindowSize } = useWindowSize(id);
  const [dosInstance, setDosInstance] = useState<DosInstance>();
  const dosCI = useDosCI(id, url, containerRef, dosInstance);
  const { closeProcess } = useProcesses();

  useEffect(() => {
    if (!dosInstance) {
      loadFiles(libs).then(() => {
        if (window.emulators) window.emulators.pathPrefix = pathPrefix;

        if (containerRef.current && window.Dos) {
          setDosInstance(window.Dos(containerRef.current, dosOptions));
          setLoading(false);
        }
      });
    }
  }, [containerRef, dosInstance, setLoading]);

  useEffect(() => {
    if (dosCI) {
      updateWindowSize(dosCI.height(), dosCI.width());

      dosCI
        .events()
        .onMessage((_msgType, _eventType, command: string, message: string) => {
          if (command === "LOG_EXEC") {
            const [dosCommand] = message
              .replace("Parsing command line: ", "")
              .split(" ");

            if (dosCommand.toUpperCase() === "EXIT") {
              closeWithTransition(closeProcess, id);
            }
          }
        });

      dosCI.events().onFrameSize((width, height) => {
        const { height: currentHeight = 0, width: currentWidth = 0 } =
          containerRef.current?.getBoundingClientRect() || {};
        const [frameHeight, frameWidth] = [height * 2, width * 2];

        if (frameHeight !== currentHeight || frameWidth !== currentWidth) {
          updateWindowSize(frameHeight, frameWidth);
        }
      });

      dosCI
        .events()
        .onExit(() =>
          window.SimpleKeyboardInstances?.emulatorKeyboard?.destroy(),
        );
    }
  }, [closeProcess, containerRef, dosCI, id, updateWindowSize]);
};

export default useJSDOS;
