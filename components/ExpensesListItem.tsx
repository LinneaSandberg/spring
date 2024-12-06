import { Expenses, VariableExpense } from "@/types/Budget.types";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface ExpenseListItemProps {
    expense: VariableExpense;
}

const ExpenseListItem: React.FC<ExpenseListItemProps> = ({ expense }) => {
    const date = new Date(expense.date);
    const monthName = date.toLocaleString('default', { month: 'long' });
    const day = date.getDate();
    const formattedDate = `${day} ${monthName}`;

    return (
        <View style={styles.expenseItem}>
            <MaterialIcons name="attach-money" size={20} color="black" />
            <Text style={styles.expenseText}>{formattedDate} - {expense.description}: {expense.amount} :-</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    expenseItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    expenseText: {
        fontSize: 16,
        marginLeft: 10,
    },
});

export default ExpenseListItem;