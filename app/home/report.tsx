import { ThemedText } from "@/components/ThemedText";
import { calculateMonthlyResult } from "@/services/budgetFunctions";
import useBudget from "@/hooks/useBudget";
import { View, StyleSheet } from "react-native";

const BudgetReportScreen = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    const { budget, loading } = useBudget(currentMonth, currentYear);

    if (loading) {
        return <ThemedText>Loading budget data...</ThemedText>;
    }

    if (!budget) {
        return <ThemedText>No budget found for this month.</ThemedText>;
    }

    const result = calculateMonthlyResult(
        budget.variableExpenses.totalSum,
        budget.plannedSaving,
        budget.remainingBalance,
        budget.amountAfterBudgetting
    );

    return (
        <View style={styles.container}>
            <ThemedText>Budget Report</ThemedText>
            <ThemedText>{result}</ThemedText>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        boxSizing: 'border-box',
        marginTop: 40,
    },
});

export default BudgetReportScreen;