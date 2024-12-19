import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Book } from "../utils/types";

interface FavoritesState {
  books: Book[];
}

const initialState: FavoritesState = {
  books: [],
};

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<Book>) => {
      const index = state.books.findIndex(
        (b) => b.index === action.payload.index
      );
      if (index >= 0) {
        state.books.splice(index, 1);
      } else {
        state.books.push(action.payload);
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
