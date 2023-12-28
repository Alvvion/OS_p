import dynamic from "next/dynamic";

import Taskbar from "@/components/system/Taskbar";
import type { Processes } from "@/types/contexts/process";

const STARTUP_PROCESSES: string[] = ["Taskbar"];

export const processDir: Processes = {
  HelloWorld: {
    Component: dynamic(() => import("@/components/apps/HelloWorld")),
    hasWindow: true,
  },
  Taskbar: {
    Component: Taskbar,
    hasWindow: false,
  },
};

export const getStartupProcess = (): Processes =>
  STARTUP_PROCESSES.reduce(
    (acc, id) => ({
      ...acc,
      [id]: processDir[id],
    }),
    {}
  );
