import { basename } from "path";
import { useState } from "react";

import { useProcesses } from "@/context/Process";
import type { Process } from "@/context/Process/types";
import { useSession } from "@/context/Session";
import { useTheme } from "@/context/Theme";
import useWindowActions from "@/hooks/useWindowActions";
import { DEFAULT_WINDOW_TRANSITION_DURATION } from "@/utils/constants";

import {
  closeEqualizer,
  getWebampElement,
  parseTrack,
  updateWebampPostion,
} from "./functions";
import type { WebampCI, WebampOptions } from "./types";

const useWebamp = (id: string) => {
  const { onClose, onMinimize } = useWindowActions(id);

  const {
    processes: { [id]: process = {} },
    linkElement,
  } = useProcesses();

  const { componentWindow } = process as Process;

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

  const [webampCI, setWebampCI] = useState<WebampCI | null>(null);

  const loadWebamp = (
    element: HTMLDivElement | null,
    url: string,
    file?: Buffer
  ): void => {
    if (element && window.Webamp && !webampCI) {
      // const options: WebampOptions = {
      //   __butterchurnOptions: {
      //     importButterchurn: () => Promise.resolve(window.butterchurn),
      //     getPresets: () => {
      //       const presets = window.butterchurnPresets.getPresets();

      //       return Object.keys(presets).map((name) => ({
      //         name,
      //         butterchurnPresetObject: presets[name],
      //       }));
      //     },
      //     butterchurnOpen: true,
      //   },
      // };

      const runWebamp = (options?: WebampOptions) => {
        const webamp: WebampCI = new window.Webamp(options);

        const setupElement = () => {
          const webampElement = getWebampElement();
          const [main] = webampElement.getElementsByClassName("window");

          if (!componentWindow && main && Object.keys(process).length) {
            linkElement(id, "componentWindow", main as HTMLElement);
          }

          element.appendChild(webampElement);
        };

        const subscriptions = [
          webamp.onWillClose((cancel) => {
            cancel();
            const [main] = getWebampElement().getElementsByClassName("window");
            const { x, y } = main.getBoundingClientRect();

            onClose();
            setWindowStates((currentWindowStates) => ({
              ...currentWindowStates,
              [id]: {
                position: { x, y },
              },
            }));

            setTimeout(() => {
              subscriptions.forEach((unsubscribe) => unsubscribe());
              webamp.close();
            }, DEFAULT_WINDOW_TRANSITION_DURATION);
          }),
          webamp.onMinimize(() => onMinimize()),
        ];

        webamp.renderWhenReady(element).then(() => {
          closeEqualizer(webamp);
          updateWebampPostion(webamp, taskbarHeight, position);
          setupElement();
        });

        setWebampCI(webamp);
      };

      if (file && url) {
        parseTrack(file, basename(url)).then((track) =>
          runWebamp({ initialTracks: [track] })
        );
      } else runWebamp();
    }
  };

  return { loadWebamp, webampCI };
};

export default useWebamp;
