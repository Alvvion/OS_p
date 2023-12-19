import dynamic from "next/dynamic";

import type { Processes } from "@/types/contexts/process";

const processDir: Processes = {
  HelloWorld: {
    Component: dynamic(() => import("@/components/HelloWorld")),
  },
};

export default processDir;
