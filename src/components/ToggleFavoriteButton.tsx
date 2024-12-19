import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Book } from "../utils/types";
import { useFavorites } from "../hooks/useFavorites";

interface ToggleFavoriteButtonProps {
  book: Book;
}

function ToggleFavoriteButton({ book }: ToggleFavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const isBookFavorite = isFavorite(book);

  const handleToggleFavorite = () => {
    toggleFavorite(book);
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleToggleFavorite}>
      <Ionicons
        name={isBookFavorite ? "heart" : "heart-outline"}
        size={24}
        color={isBookFavorite ? "#ff4b4b" : "#666"}
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
