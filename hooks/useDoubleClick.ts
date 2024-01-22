import { useCallback, useRef } from "react";

import type { DoubleClickType } from "@/types/components/system/FileManager";

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
        handler(event);
      }
    },
    [handler, timeout]
  );
  return onClick;
};

export default useDoubleClick;
