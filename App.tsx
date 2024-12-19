import { ActivityIndicator, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./src/navigation/navigations";
import MainScreen from "./src/screens/MainScreen";
import DetailsScreen from "./src/screens/DetailsScreen";
import { QueryClientProvider } from "@tanstack/react-query";
import { getQueryClient } from "./src/utils/network";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./src/store/store";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const queryClient = getQueryClient();
  return (
    <Provider store={store}>
      <PersistGate
        loading={<ActivityIndicator size="large" />}
        persistor={persistor}
      >
        <QueryClientProvider client={queryClient}>
          <SafeAreaView style={styles.container}>
            <NavigationContainer>
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
