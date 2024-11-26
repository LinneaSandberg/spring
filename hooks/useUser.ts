import { where } from "firebase/firestore";
import { userCol } from "../services/firebase";
import useStreamCollection from "./useStreamCollection";

const useUser = (uid: string = "") => {
  return useStreamCollection(userCol, where("uid", "==", uid));
};

export default useUser;
