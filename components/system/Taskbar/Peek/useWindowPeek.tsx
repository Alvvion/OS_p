import { useCallback, useEffect, useRef, useState } from "react";

import { useProcesses } from "@/context/Process";

import PeekWindow from "./PeekWindow";
import type { WindowPeek } from "./types";

const useWindowPeek = (id: string): WindowPeek => {
  const {
    processes: { [id]: process },
  } = useProcesses();

  const { componentWindow, minimized, peekElement } = process || {};

  const mouseTimer = useRef<NodeJS.Timeout | null>(null);
  const previewTimer = useRef<NodeJS.Timeout | null>(null);
  const [showPeek, setShowPeek] = useState(false);
  const [previewSrc, setPreviewSrc] = useState("");

  const onMouseEnter = () => {
    const renderFrame = () => {
      const previewElement = peekElement || componentWindow;

      if (previewElement) {
        import("html-to-image").then(({ toPng }) =>
          toPng(previewElement).then((dataUrl) => {
            const previewImage = new Image();

            previewImage.src = dataUrl;
            previewImage.onload = () => setPreviewSrc(dataUrl);
          })
        );
      }
    };

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
    // PeekComponent: PeekWindow,
    peekEvents: minimized
      ? {}
      : {
          onMouseEnter,
          onMouseLeave,
        },
  };
};

export default useWindowPeek;
