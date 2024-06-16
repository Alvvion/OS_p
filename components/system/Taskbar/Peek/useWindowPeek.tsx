import { toPng } from "html-to-image";
import { useCallback, useEffect, useRef, useState } from "react";

import { Button, Icon } from "@/components/common";
import { CloseIcon } from "@/components/common/Icons";
import { useProcesses } from "@/context/Process";
import { useTheme } from "@/context/Theme";
import useWindowActions from "@/hooks/useWindowActions";

import type { WindowPeek } from "./types";

const _tailwind = [
  "active:bg-titlebar-closeActive",
  "hover:bg-titlebar-closeHover",
];

const useWindowPeek = (id: string): WindowPeek => {
  const {
    processes: {
      [id]: {
        componentWindow = undefined,
        minimized = false,
        title = "",
        icon = "",
      } = {},
    },
  } = useProcesses();

  const {
    currentTheme: {
      colors: {
        titlebar: { closeActive, closeHover, text },
      },
      sizes: {
        titlebar: { buttonIconWidth, iconMargin, fontSize },
      },
    },
  } = useTheme();

  const mouseTimer = useRef<NodeJS.Timeout | null>(null);
  const previewTimer = useRef<NodeJS.Timeout | null>(null);
  const [showPeek, setShowPeek] = useState(false);
  const [previewSrc, setPreviewSrc] = useState("");
  const { onClose } = useWindowActions(id);
  const PeekWindow = (): JSX.Element => (
    <div
      className="absolute z-50 w-40 bottom-11 -left-1/2 bg-[#292929] rounded-lg"
      //   style={{ bottom: height }}
    >
      <div className="flex justify-between items-center mx-2">
        <figure className="flex items-center h-full">
          <Icon
            src={icon}
            alt={title}
            style={{
              width: buttonIconWidth,
              height: buttonIconWidth,
              margin: iconMargin,
            }}
          />
          <figcaption style={{ fontSize, color: text }} className="font-normal">
            {title}
          </figcaption>
        </figure>
        <Button
          extraStyles={`hover:${closeHover} active:${closeActive} my-1 p-2 rounded-md`}
          onClick={onClose}
          title="Close"
        >
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
        setShowPeek(true);
        previewTimer.current = setInterval(renderFrame, 1000);
      }, 500);
    }
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
    PeekComponent: showPeek && previewSrc ? PeekWindow : undefined,
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
