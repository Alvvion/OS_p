import type { ComponentPropsWithRef } from "react";

export interface TaskbarButtonType extends ComponentPropsWithRef<"button"> {
  src: string;
  width: number;
  height: number;
  name: string;
  bottomnotch?: string;
}

export interface TaskbarEntyType extends TaskbarButtonType {
  pid: string;
  isPinned: boolean;
}
