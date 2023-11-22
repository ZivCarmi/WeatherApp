import { City } from "@/types/city";
import Locationitem from "./Locationitem";

const LocationList: React.FC<{ results: City[] }> = ({ results }) => {
  return (
    <ul className="grid gap-10">
      {results.map((city: City) => (
        <Locationitem
          key={city.Key}
          className="border p-4 rounded"
          cityKey={city.Key}
          countryName={city.Country.LocalizedName}
          cityName={city.LocalizedName}
        />
      ))}
    </ul>
  );
};

export default LocationList;
