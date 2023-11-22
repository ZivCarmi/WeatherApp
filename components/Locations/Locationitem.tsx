import { getDayName } from "@/lib/utils";
import { useGetCityConditionQuery, useGetCityForecastQuery } from "@/redux/api";
import { CityDayForecast } from "@/types/cityDayForecast";
import LocationItemTemp from "./LocationItemTemp";
import LocationFavorite from "./LocationFavorite";
import useTempMode from "@/hooks/useTempMode";
import Loader from "../Theme/Loader";
import { useAppSelector } from "@/redux/hooks";
import TempIcon from "./TempIcon";

const LocationItem = () => {
  const { location } = useAppSelector((state) => state.search);
  const { isMetric, tempName } = useTempMode();
  const {
    data: cityConditions,
    isSuccess: conditionsSuccess,
    isLoading: conditionsLoading,
    isError: conditionsIsError,
  } = useGetCityConditionQuery(location?.key);
  const {
    data: cityForecast,
    isSuccess: forecastSuccess,
    isLoading: forecastLoading,
    isError: forecastIsError,
  } = useGetCityForecastQuery({ key: location?.key, isMetric });

  return (
    <div className="rounded flex gap-8 flex-col lg:flex lg:flex-row">
      <div className="text-3xl flex-1 flex flex-col relative lg:justify-between px-4">
        <div className="flex justify-between">
          {conditionsSuccess && (
            <TempIcon
              icon={cityConditions[0]?.WeatherIcon}
              className="text-[80px] lg:text-[130px]"
            />
          )}
          <div className="mr-2 py-4 absolute right-0">
            {conditionsSuccess && <LocationFavorite />}
          </div>
        </div>
        <div>
          {conditionsLoading && <Loader />}
          {conditionsSuccess && (
            <div className="flex text-5xl mb-2 lg:mb-6 gap-10 text-center lg:text-8xl lg:text-left">
              <LocationItemTemp
                value={cityConditions[0]?.Temperature?.[tempName]?.Value}
              />
            </div>
          )}
          {conditionsIsError && <p>Could not fetch condtions</p>}
          <div>
            <h2 className="text-2xl lg:text-5xl lg:mb-3 text-foreground">
              {location?.city}, <span>{location?.country}</span>
            </h2>
            <div className="text-base lg:text-lg">
              {new Date().toLocaleDateString("en-US", {
                dateStyle: "long",
              })}
            </div>
          </div>
          {conditionsLoading && <Loader />}
        </div>
      </div>

      <div className="flex-1 border px-8 py-10 rounded-2xl">
        <h2 className="text-xl border-b pb-5 mb-5">5-Day Forecast</h2>
        {forecastLoading && <Loader className="mt-5" />}
        {forecastSuccess && (
          <ul className="grid gap-8">
            {cityForecast?.DailyForecasts?.map(
              (dayForecast: CityDayForecast, idx: number) => (
                <li
                  key={dayForecast.EpochDate}
                  className="flex flex-col sm:flex-row items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4 w-full">
                    <div className="text-2xl">
                      {idx === 0
                        ? "Today"
                        : getDayName(new Date(dayForecast.Date))}
                    </div>
                    <div className="lg:w-[60px] flex justify-start sm:mx-auto">
                      <TempIcon
                        icon={dayForecast.Day.Icon}
                        className="text-[20px] sm:text-[30px]"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-8 flex-grow w-full">
                    <LocationItemTemp
                      value={dayForecast.Temperature.Minimum.Value}
                      className="text-center w-[35px]"
                    />
                    <div className="w-full h-[6px] bg-primary rounded"></div>
                    <LocationItemTemp
                      value={dayForecast.Temperature.Maximum.Value}
                      className="text-end w-[35px]"
                    />
                  </div>
                </li>
              )
            )}
          </ul>
        )}
        {forecastIsError && (
          <p className="text-center">Forecast data unavailable</p>
        )}
      </div>
    </div>
  );
};

export default LocationItem;
