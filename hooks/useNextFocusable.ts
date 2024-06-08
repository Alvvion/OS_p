import { useProcesses } from "@/context/Process";
import { useSession } from "@/context/Session";

const useNextFocusable = (id: string): string => {
  const { processes } = useProcesses();
  const { stackOrder } = useSession();

  const nextFocusableId = stackOrder.find(
    (stackId) => stackId !== id && !processes?.[stackId]?.minimized
  );

  return nextFocusableId || "";
};

export default useNextFocusable;
