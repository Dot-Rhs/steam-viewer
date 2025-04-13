import { useContext } from "react";
import { GlobalContext } from "..";

const useGlobalContext = () => {
  const context = useContext(GlobalContext);

  if (context) {
    return context;
  }

  throw new Error("No context found");
};

export default useGlobalContext;
