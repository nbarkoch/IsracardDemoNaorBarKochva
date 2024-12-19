import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";

import {
  ActivityIndicator,
  Keyboard,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
} from "react-native";
import HomeTab from "./tabs/HomeTab";
import FavoritesTab from "./tabs/FavoritesTab";
import { Ionicons } from "@expo/vector-icons";

function MainScreen() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "gray",
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
