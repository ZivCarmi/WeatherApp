import useTempMode from "@/hooks/useTempMode";
import { cn } from "@/lib/utils";

type LocationItemTempProps = {
  value: number;
  className?: string;
};

const LocationItemTemp: React.FC<LocationItemTempProps> = ({
  value,
  className,
}) => {
  const { tempSign } = useTempMode();

  if (!value) {
    return <p className={cn("", className)}>Unavailable</p>;
  }

  return (
    <div className={cn("font-semibold", className)}>
      {Math.round(value)}°<span>{tempSign}</span>
    </div>
  );
};

export default LocationItemTemp;
