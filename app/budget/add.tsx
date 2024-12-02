import BudgetForm from "@/components/BudgetForm";
import { useAuth } from "@/hooks/useAuth";
import saveMonthlyBudget from "@/services/budgetFunctions/saveMonthlyBudget";
import { Alert, Text, View, StyleSheet } from "react-native";

const AddBudgetScreen = () => {

    return (
        <View style={styles.container}>
            <Text>Add Budget</Text>
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