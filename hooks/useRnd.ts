import { useCallback, useState } from "react";
import type { RndDragCallback, RndResizeCallback } from "react-rnd";
import { useTheme } from "styled-components";

import type { Position, Size } from "@/types/components/system/Window";
import {
  defaultWindowPosition,
  defaultWindowSize,
} from "@/utils/intialContextStates";

const useRnd = (maximized = false) => {
  const { sizes } = useTheme();
  const [{ x, y }, setPosition] = useState<Position>(defaultWindowPosition);
  const [{ height, width }, setSize] = useState<Size>(defaultWindowSize);

  const updatePosition = useCallback<RndDragCallback>(
    (_event, { x: positionX, y: positionY }) =>
      setPosition({ x: positionX, y: positionY }),
    []
  );

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
    height: maximized ? `calc(100% - ${sizes.taskbar.height})` : height,
    updatePosition,
    updateSize,
    width: maximized ? "100%" : width,
    x,
    y,
  };
};

export default useRnd;
