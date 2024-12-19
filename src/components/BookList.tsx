import React, { useCallback, useState } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  Text,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "../navigation/navigations";
import { Book } from "../utils/types";
import BookCardView from "./BookCardView";
import { SearchBar } from "./SearchBar";
import useSearch from "../hooks/useSearch";
import { SortControl, SortOption, SortDirection } from "./SortControl";
import { useSort } from "../hooks/useSort";
import { sortBookOption } from "../utils/sortBookOption";

interface BookListProps {
  data: Book[] | undefined;
  isLoading: boolean;
  isError?: boolean;
  searchMapper?: (book: Book) => string;
}

export function BookList({
  data,
  isLoading,
  isError,
  searchMapper = (b) => b.title,
}: BookListProps) {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [searchInput, setSearchInput] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("title");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const { filteredData } = useSearch<Book>({
    searchInput,
    data,
    mapper: searchMapper,
  });

  const sortedData = useSort(
    filteredData,
    sortBookOption(sortOption),
    sortDirection
  );

  const renderItem: ListRenderItem<Book> = useCallback(
    ({ item: book }) => {
      const onPress = () => navigation.navigate("Details", { book });
      return <BookCardView book={book} onPress={onPress} />;
    },
    [navigation]
  );

  const handleSortChange = (option: SortOption) => {
    if (option === sortOption) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortOption(option);
      setSortDirection("asc");
    }
  };

  const toggleSortDirection = () => {
    setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
  };

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
      <SortControl
        selectedOption={sortOption}
        sortDirection={sortDirection}
        onSortChange={handleSortChange}
        onDirectionChange={toggleSortDirection}
      />
      <FlatList
        data={sortedData}
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
