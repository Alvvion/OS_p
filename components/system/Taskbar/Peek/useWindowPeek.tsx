import { useCallback, useEffect, useRef, useState } from "react";

import { useProcesses } from "@/context/Process";
import { ONE_TIME_PASSIVE_EVENT } from "@/utils/constants";

import PeekWindow from "./PeekWindow";
import type { WindowPeek } from "./types";

const renderFrame = (
  previewElement: HTMLElement,
  callback: (url: string) => void
): void => {
  import("html-to-image").then(({ toPng }) =>
    toPng(previewElement).then((dataUrl) => {
      const previewImage = new Image();

      previewImage.src = dataUrl;
      previewImage.addEventListener(
        "load",
        () => callback(dataUrl),
        ONE_TIME_PASSIVE_EVENT
      );
    })
  );
};

const useWindowPeek = (id: string): WindowPeek => {
  const {
    processes: { [id]: process },
  } = useProcesses();
  const { componentWindow, minimized, peekElement } = process || {};
  const mouseTimer = useRef<NodeJS.Timeout>();
  const previewTimer = useRef<NodeJS.Timeout>();
  const [showPeek, setShowPeek] = useState(false);
  const [previewSrc, setPreviewSrc] = useState("");
  const onMouseEnter = () => {
    const previewElement = peekElement || componentWindow;

    if (!mouseTimer.current && !previewTimer.current && previewElement) {
      const render = () => renderFrame(previewElement, setPreviewSrc);

      mouseTimer.current = setTimeout(() => {
        render();
        setShowPeek(true);
        previewTimer.current = setInterval(render, 1000);
      }, 500);
    }
  };
  const onMouseLeave = useCallback(() => {
    if (mouseTimer?.current) clearTimeout(mouseTimer.current);
    if (previewTimer?.current) clearInterval(previewTimer.current);

    mouseTimer.current = undefined;
    previewTimer.current = undefined;

    setShowPeek(false);
    setPreviewSrc("");
  }, []);

  useEffect(() => {
    if (minimized) {
      setShowPeek(false);
      setPreviewSrc("");
    }
  }, [minimized]);

  useEffect(() => onMouseLeave, [onMouseLeave]);

  return {
    PeekComponent:
      showPeek && previewSrc
        ? () => <PeekWindow id={id} image={previewSrc} />
        : undefined,
    peekEvents: minimized
      ? {}
      : {
          onMouseEnter,
          onMouseLeave,
        },
  };
};

export default useWindowPeek;
