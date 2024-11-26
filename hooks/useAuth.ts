import { useContext } from "react";
import { AuthContext } from "@/context/AuthContextProvider";

export const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("This hook must be used within an AuthContextProvider!");
  }

  return authContext;
};
