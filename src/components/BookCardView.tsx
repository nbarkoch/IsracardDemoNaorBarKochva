import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Book } from "../utils/types";

interface BookCardViewProps {
  book: Book;
  onPress: () => void;
}

const BookCardView = ({
  onPress,
  book: { cover, title, releaseDate },
}: BookCardViewProps) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image
        source={{ uri: cover }}
        style={styles.cover}
        resizeMode="contain"
      />
      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.releaseData}> {releaseDate}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 20,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "grey",
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
  title: {
    fontWeight: "900",
    fontSize: 18,
  },
  releaseData: {
    fontSize: 16,
    color: "grey",
  },
});

export default BookCardView;
