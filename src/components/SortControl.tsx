import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export type SortOption = "title" | "releaseDate" | "pages";
export type SortDirection = "asc" | "desc";

interface SortControlProps {
  selectedOption: SortOption;
  sortDirection: SortDirection;
  onSortChange: (option: SortOption) => void;
  onDirectionChange: () => void;
}

const SORT_OPTIONS = [
  { key: "title" as SortOption, label: "Title" },
  { key: "releaseDate" as SortOption, label: "Date" },
  { key: "pages" as SortOption, label: "Pages" },
];

export function SortControl({
  selectedOption,
  sortDirection,
  onSortChange,
  onDirectionChange,
}: SortControlProps) {
  return (
    <View style={styles.container}>
      <View style={styles.chipGroup}>
        {SORT_OPTIONS.map(({ key, label }) => (
          <TouchableOpacity
            key={key}
            style={[styles.chip, selectedOption === key && styles.selectedChip]}
            onPress={() => onSortChange(key)}
          >
            <Text
              style={[
                styles.chipText,
                selectedOption === key && styles.selectedChipText,
              ]}
            >
              {label}
            </Text>
            {selectedOption === key && (
              <Ionicons
                name={sortDirection === "asc" ? "chevron-up" : "chevron-down"}
                size={16}
                color="#fff"
                onPress={onDirectionChange}
              />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  chipGroup: {
    flexDirection: "row",
    gap: 8,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    gap: 4,
  },
  selectedChip: {
    backgroundColor: "#000",
  },
  chipText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  selectedChipText: {
    color: "#fff",
  },
});
