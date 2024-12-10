import { doc, setDoc } from "firebase/firestore";
import { registerUserCol } from "@/services/firebase";

/**
 * The function `createUserInFirestore` creates a new user document in Firestore with the provided UID,
 * email, and name.
 * @param {string} uid - The `uid` parameter is a string that represents the unique identifier of the
 * user. It is typically used to uniquely identify a user in a system or database.
 * @param {string} email - The `email` parameter in the `createUserInFirestore` function represents the
 * email address of the user being created in the Firestore database. This email will be stored as part
 * of the user's document in Firestore.
 * @param {string} name - The `name` parameter in the `createUserInFirestore` function represents the
 * name of the user being created in the Firestore database. It is a string value that should be
 * provided when calling the function to store the user's name in the database along with other user
 * details like `uid` and `
 */
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
