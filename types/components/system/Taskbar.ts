import type { ComponentPropsWithoutRef } from "react";

import type { Processes } from "@/types/contexts/process";

export interface TaskbarButtonType extends ComponentPropsWithoutRef<"button"> {
  src: string;
  width: number;
  height: number;
  name: string;
  bottomnotch?: string;
}

export interface TaskbarEntyType extends TaskbarButtonType {
  pid: string;
  processes: Processes | Record<string, never>;
}
