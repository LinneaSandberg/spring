import AddExpenseModal from "@/components/AddExpenseModal";
import BudgetCard from "@/components/BudgetCard";
import ExpenseListItem from "@/components/ExpensesListItem";
import LoadingSpinner from "@/components/LoadingSpinner";
import useBudget from "@/hooks/useBudget";
import useUser from "@/hooks/useUser";
import { db } from "@/services/firebase";
import { VariableExpense } from "@/types/Budget.types";
import { MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from "react-native";

const HomeScreen = () => {
    const { data: userData, loading: userLoading } = useUser();
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    const [modalVisible, setModalVisible] = useState(false);
    const { budget, loading: budgetLoading } = useBudget(currentMonth, currentYear);

    const handleAddExpense = () => {
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    const handleModalSubmit = async (expenseData: VariableExpense) => {
        try {
            if (!budget?._id) return;

            const budgetRef = doc(db, `users/${userData?.uid}/budgets`, budget._id);
            const budgetDoc = await getDoc(budgetRef);
            const existingExpenses = budgetDoc.data()?.variableExpenses.expenses || [];
            const updatedExpenses = [...existingExpenses, expenseData];

            await updateDoc(budgetRef, {
                'variableExpenses.expenses': updatedExpenses
            });

        } catch (error) {
            Alert.alert("Error", "Failed to add expense. Please try again.");
        } finally {
            setModalVisible(false);
        }
    };

    useEffect(() => {
    }, [budget]);

    if (userLoading || budgetLoading) {
        return <LoadingSpinner />;
    }

    if (!budget) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>No budget found, create one!</Text>
                <Link href={"/home/add"} style={styles.link}>
                    Add a budget
                </Link>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Hello, {userData?.name}</Text>

            {budget ? (
                <>
                    <Link href={`/home/edit?month=${currentMonth}&year=${currentYear}`}>
                        <MaterialIcons name="edit" size={20} />
                        <Text>Update budget for {currentDate.toLocaleString('default', { month: 'long' })} {currentYear}</Text>
                    </Link>

                    <TouchableOpacity onPress={handleAddExpense}>
                        <MaterialIcons name="add" size={20} />
                        <Text>Add Expense</Text>
                    </TouchableOpacity>

                    <BudgetCard budget={budget} />

                    <ScrollView>
                        {budget.variableExpenses.expenses.map((expense: VariableExpense, index: number) => (
                            <ExpenseListItem key={index} expense={expense} />
                        ))}
                    </ScrollView>
                </>
            ) : (
                <Link href={"/home/add"}>
                    <MaterialIcons name="add" size={20} />
                    <Text>Create a budget for {currentDate.toLocaleString('default', { month: 'long' })} {currentYear}</Text>
                </Link>
            )}

            <AddExpenseModal
                visible={modalVisible}
                onClose={handleCloseModal}
                onSubmit={handleModalSubmit}
                budgetId={budget?._id ?? ''}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 30,
        marginTop: 60,
        marginBottom: 40,
        textAlign: 'center',
        color: '#1E1E1E',
    },
    link: {
        textAlign: 'center',
        marginBottom: 10,
        backgroundColor: '#FFD700',
        borderColor: '#1E1E1E',
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
    },
    buttonText: {
        color: '#1E1E1E',
        fontSize: 18,
        textAlign: 'center',
    },
    view: {
        marginTop: 10,
        maxHeight: '70%',
    },
});

export default HomeScreen;