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
): void => {
  const { updateWindowSize } = useWindowSize(id);
  const [dosInstance, setDosInstance] = useState<DosInstance>();
  const dosCI = useDosCI(id, url, containerRef, dosInstance);
  const { closeProcess } = useProcesses();

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
