import type { ComponentPropsWithoutRef } from "react";

// export type TaskbarButtonType = {
//   src: string;
//   width: number;
//   height: number;
//   name: string;
// };

export interface TaskbarButtonType extends ComponentPropsWithoutRef<"button"> {
  src: string;
  width: number;
  height: number;
  name: string;
  bottomnotch?: string;
}
