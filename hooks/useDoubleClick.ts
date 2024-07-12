import { useRef } from "react";

import { MAX_MOVES, TRANSITIONS_IN_MILLISECONDS } from "@/utils/constants";

const useDoubleClick = (
  handler: React.MouseEventHandler,
  singleClick = false,
): { onClick: React.MouseEventHandler } => {
  const timer = useRef<NodeJS.Timeout | undefined>();
  const moveCount = useRef(0);
  const onClick: React.MouseEventHandler = (event) => {
    const runHandler = (): void => {
      event.stopPropagation();
      handler(event);
    };
    const clearTimer: () => void = () => {
      if (timer?.current) {
        clearTimeout(timer.current);
        timer.current = undefined;
      }
    };

    const clearWhenPointerMoved = (): void => {
      if (moveCount.current >= MAX_MOVES) {
        clearTimer();
      }

      if (timer.current === undefined) {
        event.target.removeEventListener("pointermove", clearWhenPointerMoved);
        moveCount.current = 0;
      } else {
        moveCount.current += 1;
      }
    };

    if (singleClick) {
      runHandler();
    } else if (timer.current === undefined) {
      timer.current = setTimeout(
        clearTimer,
        TRANSITIONS_IN_MILLISECONDS.DOUBLE_CLICK,
      );
      event.target.addEventListener("pointermove", clearWhenPointerMoved, {
        passive: true,
      });
    } else {
      clearTimer();
      runHandler();
    }
  };

  return { onClick };
};

export default useDoubleClick;
