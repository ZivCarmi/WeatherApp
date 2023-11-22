import {
  addToFavoriteThunk,
  removeFromFavoriteThunk,
} from "@/redux/actions/favorites";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Favorite } from "@/types/favorite";
import { FaRegHeart, FaHeart } from "react-icons/fa";

type LocationFavorite = {
  cityName: string;
  cityKey: string;
};

const LocationFavorite: React.FC<LocationFavorite> = ({
  cityKey,
  cityName,
}) => {
  const { favorites } = useAppSelector((state) => state.favorites);
  const isFavorite = favorites.find((fav: Favorite) => fav.cityKey === cityKey);
  const dispatch = useAppDispatch();

  const favoriteHandler = () => {
    const cityObject: Favorite = {
      cityKey,
      cityName,
    };

    if (favorites.length === 0 || !isFavorite) {
      dispatch(addToFavoriteThunk(cityObject));
    } else {
      dispatch(removeFromFavoriteThunk(cityKey));
    }
  };

  return (
    <div>
      <button className="text-3xl" onClick={favoriteHandler}>
        {isFavorite ? <FaHeart /> : <FaRegHeart />}
      </button>
    </div>
  );
};

export default LocationFavorite;
