import { useCallback } from "react";

import { closeWithTransition } from "@/components/system/Window/RndWindow/functions";
import { useProcesses } from "@/context/Process";
import { useSession } from "@/context/Session";

import useNextFocusable from "./useNextFocusable";

const useWindowActions = (id: string) => {
  const { minimize, maximize, closeProcess } = useProcesses();
  const { removeFromStack, setForegroundId } = useSession();
  const nextFocusableId = useNextFocusable(id);

  const onMinimize = useCallback(() => {
    setForegroundId(nextFocusableId);
    return minimize(id);
  }, [id, minimize, nextFocusableId, setForegroundId]);
  const onMaximize = useCallback(() => maximize(id), [id, maximize]);
  const onClose = useCallback(() => {
    removeFromStack(id);
    closeWithTransition(closeProcess, id);
    setForegroundId(nextFocusableId);
  }, [removeFromStack, id, closeProcess, setForegroundId, nextFocusableId]);

  return { onMaximize, onMinimize, onClose };
};

export default useWindowActions;
