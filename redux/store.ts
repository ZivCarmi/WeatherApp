import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import searchSlice from "./slices/search-slice";
import { api } from "@/redux/api";
import uiSlice from "./slices/ui-slice";
import favoritesSlice from "./slices/favorite-slice";

const store = configureStore({
  reducer: {
    ui: uiSlice,
    search: searchSlice,
    favorites: favoritesSlice,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
