import dynamic from "next/dynamic";

import type { Processes } from "@/types/contexts/process";

export const processDir: Processes = {
  HelloWorld: {
    Component: dynamic(() => import("@/components/apps/HelloWorld")),
    icon: "/assets/win-file-explorer.ico",
    hasWindow: true,
    title: "Hello World",
    autoSizing: true,
  },
  HelloAnotherWorld: {
    Component: dynamic(() => import("@/components/apps/HelloAnotherWorld")),
    icon: "/assets/win-file-explorer.ico",
    hasWindow: true,
    title: "Hello Another World",
  },
  V86: {
    Component: dynamic(() => import("@/components/apps/V86")),
    hasWindow: true,
    icon: "/assets/V86.ico",
    title: "V86",
    autoSizing: true,
    backgroundColor: "#000",
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