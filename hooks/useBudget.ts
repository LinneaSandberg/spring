import { query, where, getDocs, collection } from "firebase/firestore";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { Budget } from "@/types/Budget.types";
import { db } from "@/services/firebase";
import { Alert } from "react-native";

const useBudget = (month: number, year: number) => {
  const { currentUser } = useAuth();
  const [budget, setBudget] = useState<Budget | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchBudget = async () => {
      setLoading(true);
      setError(null);

      if (!currentUser) {
        throw new Error("User is not authenticated");
      }

      try {
        const q = query(
          collection(db, `users/${currentUser.uid}/budgets`),
          where("month", "==", month),
          where("year", "==", year)
        );

        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
          setBudget(null);
        } else {
          const budgetDoc = querySnapshot.docs[0];
          const budgetData = budgetDoc.data() as Budget;
          budgetData._id = budgetDoc.id;
          setBudget(budgetData);
        }
      } catch (error) {
        if (error instanceof Error) {
          Alert.alert("Error", error.message);
        } else {
          Alert.alert("Error", "Failed to fetch budget data");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBudget();
  }, [month, year]);

  return { budget, loading, error };
};

export default useBudget;
