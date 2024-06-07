import { useCallback, useEffect } from "react";

import { useProcesses } from "@/context/Process";
import { useSession } from "@/context/Session";

import type { Focusable } from "./types";

const useFocusable = (
  id: string,
  ref: React.MutableRefObject<HTMLElement | null>
): Focusable => {
  const { foregroundId, setForegroundId, stackOrder, prependToStack } =
    useSession();

  const {
    processes: { [id]: { taskbarEntry = undefined, minimized = false } = {} },
  } = useProcesses();

  const zIndex =
    stackOrder.length + (minimized ? 1 : -stackOrder.indexOf(id)) + 1;

  const isForeground = id === foregroundId;

  const onBlur: React.FocusEventHandler = ({ relatedTarget }) => {
    if (isForeground && relatedTarget !== taskbarEntry) setForegroundId("");
  };

  const moveToFront = useCallback(
    (event?: React.FocusEvent<HTMLElement> | React.MouseEvent<HTMLElement>) => {
      const { relatedTarget } = event || {};
      if (ref?.current?.contains(document.activeElement)) {
        prependToStack(id);
        setForegroundId(id);
      } else if (!relatedTarget || document.activeElement === taskbarEntry) {
        ref?.current?.focus();
      }
    },
    [id, prependToStack, ref, setForegroundId, taskbarEntry]
  );

  useEffect(() => {
    if (isForeground) moveToFront();
  }, [isForeground, moveToFront]);

  useEffect(() => setForegroundId(id), [id, setForegroundId]);

  return { zIndex, tabIndex: -1, onFocus: moveToFront, onBlur };
};

export default useFocusable;
