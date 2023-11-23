import { getDayName } from "@/lib/utils";
import { useGetCityConditionQuery, useGetCityForecastQuery } from "@/redux/api";
import { CityDayForecast } from "@/types/cityDayForecast";
import LocationItemTemp from "./LocationItemTemp";
import LocationFavorite from "./LocationFavorite";
import useTempMode from "@/hooks/useTempMode";
import Loader from "../Theme/Loader";
import { useAppSelector } from "@/redux/hooks";
import TempIcon from "./TempIcon";
import { motion } from "framer-motion";

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
      <div className="text-3xl flex-1 flex flex-col relative lg:justify-between px-4 gap-4">
        <div className="flex justify-between">
          {conditionsSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <TempIcon
                icon={cityConditions[0]?.WeatherIcon}
                className="text-[80px] lg:text-[130px]"
              />
            </motion.div>
          )}
          <div className="mr-2 py-4 absolute right-0">
            {conditionsSuccess && (
              <motion.div
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.35 }}
              >
                <LocationFavorite />
              </motion.div>
            )}
          </div>
        </div>
        <div>
          {conditionsLoading && <Loader />}
          {conditionsSuccess && (
            <motion.div
              className="flex text-5xl mb-2 lg:mb-6 gap-10 text-center lg:text-8xl lg:text-left"
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.35 }}
            >
              <LocationItemTemp
                value={cityConditions[0]?.Temperature?.[tempName]?.Value}
              />
            </motion.div>
          )}
          {conditionsIsError && <p>Could not fetch conditions</p>}
          <div>
            <motion.h2
              className="text-2xl lg:text-5xl lg:mb-3 text-foreground"
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.45 }}
            >
              {location?.city}, <span>{location?.country}</span>
            </motion.h2>
            <motion.div
              className="text-base lg:text-lg"
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.55 }}
            >
              {new Date().toLocaleDateString("en-US", {
                dateStyle: "long",
              })}
            </motion.div>
          </div>
          {conditionsLoading && <Loader />}
        </div>
      </div>

      <motion.div
        className="flex-1 border px-8 py-10 rounded-2xl"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h2 className="text-xl border-b pb-5 mb-5">5-Day Forecast</h2>
        {forecastLoading && <Loader className="mt-5" />}
        {cityForecast?.Code === "ServiceUnavailable" && (
          <div>
            Service Unavailable<p>{cityForecast?.Message}</p>
          </div>
        )}
        {forecastSuccess && (
          <ul className="grid gap-8">
            {cityForecast?.DailyForecasts?.map(
              (dayForecast: CityDayForecast, idx: number) => (
                <li
                  key={dayForecast.EpochDate}
                  className="flex flex-col sm:flex-row items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4 w-full">
                    <div className="text-2xl sm:min-w-[65px]">
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
      </motion.div>
    </div>
  );
};

export default LocationItem;
