import { stripUnit } from "polished";

import type { Position, Size } from "@/types/common";

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
  x: (window.innerWidth - Number(stripUnit(size.width))) / 2,
  y:
    (window.innerHeight -
      Number(stripUnit(taskbarHeight)) -
      Number(stripUnit(size.width))) /
    2,
});
