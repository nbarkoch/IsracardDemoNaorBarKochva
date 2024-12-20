import React, { useMemo } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { RouteProp, useRoute } from "@react-navigation/native";

import { ToggleFavoriteButton, ShareButton } from "~/components";
import { useTheme } from "~/hooks";
import { RootStackParamList } from "~/navigation/navigations";
import { useTranslation } from "react-i18next";

const { height, width } = Dimensions.get("window");

interface StatsSectionProps {
  title: string;
  value: string;
}

function StatsSection({ title, value }: StatsSectionProps) {
  const { colors } = useTheme();

  const themedStyles = useMemo(
    () => ({
      label: { color: colors.secondary },
      value: { color: colors.text },
    }),
    [colors.secondary, colors.text]
  );

  return (
    <View style={styles.statItem}>
      <Text style={[styles.statLabel, themedStyles.label]}>{title}</Text>
      <Text style={[styles.statValue, themedStyles.value]}>{value}</Text>
    </View>
  );
}

function DetailsScreen() {
  const book = useRoute<RouteProp<RootStackParamList, "Details">>().params.book;
  const { title, releaseDate, cover, description, pages } = book;
  const { colors } = useTheme();
  const { t } = useTranslation();

  const themedStyles = useMemo(
    () => ({
      detailsContainer: { backgroundColor: colors.background },
      statsContainer: { backgroundColor: colors.highlight },
      statDivider: { backgroundColor: colors.secondary },
      title: { color: colors.text },
      description: { color: colors.secondary },
    }),
    [colors]
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Image
        source={{ uri: cover }}
        style={styles.cover}
        resizeMode="contain"
      />
      <View style={[styles.detailsContainer, themedStyles.detailsContainer]}>
        <View style={styles.titleSection}>
          <Text style={[styles.title, themedStyles.title]}>{title}</Text>
          <View style={styles.actionButtons}>
            <ShareButton book={book} />
            <ToggleFavoriteButton book={book} />
          </View>
        </View>
        <View style={[styles.statsContainer, themedStyles.statsContainer]}>
          <StatsSection
            title={t("bookDetails.releaseDate")}
            value={releaseDate}
          />
          <View style={[styles.statDivider, themedStyles.statDivider]} />
          <StatsSection title={t("bookDetails.pages")} value={`${pages}`} />
        </View>
        <Text style={[styles.description, themedStyles.description]}>
          {description}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "rgba(0,0,0,0.8)" },
  cover: { margin: 30, height: Math.max(height, width) * 0.45 },
  detailsContainer: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    flexShrink: 1,
  },
  statsContainer: {
    flexDirection: "row",
    marginVertical: 20,
    padding: 15,
    borderRadius: 16,
    marginBottom: 20,
    alignItems: "center",
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statLabel: {
    fontSize: 12,
    marginTop: 4,
    marginBottom: 2,
  },
  statValue: {
    fontSize: 14,
    fontWeight: "600",
  },
  statDivider: {
    width: 1,
    height: "80%",
    marginHorizontal: 15,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  titleSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  actionButtons: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
});

export default DetailsScreen;
