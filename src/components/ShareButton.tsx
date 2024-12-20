import React from "react";
import { Share, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useTheme } from "~/hooks";
import { Book } from "~/utils/types";
import { ICON_STANDARD_SIZE } from "~/utils/constants";

interface ShareButtonProps {
  book: Book;
}

function ShareButton({ book }: ShareButtonProps) {
  const { colors } = useTheme();

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${book.title}\n\n${book.description}\n\nCover: ${book.cover}`,
        title: book.title,
      });
    } catch (error) {
      console.error("Share failed:", error);
    }
  };

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: colors.highlight }]}
      onPress={handleShare}
    >
      <Ionicons
        name="share-social-outline"
        size={ICON_STANDARD_SIZE}
        color={colors.secondary}
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

export default ShareButton;
