import { toPng } from "html-to-image";
import { useCallback, useEffect, useRef, useState } from "react";

import { Button } from "@/components/common";
import { useProcesses } from "@/context/Process";
import useWindowActions from "@/hooks/useWindowActions";

import { CloseIcon } from "../../Window/Titlebar/Icons";

type WindowPeak = {
  PeakComponent?: React.ComponentType;
  peakEvents: {
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
  };
};

const useWindowPeak = (id: string): WindowPeak => {
  const {
    processes: {
      [id]: { componentWindow = undefined, minimized = false, title = "" } = {},
    },
  } = useProcesses();
  const mouseTimer = useRef<NodeJS.Timeout | null>(null);
  const previewTimer = useRef<NodeJS.Timeout | null>(null);
  const [showPeak, setShowPeak] = useState(false);
  const [previewSrc, setPreviewSrc] = useState("");
  const { onClose } = useWindowActions(id);
  const PeakWindow = (): JSX.Element => (
    <div>
      <img alt={title} src={previewSrc} />
      <Button onClick={onClose} title="Close">
        <CloseIcon />
      </Button>
    </div>
  );
  const onMouseEnter = () => {
    if (componentWindow) {
      const renderFrame = () =>
        toPng(componentWindow).then((dataUrl) => {
          const previewImage = new Image();

          previewImage.src = dataUrl;
          previewImage.onload = () => setPreviewSrc(dataUrl);
        });

      mouseTimer.current = setTimeout(() => {
        renderFrame();
        setShowPeak(true);
        previewTimer.current = setInterval(renderFrame, 1000);
      }, 250);
    }
  };
  const onMouseLeave = useCallback(() => {
    if (mouseTimer?.current) clearTimeout(mouseTimer.current);
    if (previewTimer?.current) clearInterval(previewTimer.current);

    setShowPeak(false);
    setPreviewSrc("");
  }, []);

  useEffect(() => {
    if (minimized) {
      setShowPeak(false);
      setPreviewSrc("");
    }
  }, [minimized]);

  useEffect(() => onMouseLeave, [onMouseLeave]);

  return {
    PeakComponent: showPeak && previewSrc ? PeakWindow : undefined,
    peakEvents: minimized
      ? {}
      : {
          onMouseEnter,
          onMouseLeave,
        },
  };
};

export default useWindowPeak;
