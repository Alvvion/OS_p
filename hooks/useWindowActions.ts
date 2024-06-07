import { closeWithTransition } from "@/components/system/Window/RndWindow/functions";
import { useProcesses } from "@/context/Process";
import { useSession } from "@/context/Session";

import useNextFocusable from "./useNextFocusable";

const useWindowActions = (id: string) => {
  const { minimize, maximize, closeProcess } = useProcesses();
  const { removeFromStack, setForegroundId } = useSession();
  const nextFocusableId = useNextFocusable(id);

  const onMinimize = () => {
    setForegroundId(nextFocusableId);
    return minimize(id);
  };

  const onMaximize = () => maximize(id);

  const onClose = () => {
    removeFromStack(id);
    closeWithTransition(closeProcess, id);
    setForegroundId(nextFocusableId);
  };

  return { onMaximize, onMinimize, onClose };
};

export default useWindowActions;
