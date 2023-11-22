import { getDayName } from "@/lib/utils";
import { useGetCityConditionQuery, useGetCityForecastQuery } from "@/redux/api";
import { CityDayForecast } from "@/types/cityDayForecast";
import LocationItemTemp from "./LocationItemTemp";
import LocationFavorite from "./LocationFavorite";
import useTempMode from "@/hooks/useTempMode";
import Loader from "../Theme/Loader";

type LocationItemProps = {
  countryName: string;
  cityName: string;
  cityKey: string;
  className: string;
};

const Locationitem: React.FC<LocationItemProps> = ({
  countryName,
  cityName,
  cityKey,
  className,
}) => {
  const { isMetric, tempName, tempSign } = useTempMode();
  const {
    data: cityConditions,
    isSuccess: conditionsSuccess,
    isLoading: conditionsLoading,
    isError: conditionsIsError,
  } = useGetCityConditionQuery(cityKey);
  const {
    data: cityForecast,
    isSuccess: forecastSuccess,
    isLoading: forecastLoading,
    isError: forecastIsError,
  } = useGetCityForecastQuery({ key: cityKey, isMetric });

  return (
    <li className={className || ""}>
      <div className="flex justify-between">
        <div>
          <h2 className="text-4xl">
            {cityName}, {countryName}
          </h2>
          <div className="mt-2">
            {new Date().toLocaleDateString("en-US", {
              dateStyle: "long",
            })}
          </div>
        </div>
        {conditionsLoading && <Loader />}
        {conditionsSuccess && (
          <LocationFavorite cityName={cityName} cityKey={cityKey} />
        )}
      </div>
      <div className="py-4 text-3xl flex flex-col items-center justify-center">
        {conditionsLoading && <Loader />}
        {conditionsSuccess && (
          <>
            {cityConditions[0]?.WeatherText}
            <div className="flex text-6xl">
              <LocationItemTemp
                value={cityConditions[0]?.Temperature?.[tempName]?.Value}
              />
            </div>
          </>
        )}
        {conditionsIsError && <p>Could not fetch condtions</p>}
      </div>
      <ul className="grid grid-cols-5">
        {forecastLoading && <Loader />}
        {forecastSuccess &&
          cityForecast?.DailyForecasts?.map((dayForecast: CityDayForecast) => (
            <li key={dayForecast.EpochDate}>
              <div className="text-3xl">
                {getDayName(new Date(dayForecast.Date))}
              </div>
              <div className="flex gap-1">
                <LocationItemTemp
                  value={dayForecast.Temperature.Minimum.Value}
                  showMode={false}
                />{" "}
                -{" "}
                <LocationItemTemp
                  value={dayForecast.Temperature.Maximum.Value}
                  showMode={false}
                />
              </div>
              <div>{tempSign}</div>
            </li>
          ))}
        {forecastIsError && <p>Could not fetch 5 days forecast</p>}
      </ul>
    </li>
  );
};

export default Locationitem;
