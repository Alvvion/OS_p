import { useCallback, useEffect } from "react";

import { useProcesses } from "@/context/Process";
import { useSession } from "@/context/Session";

import type { Events, Focusable } from "./types";

const useFocusable = (
  id: string,
  callbackEvents?: Partial<Events>
): Focusable => {
  const { foregroundId, setForegroundId, stackOrder, prependToStack } =
    useSession();

  const {
    processes: { [id]: process },
  } = useProcesses();
  const { closing, componentWindow, minimized, taskbarEntry, url } =
    process || {};

  const zIndex =
    stackOrder.length + (minimized ? 1 : -stackOrder.indexOf(id)) + 1;

  const isForeground = id === foregroundId;

  const onBlurCapture: React.FocusEventHandler<HTMLElement> = (event) => {
    const { relatedTarget: focusedElement } = event;
    const focusedOnTaskbarEntry = focusedElement === taskbarEntry;
    const focusedInsideWindow =
      focusedElement && componentWindow?.contains(focusedElement as Node);
    const focusedOnTaskbarPeek =
      taskbarEntry?.previousSibling?.contains(focusedElement);
    if (
      isForeground &&
      !focusedOnTaskbarEntry &&
      !focusedOnTaskbarPeek &&
      !focusedInsideWindow
    ) {
      setForegroundId("");
      callbackEvents?.onBlurCapture?.(event);
    }
  };

  const moveToFront = useCallback(
    (event?: React.FocusEvent<HTMLElement>) => {
      const { relatedTarget } = event || {};
      if (componentWindow?.contains(document.activeElement)) {
        prependToStack(id);
        setForegroundId(id);
      } else if (!relatedTarget || document.activeElement === taskbarEntry) {
        componentWindow?.focus();
        callbackEvents?.onFocusCapture?.(event);
      }
    },
    [
      callbackEvents,
      componentWindow,
      id,
      prependToStack,
      setForegroundId,
      taskbarEntry,
    ]
  );

  useEffect(() => {
    if (isForeground) moveToFront();
  }, [isForeground, moveToFront]);

  useEffect(() => {
    if (process && !closing) setForegroundId(id);
  }, [closing, id, process, setForegroundId, url]);

  return { zIndex, tabIndex: -1, onFocusCapture: moveToFront, onBlurCapture };
};

export default useFocusable;
