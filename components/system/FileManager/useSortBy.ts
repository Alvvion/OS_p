import { useEffect, useState } from "react";

import { sortFiles } from "./functions";
import type { Files, SortBy } from "./types";

const useSortBy = (
  setFiles: React.Dispatch<React.SetStateAction<Files | undefined>>,
): React.Dispatch<React.SetStateAction<SortBy>> => {
  const [sortBy, setSortBy] = useState<SortBy>("");

  useEffect(() => {
    if (sortBy) {
      setFiles((currentFiles = {}) => sortFiles(currentFiles, sortBy));
      setSortBy("");
    }
  }, [setFiles, sortBy]);

  return setSortBy;
};

export default useSortBy;
