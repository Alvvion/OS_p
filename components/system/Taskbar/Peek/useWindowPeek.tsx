import { useCallback, useEffect, useRef, useState } from "react";

import { useProcesses } from "@/context/Process";
import { ONE_TIME_PASSIVE_EVENT } from "@/utils/constants";

import PeekWindow from "./PeekWindow";
import type { WindowPeek } from "./types";

const useWindowPeek = (id: string): WindowPeek => {
  const {
    processes: { [id]: process },
  } = useProcesses();

  const { componentWindow, maximized, minimized, peekElement } = process || {};

  const mouseTimer = useRef<NodeJS.Timeout | null>(null);
  const previewTimer = useRef<NodeJS.Timeout | null>(null);
  const [showPeek, setShowPeek] = useState(false);
  const [previewSrc, setPreviewSrc] = useState("");

  const renderFrame = (): void => {
    const previewElement = peekElement || componentWindow;

    if (!mouseTimer.current && !previewTimer.current && previewElement) {
      import("html-to-image").then(({ toPng }) =>
        toPng(previewElement).then((dataUrl) => {
          const previewImage = new Image();

          previewImage.src = dataUrl;
          previewImage.addEventListener(
            "load",
            () => setPreviewSrc(dataUrl),
            ONE_TIME_PASSIVE_EVENT
          );
        })
      );
    }
  };

  const onMouseEnter = () => {
    mouseTimer.current = setTimeout(() => {
      renderFrame();
      setShowPeek(true);
      previewTimer.current = setInterval(renderFrame, 1000);
    }, 500);
  };
  const onMouseLeave = useCallback(() => {
    if (mouseTimer?.current) clearTimeout(mouseTimer.current);
    if (previewTimer?.current) clearInterval(previewTimer.current);

    setShowPeek(false);
    setPreviewSrc("");
  }, []);

  useEffect(() => {
    if (minimized || maximized) onMouseLeave();
  }, [maximized, minimized, onMouseLeave]);

  useEffect(() => onMouseLeave, [onMouseLeave]);

  return {
    PeekComponent:
      showPeek && previewSrc
        ? () => <PeekWindow id={id} image={previewSrc} />
        : undefined,
    // PeekComponent: PeekWindow,
    peekEvents:
      minimized || maximized
        ? {}
        : {
            onMouseEnter,
            onMouseLeave,
          },
  };
};

export default useWindowPeek;
