import { useEffect } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { resetSuggestions, setCityQuery } from "@/redux/slices/search-slice";
import Loader from "@/components/Theme/Loader";
import Autocomplete from "@/components/ui/autocomplete";
import {
  fetchDefaultCity,
  getGeoposition,
  getSuggestions,
} from "@/redux/actions/search";
import LocationItem from "@/components/Locations/LocationItem";
import { useToast } from "@/components/ui/use-toast";

const Home = () => {
  const cityQuery = useAppSelector((state) => state.search.query);
  const {
    suggestions,
    location,
    isFetchingSuggestions,
    isFetchingLocation,
    errorLocation,
    errorSuggestions,
  } = useAppSelector((state) => state.search);
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  const changeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    dispatch(setCityQuery(value));

    if (value === "") {
      return dispatch(resetSuggestions());
    }

    dispatch(getSuggestions(value));
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        dispatch(
          getGeoposition(position.coords.latitude, position.coords.longitude)
        );
      },
      function (error) {
        if (error.code == error.PERMISSION_DENIED)
          dispatch(fetchDefaultCity("Tel Aviv"));
      }
    );
  }, []);

  useEffect(() => {
    if (errorLocation) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: errorLocation,
        duration: 5000,
      });
    }

    if (errorSuggestions) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: errorSuggestions,
        duration: 5000,
      });
    }
  }, [errorLocation, errorSuggestions]);

  return (
    <>
      <div className="flex justify-center items-center flex-col gap-4 mb-4 sm:h-56">
        <Autocomplete options={suggestions}>
          <span className="text-sm pl-3">
            <FaMagnifyingGlass />
          </span>
          <Input
            className="border-none focus-visible:ring-transparent focus-visible:ring-offset-0"
            onChange={changeHandler}
            value={cityQuery}
            placeholder="Search by city name"
          />
          {isFetchingSuggestions && <Loader size={22} className="pr-3" />}
        </Autocomplete>
      </div>
      {isFetchingLocation && <Loader />}
      {!isFetchingLocation && location && <LocationItem key={location.key} />}
    </>
  );
};

export default Home;
