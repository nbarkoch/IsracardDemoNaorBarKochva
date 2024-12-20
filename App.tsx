import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { I18nextProvider } from "react-i18next";
import { QueryClientProvider } from "@tanstack/react-query";
import * as SplashScreen from "expo-splash-screen";

import { getQueryClient } from "~/utils/network";
import { persistor, store } from "~/store/store";
import i18n from "~/translations/i18n";
import RootScreen from "~/screens/RootScreen";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const queryClient = getQueryClient();

  return (
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <PersistGate
          onBeforeLift={SplashScreen.hideAsync}
          persistor={persistor}
        >
          <QueryClientProvider client={queryClient}>
            <RootScreen />
          </QueryClientProvider>
        </PersistGate>
      </Provider>
    </I18nextProvider>
  );
}
