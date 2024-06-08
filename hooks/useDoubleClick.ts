import { useRef } from "react";

import type { DoubleClickType } from "./types";

const useDoubleClick: DoubleClickType = (
  handler,
  singleClick = false,
  timeout = 500
) => {
  const timer = useRef<NodeJS.Timeout | null>(null);
  const onClick: React.MouseEventHandler = (event) => {
    if (singleClick) {
      event.stopPropagation();
      handler(event);
    } else if (!timer.current) {
      timer.current = setTimeout(() => {
        timer.current = null;
      }, timeout);
    } else {
      clearTimeout(timer.current);
      event.stopPropagation();
      handler(event);
      timer.current = null;
    }
  };
  return onClick;
};

export default useDoubleClick;
