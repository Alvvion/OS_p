import { basename, extname } from "path";
import { useState } from "react";

import { useProcesses } from "@/context/Process";
import type { Process } from "@/context/Process/types";
import { useSession } from "@/context/Session";
import { useTheme } from "@/context/Theme";
import useWindowActions from "@/hooks/useWindowActions";
import { DEFAULT_WINDOW_TRANSITION_DURATION } from "@/utils/constants";
import { bufferToUrl } from "@/utils/functions";

import {
  BASE_WEBAMP_SKINS,
  cleanBufferOnSkinLoad,
  closeEqualizer,
  getWebampElement,
  parseTrack,
  updateWebampPostion,
} from "./functions";
import type { WebampCI, WebampOptions } from "./types";

const useWebamp = (id: string) => {
  const { onClose, onMinimize } = useWindowActions(id);

  const {
    setWindowStates,
    windowStates: { [id]: { position = undefined } = {} } = {},
  } = useSession();

  const {
    linkElement,
    processes: { [id]: windowProcess = {} },
  } = useProcesses();

  const { componentWindow } = windowProcess as Process;

  const {
    currentTheme: {
      sizes: {
        taskbar: { height: taskbarHeight },
      },
    },
  } = useTheme();

  const [webampCI, setWebampCI] = useState<WebampCI>();

  const loadWebamp = (
    element: HTMLDivElement | null,
    url: string,
    file?: Buffer
  ): void => {
    if (element && window.Webamp && !webampCI) {
      const butterChurn = {
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
      };
      const runWebamp = (options?: WebampOptions) => {
        const webamp: WebampCI = new window.Webamp({
          ...butterChurn,
          ...BASE_WEBAMP_SKINS,
          ...options,
        });

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

        if (options?.initialSkin?.url) {
          cleanBufferOnSkinLoad(webamp, options.initialSkin.url);
        }

        webamp.renderWhenReady(element).then(() => {
          closeEqualizer(webamp);
          updateWebampPostion(webamp, taskbarHeight, position);
          setupElement();
        });

        setWebampCI(webamp);
      };

      if (file && url) {
        if (extname(url) === ".mp3") {
          parseTrack(file, basename(url)).then((track) =>
            runWebamp({ initialTracks: [track] })
          );
        } else runWebamp({ initialSkin: { url: bufferToUrl(file) } });
      } else runWebamp();
    }
  };

  return { loadWebamp, webampCI };
};

export default useWebamp;
