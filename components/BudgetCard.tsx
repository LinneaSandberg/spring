import useBudget from "@/hooks/useBudget";
import { View, Text, StyleSheet } from "react-native";
import LoadingSpinner from "./LoadingSpinner";
import { MaterialIcons } from '@expo/vector-icons';
import { Expenses, VariableExpense } from "@/types/Budget.types";

const BudgetCard = ({ month, year }: { month: number, year: number }) => {
    const { budget, loading, error } = useBudget(month, year);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <Text style={styles.errorText}>Error: {error.message}</Text>;
    }

    if (!budget) {
        return <Text style={styles.emptyText}>No budget found for this month.</Text>;
    }

    const renderExpenses = (expenses: Expenses) => {
        return Object.entries(expenses).map(([key, value]) => (
            <View key={key} style={styles.expenseItem}>
                <MaterialIcons name="attach-money" size={20} color="black" />
                <Text style={styles.expenseText}>{key.charAt(0).toUpperCase() + key.slice(1)}: {value} :-</Text>
            </View>
        ));
    };

    const renderVariableExpenses = (expenses: VariableExpense[]) => {
        return expenses.map((expense) => (
            <View key={expense.date + expense.description} style={styles.expenseItem}>
                <MaterialIcons name="attach-money" size={20} color="black" />
                <View>
                    <Text style={styles.expenseText}>{expense.description}: {expense.amount} :-</Text>
                    <Text style={styles.expenseDate}>{expense.date}</Text>
                </View>
            </View>
        ));
    }

    return (
        <View style={styles.card}>
            <Text style={styles.title}>Budget for {month}/{year}</Text>

            <View style={styles.summary}>
                <Text>Total income: {budget.totalIncome}</Text>
                <Text>Remaining balance: {budget.remaningBalance}</Text>
            </View>

            {budget.fixedExpenses && (
                <View style={styles.expenseSection}>
                    <Text style={styles.sectionTitle}>Fixed Expenses</Text>
                    {renderExpenses(budget.fixedExpenses)}
                </View>
            )}

            {budget.variableExpenses && (
                <View style={styles.expenseSection}>
                    <Text style={styles.sectionTitle}>Variable Expenses</Text>
                    <Text>Planned: {budget.variableExpenses.planned}</Text>
                    {renderVariableExpenses(budget.variableExpenses.expenses)}
                </View>
            )}

        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        padding: 20,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    summary: {
        marginBottom: 15,
    },
    expenseSection: {
        marginTop: 10,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    expenseItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    expenseText: {
        marginLeft: 10,
        fontSize: 16,
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        fontSize: 18,
    },
    emptyText: {
        textAlign: 'center',
        fontSize: 18,
    },
    expenseDate: {
        fontSize: 12,
        color: "gray",
    },
});


export default BudgetCard;

