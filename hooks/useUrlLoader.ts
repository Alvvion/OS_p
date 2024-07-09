import { useEffect } from "react";

import { useProcesses } from "@/context/Process";

const useUrlLoader = (): void => {
  const { openProcess } = useProcesses();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const app = searchParams.get("app");
    const url = searchParams.get("url");

    if (app && url) openProcess(app, url);
  }, [openProcess]);
};

export default useUrlLoader;
