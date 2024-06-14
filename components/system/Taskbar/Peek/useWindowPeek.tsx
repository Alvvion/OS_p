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
    <div
      className="absolute z-50 w-40 bottom-14 -left-1/2 bg-[#292929] rounded-lg"
      //   style={{ bottom: height }}
    >
      <div className="flex justify-between items-center mx-2">
        <h1 className="text-white">{title}</h1>
        <Button extraStyles="h-8" onClick={onClose} title="Close">
          <CloseIcon extraStyles="fill-white w-3" />
        </Button>
      </div>
      <img className="w-full p-2 pt-0" alt={title} src={previewSrc} />
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
    // PeakComponent: PeakWindow,
    peakEvents: minimized
      ? {}
      : {
          onMouseEnter,
          onMouseLeave,
        },
  };
};

export default useWindowPeak;
