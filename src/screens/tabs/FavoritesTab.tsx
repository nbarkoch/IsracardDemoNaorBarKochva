import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  ListRenderItem,
  ActivityIndicator,
} from "react-native";
import { useAppSelector } from "../../hooks/redux";
import { SearchBar } from "../../components/SearchBar";
import { RootStackNavigationProp } from "../../navigation/navigations";
import { useNavigation } from "@react-navigation/native";
import { Book } from "../../utils/types";
import BookCardView from "../../components/BookCardView";
import useSearch from "../../hooks/useSearch";

const FavoritesTab = () => {
  const navigation = useNavigation<RootStackNavigationProp>();

  const { favoriteBooks: data, isLoadingFromStorage } = useAppSelector(
    (state) => state.favorites
  );

  const renderItem: ListRenderItem<Book> = useCallback(
    ({ item: book }) => {
      const onPress = () => navigation.navigate("Details", { book });
      return <BookCardView book={book} onPress={onPress} />;
    },
    [navigation]
  );

  const [searchInput, setSearchInput] = useState<string>("");

  const { filteredData } = useSearch<Book>({
    searchInput,
    data,
    mapper: (b) => `${b.title} ${b.description}`,
  });

  if (isLoadingFromStorage) {
    return (
      <View style={styles.container}>
        <ActivityIndicator
          style={styles.container}
          color={"white"}
          size="large"
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SearchBar value={searchInput} onChangeText={setSearchInput} />
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(book) => `${book.index}`}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});

export default FavoritesTab;
