import { useCallback, useState } from "react";
import type { RndResizeCallback } from "react-rnd";

import type { Size } from "@/types/components/system/Window";
import { defaultWindowSize } from "@/utils/intialContextStates";

const useResizeable = (maximized = false) => {
  const [{ height, width }, setSize] = useState<Size>(defaultWindowSize);
  const updateSize = useCallback<RndResizeCallback>(
    (
      _event,
      _direction,
      { style: { height: elementHeight, width: elementWidth } }
    ) => setSize({ height: elementHeight, width: elementWidth }),
    []
  );

  return {
    height: maximized ? "100%" : height,
    width: maximized ? "100%" : width,
    updateSize,
  };
};

export default useResizeable;
