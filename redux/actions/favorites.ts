import { Favorite } from "@/types/favorite";
import { addToFavorite, removeFromFavorite } from "../slices/favorite-slice";
import { AppThunk } from "../store";

export const addToFavoriteThunk = (favoriteItem: Favorite): AppThunk => {
  return (dispatch, getState) => {
    const { favorites } = getState().favorites;
    dispatch(addToFavorite(favoriteItem));

    localStorage.setItem(
      "favorites",
      JSON.stringify([...favorites, favoriteItem])
    );
  };
};

export const removeFromFavoriteThunk = (
  favoriteItemKey: Favorite["cityKey"]
): AppThunk => {
  return (dispatch, getState) => {
    dispatch(removeFromFavorite(favoriteItemKey));

    localStorage.setItem(
      "favorites",
      JSON.stringify(getState().favorites.favorites)
    );
  };
};
