import { FormEvent, useState, useEffect } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Input } from "@/components/ui/input";
import { useLazyGetCityQuery } from "@/redux/api";
import { City } from "@/types/city";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setCityQuery, setCityResults } from "@/redux/slices/search-slice";
import LocationList from "@/components/Locations/LocationList";
import Loader from "@/components/Theme/Loader";
import { useRouter } from "next/router";
import Autocomplete from "@/components/ui/autocomplete";

const Home = () => {
  const router = useRouter();
  const cityQuery = useAppSelector((state) => state.search.query);
  const cachedCities = useAppSelector((state) => state.search.results);
  const [query, setQuery] = useState(cityQuery);
  const dispatch = useAppDispatch();
  const [getCities, citiesResult] = useLazyGetCityQuery();
  let citiesToDisplay: City[] = [];
  const isLoading = citiesResult.isLoading || citiesResult.isFetching;
  const serviceUnavailable = citiesResult.data?.Code === "ServiceUnavailable";

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(setCityQuery(query));

    const citiesData = await getCities({ query }).unwrap();

    dispatch(setCityResults(citiesData));
  };

  useEffect(() => {
    const fetchCityByKey = async () => {
      if (!router.query?.cityKey) return;

      const citiesData = await getCities({
        key: router.query?.cityKey,
      }).unwrap();

      console.log(citiesData);

      const city: City = {
        Country: {
          LocalizedName: citiesData?.Country?.LocalizedName,
        },
        Key: router.query?.cityKey + "",
        LocalizedName: query,
      };

      dispatch(setCityResults([city]));
    };

    const fetchDefaultCity = async () => {
      if (cachedCities?.length !== 0) return;

      const citiesData = await getCities({ query }).unwrap();

      dispatch(setCityResults(citiesData));
    };

    if (router.query?.cityKey) {
      fetchCityByKey();
    } else {
      fetchDefaultCity();
    }
  }, []);

  if (cachedCities.length > 0) {
    citiesToDisplay = cachedCities;
  } else if (citiesResult.data?.length > 0) {
    citiesToDisplay = citiesResult.data;
  }

  return (
    <>
      <div className="flex justify-center items-center flex-col gap-4 h-60">
        <form
          className="flex items-center border rounded pl-3 w-96"
          onSubmit={submitHandler}
        >
          <span className="text-sm">
            <FaMagnifyingGlass />
          </span>
          <Input
            className="border-none focus-visible:ring-transparent focus-visible:ring-offset-0"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            placeholder="Search by city name"
          />
          <Autocomplete />
          <Button variant="secondary">Search</Button>
        </form>
      </div>
      <div>
        {isLoading && <Loader />}
        {!citiesResult.isLoading && !citiesResult.isFetching && (
          <>
            {citiesToDisplay.length > 0 ? (
              <LocationList results={citiesToDisplay} />
            ) : serviceUnavailable ? (
              <div className="text-center">
                <h2 className="text-3xl">Service Unavailable</h2>
                <p className="text-lg mt-2">{citiesResult.data?.Message}</p>
              </div>
            ) : (
              citiesResult.isSuccess && (
                <div className="text-center">
                  <h2 className="text-3xl">Nothing found :(</h2>
                  <p className="text-lg mt-2">
                    Make sure you spell the city name correctly
                  </p>
                </div>
              )
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Home;
