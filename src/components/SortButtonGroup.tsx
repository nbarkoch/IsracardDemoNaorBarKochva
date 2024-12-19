import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export type SortOption = "title" | "releaseDate" | "pages";
export type SortDirection = "asc" | "desc";

interface SortButtonGroupProps {
  selectedOption: SortOption;
  sortDirection: SortDirection;
  onSortChange: (option: SortOption) => void;
  onDirectionChange: () => void;
}

export function SortButtonGroup({
  selectedOption,
  sortDirection,
  onSortChange,
  onDirectionChange,
}: SortButtonGroupProps) {
  const sortOptions: { key: SortOption; label: string }[] = [
    { key: "title", label: "Title" },
    { key: "releaseDate", label: "Date" },
    { key: "pages", label: "Pages" },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.buttonGroup}>
        {sortOptions.map(({ key, label }) => (
          <TouchableOpacity
            key={key}
            style={[
              styles.button,
              selectedOption === key && styles.selectedButton,
            ]}
            onPress={() => onSortChange(key)}
          >
            <Text
              style={[
                styles.buttonText,
                selectedOption === key && styles.selectedButtonText,
              ]}
            >
              {label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity
        style={styles.directionButton}
        onPress={onDirectionChange}
      >
        <Ionicons
          name={sortDirection === "asc" ? "arrow-up" : "arrow-down"}
          size={20}
          color="#666"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  buttonGroup: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    padding: 4,
  },
  button: {
    flex: 1,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  selectedButton: {
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  buttonText: {
    color: "#666",
    fontSize: 14,
    fontWeight: "500",
  },
  selectedButtonText: {
    color: "#000",
    fontWeight: "600",
  },
  directionButton: {
    marginLeft: 12,
    padding: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
});
