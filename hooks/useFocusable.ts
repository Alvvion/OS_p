import { useCallback, useEffect } from "react";

import { useProcesses } from "@/context/Process";
import { useSession } from "@/context/Session";

import type { Events, Focusable } from "./types";

const useFocusable = (
  id: string,
  ref: React.MutableRefObject<HTMLElement | null>,
  callbackEvents?: Partial<Events>
): Focusable => {
  const { foregroundId, setForegroundId, stackOrder, prependToStack } =
    useSession();

  const {
    processes: {
      [id]: { taskbarEntry = undefined, minimized = false, url = "" } = {},
    },
  } = useProcesses();

  const zIndex =
    stackOrder.length + (minimized ? 1 : -stackOrder.indexOf(id)) + 1;

  const isForeground = id === foregroundId;

  const onBlur: React.FocusEventHandler<HTMLElement> = (event) => {
    const { relatedTarget } = event;
    if (isForeground && relatedTarget !== taskbarEntry) setForegroundId("");

    callbackEvents?.onBlur?.(event);
  };

  const moveToFront = useCallback(
    (event?: React.FocusEvent<HTMLElement>) => {
      const { relatedTarget } = event || {};
      if (ref?.current?.contains(document.activeElement)) {
        prependToStack(id);
        setForegroundId(id);
      } else if (!relatedTarget || document.activeElement === taskbarEntry) {
        ref?.current?.focus();
        callbackEvents?.onFocus?.(event);
      }
    },
    [callbackEvents, id, prependToStack, ref, setForegroundId, taskbarEntry]
  );

  useEffect(() => {
    if (isForeground) moveToFront();
  }, [isForeground, moveToFront]);

  useEffect(() => setForegroundId(id), [id, setForegroundId, url]);

  return { zIndex, tabIndex: -1, onFocus: moveToFront, onBlur };
};

export default useFocusable;
