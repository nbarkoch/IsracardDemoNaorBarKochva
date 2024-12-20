import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "~/hooks";
import { ICON_STANDARD_SIZE } from "~/utils/constants";

interface ViewToggleProps {
  isGridView: boolean;
  onToggle: () => void;
}

function ViewToggle({ isGridView, onToggle }: ViewToggleProps) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: colors.card }]}
      onPress={onToggle}
    >
      <Ionicons
        name={isGridView ? "list-outline" : "grid-outline"}
        size={ICON_STANDARD_SIZE}
        color={colors.primary}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 8,
    borderRadius: 8,
    marginLeft: 8,
  },
});

export default ViewToggle;
