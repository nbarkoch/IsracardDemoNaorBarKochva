import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  ListRenderItem,
  ActivityIndicator,
} from "react-native";
import { SearchBar } from "../../components/SearchBar";
import { RootStackNavigationProp } from "../../navigation/navigations";
import { useNavigation } from "@react-navigation/native";
import { Book } from "../../utils/types";
import BookCardView from "../../components/BookCardView";
import useSearch from "../../hooks/useSearch";
import { useFavorites } from "../../hooks/useFavorites";
import { useSort } from "../../hooks/useSort";
import { sortBookOption } from "../../utils/sortBookOption";
import {
  SortButtonGroup,
  SortDirection,
  SortOption,
} from "../../components/SortButtonGroup";

const FavoritesTab = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [searchInput, setSearchInput] = useState<string>("");
  const [sortOption, setSortOption] = useState<SortOption>("title");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const { favorites: data, isLoading } = useFavorites();

  const renderItem: ListRenderItem<Book> = useCallback(
    ({ item: book }) => {
      const onPress = () => navigation.navigate("Details", { book });
      return <BookCardView book={book} onPress={onPress} />;
    },
    [navigation]
  );

  const { filteredData } = useSearch<Book>({
    searchInput,
    data,
    mapper: (b) => `${b.title} ${b.description}`,
  });

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

  const sortedData = useSort(
    filteredData,
    sortBookOption(sortOption),
    sortDirection
  );

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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});

export default FavoritesTab;
