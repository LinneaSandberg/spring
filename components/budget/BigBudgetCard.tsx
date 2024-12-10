import { MaterialIcons } from '@expo/vector-icons';
import { Expenses } from "@/types/Budget.types";
import React from "react";
import { View, StyleSheet } from "react-native";
import { DocumentData } from 'firebase/firestore';
import { ThemedText } from '../ThemedText';

interface BudgetCardProps {
    budget: DocumentData;
}

const BigBudgetCard: React.FC<BudgetCardProps> = ({ budget }) => {
    const renderExpenses = (expenses: Expenses) => {
        return Object.entries(expenses).map(([key, value]) => (
            <View key={key} style={styles.expenseItem}>
                <MaterialIcons name="attach-money" size={20} color="black" />
                <ThemedText style={styles.expenseText}>{key.charAt(0).toUpperCase() + key.slice(1)}: {value}</ThemedText>
            </View>
        ));
    };

    return (
        <View style={styles.card}>
            <ThemedText style={styles.title}>Budget for {budget.month}/{budget.year}</ThemedText>

            <View style={styles.summary}>
                <ThemedText>Total income: {budget.totalIncome}</ThemedText>
                <ThemedText>Remaining balance: {budget.remaningBalance}</ThemedText>
                {budget.amountAfterBudgetting > 0 && <ThemedText>Amount after budgeting: {budget.amountAfterBudgetting}</ThemedText>}
            </View>

            {budget.fixedExpenses && (
                <View style={styles.expenseSection}>
                    <ThemedText style={styles.sectionTitle}>Fixed Expenses</ThemedText>
                    {Object.keys(budget.fixedExpenses).length > 0
                        ? renderExpenses(budget.fixedExpenses)
                        : <ThemedText style={styles.emptyText}>No fixed expenses found.</ThemedText>
                    }
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
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


export default BigBudgetCard;

