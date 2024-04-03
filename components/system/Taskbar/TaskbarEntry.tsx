import { useCallback } from "react";

import { useProcesses } from "@/contexts/process";
import useWindowActions from "@/hooks/useWindowActions";
import type { TaskbarEntyType } from "@/types/components/system/Taskbar";

import TaskbarButtons from "./TaskbarButtons";

const TaskbarEntry: React.FC<TaskbarEntyType> = ({
  src,
  width,
  height,
  name,
  bottomnotch,
  processes,
  pid,
}) => {
  const { onMinimize } = useWindowActions(pid);
  const { openProcess } = useProcesses();

  const onButtonClick = useCallback(
    (id: string) => {
      if (Object.keys(processes).includes(id)) return onMinimize;

      return () => openProcess(id, undefined);
    },
    [onMinimize, openProcess, processes]
  );
  return (
    <TaskbarButtons
      src={src}
      width={width}
      height={height}
      name={name}
      bottomnotch={bottomnotch}
      onClick={onButtonClick(pid)}
    />
  );
};

export default TaskbarEntry;
