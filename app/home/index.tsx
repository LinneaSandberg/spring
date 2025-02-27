import AddExpenseModal from "@/components/AddExpenseModal";
import SmallBudgetCard from "@/components/SmallBudgetCard";
import ExpenseListItem from "@/components/ExpensesListItem";
import LoadingSpinner from "@/components/LoadingSpinner";
import { ThemedText } from "@/components/ThemedText";
import { blue, green, purple, yellow } from "@/constants/Colors";
import useBudget from "@/hooks/useBudget";
import useUser from "@/hooks/useUser";
import { db } from "@/services/firebase";
import { Budget, VariableExpense } from "@/types/Budget.types";
import { Link } from "expo-router";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import AnimatedText from "@/components/AnimatedText";

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
            const budgetData = budgetDoc.data() as Budget;
            const newTotalSum = budgetData.variableExpenses.totalSum + expenseData.amount;

            await updateDoc(budgetRef, {
                'variableExpenses.expenses': arrayUnion(expenseData),
                'variableExpenses.totalSum': newTotalSum,
            });

        } catch (error) {
            Alert.alert("Error", "Failed to add expense. Please try again.");
        } finally {
            setModalVisible(false);
        }
    };

    useEffect(() => {
    }, [budget, userLoading, budgetLoading]);

    if (userLoading || budgetLoading) {
        return <LoadingSpinner />;
    }

    return (
        <View style={styles.container}>
            {!budget && (
                <View style={styles.postion}>
                    <View style={styles.titlePosition}>
                        <ThemedText type="title">Hello, </ThemedText>
                        <AnimatedText text={`${userData?.name}`} />
                    </View>
                    <ThemedText type="default" style={styles.margin}>
                        No budget found, create one!</ThemedText>
                    <Link href={"/home/add"} style={styles.button}>
                        <ThemedText style={styles.buttonText} type='defaultSemiBold'>
                            Add a budget
                        </ThemedText>
                    </Link>
                </View>
            )}

            {budget && (
                <>
                    <View style={styles.titlePos}>
                        <ThemedText type="title" style={styles.titleAlign}>Hello, {userData?.name}!</ThemedText>
                    </View>
                    <Link style={styles.button} href={`/home/edit?month=${currentMonth}&year=${currentYear}`}>
                        <ThemedText style={styles.buttonText} type='defaultSemiBold'>Update {currentDate.toLocaleString('default', { month: 'long' })}'s Budget</ThemedText>
                    </Link>

                    <Link href={"/home/budget"} style={styles.budgetLink}>
                        <SmallBudgetCard budget={budget} />
                    </Link>

                    {budget.variableExpenses.expenses.length > 0 && (
                        <View>
                            <Link href={"/home/expense"} style={styles.expenseLink}>
                                <ThemedText style={styles.buttonText} type='defaultSemiBold'>
                                    See all expenses
                                </ThemedText>
                            </Link>
                            <View style={styles.boxes}>
                                <View style={styles.nesExpenses}>
                                    <ThemedText type="defaultSemiBold" style={styles.subTitle}>Necessarys</ThemedText>
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
                                    <ThemedText type="defaultSemiBold" style={styles.subTitle}>Unnecessary</ThemedText>
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
                        </View>
                    )}

                    <TouchableOpacity style={styles.button} onPress={handleAddExpense}>
                        <ThemedText style={styles.buttonText} type='defaultSemiBold'>Add Expense</ThemedText>
                    </TouchableOpacity>

                    {budget.amountAfterBudgetting - budget.variableExpenses.totalSum >= 0 ? (
                        <View style={[styles.savingColor, styles.savingBox, styles.margin]}>
                            <ThemedText type="default" style={styles.buttonText}>Left to spend:</ThemedText>
                            <ThemedText type="title">{budget.amountAfterBudgetting - budget.variableExpenses.totalSum}</ThemedText>
                        </View>
                    ) : (
                        <View style={[styles.passedColor, styles.savingBox, styles.margin]}>
                            <ThemedText type="default" style={styles.buttonText}>You have past your budget:</ThemedText>
                            <ThemedText type="title">{budget.amountAfterBudgetting - budget.variableExpenses.totalSum}</ThemedText>
                        </View>
                    )}
                </>
            )
            }
            <AddExpenseModal
                visible={modalVisible}
                onClose={handleCloseModal}
                onSubmit={handleModalSubmit}
                budgetId={budget?._id ?? ''}
            />
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        boxSizing: 'border-box',
    },
    postion: {
        marginTop: "40%",
        marginBottom: 20,
        display: 'flex',
        alignItems: 'center',
    },
    titlePosition: {
        marginTop: "40%",
        marginBottom: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    titlePos: {
        marginTop: 60,
        marginBottom: 20,
    },
    titleAlign: {
        textAlign: 'center',
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
        backgroundColor: yellow,
        borderColor: '#1E1E1E',
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
    },
    button: {
        width: '100%',
        marginBottom: 10,
        backgroundColor: purple,
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
    expenseLink: {
        marginBottom: 10,
        backgroundColor: green,
        borderColor: '#1E1E1E',
        borderWidth: 1,
        padding: 20,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
    },
    nesExpenses: {
        backgroundColor: blue,
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
        color: '#1E1E1E',
    },
    savingColor: {
        backgroundColor: green,
    },
    savingBox: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        height: 100,
    },
    passedColor: {
        backgroundColor: '#ff3632',
    },
    budgetLink: {
        marginBottom: 10,
    },
    margin: {
        marginBottom: 20,
    },
    seeAllLink: {
        marginTop: 10,
        marginBottom: 10,
    },
    subTitle: {
        marginLeft: 10,
    }
});

export default HomeScreen;