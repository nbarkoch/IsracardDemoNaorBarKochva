import { RouteProp, useRoute } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { RootStackParamList } from "../navigation/navigations";

function DetailsScreen() {
  const book = useRoute<RouteProp<RootStackParamList, "Details">>().params.book;

  return (
    <View style={styles.container}>
      <Text>{book.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default DetailsScreen;
