import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { useState, useEffect } from 'react';
import useBudget from '@/hooks/useBudget';
import LoadingSpinner from '@/components/LoadingSpinner';
import { MaterialIcons } from '@expo/vector-icons';
import AddExpenseModal from '@/components/AddExpenseModal';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { useAuth } from '@/hooks/useAuth';
import { VariableExpense } from '@/types/Budget.types';
import { db } from '@/services/firebase';

const BudgetScreen = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    const [budgetExists, setBudgetExists] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const { currentUser } = useAuth();
    const { budget, loading } = useBudget(currentMonth, currentYear);

    const handleAddExpense = () => {
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    const handleModalSubmit = async (expenseData: VariableExpense) => {
        try {
            if (budget?._id) {
                const budgetRef = doc(db, `users/${currentUser?.uid}/budgets`, budget._id);

                await updateDoc(budgetRef, {
                    'variableExpenses.expenses': arrayUnion(expenseData)
                });
            }
        } catch (error) {
            console.error("Error adding expense:", error);
        } finally {
            setModalVisible(false);
        }
    };

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

            {budgetExists && (
                <TouchableOpacity onPress={handleAddExpense}>
                    <MaterialIcons name="add" size={20} />
                    <Text>Add Expense</Text>
                </TouchableOpacity>
            )}

            <AddExpenseModal
                visible={modalVisible}
                onClose={handleCloseModal}
                onSubmit={handleModalSubmit}
                budgetId={budget?._id ?? ''}
            />
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