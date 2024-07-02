import type { Position, Size } from "@/components/common/types";
import type { ProcessContextType, Processes } from "@/context/Process/types";
import type { WindowState } from "@/context/Session/types";
import {
  DEFAULT_WINDOW_TRANSITION_DURATION,
  PROCESS_DELIMITER,
} from "@/utils/constants";
import { pxToNumber } from "@/utils/functions";

export const reRouteFoucs =
  (focusElement: HTMLElement) =>
  (element?: Element): void => {
    element?.setAttribute("tabindex", "-1");
    element?.addEventListener("contextmenu", (event) => event.preventDefault());
    element?.addEventListener("mousedown", (event) => {
      event.preventDefault();
      focusElement?.focus();
    });
  };

export const centerPosition = (
  size: Size,
  taskbarHeight: string,
): Position => ({
  x: Math.floor((window.innerWidth - pxToNumber(size.width)) / 2),
  y: Math.floor(
    (window.innerHeight - pxToNumber(taskbarHeight) - pxToNumber(size.height)) /
      2,
  ),
});

export const closeWithTransition = (
  close: ProcessContextType["closeProcess"],
  id: string,
) => {
  close(id, true);
  setTimeout(() => close(id), DEFAULT_WINDOW_TRANSITION_DURATION);
};

export const cascadePosition = (
  id: string,
  processes: Processes,
  stackOrder: string[],
  offset = 0,
): Position | undefined => {
  const [pid] = id.split(PROCESS_DELIMITER);
  const processPid = `${pid}${PROCESS_DELIMITER}`;
  const parentPositionProcess =
    stackOrder.find((stackPid) => stackPid.startsWith(processPid)) || "";

  const { componentWindow } = processes?.[parentPositionProcess] || {};

  const { x = 0, y = 0 } = componentWindow?.getBoundingClientRect() || {};

  return x || y ? { x: x + offset, y: y + offset } : undefined;
};

export const isRectOutsideWindow = (
  windowState: WindowState,
  bounds: Position,
): boolean => {
  const { position, size } = windowState || {};
  const { x = 0, y = 0 } = position || {};
  const { height = 0, width = 0 } = size || {};

  return (
    x < 0 ||
    y < 0 ||
    x + pxToNumber(width) > bounds.x ||
    y + pxToNumber(height) > bounds.y
  );
};
