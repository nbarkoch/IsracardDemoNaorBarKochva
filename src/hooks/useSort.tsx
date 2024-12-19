import { useMemo } from "react";
import { SortDirection } from "../components/SortControl";

export function useSort<T>(
  data: T[] | undefined,
  sortCompare: (a: T, b: T) => number,
  sortDirection: SortDirection
) {
  return useMemo(() => {
    if (!data) return data;

    const multiplier = sortDirection === "asc" ? 1 : -1;
    return [...data].sort((a, b) => sortCompare(a, b) * multiplier);
  }, [data, sortCompare, sortDirection]);
}
