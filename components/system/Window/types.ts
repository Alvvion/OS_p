import type { ChildrenProp } from "@/types/common";

export type ComponentProps = {
  id: string;
};

export type WindowComponentProps = ComponentProps & {
  titlebarStyle: "File Explorer" | "Default";
  children: React.ReactNode;
};

export type Focusable = {
  zIndex: number;
  tabIndex: number;
  onBlur: (event: React.FocusEvent<HTMLElement>) => void;
  onFocus: (event: React.FocusEvent<HTMLElement>) => void;
};

export type RndWindowProps = ChildrenProp & {
  maximized?: boolean;
  id: string;
  style: React.CSSProperties;
};
