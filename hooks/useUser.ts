import { userCol } from "../services/firebase";
import { useAuth } from "./useAuth";
import useStreamDocument from "./useStreamDocument";

const useUser = () => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    throw new Error("You must be logged in to use this hook");
  }

  return useStreamDocument(userCol, currentUser.uid);
};

export default useUser;
