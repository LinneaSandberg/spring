import { firebaseTimestampToString } from "@/helpers/time";
import { VariableExpense } from "@/types/Budget.types";
import React from "react";
import { View, StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";

interface ExpenseListItemProps {
    expense: VariableExpense;
}

const ExpenseListItem: React.FC<ExpenseListItemProps> = ({ expense }) => {
    const firebaseDate = firebaseTimestampToString(expense.date);
    const date = new Date(firebaseDate);
    const day = date.getDate();
    const monthName = date.toLocaleString('default', { month: 'short' });

    return (
        <View style={styles.expenseItem}>
            <ThemedText type="miniText" style={styles.color}>
                {day} {monthName} - {expense.description}{' '}
                <ThemedText type="miniBold" style={styles.color}>{expense.amount}</ThemedText>
            </ThemedText>
        </View>
    );
}

const styles = StyleSheet.create({
    expenseItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginVertical: 5,
        marginHorizontal: 10,
    },
    color: {
        color: '#1E1E1E',
    }
});

export default ExpenseListItem;