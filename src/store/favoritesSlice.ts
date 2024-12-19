import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { Book } from "../utils/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface FavoritesState {
  favoriteBooks: Book[];
  isLoadingFromStorage: boolean;
}

const initialState: FavoritesState = {
  favoriteBooks: [],
  isLoadingFromStorage: false,
};

export const FAVORITE_STORAGE_KEY = "favorites";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    setFavorites: (state, action: PayloadAction<Book[]>) => {
      state.favoriteBooks = action.payload;
    },
    toggleFavorite: (state, action: PayloadAction<Book>) => {
      const bookIndex = state.favoriteBooks.findIndex(
        (book) => book.index === action.payload.index
      );
      if (bookIndex >= 0) {
        // if exists - remove
        state.favoriteBooks.splice(bookIndex, 1);
      } else {
        // else - add
        state.favoriteBooks.push(action.payload);
      }
      AsyncStorage.setItem(
        FAVORITE_STORAGE_KEY,
        JSON.stringify(state.favoriteBooks)
      );
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoadingFromStorage = action.payload;
    },
  },
});

export const { toggleFavorite, setLoading, setFavorites } =
  favoritesSlice.actions;
export default favoritesSlice.reducer;
