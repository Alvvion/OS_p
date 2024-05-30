import { stripUnit } from "polished";

import type { ProcessContextType } from "@/context/Process/types";
import type { Position, Size } from "@/types/common";
import { DEFAULT_WINDOW_TRANSITION_DURATION } from "@/utils/constants";

export const reRouteFoucs =
  (focusElement: HTMLElement) =>
  (element?: Element): void => {
    element?.setAttribute("tabindex", "-1");
    element?.addEventListener("mousedown", (event) => {
      event.preventDefault();
      focusElement?.focus();
    });
  };

export const centerPosition = (
  size: Size,
  taskbarHeight: string
): Position => ({
  x: Math.floor((window.innerWidth - Number(stripUnit(size.width))) / 2),
  y: Math.floor(
    (window.innerHeight -
      Number(stripUnit(taskbarHeight)) -
      Number(stripUnit(size.width))) /
      2
  ),
});

export const closeWithTransition = (
  close: ProcessContextType["closeProcess"],
  id: string
) => {
  close(id, true);
  setTimeout(() => close(id), DEFAULT_WINDOW_TRANSITION_DURATION);
};
