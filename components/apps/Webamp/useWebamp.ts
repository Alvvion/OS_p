import { basename, extname } from "path";
import { useState } from "react";
import type { Options } from "webamp";

import { useProcesses } from "@/context/Process";
import { useSession } from "@/context/Session";
import { useTheme } from "@/context/Theme";
import useWindowActions from "@/hooks/useWindowActions";
import { DEFAULT_WINDOW_TRANSITION_DURATION } from "@/utils/constants";
import { bufferToUrl } from "@/utils/functions";

import { BASE_WEBAMP_SKINS, MAIN_WINDOW } from "./constants";
import {
  cleanBufferOnSkinLoad,
  closeEqualizer,
  getWebampElement,
  parseTrack,
  updateWebampPostion,
} from "./functions";
import type { WebampCI, WebampHook } from "./types";

const useWebamp = (id: string): WebampHook => {
  const { onClose, onMinimize } = useWindowActions(id);

  const { setWindowStates, windowStates: { [id]: windowState } = {} } =
    useSession();

  const { position } = windowState || {};

  const {
    linkElement,
    processes: { [id]: process },
  } = useProcesses();

  const { componentWindow } = process || {};

  const {
    sizes: {
      taskbar: { height: taskbarHeight },
    },
  } = useTheme();

  const [webampCI, setWebampCI] = useState<WebampCI>();

  const loadWebamp = (
    element: HTMLDivElement | null,
    url: string,
    file?: Buffer,
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
      const runWebamp = (options?: Options): void => {
        const webamp = new window.Webamp({
          ...butterChurn,
          ...BASE_WEBAMP_SKINS,
          ...options,
        }) as WebampCI;

        const setupElement = (): void => {
          const webampElement = getWebampElement();
          if (webampElement) {
            const mainWindow =
              webampElement.querySelector<HTMLDivElement>(MAIN_WINDOW);

            if (process && !componentWindow && mainWindow) {
              linkElement(id, "componentWindow", element);
              linkElement(id, "peekElement", mainWindow);
            }
            element.appendChild(webampElement);
          }
        };

        const subscriptions = [
          webamp.onWillClose((cancel) => {
            cancel();
            const mainWindow =
              getWebampElement()?.querySelector<HTMLDivElement>(MAIN_WINDOW);
            const { x = 0, y = 0 } = mainWindow?.getBoundingClientRect() || {};

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
          if (options?.initialTracks) {
            webamp.play();
          }
        });

        setWebampCI(webamp);
      };

      if (file && url) {
        if (extname(url) === ".mp3") {
          parseTrack(file, basename(url)).then((track) =>
            runWebamp({ initialTracks: [track] }),
          );
        } else runWebamp({ initialSkin: { url: bufferToUrl(file) } });
      } else runWebamp();
    }
  };

  return { loadWebamp, webampCI };
};

export default useWebamp;
