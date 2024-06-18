import { useRef } from "react";

import type { DoubleClickType } from "./types";

const useDoubleClick: DoubleClickType = (
  handler,
  singleClick = false,
  timeout = 500
) => {
  const timer = useRef<NodeJS.Timeout>();
  const onClick: React.MouseEventHandler = (event) => {
    if (singleClick) {
      event.stopPropagation();
      handler(event);
      // eslint-disable-next-line unicorn/no-negated-condition
    } else if (!timer.current) {
      timer.current = setTimeout(() => {
        timer.current = undefined;
      }, timeout);
    } else {
      clearTimeout(timer.current);
      event.stopPropagation();
      handler(event);
      timer.current = undefined;
    }
  };
  return onClick;
};

export default useDoubleClick;
