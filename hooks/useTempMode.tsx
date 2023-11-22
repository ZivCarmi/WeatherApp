import { useAppSelector } from "@/redux/hooks";

const useTempMode = () => {
  const { metric } = useAppSelector((state) => state.ui);
  const tempModeName = metric ? "Metric" : "Imperial";
  const tempModeSign = metric ? "C" : "F";

  return {
    isMetric: metric,
    tempName: tempModeName,
    tempSign: tempModeSign,
  };
};

export default useTempMode;
