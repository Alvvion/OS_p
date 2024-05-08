import { useCallback } from "react";

import { useProcesses } from "@/context/Process";
import { useSession } from "@/context/Session";
import { DEFAULT_WINDOW_TRANSITION_DURATION } from "@/utils/constants";

import useNextFocusable from "./useNextFocusable";

const useWindowActions = (id: string) => {
  const { minimize, maximize, closeProcess } = useProcesses();
  const { setStackOrder, setForegroundId } = useSession();
  const nextFocusableId = useNextFocusable(id);

  const onMinimize = useCallback(() => {
    setForegroundId(nextFocusableId);
    return minimize(id);
  }, [id, minimize, nextFocusableId, setForegroundId]);
  const onMaximize = useCallback(() => maximize(id), [id, maximize]);
  const onClose = useCallback(() => {
    setStackOrder((currentOrder) =>
      currentOrder.filter((stackId) => stackId !== id)
    );
    closeProcess(id, true);
    setTimeout(() => closeProcess(id), DEFAULT_WINDOW_TRANSITION_DURATION);
    setForegroundId(nextFocusableId);
  }, [setStackOrder, setForegroundId, nextFocusableId, closeProcess, id]);

  return { onMaximize, onMinimize, onClose };
};

export default useWindowActions;
