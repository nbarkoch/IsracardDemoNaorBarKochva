import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Book } from "../utils/types";

const FAVORITES_KEY = "favorites";

const getFavorites = async (): Promise<Book[]> => {
  const data = await AsyncStorage.getItem(FAVORITES_KEY);
  return data ? JSON.parse(data) : [];
};

const saveFavorites = async (favorites: Book[]): Promise<void> => {
  await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
};

export function useFavorites() {
  const queryClient = useQueryClient();

  const { data: favorites = [], isLoading } = useQuery({
    queryKey: [FAVORITES_KEY],
    queryFn: getFavorites,
  });

  const { mutate: toggleFavorite } = useMutation({
    mutationFn: async (book: Book) => {
      const currentFavorites = await getFavorites();
      const exists = currentFavorites.some((b) => b.index === book.index);
      const newFavorites = exists
        ? currentFavorites.filter((b) => b.index !== book.index)
        : [...currentFavorites, book];
      await saveFavorites(newFavorites);
      return newFavorites;
    },
    onSuccess: (newFavorites) => {
      queryClient.setQueryData([FAVORITES_KEY], newFavorites);
    },
  });

  return {
    favorites,
    isLoading,
    toggleFavorite,
    isFavorite: (book: Book) => favorites.some((b) => b.index === book.index),
  };
}
