import BudgetForm from "@/components/BudgetForm";
import { useAuth } from "@/hooks/useAuth";
import useCurrentBudget from "@/hooks/useCurrentBudget";
import updateMonthlyBudget from "@/services/budgetFunctions/updateMontlyBudget";
import { MonthlyBudget } from "@/types/Budget.types";
import { View, Text, StyleSheet, Alert } from "react-native";

const EditBudgetScreen = () => {
    const { currentUser } = useAuth();
    const currentBudget = useCurrentBudget();

    const updateBudget = async (data: MonthlyBudget) => {
        if (!currentUser || !currentBudget) return;

        try {
            await updateMonthlyBudget(currentUser.uid, currentBudget.id, data);
            Alert.alert("Success", "Budget updated successfully");
        } catch (error) {
            Alert.alert("Error", "An error occurred while updating the budget");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Update Budget</Text>
            {currentBudget && (
                <BudgetForm initialBudget={currentBudget} onSubmit={updateBudget} />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
});

export default EditBudgetScreen;
