import { useProcesses } from "@/context/Process";
import { processDir } from "@/context/Process/directory";
import { createPid } from "@/context/Process/functions";
import { useSession } from "@/context/Session";

import type { UseFile } from "./types";

const useFile = (url: string): UseFile => {
  const { openProcess, processes, minimize } = useProcesses();
  const { setForegroundId } = useSession();

  return (pid: string, icon?: string): void => {
    const id = createPid(pid, url);
    const { [id]: process } = processes;
    if (process) {
      if (process.minimized) minimize(id);
      setForegroundId(id);
    } else {
      const { singleton, icon: processIcon } = processDir[pid] || {};
      openProcess(pid, url, singleton ? processIcon : icon);
    }
  };
};

export default useFile;
