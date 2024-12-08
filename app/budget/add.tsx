import BudgetForm from "@/components/forms/BudgetForm";
import { useAuth } from "@/hooks/useAuth";
import { db } from "@/services/firebase";
import { BudgetFormValues } from "@/types/Budget.types";
import { useRouter } from "expo-router";
import { FirebaseError } from "firebase/app";
import { addDoc, collection, serverTimestamp, updateDoc } from "firebase/firestore";
import { Alert } from "react-native";

const AddBudgetScreen = () => {
    const { currentUser } = useAuth();
    const router = useRouter();

    const addMonthlyBudget = async (data: BudgetFormValues) => {
        if (!currentUser) return;

        try {
            const budgetsCollectionRef = collection(db, `users/${currentUser.uid}/budgets`);
            const sumOfFixedExpenses = Object.values(data.fixedExpenses).reduce((sum, cost) => sum + (cost || 0), 0);
            const remainingBalance = data.totalIncome - sumOfFixedExpenses;

            const docRef = await addDoc(budgetsCollectionRef, {
                ...data,
                remaningBalance: remainingBalance,
                variableExpenses: {
                    totalSum: 0,
                    expenses: [],
                },
                createdAt: serverTimestamp(),
            });

            await updateDoc(docRef, { _id: docRef.id });

            Alert.alert('Budget saved successfully');

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
    return <BudgetForm onSubmit={addMonthlyBudget} />;
};

export default AddBudgetScreen;