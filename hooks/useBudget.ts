import { where } from "firebase/firestore";
import { getUserBudgets } from "@/services/firebase";
import { useAuth } from "./useAuth";
import useStreamCollection from "./useStreamCollection";

const useBudget = (month: number, year: number) => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    throw new Error("User is not logged in");
  }

  const { data: budgets, loading } = useStreamCollection(
    getUserBudgets(currentUser.uid),
    where("month", "==", month),
    where("year", "==", year)
  );

  const budget = budgets?.[0] ?? null;

  return { budget, loading };
};

export default useBudget;
