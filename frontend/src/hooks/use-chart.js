import { useContext } from "react";
import { ChartContext } from "../contexts/chart-context";

const useChart = () => {
  const context = useContext(ChartContext);
  if (!context) {
    throw Error("The hook useLists must be used within ListsProvider");
  }
  return context;
};

export default useChart;
