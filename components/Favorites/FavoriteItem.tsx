import { Favorite } from "@/types/favorite";
import LocationItemTemp from "../Locations/LocationItemTemp";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { removeFromFavoriteThunk } from "@/redux/actions/favorites";
import { FaHeartCircleMinus } from "react-icons/fa6";
import { useGetCityConditionQuery } from "@/redux/api";
import useTempMode from "@/hooks/useTempMode";
import Loader from "../Theme/Loader";
import { useRouter } from "next/router";
import { setCityQuery } from "@/redux/slices/search-slice";
import { getLocation } from "@/redux/actions/search";
import TempIcon from "../Locations/TempIcon";

const FavoriteItem: React.FC<Favorite> = ({ cityKey, cityName }) => {
  const router = useRouter();
  const cityQuery = useAppSelector((state) => state.search.query);
  const dispatch = useAppDispatch();
  const { tempName } = useTempMode();
  const {
    data: cityConditions,
    isSuccess: conditionsSuccess,
    isLoading: conditionsLoading,
    isError: conditionsIsError,
  } = useGetCityConditionQuery(cityKey);

  const unfavoriteHandler = () => {
    dispatch(removeFromFavoriteThunk(cityKey));
  };

  const detailedFavoriteHandler = async () => {
    if (cityName === cityQuery) {
      return await router.push("/");
    }

    dispatch(setCityQuery(cityName));
    dispatch(getLocation(cityName));

    await router.push("/");
  };

  return (
    <li className="border rounded-2xl relative">
      <button
        className="text-3xl absolute right-4 top-4 text-destructive"
        onClick={unfavoriteHandler}
      >
        <FaHeartCircleMinus />
      </button>
      <button
        className="py-8 px-8 w-full h-full text-left"
        onClick={detailedFavoriteHandler}
      >
        {conditionsLoading && <Loader />}
        {conditionsSuccess && (
          <TempIcon
            icon={cityConditions[0]?.WeatherIcon}
            className="text-[60px]  lg:text-[130px] mb-4"
          />
        )}
        <h2 className="text-xl text-left lg:text-4xl lg:mb-2">{cityName}</h2>
        {conditionsSuccess && (
          <LocationItemTemp
            value={cityConditions[0]?.Temperature?.[tempName]?.Value}
            className="text-left text-2xl"
          />
        )}
        {conditionsIsError && <p>Could not fetch conditions</p>}
      </button>
    </li>
  );
};

export default FavoriteItem;
