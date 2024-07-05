import { useProcesses } from "@/context/Process";
import { createPid } from "@/context/Process/functions";
import { useSession } from "@/context/Session";

import type { UseFile } from "./types";

const useFile = (url: string): UseFile => {
  const { openProcess, processes, minimize } = useProcesses();
  const { setForegroundId } = useSession();

  return (pid: string): void => {
    const id = createPid(pid, url);
    if (processes[id]) {
      if (processes[id].minimized) minimize(id);
      setForegroundId(id);
    } else {
      openProcess(pid, url);
    }
  };
};

export default useFile;
