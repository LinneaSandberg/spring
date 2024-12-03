import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Link } from 'expo-router';
import { useState, useEffect } from 'react';
import useBudget from '@/hooks/useBudget';

const BudgetScreen = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    const [budgetExists, setBudgetExists] = useState(false);
    const { budget, loading } = useBudget(currentMonth, currentYear);

    useEffect(() => {
        if (budget) {
            setBudgetExists(true);
        }
    }, [budget]);

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text style={{ marginTop: 20, textAlign: "center" }}>Loading...</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Budget Tracker</Text>

            {budgetExists ? (
                <Link href={`/budget/edit?month=${currentMonth}&year=${currentYear}`}>
                    <Text>Update current budget</Text>
                </Link>
            ) : (
                <Link href={"/budget/add"}>
                    <Text>Create a budget for {new Date().toLocaleString('default', { month: 'long' })}</Text>
                </Link>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        marginTop: 40,
        fontSize: 28,
        marginBottom: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#2C3E50',
    }
});

export default BudgetScreen;