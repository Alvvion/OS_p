import dynamic from "next/dynamic";

import type { Processes } from "./types";

export const processDir: Processes = {
  FileExplorer: {
    Component: dynamic(() => import("@/components/apps/FileExplorer")),
    icon: "/assets/win-file-explorer.ico",
    hasWindow: true,
    title: "File Explorer",
    backgroundColor: "#191919",
    titlebarStyle: "File Explorer",
  },
  JSDOS: {
    autoSizing: true,
    backgroundColor: "#000",
    Component: dynamic(() => import("@/components/apps/JSDOS")),
    hasWindow: true,
    icon: "/assets/jsdos.png",
    title: "JSDOS",
    lockAspectRatio: true,
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
