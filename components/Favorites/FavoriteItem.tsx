import { Favorite } from "@/types/favorite";
import LocationItemTemp from "../Locations/LocationItemTemp";
import { useAppDispatch } from "@/redux/hooks";
import { removeFromFavoriteThunk } from "@/redux/actions/favorites";
import { FaHeartCircleMinus } from "react-icons/fa6";
import { useGetCityConditionQuery } from "@/redux/api";
import useTempMode from "@/hooks/useTempMode";
import Loader from "../Theme/Loader";
import { useRouter } from "next/router";
import { setCityQuery } from "@/redux/slices/search-slice";

const FavoriteItem: React.FC<Favorite> = ({ cityKey, cityName }) => {
  const router = useRouter();
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

  const detailedFavoriteHandler = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    dispatch(setCityQuery(cityName));

    await router.push(`/?cityKey=${cityKey}`);
  };

  return (
    <li className="border p-4 text-center min-h-[20rem] flex flex-col items-center justify-center rounded">
      <button className="text-3xl" onClick={unfavoriteHandler}>
        <FaHeartCircleMinus />
      </button>
      <button onClick={detailedFavoriteHandler}>
        <h2 className="text-4xl mb-4">{cityName}</h2>
        {conditionsLoading && <Loader />}
        {conditionsSuccess && (
          <>
            <LocationItemTemp
              value={cityConditions[0]?.Temperature?.[tempName]?.Value}
            />
            <div className="mt-8">{cityConditions[0]?.WeatherText}</div>
          </>
        )}
        {conditionsIsError && <p>Could not fetch condtions</p>}
      </button>
    </li>
  );
};

export default FavoriteItem;
