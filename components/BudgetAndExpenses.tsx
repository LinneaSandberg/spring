import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import useBudget from '@/hooks/useBudget';
import LoadingSpinner from './LoadingSpinner';
import BudgetCard from './BudgetCard';
import ExpenseListItem from './ExpensesListItem';

interface BudgetAndExpensesProps {
    month: number;
    year: number;
}

const BudgetAndExpenses: React.FC<BudgetAndExpensesProps> = ({ month, year }) => {
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
        <View>
            <BudgetCard budget={budget} />

            {budget.variableExpenses.expenses.map((expense, index) => (
                <ExpenseListItem key={index} expense={expense} />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    errorText: {
        color: 'red',
        fontSize: 16,
    },
    emptyText: {
        color: 'gray',
        fontSize: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});

export default BudgetAndExpenses;