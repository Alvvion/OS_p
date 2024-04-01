import { useCallback } from "react";

import { useProcesses } from "@/contexts/process";

const useWindowActions = (id: string) => {
  const { minimize, maximize, closeProcess } = useProcesses();

  const onMinimize = useCallback(() => minimize(id), [id, minimize]);
  const onMaximize = useCallback(() => maximize(id), [id, maximize]);
  const onClose = useCallback(() => closeProcess(id), [id, closeProcess]);

  return { onMaximize, onMinimize, onClose };
};

export default useWindowActions;
