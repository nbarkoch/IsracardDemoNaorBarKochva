import React, { useCallback, useState } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  ViewStyle,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { FlashList, ListRenderItem } from "@shopify/flash-list";

import { RootStackNavigationProp } from "~/navigation/navigations";
import { useSort, useTheme, useSearch } from "~/hooks";
import { Book } from "~/utils/types";
import {
  sortBookOption,
  SortDirection,
  SortingOption,
} from "~/utils/sortBookOption";

import BookCardRow from "./BookCardRow";
import BookCardCube from "./BookCardCube";
import SearchBar from "./SearchBar";
import SortControl from "./SortControl";
import { useTranslation } from "react-i18next";
import ViewToggle from "./DisplayToggle";

interface BookListProps {
  data: Book[] | undefined;
  isLoading?: boolean;
  isError?: boolean;
  searchMapper?: (book: Book) => string;
}

function BookList({
  data,
  isLoading,
  isError,
  searchMapper = (b) => b.title,
}: BookListProps) {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [searchInput, setSearchInput] = useState("");
  const [sortOption, setSortOption] = useState<SortingOption>("title");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [isGridView, setIsGridView] = useState(false);
  const { colors } = useTheme();
  const { t } = useTranslation();

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
      if (isGridView) {
        return <BookCardCube book={book} onPress={onPress} />;
      } else {
        return <BookCardRow book={book} onPress={onPress} />;
      }
    },
    [navigation, isGridView]
  );

  const handleSortChange = (option: SortingOption) => {
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

  const toggleViewMode = () => {
    setIsGridView((prev) => !prev);
  };

  const containerStyle: ViewStyle = {
    flex: 1,
    justifyContent: "center",
    backgroundColor: colors.background,
  };

  if (isLoading) {
    return (
      <View style={containerStyle}>
        <ActivityIndicator
          style={containerStyle}
          color={colors.primary}
          size="large"
        />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={containerStyle}>
        <Text style={styles.message}>{t("common.oops")}</Text>
        <Text style={styles.message}>{t("common.error")}</Text>
        <Text style={styles.smallMessage}>{t("common.tryAgain")}</Text>
      </View>
    );
  }

  if (!data || data.length === 0) {
    return (
      <View style={containerStyle}>
        <Text style={styles.message}>{t("common.noBooks")}</Text>
      </View>
    );
  }

  return (
    <View style={containerStyle}>
      <SearchBar value={searchInput} onChangeText={setSearchInput} />
      <View style={styles.controlsContainer}>
        <SortControl
          selectedOption={sortOption}
          sortDirection={sortDirection}
          onSortChange={handleSortChange}
          onDirectionChange={toggleSortDirection}
        />
        <ViewToggle isGridView={isGridView} onToggle={toggleViewMode} />
      </View>
      <FlashList
        data={sortedData}
        renderItem={renderItem}
        keyExtractor={(book) => `${book.index}`}
        estimatedItemSize={190}
        numColumns={isGridView ? 2 : 1}
        key={isGridView ? "grid" : "list"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  message: {
    textAlign: "center",
    fontSize: 20,
    color: "grey",
    fontWeight: "700",
  },
  smallMessage: {
    textAlign: "center",
    fontSize: 16,
    color: "grey",
    padding: 10,
  },
  controlsContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
});

export default BookList;
