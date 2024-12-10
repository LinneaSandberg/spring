import { CreateUser, User } from "@/types/Auth.types";
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getFirestore,
  DocumentData,
  collection,
  CollectionReference,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);

/**
 * The function `createCollection` creates a collection reference in Firestore with the specified name.
 * @param {string} collectionName - The `collectionName` parameter is a string that represents the name
 * of the collection in Firestore that you want to create or access.
 * @returns A CollectionReference of type T is being returned.
 */
const createCollection = <T = DocumentData>(collectionName: string) => {
  return collection(db, collectionName) as CollectionReference<T>;
};

export const userCol = createCollection<User>("users");
export const registerUserCol = createCollection<CreateUser>("users");

/**
 * The function `getUserBudgets` retrieves the budgets associated with a specific user from a database
 * collection.
 * @param {string} userId - The `userId` parameter is a string that represents the unique identifier of
 * a user. It is used to retrieve the budgets associated with that specific user from the database.
 * @returns The function `getUserBudgets` is returning a reference to the "budgets" collection for a
 * specific user identified by the `userId` parameter.
 */
export const getUserBudgets = (userId: string) => {
  return collection(db, "users", userId, "budgets");
};

export { auth };
