import { parseBuffer } from "music-metadata-browser";
import { useState } from "react";

import { useSession } from "@/context/Session";
import { useTheme } from "@/context/Theme";
import useWindowActions from "@/hooks/useWindowActions";
import { bufferToUrl, cleanUpBufferUrl } from "@/utils/functions";

import {
  closeEqualizer,
  getWebampElement,
  updateWebampPostion,
} from "./functions";
import type { WebampCI, WebampOptions } from "./types";

const useWebamp = (id: string) => {
  const { onClose, onMinimize } = useWindowActions(id);

  const {
    setWindowStates,
    stackOrder,
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

  const loadWebamp = async (
    element: HTMLDivElement | null,
    fileName: string,
    file?: Buffer
  ): Promise<void> => {
    if (element && window.Webamp && !webampCI) {
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
        zIndex: stackOrder.length + 1,
      };

      if (file && fileName) {
        const { common: { artist = "", title = fileName } = {} } =
          (await parseBuffer(file)) || {};

        options.initialTracks = [
          { metaData: { title, artist }, url: bufferToUrl(file) },
        ];
      }

      const webamp: WebampCI = new window.Webamp(options);

      webamp.onWillClose(() => {
        const [main] = getWebampElement().getElementsByClassName("window");
        const { x, y } = main.getBoundingClientRect();

        onClose();
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

      webamp.onMinimize(() => onMinimize());

      webamp.renderWhenReady(element).then(() => {
        closeEqualizer(webamp);

        updateWebampPostion(webamp, taskbarHeight, position);

        element?.appendChild(getWebampElement());
      });

      setWebampCI(webamp);
    }
  };

  return { loadWebamp, webampCI };
};

export default useWebamp;
