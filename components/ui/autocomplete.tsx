import { City } from "@/types/city";
import React from "react";

type AutocomplateProps = {
  options: City[];
};

const Autocomplete: React.FC<AutocomplateProps> = ({ options }) => {
  return (
    <div>
      <ul>
        {options.map((opt) => (
          <li key={opt.Key} className="flex">
            <div>
              {opt.LocalizedName}, {opt.Country.LocalizedName}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Autocomplete;
