import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { useTranslation } from "react-i18next";

import MainScreen from "~/screens/MainScreen";
import DetailsScreen from "~/screens/DetailsScreen";
import { RootStackParamList } from "~/navigation/navigations";
import { useTheme } from "~/hooks";

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootScreen() {
  const { isDark } = useTheme();
  const { t } = useTranslation();
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
        <Stack.Navigator initialRouteName="Main">
          <Stack.Screen
            name="Main"
            options={{ headerShown: false }}
            component={MainScreen}
          />
          <Stack.Screen
            name="Details"
            options={{
              title: t("common.bookInfo"),
            }}
            component={DetailsScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default RootScreen;
