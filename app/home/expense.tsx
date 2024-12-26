import { View, StyleSheet, FlatList, Alert, TouchableOpacity } from 'react-native';
import useBudget from '@/hooks/useBudget';
import ExpenseListItem from '@/components/ExpensesListItem';
import { Budget, VariableExpense } from '@/types/Budget.types';
import { ThemedText } from '@/components/ThemedText';
import { blue, purple, yellow } from '@/constants/Colors';
import { Link } from 'expo-router';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { arrayRemove, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/services/firebase';

const ExpenseScreen = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    const { budget, loading } = useBudget(currentMonth, currentYear);
    const { currentUser } = useAuth();
    const [necessaryExpenses, setNecessaryExpenses] = useState<VariableExpense[]>([]);
    const [unnecessaryExpenses, setUnnecessaryExpenses] = useState<VariableExpense[]>([]);

    useEffect(() => {
        if (budget) {
            setNecessaryExpenses(budget.variableExpenses.expenses.filter((expense: VariableExpense) => expense.necessary));
            setUnnecessaryExpenses(budget.variableExpenses.expenses.filter((expense: VariableExpense) => !expense.necessary));
        }
    }, [budget]);

    const handleDeleteExpense = useCallback(async (expenseToDelete: VariableExpense) => {
        try {
            Alert.alert(
                "Confirm Delete",
                `Are you sure you want to delete ${expenseToDelete.description}?`,
                [
                    { text: "Cancel", style: "cancel" },
                    {
                        text: "Delete",
                        style: "destructive",
                        onPress: async () => {
                            const budgetRef = doc(db, `users/${currentUser?.uid}/budgets`, expenseToDelete._id);
                            const budgetDoc = await getDoc(budgetRef);
                            const budgetData = budgetDoc.data() as Budget;
                            const newTotalSum = budgetData.variableExpenses.totalSum - expenseToDelete.amount;

                            await updateDoc(budgetRef, {
                                'variableExpenses.expenses': arrayRemove(expenseToDelete),
                                'variableExpenses.totalSum': newTotalSum,
                            });
                            setNecessaryExpenses(necessaryExpenses.filter(expense => expense._id !== expenseToDelete._id));
                            setUnnecessaryExpenses(unnecessaryExpenses.filter(expense => expense._id !== expenseToDelete._id));
                        }
                    }
                ]
            );
        } catch (error) {
            Alert.alert("Error", "Failed to delete expense. Please try again.");
        }
    }, [necessaryExpenses, unnecessaryExpenses, currentUser?.uid]);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (!budget) {
        return <ThemedText>Budget not found.</ThemedText>;
    }

    return (
        <View style={styles.main}>
            <ThemedText type='subtitle' style={styles.title}>All your expenses for {currentDate.toLocaleString('default', { month: 'long' })}</ThemedText>

            {necessaryExpenses.length > 0 && unnecessaryExpenses.length === 0 ? (
                <View style={styles.expenseSection}>
                    <ThemedText type='defaultSemiBold' style={styles.subTitle}>Necessary Expenses</ThemedText>
                    <FlatList
                        data={necessaryExpenses}
                        renderItem={({ item, index }) => (
                            <View key={index} style={styles.expenseItem}>
                                <ExpenseListItem expense={item} />
                                <View style={styles.buttonsContainer}>
                                    <TouchableOpacity onPress={() => handleDeleteExpense(item)} style={styles.deleteButton}>
                                        <ThemedText type="miniText">Delete</ThemedText>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                        keyExtractor={(item, index) => item._id + index}
                        style={styles.necessaryList}
                        showsVerticalScrollIndicator={false}
                        nestedScrollEnabled={true}
                    />
                </View>
            ) : unnecessaryExpenses.length > 0 && necessaryExpenses.length === 0 ? (
                <View style={styles.expenseSection}>
                    <ThemedText type='defaultSemiBold' style={styles.subTitle}>Unnecessary Expenses</ThemedText>
                    <FlatList
                        data={unnecessaryExpenses}
                        renderItem={({ item, index }) => (
                            <View key={index} style={styles.expenseItem}>
                                <ExpenseListItem expense={item} />
                                <View style={styles.buttonsContainer}>
                                    <TouchableOpacity onPress={() => handleDeleteExpense(item)} style={styles.deleteButton}>
                                        <ThemedText type="miniText">Delete</ThemedText>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                        keyExtractor={(item, index) => item._id + index}
                        style={styles.unnecessaryList}
                        showsVerticalScrollIndicator={false}
                        nestedScrollEnabled={true}
                    />
                </View>
            ) : (
                <>
                    <View style={styles.expenseSection}>
                        <ThemedText type='defaultSemiBold' style={styles.subTitle}>Necessary Expenses</ThemedText>
                        <FlatList
                            data={necessaryExpenses}
                            renderItem={({ item, index }) => (
                                <View key={index} style={styles.expenseItem}>
                                    <ExpenseListItem expense={item} />
                                    <View style={styles.buttonsContainer}>
                                        <TouchableOpacity onPress={() => handleDeleteExpense(item)} style={styles.deleteButton}>
                                            <ThemedText type="miniText">Delete</ThemedText>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )} keyExtractor={(item, index) => item._id + index}
                            style={styles.necessaryList}
                            showsVerticalScrollIndicator={false}
                            nestedScrollEnabled={true}
                        />
                    </View>
                    <View style={styles.expenseSection}>
                        <ThemedText type='defaultSemiBold' style={styles.subTitle}>Unnecessary Expenses</ThemedText>
                        <FlatList
                            data={unnecessaryExpenses}
                            renderItem={({ item, index }) => (
                                <View key={index} style={styles.expenseItem}>
                                    <ExpenseListItem expense={item} />
                                    <View style={styles.buttonsContainer}>
                                        <TouchableOpacity onPress={() => handleDeleteExpense(item)} style={styles.deleteButton}>
                                            <ThemedText type="miniText">Delete</ThemedText>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )} keyExtractor={(item, index) => item._id + index}
                            style={styles.unnecessaryList}
                            showsVerticalScrollIndicator={false}
                            nestedScrollEnabled={true}
                        />
                    </View>
                </>
            )}
            <Link href={"/home"} style={styles.button}>
                <ThemedText type='defaultSemiBold' style={styles.buttonText}>Back to Overview</ThemedText>
            </Link>
        </View >
    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        boxSizing: 'border-box',
        padding: 20,
    },
    title: {
        marginTop: 60,
        marginBottom: 20,
        textAlign: 'center',
    },
    expenseItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginVertical: 5,
        marginHorizontal: 10,
    },
    buttonsContainer: {
        flex: 1,
        alignItems: 'flex-end',
    },
    expenseSection: {
        marginBottom: 30,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    subTitle: {
        marginBottom: 10,
    },
    necessaryList: {
        maxHeight: 250,
        backgroundColor: blue,
        borderRadius: 8,
        padding: 10,
    },
    unnecessaryList: {
        maxHeight: 250,
        backgroundColor: yellow,
        borderRadius: 8,
        padding: 10,
    },
    button: {
        backgroundColor: purple,
        borderColor: '#1E1E1E',
        borderWidth: 1,
        padding: 20,
        borderRadius: 10,
    },
    deleteButton: {
        backgroundColor: 'red',
        borderColor: "#1E1E1E",
        borderWidth: 1,
        padding: 5,
        borderRadius: 10,
    },
    buttonText: {
        textAlign: 'center',
        color: '#1E1E1E',
    }
});


export default ExpenseScreen;