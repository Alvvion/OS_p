import { useEffect, useRef } from "react";

import { centerPosition } from "@/components/system/Window/RndWindow/functions";
import { useProcesses } from "@/context/Process";
import { useSession } from "@/context/Session";
import { useTheme } from "@/context/Theme";
import type { ComponentProps } from "@/types/common";
import { loadFiles } from "@/utils/functions";

import {
  closeEqualizer,
  getWebampElement,
  updateWindowPositions,
} from "./functions";
import type { WebampCI } from "./types";

const Webamp: React.FC<ComponentProps> = ({ id }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const {
    closeProcess,
    minimize,
    processes: { [id]: { minimized = false } = {} } = {},
  } = useProcesses();
  const { setWindowStates, windowStates: { [id]: windowState } = {} } =
    useSession();
  const { position: { x: previousX = -1, y: previousY = -1 } = {} } =
    windowState || {};
  const {
    currentTheme: {
      sizes: {
        taskbar: { height: taskbarHeight },
      },
    },
  } = useTheme();

  useEffect(() => {
    if (containerRef?.current) {
      loadFiles(["/libs/webamp/webamp.bundle.min.js"]).then(() => {
        const webamp: WebampCI = new window.Webamp({ zIndex: 2 });

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
        });
        webamp.onMinimize(() => minimize(id));
        webamp
          .renderWhenReady(containerRef?.current as HTMLDivElement)
          .then(() => {
            if (containerRef?.current) {
              if (containerRef?.current) {
                closeEqualizer(webamp);
                if (previousX === -1) {
                  const webampSize = [
                    ...getWebampElement().getElementsByClassName("window"),
                  ].reduce(
                    (acc, element) => {
                      const { height, width } = element.getBoundingClientRect();

                      return {
                        height: acc.height + height,
                        width,
                      };
                    },
                    { height: 0, width: 0 }
                  );
                  const { x: centerX, y: centerY } = centerPosition(
                    webampSize,
                    taskbarHeight
                  );

                  updateWindowPositions(webamp, centerX, centerY);
                } else {
                  updateWindowPositions(webamp, previousX, previousY);
                }

                containerRef?.current?.appendChild(getWebampElement());
              }
            }
          });
      });
    }
  }, [
    closeProcess,
    containerRef,
    id,
    minimize,
    previousX,
    previousY,
    setWindowStates,
    taskbarHeight,
  ]);

  useEffect(() => {
    const webamp = getWebampElement();

    if (webamp) {
      webamp.style.display = minimized ? "none" : "block";
    }
  }, [minimized]);

  return <div ref={containerRef} />;
};

export default Webamp;
