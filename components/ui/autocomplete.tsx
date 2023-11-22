import React from "react";
import { City } from "@/types/city";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setCityQuery, setShowDropdown } from "@/redux/slices/search-slice";
import { getLocation } from "@/redux/actions/search";
import { AnimatePresence, motion } from "framer-motion";

type AutocomplateProps = {
  options: City[];
  children: React.ReactNode;
};

const Autocomplete: React.FC<AutocomplateProps> = ({ options, children }) => {
  const { showDropdown } = useAppSelector((state) => state.search);
  const dispatch = useAppDispatch();

  const autocompleteHandler = (city: string) => {
    dispatch(setShowDropdown());
    dispatch(setCityQuery(city));
    dispatch(getLocation(city));
  };

  return (
    <motion.div
      className="relative w-full sm:w-96 flex items-center border rounded"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeOut" }}
    >
      {children}
      <AnimatePresence>
        {showDropdown && (
          <motion.ul
            className="absolute top-full w-full h-[250px] overflow-y-auto bg-card shadow-md z-10"
            initial={{ opacity: 0, y: 2 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ease: "easeOut" }}
          >
            {options.map((opt) => (
              <li key={opt.key} className="group">
                <button
                  className="flex text-sm w-full hover:bg-primary-foreground p-2 group-[&:not(:last-child)]:border-b px-4"
                  onClick={() => autocompleteHandler(opt.city)}
                >
                  {opt.city}, {opt.country}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Autocomplete;
