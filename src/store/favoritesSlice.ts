import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Book } from "../utils/types";

interface FavoritesState {
  favoriteBooks: Book[];
}

const initialState: FavoritesState = {
  favoriteBooks: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
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
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
