import { useCallback } from "react";

import { useProcesses } from "@/context/Process";
import { createPid } from "@/context/Process/functions";
import { useSession } from "@/context/Session";

const useFile = (url: string, pid: string) => {
  const { openProcess, processes, minimize } = useProcesses();
  const { setForegroundId } = useSession();
  const openFile = useCallback(() => {
    const id = createPid(pid, url);
    if (processes[id]) {
      if (processes[id].minimized) minimize(id);
      setForegroundId(id);
    } else {
      openProcess(pid, url);
    }
  }, [minimize, openProcess, pid, processes, setForegroundId, url]);

  return { openFile };
};

export default useFile;
