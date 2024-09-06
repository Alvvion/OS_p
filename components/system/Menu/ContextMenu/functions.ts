import type {
  SortBy,
  SortByOrder,
} from "@/components/system/FileManager/types";

// eslint-disable-next-line import/prefer-default-export
export const updateSortBy =
  (value: SortBy, defaultIsAscending: boolean) =>
  ([sortBy, isAscending]: SortByOrder): SortByOrder => [
    value,
    sortBy === value ? !isAscending : defaultIsAscending,
  ];
