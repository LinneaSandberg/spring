import BudgetForm from "@/components/forms/BudgetForm";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useAuth } from "@/hooks/useAuth";
import useBudget from "@/hooks/useBudget";
import { db } from "@/services/firebase";
import { Budget, BudgetFormValues } from "@/types/Budget.types";
import { useSearchParams } from "expo-router/build/hooks";
import { useRouter } from "expo-router";
import { FirebaseError } from "firebase/app";
import { collection, doc, serverTimestamp, Timestamp, updateDoc } from "firebase/firestore";
import { Alert } from "react-native";
import { ThemedText } from "@/components/ThemedText";

const EditBudgetScreen = () => {
    const { currentUser } = useAuth();
    const params = useSearchParams();
    const month = parseInt(params.get('month') || "1");
    const year = parseInt(params.get('year') || new Date().getFullYear().toString());
    const { budget, loading: budgetLoading } = useBudget(month, year);
    const router = useRouter();

    const updateMonthlyBudget = async (data: BudgetFormValues) => {
        if (!currentUser) return;

        if (!budget) throw new Error("Budget data is missing");

        try {
            const budgetRef = doc(collection(db, `users/${currentUser.uid}/budgets`), budget._id);
            const sumOfFixedExpenses = Object.values(data.fixedExpenses).reduce((sum, cost) => sum + cost, 0);
            const remainingBalance = data.totalIncome - sumOfFixedExpenses;
            const amountAfterBudgetting = remainingBalance - (data.plannedSaving ?? 0);


            const updatedBudget: Partial<Budget> = {
                ...data,
                remainingBalance: remainingBalance,
                amountAfterBudgetting: amountAfterBudgetting,
                updatedAt: serverTimestamp() as Timestamp,
            };

            await updateDoc(budgetRef, updatedBudget);

            Alert.alert("Success", "Budget updated successfully!");

            setTimeout(() => {
                router.replace('/home');
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

    if (!budget) {
        return <ThemedText>No budget found for this month.</ThemedText>;
    }

    return <BudgetForm onSubmit={updateMonthlyBudget} initialValues={budget} />;
};

export default EditBudgetScreen;