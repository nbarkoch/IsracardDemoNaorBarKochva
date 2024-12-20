import { ActivityIndicator, StyleSheet } from "react-native";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { SafeAreaView } from "react-native-safe-area-context";

import { QueryClientProvider } from "@tanstack/react-query";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { RootStackParamList } from "~/navigation/navigations";
import MainScreen from "~/screens/MainScreen";
import DetailsScreen from "~/screens/DetailsScreen";
import { getQueryClient } from "~/utils/network";
import { persistor, store } from "~/store/store";
import { useTheme } from "~/hooks";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const queryClient = getQueryClient();
  const { isDark } = useTheme();
  return (
    <Provider store={store}>
      <PersistGate
        loading={<ActivityIndicator size="large" />}
        persistor={persistor}
      >
        <QueryClientProvider client={queryClient}>
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
                    title: "Book Info",
                  }}
                  component={DetailsScreen}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </SafeAreaView>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
