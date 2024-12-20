import React, { useMemo } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

import { Book } from "~/utils/types";
import { useTheme } from "~/hooks";

interface BookCardViewProps {
  book: Book;
  onPress: () => void;
}

const BookCardView = ({
  onPress,
  book: { cover, title, releaseDate },
}: BookCardViewProps) => {
  const { colors } = useTheme();

  const themedStyles = useMemo<{
    card: ViewStyle;
    title: TextStyle;
    releaseDate: TextStyle;
  }>(
    () => ({
      card: {
        backgroundColor: colors.card,
        borderColor: colors.border,
      },
      title: {
        color: colors.text,
      },
      releaseDate: {
        color: colors.secondary,
      },
    }),
    [colors.border, colors.card, colors.text]
  );

  return (
    <TouchableOpacity
      style={[styles.card, themedStyles.card]}
      onPress={onPress}
    >
      <Image
        source={{ uri: cover }}
        style={styles.cover}
        resizeMode="contain"
      />
      <View style={styles.info}>
        <Text
          style={[styles.title, themedStyles.title]}
          ellipsizeMode="tail"
          numberOfLines={2}
        >
          {title}
        </Text>
        <Text style={[styles.releaseData, themedStyles.releaseDate]}>
          {releaseDate}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 20,
    flexDirection: "row",
    borderWidth: 0.5,
  },
  title: {
    fontWeight: "900",
    fontSize: 18,
  },
  info: {
    flexDirection: "column",
    flexShrink: 1,
    paddingHorizontal: 10,
    gap: 5,
  },
  cover: {
    width: 100,
    height: 150,
  },
  releaseData: {
    fontSize: 16,
  },
});

export default BookCardView;
