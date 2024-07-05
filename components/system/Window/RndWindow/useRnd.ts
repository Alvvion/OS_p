import type { DraggableEventHandler } from "react-draggable";
import type { RndResizeCallback } from "react-rnd";

import { useProcesses } from "@/context/Process";
import { rndDefaults } from "@/utils/constants";

import type { RndHook } from "./types";
import useStatePosition from "./useStatePosition";
import useStateSize from "./useStateSize";

const useRnd = (id: string, maximized = false): RndHook => {
  const {
    processes: { [id]: { autoSizing = false, lockAspectRatio = false } = {} },
  } = useProcesses();

  const [size, setSize] = useStateSize(id, autoSizing);
  const [position, setPosition] = useStatePosition(id, size);

  const onDragStop: DraggableEventHandler = (
    _event,
    { x: positionX, y: positionY },
  ) => setPosition({ x: positionX, y: positionY });

  const onResizeStop: RndResizeCallback = (
    _event,
    _direction,
    { style: { height: elementHeight, width: elementWidth } },
    _delta,
    { x: positionX, y: positionY },
  ) => {
    setSize({ height: elementHeight, width: elementWidth });
    setPosition({ x: positionX, y: positionY });
  };

  return {
    disableDragging: maximized,
    enableResizing:
      !maximized && (!autoSizing || (autoSizing && lockAspectRatio)),
    lockAspectRatio,
    onDragStop,
    onResizeStop,
    position,
    size,
    ...rndDefaults,
  };
};

export default useRnd;
