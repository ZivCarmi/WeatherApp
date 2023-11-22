import { useAppSelector } from "@/redux/hooks";

const LocationItemTemp: React.FC<{ value: number; showMode?: boolean }> = ({
  value,
  showMode = true,
}) => {
  const { metric } = useAppSelector((state) => state.ui);
  const mode = showMode ? (metric ? "C" : "F") : null;

  if (!value) {
    return <p>Could not get temprature</p>;
  }

  return (
    <div>
      {Math.round(value)}°<span>{mode}</span>
    </div>
  );
};

export default LocationItemTemp;
