import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { useState, useEffect } from 'react';
import useBudget from '@/hooks/useBudget';
import LoadingSpinner from '@/components/LoadingSpinner';
import { MaterialIcons } from '@expo/vector-icons';

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
        return <LoadingSpinner />;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Budget planner</Text>

            {budgetExists ? (
                <Link href={`/budget/edit?month=${currentMonth}&year=${currentYear}`}>
                    <MaterialIcons name="edit" size={20} />
                    <Text>Update budget for {new Date(currentYear, currentMonth - 1).toLocaleString('default', { month: 'long' })} {currentYear}</Text>
                </Link>
            ) : (
                <Link href={"/budget/add"}>
                    <MaterialIcons name="add" size={20} />
                    <Text>Create a budget for {new Date(currentYear, currentMonth - 1).toLocaleString('default', { month: 'long' })} {currentYear}</Text>
                </Link>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        marginTop: 40,
        fontSize: 28,
        marginBottom: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#2C3E50',
    },
});

export default BudgetScreen;