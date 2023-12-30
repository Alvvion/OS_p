import dynamic from "next/dynamic";

import type { Processes } from "@/types/contexts/process";

export const processDir: Processes = {
  HelloWorld: {
    Component: dynamic(() => import("@/components/apps/HelloWorld")),
    icon: "/assets/portfolio.png",
    hasWindow: true,
    isPinned: true,
  },
  HelloAnotherWorld: {
    Component: dynamic(() => import("@/components/apps/HelloAnotherWorld")),
    icon: "/assets/win-file-explorer.ico",
    hasWindow: true,
  },
};

export const getProcess = (processes: string[]): Processes =>
  processes.reduce(
    (acc, id) => ({
      ...acc,
      [id]: processDir[id],
    }),
    {}
  );

export const STARTUP_PROCESSES: string[] = [];
export const PINNED_PROCESSES: string[] = ["HelloWorld", ...STARTUP_PROCESSES];
