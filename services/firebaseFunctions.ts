import { doc, setDoc } from "firebase/firestore";
import { registerUserCol } from "@/services/firebase";

export const createUserInFirestore = async (
  uid: string,
  email: string,
  name: string
) => {
  const docRef = doc(registerUserCol, uid);
  await setDoc(docRef, {
    uid,
    email,
    _id: docRef.id,
    name,
  });
};
