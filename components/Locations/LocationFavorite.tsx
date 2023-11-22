import {
  addToFavoriteThunk,
  removeFromFavoriteThunk,
} from "@/redux/actions/favorites";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Favorite } from "@/types/favorite";
import { FaRegHeart, FaHeart } from "react-icons/fa";

const LocationFavorite = () => {
  const { location } = useAppSelector((state) => state.search);
  const { favorites } = useAppSelector((state) => state.favorites);
  const isFavorite = favorites.find(
    (fav: Favorite) => fav.cityKey === location?.key
  );
  const dispatch = useAppDispatch();

  const favoriteHandler = () => {
    if (!location) return null;

    const cityObject: Favorite = {
      cityKey: location.key,
      cityName: location.city,
    };

    if (favorites.length === 0 || !isFavorite) {
      dispatch(addToFavoriteThunk(cityObject));
    } else {
      dispatch(removeFromFavoriteThunk(location.key));
    }
  };

  return (
    <button className="text-3xl" onClick={favoriteHandler}>
      {isFavorite ? <FaHeart /> : <FaRegHeart />}
    </button>
  );
};

export default LocationFavorite;
