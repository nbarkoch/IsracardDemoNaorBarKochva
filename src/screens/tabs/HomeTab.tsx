import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
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
import useSearch from "../../hooks/useSearch";
import {
  SortButtonGroup,
  SortOption,
  SortDirection,
} from "../../components/SortButtonGroup";
import { useSort } from "../../hooks/useSort";
import { sortBookOption } from "../../utils/sortBookOption";

const getHarryPotterBooks = async (): Promise<Book[]> => {
  return await fetchJsonData(HARRY_POTTER_BOOKS_API);
};

function HomeTab() {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [searchInput, setSearchInput] = useState<string>("");
  const [sortOption, setSortOption] = useState<SortOption>("title");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const { data, isLoading, isError } = useQuery({
    queryKey: [HARRY_POTTER_BOOKS_API],
    queryFn: getHarryPotterBooks,
  });

  const { filteredData } = useSearch<Book>({
    searchInput,
    data,
    mapper: (b) => b.title,
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
      <SortButtonGroup
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

export default HomeTab;
