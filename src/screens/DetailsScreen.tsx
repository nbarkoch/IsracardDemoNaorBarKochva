import { RouteProp, useRoute } from "@react-navigation/native";
import React from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { RootStackParamList } from "../navigation/navigations";
import ToggleFavoriteButton from "../components/ToggleFavoriteButton";

const { height } = Dimensions.get("window");

interface StatsSectionProps {
  title: string;
  value: string;
}

function StatsSection({ title, value }: StatsSectionProps) {
  return (
    <View style={styles.statItem}>
      <Text style={styles.statLabel}>{title}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );
}

function DetailsScreen() {
  const book = useRoute<RouteProp<RootStackParamList, "Details">>().params.book;
  const { title, releaseDate, cover, description, pages } = book;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Image
        source={{ uri: cover }}
        style={styles.cover}
        resizeMode="contain"
      />
      <View style={styles.detailsContainer}>
        <View style={styles.titleSection}>
          <Text style={[styles.title]}>{title}</Text>
          <ToggleFavoriteButton book={book} />
        </View>
        <View style={styles.statsContainer}>
          <StatsSection title={"Release Date"} value={releaseDate} />
          <View style={styles.statDivider} />
          <StatsSection title={"Pages"} value={`${pages}`} />
        </View>
        <Text style={styles.description}>{description}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "rgba(0,0,0,0.8)" },
  cover: { height: height * 0.45, margin: 30 },
  detailsContainer: {
    backgroundColor: "#fff",
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
    backgroundColor: "#f8f8f8",
    borderRadius: 16,
    marginBottom: 20,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
    marginBottom: 2,
  },
  statValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  statDivider: {
    width: 1,
    height: "80%",
    backgroundColor: "#e0e0e0",
    marginHorizontal: 15,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#4a4a4a",
  },
  titleSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default DetailsScreen;
