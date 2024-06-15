import { useProcesses } from "@/context/Process";
import { createPid } from "@/context/Process/functions";
import { useSession } from "@/context/Session";

const useFile = (url: string) => {
  const { openProcess, processes, minimize } = useProcesses();
  const { setForegroundId } = useSession();

  const openFile = (pid: string) => {
    const id = createPid(pid, url);
    if (processes[id]) {
      if (processes[id].minimized) minimize(id);
      setForegroundId(id);
    } else {
      openProcess(pid, url);
    }
  };

  return openFile;
};

export default useFile;
