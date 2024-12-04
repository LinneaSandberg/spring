import BudgetForm from "@/components/forms/BudgetForm";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useAuth } from "@/hooks/useAuth";
import useBudget from "@/hooks/useBudget";
import { db } from "@/services/firebase";
import { Budget } from "@/types/Budget.types";
import { useSearchParams } from "expo-router/build/hooks";
import { useRouter } from "expo-router";
import { FirebaseError } from "firebase/app";
import { collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { Alert, Text } from "react-native";

const EditBudgetScreen = () => {
    const { currentUser } = useAuth();
    const params = useSearchParams();
    const month = parseInt(params.get('month') || "1");
    const year = parseInt(params.get('year') || new Date().getFullYear().toString());
    const { budget, error: budgetError, loading: budgetLoading } = useBudget(month, year);
    const router = useRouter();

    const updateMonthlyBudget = async (data: Budget) => {
        if (!currentUser) return;

        if (!budget) throw new Error("Budget data is missing");

        try {
            const budgetRef = doc(collection(db, `users/${currentUser.uid}/budgets`), budget._id);
            const sumOfFixedExpenses = Object.values(data.fixedExpenses).reduce((sum, cost) => sum + cost, 0);
            const remainingBalance = data.totalIncome - sumOfFixedExpenses;
            await updateDoc(budgetRef, { ...data, remaningBalance: remainingBalance, updatedAt: serverTimestamp() });
            Alert.alert("Success", "Budget updated successfully!");

            setTimeout(() => {
                router.replace('/budget');
            }, 2000);

        } catch (error) {
            if (error instanceof FirebaseError) {
                Alert.alert("FirebaseError", error.message);
            } else if (error instanceof Error) {
                Alert.alert("Error", error.message);
            } else {
                Alert.alert("An error occurred");
            }
        }
    };

    if (budgetLoading) return <LoadingSpinner />;

    if (budgetError) {
        return <Text>Error: {budgetError.message}</Text>;
    }

    if (!budget) {
        return <Text>No budget found for this month.</Text>;
    }

    return <BudgetForm onSubmit={updateMonthlyBudget} initialValues={budget} />;
};

export default EditBudgetScreen;
