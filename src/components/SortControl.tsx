import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { useTheme } from "~/hooks";
import { SortingOption, SortDirection } from "~/utils/sortBookOption";
import { useTranslation } from "react-i18next";

interface SortControlProps {
  selectedOption: SortingOption;
  sortDirection: SortDirection;
  onSortChange: (option: SortingOption) => void;
  onDirectionChange: () => void;
}

const SORT_OPTIONS: SortingOption[] = ["title", "releaseDate", "pages"];

function SortControl({
  selectedOption,
  sortDirection,
  onSortChange,
  onDirectionChange,
}: SortControlProps) {
  const { colors } = useTheme();
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.chipGroup}>
        {SORT_OPTIONS.map((key) => (
          <TouchableOpacity
            key={key}
            style={[
              styles.chip,
              {
                backgroundColor:
                  selectedOption === key ? colors.primary : colors.card,
              },
            ]}
            onPress={() => onSortChange(key)}
          >
            <Text
              style={[
                styles.chipText,
                {
                  color:
                    selectedOption === key ? colors.background : colors.primary,
                },
              ]}
            >
              {t(`sort.${key}`)}
            </Text>
            {selectedOption === key && (
              <Ionicons
                name={sortDirection === "asc" ? "chevron-up" : "chevron-down"}
                size={16}
                color={colors.background}
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
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    gap: 4,
  },
  chipText: {
    fontSize: 14,
    fontWeight: "500",
  },
});

export default SortControl;
