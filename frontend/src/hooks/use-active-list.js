import { useContext } from "react";
import { ActiveListContext } from "../contexts/active-list-context";

const useActiveList = () => {
  const context = useContext(ActiveListContext);
  if (!context) {
    throw Error(
      "The hook useActiveList must be used within ActiveListProvider"
    );
  }
  return context;
};

export default useActiveList;
