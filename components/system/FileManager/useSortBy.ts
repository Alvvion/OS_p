import { useState } from "react";

import { useSession } from "@/context/Session";

import { sortFiles } from "./functions";
import type { Files, SetSortBy, SortByOrder } from "./types";

const useSortBy = (
  directory: string,
  files?: Files,
): [SortByOrder, SetSortBy] => {
  const { setSortOrders } = useSession();
  const [currentSortBy, setCurrentSortBy] = useState<SortByOrder>([
    "name",
    true,
  ]);

  return [
    currentSortBy,
    (sortBy: (current: SortByOrder) => SortByOrder): void => {
      const newSortBy = sortBy(currentSortBy);
      const [sortByValue, isAscending] = newSortBy;

      if (files) {
        setSortOrders((currentSortOrder) => ({
          ...currentSortOrder,
          [directory]: Object.keys(sortFiles(files, sortByValue, isAscending)),
        }));
      }

      setCurrentSortBy(newSortBy);
    },
  ];
};

export default useSortBy;
