import AsyncStorage from "@react-native-async-storage/async-storage";
import { Book } from "../utils/types";

export const loadFavorites = async (): Promise<Book[]> => {
  try {
    const data = await AsyncStorage.getItem("favorites");
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Failed to load favorites:", error);
    return [];
  }
};

export const saveFavorites = async (favorites: Book[]): Promise<void> => {
  try {
    await AsyncStorage.setItem("favorites", JSON.stringify(favorites));
  } catch (error) {
    console.error("Failed to save favorites:", error);
  }
};
