import { useSession } from "@/context/Session";

import { sortFiles } from "./functions";
import type { Files, SetSortBy, SortTypes } from "./types";

const useSortBy = (directory: string, files?: Files): SetSortBy => {
  const { setSortOrders } = useSession();

  return (sortBy: SortTypes): void => {
    if (files) {
      setSortOrders((currentSortOrder) => ({
        ...currentSortOrder,
        [directory]: Object.keys(sortFiles(files, sortBy)),
      }));
    }
  };
};

export default useSortBy;
