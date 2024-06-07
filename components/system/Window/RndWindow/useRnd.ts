import type { DraggableEventHandler } from "react-draggable";
import type { RndResizeCallback } from "react-rnd";

import { useProcesses } from "@/context/Process";
import { useSession } from "@/context/Session";
import { useTheme } from "@/context/Theme";
import { rndDefaults } from "@/utils/constants";

import { centerPosition } from "./functions";
import useStatePosition from "./useStatePosition";
import useStateSize from "./useStateSize";

const useRnd = (id: string, maximized = false) => {
  const {
    processes: { [id]: { autoSizing = false, lockAspectRatio = false } = {} },
  } = useProcesses();

  const { windowStates: { [id]: windowState } = {} } = useSession();

  const { position: statePosition, size: stateSize } = windowState || {};
  const {
    currentTheme: {
      sizes: {
        taskbar: { height: taskbarHeight },
      },
    },
  } = useTheme();

  const [size, setSize] = useStateSize(autoSizing, stateSize);
  const [position, setPosition] = useStatePosition(
    statePosition || centerPosition(size, taskbarHeight)
  );

  const onDragStop: DraggableEventHandler = (
    _event,
    { x: positionX, y: positionY }
  ) => setPosition({ x: positionX, y: positionY });

  const onResizeStop: RndResizeCallback = (
    _event,
    _direction,
    { style: { height: elementHeight, width: elementWidth } },
    _delta,
    { x: positionX, y: positionY }
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
