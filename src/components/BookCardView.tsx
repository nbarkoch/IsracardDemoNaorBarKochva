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
import { Book } from "../utils/types";
import { useTheme } from "../hooks/useTheme";

interface BookCardViewProps {
  book: Book;
  onPress: () => void;
}

const BookCardView = ({
  onPress,
  book: { cover, title, releaseDate },
}: BookCardViewProps) => {
  const { colors } = useTheme();

  const themedStyles = useMemo<{ card: ViewStyle; title: TextStyle }>(
    () => ({
      card: {
        padding: 20,
        flexDirection: "row",
        borderWidth: 0.5,
        backgroundColor: colors.card,
        borderColor: colors.border,
      },
      title: {
        color: colors.text,
        fontWeight: "900",
        fontSize: 18,
      },
    }),
    [colors.border, colors.card, colors.text]
  );

  return (
    <TouchableOpacity style={themedStyles.card} onPress={onPress}>
      <Image
        source={{ uri: cover }}
        style={styles.cover}
        resizeMode="contain"
      />
      <View style={styles.info}>
        <Text style={themedStyles.title} ellipsizeMode="tail" numberOfLines={2}>
          {title}
        </Text>
        <Text style={styles.releaseData}> {releaseDate}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 20,
    flexDirection: "row",
    borderWidth: 0.5,
    backgroundColor: "#f6f6f6",
    borderColor: "#d3d3d3",
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
    color: "grey",
  },
});

export default BookCardView;
