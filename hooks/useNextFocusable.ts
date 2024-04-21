import { useMemo } from "react";

import { useProcesses } from "@/context/Process";
import { useSession } from "@/context/Session";

const useNextFocusable = (id: string): string => {
  const { processes } = useProcesses();
  const { stackOrder } = useSession();

  const nextFocusableId = useMemo(
    () =>
      stackOrder.find(
        (stackId) => stackId !== id && !processes?.[stackId]?.minimized
      ),
    [id, processes, stackOrder]
  );

  return nextFocusableId || "";
};

export default useNextFocusable;
