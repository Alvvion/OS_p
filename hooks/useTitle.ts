import { basename } from "path";
import { useCallback } from "react";

import { useProcesses } from "@/context/Process";
import { processDir } from "@/context/Process/directory";
import { PROCESS_DELIMITER } from "@/utils/constants";

import type { Title } from "./types";

const useTitle = (id: string): Title => {
  const { title } = useProcesses();
  const [pid] = id.split(PROCESS_DELIMITER) || [];
  const { title: originalTitle } = processDir[pid] || {};
  const appendFileToTitle = useCallback(
    (url: string) => title(id, `${originalTitle} - ${basename(url)}`),
    [id, originalTitle, title],
  );

  return { appendFileToTitle };
};

export default useTitle;
