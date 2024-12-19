import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { Book } from "../utils/types";

interface BookCardViewProps {
  book: Book;
  onPress: () => void;
}

const BookCardView = ({ onPress, book }: BookCardViewProps) => {
  return (
    <TouchableOpacity style={{ padding: 20 }} onPress={onPress}>
      <Text key={book.index}>{book.title}</Text>
    </TouchableOpacity>
  );
};

export default BookCardView;
