import type { IconType } from "react-icons";

export type HoverState = {
  leftArrow: boolean;
  rightArrow: boolean;
  upArrow: boolean;
  refresh: boolean;
};

export type ButtonOnNavType = {
  Component: IconType;
  iconHover: keyof HoverState;
  size?: number;
};
