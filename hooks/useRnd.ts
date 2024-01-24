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
    height: maximized
      ? `${window.innerWidth - parseInt(sizes.taskbar.height, 10)}px`
      : height,
    updatePosition,
    updateSize,
    width: maximized ? window.innerWidth : width,
    x: maximized ? 0 : x,
    y: maximized ? 0 : y,
  };
};

export default useRnd;
