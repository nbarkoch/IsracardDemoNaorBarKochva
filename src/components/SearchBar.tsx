import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { useTheme } from "~/hooks";
import { useTranslation } from "react-i18next";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
}

function SearchBar({ value, onChangeText }: SearchBarProps) {
  const { colors } = useTheme();
  const { t } = useTranslation();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.card, borderColor: colors.border },
      ]}
    >
      <Ionicons name="search-outline" size={20} color={colors.secondary} />
      <TextInput
        style={[styles.input, { color: colors.text }]}
        value={value}
        onChangeText={onChangeText}
        placeholder={t("common.search")}
        placeholderTextColor={colors.placeholder}
        autoCapitalize="none"
        returnKeyType="search"
      />
      {value.length > 0 && (
        <Ionicons
          name="close-circle"
          size={20}
          color={colors.secondary}
          onPress={() => onChangeText("")}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
    margin: 16,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
});

export default SearchBar;
