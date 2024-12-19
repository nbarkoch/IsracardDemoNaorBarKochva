import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  FlatList,
  ListRenderItem,
} from "react-native";
import { RootStackNavigationProp } from "../../navigation/navigations";
import { useQuery } from "@tanstack/react-query";
import { HARRY_POTTER_BOOKS_API } from "../../utils/constants";
import { Book } from "../../utils/types";
import { fetchJsonData } from "../../utils/network";
import BookCardView from "../../components/BookCardView";
import { SearchBar } from "../../components/SearchBar";
import { useDebounce } from "../../hooks/useDebounce";

const getHarryPotterBooks = async (): Promise<Book[]> => {
  return await fetchJsonData(HARRY_POTTER_BOOKS_API);
};

function HomeTab() {
  const navigation = useNavigation<RootStackNavigationProp>();

  const { data, isLoading, isError } = useQuery({
    queryKey: [HARRY_POTTER_BOOKS_API],
    queryFn: getHarryPotterBooks,
  });

  const renderItem: ListRenderItem<Book> = useCallback(({ item: book }) => {
    const onPress = () => navigation.navigate("Details", { book });
    return <BookCardView book={book} onPress={onPress} />;
  }, []);

  const [searchInput, setSearchInput] = useState<string>("");
  const debouncedSearchTerm = useDebounce(searchInput);
  const filteredData = useMemo(() => {
    if (!data || data.length === 0) {
      return data;
    }
    const normalizedSearch = debouncedSearchTerm.toLowerCase().trim();
    return data.filter((book) => {
      const searchWords = normalizedSearch.split(/\s+/);
      return searchWords.every((word) =>
        book.title.toLowerCase().includes(word)
      );
    });
  }, [debouncedSearchTerm, data]);

  if (isLoading) {
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

  if (isError) {
    return (
      <View style={styles.container}>
        <Text>OOps</Text>
        <Text>Something went wrong</Text>
        <Text>Try again later..</Text>
      </View>
    );
  }

  if (!data || data.length === 0) {
    return (
      <View style={styles.container}>
        <Text>No Books Are Currently Available</Text>
        <Text>Try again later..</Text>
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});

export default HomeTab;
