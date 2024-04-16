import { stripUnit } from "polished";
import { useCallback, useEffect, useState } from "react";
import type { RndDragCallback, RndResizeCallback } from "react-rnd";
import { useTheme } from "styled-components";

import {
  defaultWindowPosition,
  defaultWindowSize,
} from "@/contexts/intialContextStates";
import { useProcesses } from "@/contexts/process";
import { useSession } from "@/contexts/session";
import type { Position, Size } from "@/types/components/system/Window";

const useRnd = (id: string, maximized = false) => {
  const { windowStates: { [id]: windowState } = {} } = useSession();

  const {
    processes: {
      [id]: { autoSizing },
    },
  } = useProcesses();

  const { position: prevPos, size: prevSize } = windowState || {};
  const { sizes } = useTheme();
  const [{ x, y }, setPosition] = useState<Position>(
    prevPos || defaultWindowPosition
  );
  const [{ height, width }, setSize] = useState<Size>(
    prevSize || defaultWindowSize
  );

  const updatePosition = useCallback<RndDragCallback>(
    (_event, { x: positionX, y: positionY }) =>
      setPosition({ x: positionX, y: positionY }),
    []
  );

  useEffect(() => {
    if (autoSizing) {
      setSize(prevSize || defaultWindowSize);
    }
  }, [prevSize, autoSizing]);

  const updateSize = useCallback<RndResizeCallback>(
    (
      _event,
      _direction,
      { style: { height: elementHeight, width: elementWidth } },
      _delta,
      { x: positionX, y: positionY }
    ) => {
      setSize({ height: elementHeight, width: elementWidth });
      setPosition({ x: positionX, y: positionY });
    },
    []
  );

  return {
    height: maximized
      ? `${window.innerWidth - Number(stripUnit(sizes.taskbar.height))}px`
      : height,
    updatePosition,
    updateSize,
    width: maximized ? window.innerWidth : width,
    x: maximized ? 0 : x,
    y: maximized ? 0 : y,
    autoSizing,
  };
};

export default useRnd;
