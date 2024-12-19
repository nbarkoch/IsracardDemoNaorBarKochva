import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Book } from "../utils/types";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { toggleFavorite } from "../store/favoritesSlice";

interface ToggleFavoriteButtonProps {
  book: Book;
}

function ToggleFavoriteButton({ book }: ToggleFavoriteButtonProps) {
  const dispatch = useAppDispatch();
  const isFavorite = useAppSelector((state) =>
    state.favorites.favoriteBooks.some(
      (favBook) => favBook.index === book.index
    )
  );

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(book));
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleToggleFavorite}>
      <Ionicons
        name={isFavorite ? "heart" : "heart-outline"}
        size={24}
        color={isFavorite ? "#ff4b4b" : "#666"}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 5,
    borderRadius: 20,
    backgroundColor: "#f8f8f8",
  },
});

export default ToggleFavoriteButton;
