import { useCallback } from "react";

import { useProcesses } from "@/context/Process";
import { useSession } from "@/context/Session";
import { useTheme } from "@/context/Theme";
import { bufferToUrl, cleanUpBufferUrl } from "@/utils/functions";

import {
  closeEqualizer,
  getWebampElement,
  updateWebampPostion,
} from "./functions";
import type { WebampCI, WebampOptions } from "./types";

const useWebamp = (id: string) => {
  const { closeProcess, minimize } = useProcesses();

  const {
    setWindowStates,
    windowStates: { [id]: { position = undefined } = {} } = {},
  } = useSession();

  const {
    currentTheme: {
      sizes: {
        taskbar: { height: taskbarHeight },
      },
    },
  } = useTheme();

  const loadWebamp = useCallback(
    (element: HTMLDivElement | null, file?: Buffer) => {
      if (element && window.Webamp) {
        const options: WebampOptions = {
          __butterchurnOptions: {
            importButterchurn: () => Promise.resolve(window.butterchurn),
            getPresets: () => {
              const presets = window.butterchurnPresets.getPresets();

              return Object.keys(presets).map((name) => ({
                name,
                butterchurnPresetObject: presets[name],
              }));
            },
            butterchurnOpen: true,
          },
          zIndex: 1,
        };

        if (file) {
          options.initialTracks = [
            { metaData: { title: "", artist: "" }, url: bufferToUrl(file) },
          ];
        }

        const webamp: WebampCI = new window.Webamp(options);

        webamp.onClose(() => {
          const [main] = getWebampElement().getElementsByClassName("window");
          const { x, y } = main.getBoundingClientRect();

          closeProcess(id);
          setWindowStates((currentWindowStates) => ({
            ...currentWindowStates,
            [id]: {
              position: { x, y },
            },
          }));

          if (options.initialTracks) {
            const [{ url: objectUrl }] = options.initialTracks;

            cleanUpBufferUrl(objectUrl);
          }
        });

        webamp.onMinimize(() => minimize(id));

        webamp.renderWhenReady(element).then(() => {
          closeEqualizer(webamp);

          updateWebampPostion(webamp, taskbarHeight, position);

          element?.appendChild(getWebampElement());
        });
      }
    },
    [closeProcess, id, minimize, position, setWindowStates, taskbarHeight]
  );

  return { loadWebamp };
};

export default useWebamp;
