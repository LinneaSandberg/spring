import AddExpenseModal from "@/components/AddExpenseModal";
import SmallBudgetCard from "@/components/budget/SmallBudgetCard";
import ExpenseListItem from "@/components/ExpensesListItem";
import LoadingSpinner from "@/components/LoadingSpinner";
import { ThemedText } from "@/components/ThemedText";
import useBudget from "@/hooks/useBudget";
import useUser from "@/hooks/useUser";
import { db } from "@/services/firebase";
import { VariableExpense } from "@/types/Budget.types";
import { MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";

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
            <View style={styles.titlePosition}>
                <ThemedText type="title">No budget found, create one!</ThemedText>
                <Link href={"/home/add"} style={styles.link}>
                    Add a budget
                </Link>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.titlePosition}>
                <ThemedText type="title">Hello, {userData?.name}!</ThemedText>
            </View>

            {budget ? (
                <>
                    <Link style={styles.button} href={`/home/edit?month=${currentMonth}&year=${currentYear}`}>
                        <ThemedText style={styles.buttonText} type='defaultSemiBold'>Update {currentDate.toLocaleString('default', { month: 'long' })}'s Budget</ThemedText>
                    </Link>

                    <Link href={"/home/budget"} style={styles.budgetLink}>
                        <SmallBudgetCard budget={budget} />
                    </Link>

                    <View style={styles.boxes}>
                        <View style={styles.nesExpenses}>
                            <ThemedText type="defaultSemiBold">Necessarys</ThemedText>
                            {budget.variableExpenses.expenses
                                .filter((expense: VariableExpense) => expense.necessary)
                                .reverse()
                                .slice(0, 4)
                                .reverse()
                                .map((expense: VariableExpense, index: number) => (
                                    <ExpenseListItem key={index} expense={expense} />
                                ))}
                        </View>

                        <View style={styles.unExpenses}>
                            <ThemedText type="defaultSemiBold">Unnecessary</ThemedText>
                            {budget.variableExpenses.expenses
                                .filter((expense: VariableExpense) => !expense.necessary)
                                .reverse()
                                .slice(0, 4)
                                .reverse()
                                .map((expense: VariableExpense, index: number) => (
                                    <ExpenseListItem key={index} expense={expense} />
                                ))}
                        </View>
                    </View>

                    <TouchableOpacity style={styles.button} onPress={handleAddExpense}>
                        <ThemedText type='defaultSemiBold'>Add Expense</ThemedText>
                    </TouchableOpacity>

                    <View style={styles.savingBox}>
                        <ThemedText type="defaultSemiBold">Saving Goal</ThemedText>
                    </View>

                    {/* <ScrollView>
                        <SavingGoal budget={budget as Budget} />
                    </ScrollView> */}
                </>
            ) : (
                <Link href={"/home/add"}>
                    <MaterialIcons name="add" size={20} />
                    <ThemedText>Create a budget for {currentDate.toLocaleString('default', { month: 'long' })} {currentYear}</ThemedText>
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
        boxSizing: 'border-box',
    },
    titlePosition: {
        marginTop: 60,
        marginBottom: 20,
        display: 'flex',
        alignItems: 'center',
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
    button: {
        marginBottom: 10,
        backgroundColor: '#D8BCEF',
        borderColor: '#1E1E1E',
        borderWidth: 1,
        padding: 20,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
    },
    view: {
        marginTop: 10,
        maxHeight: '70%',
    },
    boxes: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        boxSizing: 'border-box',
        marginBottom: 10,
    },
    nesExpenses: {
        backgroundColor: '#9AB2D4',
        borderRadius: 10,
        width: '48%',
        padding: 3,
        marginBottom: 3,
    },
    unExpenses: {
        backgroundColor: '#FDD848',
        borderRadius: 10,
        width: '48%',
        padding: 3,
        marginBottom: 3,
    },
    buttonDisabled: {
        backgroundColor: '#A9A9A9',
    },
    buttonText: {
        textAlign: 'center',
    },
    savingBox: {
        backgroundColor: '#B3DAAB',
        borderRadius: 10,
        height: 100,
    },
    budgetLink: {
        marginBottom: 10,
    }
});

export default HomeScreen;