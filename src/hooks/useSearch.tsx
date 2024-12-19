import { useMemo } from "react";
import { useDebounce } from "./useDebounce";

interface SearchProps<T> {
  searchInput: string;
  data: T[] | undefined;
  mapper: (item: T) => string;
}
function useSearch<T>({ searchInput, data, mapper }: SearchProps<T>) {
  const debouncedSearchTerm = useDebounce(searchInput);
  const filteredData = useMemo(() => {
    try {
      if (!data || data.length === 0) return data;

      const normalizedSearch = debouncedSearchTerm.toLowerCase().trim();
      if (!normalizedSearch) return data;

      return data.filter((item) => {
        const searchWords = normalizedSearch.split(/\s+/);
        return searchWords.every((word) =>
          mapper(item).toLowerCase().includes(word)
        );
      });
    } catch (error) {
      console.error("search operation failed, make sure mapper is valid");
      return data;
    }
  }, [debouncedSearchTerm, data, mapper]);

  return {
    filteredData,
    isSearching: debouncedSearchTerm !== searchInput,
  };
}

export default useSearch;
