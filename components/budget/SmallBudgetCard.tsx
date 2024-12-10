import { MaterialIcons } from '@expo/vector-icons';
import { Expenses } from "@/types/Budget.types";
import React from "react";
import { View, StyleSheet } from "react-native";
import { DocumentData } from 'firebase/firestore';
import { Months } from '@/enum/monthEnum';
import { ThemedText } from '../ThemedText';

interface BudgetCardProps {
    budget: DocumentData;
}

const SmallBudgetCard: React.FC<BudgetCardProps> = ({ budget }) => {
    const monthNumber = budget.month;
    const monthName = Months[monthNumber];

    const renderExpenses = (expenses: Expenses) => {
        return Object.entries(expenses).map(([key, value]) => (
            <View key={key} style={styles.expenseItem}>
                <MaterialIcons name="attach-money" size={20} color="black" />
                <ThemedText type='miniText'>
                    {key.replace(/([A-Z])/g, ' $1').trim()} {' '}
                    <ThemedText type='miniBold'>{value}</ThemedText>
                </ThemedText>
            </View>
        ));
    };

    return (
        <View style={styles.card}>
            <ThemedText type='subtitle'>{monthName} Budget</ThemedText>

            <View style={styles.boxes}>
                <View style={styles.summary}>
                    <View style={styles.summaryItem}>
                        <ThemedText type='miniText'>Total income</ThemedText>
                        <ThemedText type='default'>{budget.totalIncome}</ThemedText>
                    </View>
                    <View style={styles.summaryItem}>
                        <ThemedText type='miniText'>Remaining balance</ThemedText>
                        <ThemedText type='default'>{budget.remaningBalance}</ThemedText>
                    </View>
                    {budget.amountAfterBudgetting > 0 && (
                        <View style={styles.summaryItem}>
                            <ThemedText type='miniText'>Amount after budgeting</ThemedText>
                            <ThemedText type='default'>{budget.amountAfterBudgetting}</ThemedText>
                        </View>
                    )}
                </View>

                {budget.fixedExpenses && (
                    <View style={styles.expenseSection}>
                        <ThemedText type='default'>Fixed Expenses</ThemedText>
                        {Object.keys(budget.fixedExpenses).length > 0
                            ? renderExpenses(budget.fixedExpenses)
                            : <ThemedText type='miniText'>No fixed expenses found.</ThemedText>
                        }
                    </View>
                )}

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#F6C3AE',
        borderRadius: 15,
        padding: 20,
        marginBottom: 10,
        // shadowColor: '#000',
        // shadowOffset: {
        //     width: 0,
        //     height: 2,
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 3.84,
        // elevation: 5,
    },
    boxes: {
        display: 'flex',
        flexDirection: 'row',

    },
    summary: {
        marginBottom: 15,
        display: 'flex',
        justifyContent: 'space-evenly',
        alignContent: 'flex-end',
    },
    summaryItem: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginBottom: 10,
    },
    summaryAmount: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    expenseSection: {
        marginLeft: 10,
    },
    expenseItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
});

export default SmallBudgetCard;
