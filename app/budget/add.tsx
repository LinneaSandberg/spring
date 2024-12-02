import BudgetForm from "@/components/BudgetForm";
import { useAuth } from "@/hooks/useAuth";
import { db } from "@/services/firebase";
import { Budget } from "@/types/Budget.types";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { Alert } from "react-native";

const AddBudgetScreen = () => {
    const { currentUser } = useAuth();

    const addMonthlyBudget = async (data: Budget) => {
        console.log("Adding monthly budget:", data);

        if (!currentUser) {
            throw new Error("User not authenticated");
        }

        try {
            const budgetsCollectionRef = collection(db, `users/${currentUser.uid}/budgets`);
            await addDoc(budgetsCollectionRef, {
                ...data,
                createdAt: serverTimestamp(),
            });
            Alert.alert('Budget saved successfully');

        } catch (error) {
            Alert.alert('Error!', 'Failed to save budget. Please try again.');
            console.error("Error submitting budget:", error);

        }
    };

    return <BudgetForm onSubmit={addMonthlyBudget} />;
};

export default AddBudgetScreen;