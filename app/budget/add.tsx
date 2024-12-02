import BudgetForm from "@/components/BudgetForm";
import { useAuth } from "@/hooks/useAuth";
import saveMonthlyBudget from "@/services/budgetFunctions/saveMonthlyBudget";
import { MonthlyBudget } from "@/types/Budget.types";
import { Alert, Text, View, StyleSheet } from "react-native";

const AddBudgetScreen = () => {
    const { currentUser } = useAuth();

    const addBudget = async (data: MonthlyBudget) => {
        if (!currentUser) return;

        try {
            await saveMonthlyBudget(currentUser.uid, data);
            Alert.alert("Success", "Budget added successfully");
        } catch (error) {
            Alert.alert("Error", "An error occurred while adding the budget");
        }
    };

    return (
        <View style={styles.container}>
            <Text>Add Budget</Text>
            <BudgetForm initialBudget={null} onSubmit={addBudget} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        marginTop: 40,
        fontSize: 28,
        marginBottom: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#2C3E50',
    }
});

export default AddBudgetScreen;