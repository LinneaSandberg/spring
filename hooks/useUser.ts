import { userCol } from "../services/firebase";
import { useAuth } from "./useAuth";
import useStreamDocument from "./useStreamDocument";

const useUser = () => {
  const { currentUser } = useAuth();

  return useStreamDocument(userCol, currentUser?.uid);
};

export default useUser;
