import { View, StyleSheet, FlatList } from 'react-native';
import useBudget from '@/hooks/useBudget';
import ExpenseListItem from '@/components/ExpensesListItem';
import { VariableExpense } from '@/types/Budget.types';
import { ThemedText } from '@/components/ThemedText';
import { blue, yellow } from '@/constants/Colors';
import { Link } from 'expo-router';
import LoadingSpinner from '@/components/LoadingSpinner';

const ExpenseScreen = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    const { budget, loading } = useBudget(currentMonth, currentYear);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (!budget) {
        return <ThemedText>Budget not found.</ThemedText>;
    }

    const necessaryExpenses: VariableExpense[] = budget.variableExpenses.expenses.filter((expense: VariableExpense) => expense.necessary);
    const unnecessaryExpenses: VariableExpense[] = budget.variableExpenses.expenses.filter((expense: VariableExpense) => !expense.necessary);

    return (
        <View style={styles.main}>
            <ThemedText type='subtitle' style={styles.title}>All your expenses for {currentDate.toLocaleString('default', { month: 'long' })}</ThemedText>


            {necessaryExpenses.length > 0 && unnecessaryExpenses.length === 0 ? (
                <View style={styles.expenseSection}>
                    <ThemedText type='defaultSemiBold' style={styles.subTitle}>Necessary Expenses</ThemedText>
                    <FlatList
                        data={necessaryExpenses}
                        renderItem={({ item }) => <ExpenseListItem expense={item} />}
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
                        renderItem={({ item }) => <ExpenseListItem expense={item} />}
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
                            renderItem={({ item }) => <ExpenseListItem expense={item} />}
                            keyExtractor={(item, index) => item._id + index}
                            style={styles.necessaryList}
                            showsVerticalScrollIndicator={false}
                            nestedScrollEnabled={true}
                        />
                    </View>
                    <View style={styles.expenseSection}>
                        <ThemedText type='defaultSemiBold' style={styles.subTitle}>Unnecessary Expenses</ThemedText>
                        <FlatList
                            data={unnecessaryExpenses}
                            renderItem={({ item }) => <ExpenseListItem expense={item} />}
                            keyExtractor={(item, index) => item._id + index}
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
        backgroundColor: '#D8BCEF',
        borderColor: '#1E1E1E',
        borderWidth: 1,
        padding: 20,
        borderRadius: 10,
    },
    buttonText: {
        textAlign: 'center',
        color: '#1E1E1E',
    }
});


export default ExpenseScreen;