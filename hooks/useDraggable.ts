import { useCallback, useState } from "react";
import type { RndDragCallback } from "react-rnd";

import type { Position } from "@/types/components/system/Window";
import { defaultWindowPosition } from "@/utils/intialContextStates";

const useDraggable = (maximized = false) => {
  const [{ x, y }, setPosition] = useState<Position>(defaultWindowPosition);

  const updatePosition = useCallback<RndDragCallback>(
    (_event, { x: elementX, y: elementY }) =>
      setPosition({ x: elementX, y: elementY }),
    []
  );

  return { x: maximized ? 0 : x, y: maximized ? 0 : y, updatePosition };
};

export default useDraggable;
