import { useCallback } from "react";

import { useProcesses } from "@/contexts/process";
import { useSession } from "@/contexts/session";

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
    setForegroundId(nextFocusableId);
    return closeProcess(id);
  }, [setStackOrder, setForegroundId, nextFocusableId, closeProcess, id]);

  return { onMaximize, onMinimize, onClose };
};

export default useWindowActions;
