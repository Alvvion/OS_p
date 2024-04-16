import { useCallback, useMemo } from "react";

import { useProcesses } from "@/contexts/process";
import { useSession } from "@/contexts/session";
import useNextFocusable from "@/hooks/useNextFocusable";
import type { TaskbarEntyType } from "@/types/components/system/Taskbar";

import TaskbarButtons from "./TaskbarButtons";

const TaskbarEntry: React.FC<TaskbarEntyType> = ({
  src,
  width,
  height,
  name,
  pid,
  isPinned,
}) => {
  const {
    openProcess,
    minimize,
    processes: {
      [pid]: { minimized },
    },
    linkElement,
  } = useProcesses();
  const { foregroundId, setForegroundId } = useSession();
  const nextFocusableId = useNextFocusable(pid);
  const isForeground = useMemo(() => foregroundId === pid, [foregroundId, pid]);

  const isBottomNotch = useCallback(() => {
    if (!isPinned) {
      if (minimized || !isForeground) {
        return "minimized";
      }
      return "true";
    }
    return "false";
  }, [isForeground, isPinned, minimized]);

  const onClick = useCallback(() => {
    if (!isPinned) {
      if (minimized || isForeground) minimize(pid);
      setForegroundId(isForeground ? nextFocusableId : pid);
    } else {
      openProcess(pid, undefined);
    }
  }, [
    isForeground,
    isPinned,
    minimize,
    minimized,
    nextFocusableId,
    openProcess,
    pid,
    setForegroundId,
  ]);

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
      bottomnotch={isBottomNotch()}
      onClick={onClick}
      ref={linkTaskbarEntry}
    />
  );
};

export default TaskbarEntry;
