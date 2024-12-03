import BudgetForm from "@/components/BudgetForm";
import { useAuth } from "@/hooks/useAuth";
import { db } from "@/services/firebase";
import { Budget } from "@/types/Budget.types";
import { FirebaseError } from "firebase/app";
import { addDoc, collection, serverTimestamp, updateDoc } from "firebase/firestore";
import { Alert } from "react-native";

const AddBudgetScreen = () => {
    const { currentUser } = useAuth();

    const addMonthlyBudget = async (data: Budget) => {
        if (!currentUser) return;

        try {
            const budgetsCollectionRef = collection(db, `users/${currentUser.uid}/budgets`);
            const sumOfFixedExpenses = Object.values(data.fixedExpenses).reduce((sum, cost) => sum + (cost || 0), 0);
            const remainingBalance = data.totalIncome - sumOfFixedExpenses;

            const docRef = await addDoc(budgetsCollectionRef, {
                ...data,
                remainingBalance,
                createdAt: serverTimestamp(),
            });

            const updatedBudget = { ...data, _id: docRef.id };
            await updateDoc(docRef, { _id: updatedBudget._id });
            Alert.alert('Budget saved successfully');

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