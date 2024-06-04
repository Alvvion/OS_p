import { useCallback, useRef } from "react";

import type { DoubleClickType } from "./types";

const useDoubleClick: DoubleClickType = (handler, timeout = 500) => {
  const timer = useRef<NodeJS.Timeout | null>(null);
  const onClick = useCallback<React.MouseEventHandler>(
    (event) => {
      if (!timer.current) {
        timer.current = setTimeout(() => {
          timer.current = null;
        }, timeout);
      } else {
        clearTimeout(timer.current);
        event.stopPropagation();
        handler(event);
        timer.current = null;
      }
    },
    [handler, timeout]
  );
  return onClick;
};

export default useDoubleClick;
