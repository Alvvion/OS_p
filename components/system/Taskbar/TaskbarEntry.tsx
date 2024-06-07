import { useCallback } from "react";

import { useProcesses } from "@/context/Process";
import { useSession } from "@/context/Session";
import useNextFocusable from "@/hooks/useNextFocusable";

import TaskbarButtons from "./TaskbarButtons";
import type { TaskbarEntryProps } from "./types";

const TaskbarEntry: React.FC<TaskbarEntryProps> = ({
  src,
  width,
  height,
  name,
  pid,
}) => {
  const {
    minimize,
    processes: { [pid]: { minimized = false } = {} },
    linkElement,
  } = useProcesses();
  const { foregroundId, setForegroundId } = useSession();
  const nextFocusableId = useNextFocusable(pid);
  const isForeground = foregroundId === pid;

  const isBottomNotch = () => {
    if (minimized || !isForeground) {
      return true;
    }
    return false;
  };

  const onClick = () => {
    if (minimized || isForeground) minimize(pid);
    setForegroundId(isForeground ? nextFocusableId : pid);
  };

  const linkTaskbarEntry = useCallback(
    (taskbarEntry: HTMLButtonElement | null) => {
      if (taskbarEntry instanceof HTMLElement)
        linkElement(pid, "taskbarEntry", taskbarEntry);
    },
    [pid, linkElement]
  );

  return (
    <TaskbarButtons
      src={src}
      width={width}
      height={height}
      name={name}
      reqBottomNotch
      bottomnotch={isBottomNotch()}
      onClick={onClick}
      reference={linkTaskbarEntry}
    />
  );
};

export default TaskbarEntry;
