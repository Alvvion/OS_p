import { closeWithTransition } from "@/components/system/Window/RndWindow/functions";
import { useProcesses } from "@/context/Process";
import { useSession } from "@/context/Session";

import type { WindowActions } from "./types";
import useNextFocusable from "./useNextFocusable";

const useWindowActions = (id: string): WindowActions => {
  const { minimize, maximize, closeProcess } = useProcesses();
  const { removeFromStack, setForegroundId } = useSession();
  const nextFocusableId = useNextFocusable(id);

  const onMinimize = (): void => {
    setForegroundId(nextFocusableId);
    return minimize(id);
  };

  const onMaximize = (): void => maximize(id);

  const onClose = (): void => {
    removeFromStack(id);
    closeWithTransition(closeProcess, id);
    setForegroundId(nextFocusableId);
  };

  return { onMaximize, onMinimize, onClose };
};

export default useWindowActions;
