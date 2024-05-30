import { useCallback, useEffect, useMemo } from "react";

import { useProcesses } from "@/context/Process";
import { useSession } from "@/context/Session";

import type { Focusable } from "./types";

const useFocusable = (
  id: string,
  ref: React.MutableRefObject<HTMLElement | null>
): Focusable => {
  const { foregroundId, setForegroundId, stackOrder, setStackOrder } =
    useSession();

  const {
    processes: { [id]: { taskbarEntry = undefined, minimized = false } = {} },
  } = useProcesses();

  const zIndex =
    stackOrder.length + (minimized ? 1 : -stackOrder.indexOf(id)) + 1;

  const isForeground = useMemo(() => id === foregroundId, [id, foregroundId]);

  const onBlur = useCallback(
    ({ relatedTarget }: React.FocusEvent<HTMLElement>) => {
      if (isForeground && relatedTarget !== taskbarEntry) setForegroundId("");
    },
    [isForeground, setForegroundId, taskbarEntry]
  );

  const moveToFront = useCallback(() => {
    setStackOrder((currentOrder) => {
      if (currentOrder)
        return [id, ...currentOrder.filter((stackId) => stackId !== id)];
      return [id];
    });
    setForegroundId(id);
  }, [id, setForegroundId, setStackOrder]);

  useEffect(() => {
    if (isForeground) moveToFront();
  }, [isForeground, moveToFront, zIndex]);

  useEffect(() => {
    moveToFront();
    ref.current?.focus();
  }, [moveToFront, ref]);

  return { zIndex, tabIndex: -1, onFocus: moveToFront, onBlur };
};

export default useFocusable;
