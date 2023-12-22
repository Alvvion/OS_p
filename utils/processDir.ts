import dynamic from "next/dynamic";

import type { Processes } from "@/types/contexts/process";

const STARTUP_PROCESSES: string[] = ["HelloWorld"];

export const processDir: Processes = {
  HelloWorld: {
    Component: dynamic(() => import("@/components/apps/HelloWorld")),
    hasWindow: true,
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
