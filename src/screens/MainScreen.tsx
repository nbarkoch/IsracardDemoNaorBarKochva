import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { StyleSheet } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { useTheme } from "~/hooks";

import FavoritesTab from "./tabs/FavoritesTab";
import HomeTab from "./tabs/HomeTab";

function MainScreen() {
  const Tab = createBottomTabNavigator();
  const { colors } = useTheme();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveBackgroundColor: colors.background,
        tabBarInactiveBackgroundColor: colors.background,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.secondary,
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "Home") {
            return (
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={size}
                color={color}
              />
            );
          } else if (route.name === "Favorites") {
            return (
              <Ionicons
                name={focused ? "heart" : "heart-outline"}
                size={size}
                color={color}
              />
            );
          }
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeTab}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesTab}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default MainScreen;
