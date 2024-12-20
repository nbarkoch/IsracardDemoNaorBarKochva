import { StyleSheet, TouchableOpacity } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import useFavorites from "~/hooks/useFavorites";
import useTheme from "~/hooks/useTheme";
import { Book } from "~/utils/types";
import { ICON_STANDARD_SIZE } from "~/utils/constants";

interface ToggleFavoriteButtonProps {
  book: Book;
}

function ToggleFavoriteButton({ book }: ToggleFavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const isBookFavorite = isFavorite(book);
  const { colors } = useTheme();

  const handleToggleFavorite = () => {
    toggleFavorite(book);
  };

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: colors.highlight }]}
      onPress={handleToggleFavorite}
    >
      <Ionicons
        name={isBookFavorite ? "heart" : "heart-outline"}
        size={ICON_STANDARD_SIZE}
        color={isBookFavorite ? colors.notification : colors.secondary}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 5,
    borderRadius: 20,
  },
});

export default ToggleFavoriteButton;
