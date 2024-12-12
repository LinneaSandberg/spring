import { MaterialIcons } from '@expo/vector-icons';
import { Expenses } from "@/types/Budget.types";
import React from "react";
import { View, StyleSheet } from "react-native";
import { DocumentData } from 'firebase/firestore';
import { Months } from '@/enum/monthEnum';
import { ThemedText } from './ThemedText';
import { pink } from '@/constants/Colors';

interface BudgetCardProps {
    budget: DocumentData;
}

const SmallBudgetCard: React.FC<BudgetCardProps> = ({ budget }) => {
    const monthNumber = budget.month;
    const monthName = Months[monthNumber];

    const renderExpenses = (expenses: Expenses) => {
        return Object.entries(expenses).map(([key, value]) => (
            <View key={key} style={styles.expenseItem}>
                <MaterialIcons name="attach-money" size={18} color="black" />
                <ThemedText style={styles.color} type='miniText'>
                    {key.replace(/([A-Z])/g, ' $1').trim()} {' '}
                    <ThemedText style={styles.color} type='miniBold'>{value}</ThemedText>
                </ThemedText>
            </View>
        ));
    };

    return (
        <View style={styles.card}>
            <ThemedText style={[styles.color, styles.margin]} type='subtitle'>{monthName} Budget</ThemedText>

            <View style={styles.boxes}>
                <View style={styles.summary}>
                    <View style={styles.summaryItem}>
                        <ThemedText style={styles.color} type='miniText'>Total income</ThemedText>
                        <ThemedText style={styles.color} type='default'>{budget.totalIncome}</ThemedText>
                    </View>
                    {budget.plannedSaving && (
                        <View style={styles.summaryItem}>
                            <ThemedText style={styles.color} type='miniText'>Saving Goal</ThemedText>
                            <ThemedText style={styles.color} type='default'>{budget.plannedSaving}</ThemedText>
                        </View>)}
                    {budget.amountAfterBudgetting > 0 && (
                        <View style={styles.summaryItem}>
                            <ThemedText style={styles.color} type='miniText'>Left after budgeting</ThemedText>
                            <ThemedText style={styles.color} type='default'>{budget.amountAfterBudgetting}</ThemedText>
                        </View>
                    )}
                </View>

                {budget.fixedExpenses && (
                    <View style={styles.expenseSection}>
                        <ThemedText style={styles.color} type='default'>Fixed Expenses</ThemedText>
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
        backgroundColor: pink,
        borderRadius: 15,
        padding: 20,
        marginBottom: 10,
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
    color: {
        color: '#1E1E1E',
    },
    margin: {
        marginBottom: 10,
    }
});

export default SmallBudgetCard;
