import { MaterialIcons } from '@expo/vector-icons';
import { Expenses } from "@/types/Budget.types";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { DocumentData } from 'firebase/firestore';

interface BudgetCardProps {
    budget: DocumentData;
}

const BudgetCard: React.FC<BudgetCardProps> = ({ budget }) => {
    const renderExpenses = (expenses: Expenses) => {
        return Object.entries(expenses).map(([key, value]) => (
            <View key={key} style={styles.expenseItem}>
                <MaterialIcons name="attach-money" size={20} color="black" />
                <Text style={styles.expenseText}>{key.charAt(0).toUpperCase() + key.slice(1)}: {value}</Text>
            </View>
        ));
    };

    return (
        <View style={styles.card}>
            <Text style={styles.title}>Budget for {budget.month}/{budget.year}</Text>

            <View style={styles.summary}>
                <Text>Total income: {budget.totalIncome}</Text>
                <Text>Remaining balance: {budget.remaningBalance}</Text>
                {budget.amountAfterBudgetting > 0 && <Text>Amount after budgeting: {budget.amountAfterBudgetting}</Text>}
            </View>

            {budget.fixedExpenses && (
                <View style={styles.expenseSection}>
                    <Text style={styles.sectionTitle}>Fixed Expenses</Text>
                    {Object.keys(budget.fixedExpenses).length > 0
                        ? renderExpenses(budget.fixedExpenses)
                        : <Text style={styles.emptyText}>No fixed expenses found.</Text>
                    }
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

