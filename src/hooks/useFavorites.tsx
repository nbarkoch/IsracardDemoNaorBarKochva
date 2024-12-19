import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { toggleFavorite } from "../store/favoritesSlice";
import { Book } from "../utils/types";

export function useFavorites() {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.books);

  return {
    favorites,
    toggleFavorite: (book: Book) => dispatch(toggleFavorite(book)),
    isFavorite: (book: Book) => favorites.some((b) => b.index === book.index),
  };
}
