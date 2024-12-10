import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Budget } from '@/types/Budget.types';
import { firebaseTimestampToDate } from '@/helpers/time';
import { DocumentData } from 'firebase/firestore';
import { ThemedText } from './ThemedText';

interface SavingGoalProps {
    budget: DocumentData;
}

const SavingGoal: React.FC<SavingGoalProps> = ({ budget }) => {
    const [chartData, setChartData] = useState<{ labels: string[], datasets: { data: number[], color: (opacity?: number) => string }[] }>({ labels: [], datasets: [{ data: [], color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})` }] });
    const currentDate = new Date();

    useEffect(() => {
        if (!budget) return;

        const daysInMonth = new Date(budget.year, budget.month, 0).getDate();
        const dailyBudget = budget.remaningBalance / daysInMonth;

        const labels = Array.from({ length: daysInMonth }, (_, i) => i + 1);
        const cumulativeExpenses = calculateCumulativeExpenses(budget as Budget);

        console.log("daysInMonth", daysInMonth);
        console.log("dailyBudget", dailyBudget);

        setChartData({
            labels: labels.map(String),
            datasets: [
                {
                    data: cumulativeExpenses,
                    color: (opacity = 1) => `rgba(75,192,192, ${opacity})`,
                },
                {
                    data: Array(daysInMonth).fill(dailyBudget),
                    color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`, // Red line
                },
            ],
        });
    }, [budget]);

    const calculateCumulativeExpenses = (budget: Budget) => {
        const cumulativeExpenses = [];
        let total = 0;

        for (let i = 1; i <= currentDate.getDate(); i++) {
            const expensesForDay = budget.variableExpenses.expenses.filter(expense => {
                const expenseDate = firebaseTimestampToDate(expense.date);
                return expenseDate.getDate() === i &&
                    expenseDate.getMonth() + 1 === budget.month &&
                    expenseDate.getFullYear() === budget.year;
            });
            total += expensesForDay.reduce((sum, expense) => sum + expense.amount, 0);
            cumulativeExpenses.push(total);
        }

        return cumulativeExpenses;
    };

    return (
        <View style={styles.container}>
            <ThemedText type='title'>Saving Goal</ThemedText>
            <LineChart
                data={chartData}
                width={Dimensions.get('window').width - 30}
                height={220}
                chartConfig={{
                    backgroundColor: '#1e2923',
                    backgroundGradientFrom: '#08130d',
                    backgroundGradientTo: '#1e2923',
                    decimalPlaces: 2,
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16
                    }
                }}
                style={{
                    marginVertical: 8,
                    borderRadius: 16
                }}
                fromZero={true}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 15,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
});

export default SavingGoal;