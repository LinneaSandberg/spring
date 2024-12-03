import BudgetForm from "@/components/BudgetForm";
import { useAuth } from "@/hooks/useAuth";
import useBudget from "@/hooks/useBudget";
import { db } from "@/services/firebase";
import { Budget } from "@/types/Budget.types";
import { useSearchParams } from "expo-router/build/hooks";
import { FirebaseError } from "firebase/app";
import { collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Alert, Text } from "react-native";

const EditBudgetScreen = () => {
    const { currentUser } = useAuth();
    const params = useSearchParams();
    const [month, setMonth] = useState<number | null>(null);
    const [year, setYear] = useState<number | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState(true);
    const { budget } = useBudget(month || 1, year || new Date().getFullYear());

    useEffect(() => {
        const fetchParams = async () => {
            try {
                const monthParam = parseInt(params.get('month') || "1");
                const yearParam = parseInt(params.get('year') || new Date().getFullYear().toString());
                setMonth(monthParam);
                setYear(yearParam);
            } catch (error) {
                setError(error as Error);
            } finally {
                setLoading(false);
            }
        };
        fetchParams();
    }, [params]);


    console.log("month", month);
    console.log("year", year);


    const updateMonthlyBudget = async (data: Budget) => {
        try {
            if (!currentUser) {
                throw new Error("User is not authenticated");
            }
            if (!budget || !budget._id) {
                throw new Error("Budget data is missing");
            }

            const budgetRef = doc(collection(db, `users/${currentUser.uid}/budgets`), budget._id);
            const sumOfFixedExpenses = Object.values(data.fixedExpenses).reduce((sum, cost) => sum + cost, 0);
            const remainingBalance = data.totalIncome - sumOfFixedExpenses;
            await updateDoc(budgetRef, { ...data, remaningBalance: remainingBalance, updatedAt: serverTimestamp() });
            Alert.alert("Success", "Budget updated successfully!");
        } catch (error) {
            if (error instanceof FirebaseError) {
                setError(error);
                console.error("FirebaseError", error.message);
            } else if (error instanceof Error) {
                setError(error);
                Alert.alert("Error", error.message);
            } else {
                setError(new Error("An unknown error occurred"));
            }

        }
    };

    if (loading) {
        return <Text>Loading...</Text>;
    }

    if (error) {
        return <Text>Error: {error.message}</Text>;
    }

    if (!budget) {
        return <Text>No budget found for this month.</Text>;
    }

    return <BudgetForm onSubmit={updateMonthlyBudget} initialValues={budget} />;
};

export default EditBudgetScreen;
