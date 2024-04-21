import { useEffect } from "react";

import { MILLISEC_IN_SEC } from "@/utils/constants";

const useSyncedClock = (callback: () => void): void => {
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    timeout = setTimeout(() => {
      callback();
      timeout = setInterval(callback, MILLISEC_IN_SEC);
    }, MILLISEC_IN_SEC - new Date().getMilliseconds());

    return () => clearTimeout(timeout);
  }, [callback]);
};

export default useSyncedClock;
