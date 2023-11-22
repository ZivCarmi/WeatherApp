import FavoriteItem from "@/components/Favorites/FavoriteItem";
import { useAppSelector } from "@/redux/hooks";
import { AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

const Favorites = () => {
  const { favorites } = useAppSelector((state) => state.favorites);

  return (
    <ul className="grid md:grid-cols-3 gap-6">
      <AnimatePresence>
        {favorites?.map((fav) => (
          <FavoriteItem
            key={fav.cityKey}
            cityKey={fav.cityKey}
            cityName={fav.cityName}
          />
        ))}
      </AnimatePresence>
    </ul>
  );
};

export default dynamic(() => Promise.resolve(Favorites), {
  ssr: false,
});
