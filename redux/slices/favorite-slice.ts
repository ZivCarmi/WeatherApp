import { Favorite } from "@/types/favorite";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const getFromLocalStorage = (): Favorite[] => {
  if (typeof window === "undefined") {
    return [];
  }

  const favorites = localStorage.getItem("favorites");

  return favorites ? JSON.parse(favorites) : [];
};

export interface FavoritesState {
  favorites: Favorite[];
}

const initialState: FavoritesState = {
  favorites: getFromLocalStorage(),
};

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addToFavorite: (state, action: PayloadAction<Favorite>) => {
      state.favorites.push(action.payload);
    },
    removeFromFavorite: (state, action: PayloadAction<Favorite["cityKey"]>) => {
      state.favorites = state.favorites.filter(
        (fav) => fav.cityKey !== action.payload
      );
    },
  },
});

export const { addToFavorite, removeFromFavorite } = favoritesSlice.actions;

export default favoritesSlice.reducer;
