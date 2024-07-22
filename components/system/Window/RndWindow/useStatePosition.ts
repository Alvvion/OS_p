import { useEffect, useState } from "react";

import type { Position, Size } from "@/components/common/types";
import { useProcesses } from "@/context/Process";
import { useSession } from "@/context/Session";
import { useTheme } from "@/context/Theme";
import { pxToNumber } from "@/utils/functions";

import {
  cascadePosition,
  centerPosition,
  isRectOutsideWindow,
} from "./functions";
import type { StatePosition } from "./types";

const useStatePosition = (id: string, size: Size): StatePosition => {
  const {
    sizes: {
      taskbar: { height: taskbarHeight },
      window: { cascadeOffset },
    },
  } = useTheme();

  const {
    windowStates: { [id]: windowState },
    stackOrder,
  } = useSession();
  const { position: sessionPosition, size: sessionSize } = windowState || {};
  const isOffscreen = isRectOutsideWindow(windowState, {
    x: window.screen.width,
    y: window.screen.height - pxToNumber(taskbarHeight),
  });

  const { processes } = useProcesses();
  const { autoSizing, closing } = processes[id] || {};

  const [{ x, y }, setPosition] = useState<Position>(
    (!isOffscreen && sessionPosition) ||
      cascadePosition(id, processes, stackOrder, cascadeOffset) ||
      centerPosition(size, taskbarHeight),
  );

  useEffect(() => {
    if (autoSizing && !closing && sessionSize && !sessionPosition) {
      setPosition(centerPosition(sessionSize, taskbarHeight));
    }
  }, [autoSizing, closing, sessionPosition, sessionSize, taskbarHeight]);

  return [{ x, y }, setPosition];
};

export default useStatePosition;
