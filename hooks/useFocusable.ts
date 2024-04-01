import { useCallback, useEffect, useMemo } from "react";

import { useSession } from "@/contexts/session";

type Focusable = {
  zIndex: number;
  tabIndex: number;
  onBlur: (event: React.FocusEvent<HTMLElement>) => void;
  onFocus: (event: React.FocusEvent<HTMLElement>) => void;
};

const useFocusable = (
  id: string,
  ref: React.MutableRefObject<HTMLElement | null>
): Focusable => {
  const { foregroundId, setForegroundId, stackOrder, setStackOrder } =
    useSession();

  const zIndex = stackOrder.length - stackOrder.indexOf(id) + 1;

  const isForeground = useMemo(() => id === foregroundId, [id, foregroundId]);

  const onBlur = useCallback(() => {
    setForegroundId("");
  }, [setForegroundId]);

  const moveToFront = useCallback(() => {
    setStackOrder((currentOrder) => {
      if (currentOrder)
        return [id, ...currentOrder.filter((stackId) => stackId !== id)];
      return [id];
    });
    setForegroundId(id);
  }, [id, setForegroundId, setStackOrder]);

  useEffect(() => {
    if (isForeground) moveToFront();
  }, [isForeground, moveToFront, zIndex]);

  useEffect(() => {
    moveToFront();
    ref.current?.focus();
  }, [moveToFront, ref]);

  return { zIndex, tabIndex: -1, onFocus: moveToFront, onBlur };
};

export default useFocusable;
