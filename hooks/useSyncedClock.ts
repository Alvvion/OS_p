import { useEffect } from "react";

const MILLISEC_IN_SEC = 1000;

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
