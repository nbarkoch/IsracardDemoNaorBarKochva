import { QueryClient } from "@tanstack/react-query";

export const fetchJsonData = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.statusText}`);
  }
  const data: T = await response.json();
  return data;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
      staleTime: 0,
      refetchOnWindowFocus: false,
    },
  },
});

export function getQueryClient(): QueryClient {
  return queryClient;
}
