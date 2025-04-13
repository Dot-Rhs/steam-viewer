import { useContext } from "react";
import { PlayerContext } from "..";

const useStateContext = () => {
  const context = useContext(PlayerContext);

  if (context) {
    return context;
  }

  throw new Error("No context found");
};

export default useStateContext;
