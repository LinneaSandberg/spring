import useBudget from "@/hooks/useBudget";
import { View, Text, StyleSheet } from "react-native";
import LoadingSpinner from "./LoadingSpinner";
import { MaterialIcons } from '@expo/vector-icons';

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

    return (
        <View style={styles.card}>
            <Text style={styles.title}>Budget for {month}/{year}</Text>

            <View style={styles.summary}>
                <Text>Total income: {budget.totalIncome}</Text>
                <Text>Remaining balance: {budget.remaningBalance}</Text>
            </View>

            <View style={styles.expenseSection}>
                <Text style={styles.sectionTitle}>Fixed Expenses</Text>
                {Object.entries(budget.fixedExpenses).map(([key, value]) => (
                    <View key={key} style={styles.expenseItem}>
                        <MaterialIcons name="attach-money" size={20} color="black" />
                        <Text style={styles.expenseText}>{key.charAt(0).toUpperCase() + key.slice(1)}: {value} :-</Text>
                    </View>
                ))}
            </View>
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
    incomeText: {
        fontSize: 18,
        color: '#4CAF50',
    },
    balanceText: {
        fontSize: 18,
        color: '#F44336',
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
    loadingText: {
        textAlign: 'center',
        fontSize: 18,
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
});


export default BudgetCard;

