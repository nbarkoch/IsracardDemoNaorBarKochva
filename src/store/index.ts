import {
  configureStore,
  createListenerMiddleware,
  isAnyOf,
} from "@reduxjs/toolkit";
import favoritesReducer, {
  setFavorites,
  setLoading,
  toggleFavorite,
} from "./favoritesSlice";
import { loadFavorites, saveFavorites } from "./favoritesAsyncStorage";

// favorites listener middleware
const favoritesListener = createListenerMiddleware();

// Listen for favorites changes and sync to AsyncStorage
favoritesListener.startListening({
  matcher: isAnyOf(toggleFavorite, setFavorites),
  effect: async (_, listenerApi) => {
    const state = listenerApi.getState() as RootState;
    await saveFavorites(state.favorites.favoriteBooks);
  },
});

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(favoritesListener.middleware),
});

// Initialize store with data from AsyncStorage
export const initializeStore = async (): Promise<void> => {
  store.dispatch(setLoading(true));
  const favorites = await loadFavorites();
  store.dispatch(setFavorites(favorites));
  store.dispatch(setLoading(false));
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
