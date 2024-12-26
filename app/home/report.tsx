import { ThemedText } from "@/components/ThemedText";
import { calculateMonthlyResult } from "@/services/budgetFunctions";
import useBudget from "@/hooks/useBudget";
import { View, StyleSheet } from "react-native";
import { green, pink, purple, yellow } from "@/constants/Colors";
import { Link } from "expo-router";
import LoadingSpinner from "@/components/LoadingSpinner";

const BudgetReportScreen = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    const { budget, loading } = useBudget(currentMonth, currentYear);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (!budget) {
        return <ThemedText type="default">No budget found for this month.</ThemedText>;
    }

    const result = calculateMonthlyResult(
        budget.variableExpenses.totalSum,
        budget.plannedSaving,
        budget.remainingBalance,
        budget.amountAfterBudgetting
    );

    return (
        <View style={styles.container}>
            <ThemedText type="title" style={styles.title}>Budget Report</ThemedText>

            <View style={styles.card}>
                <View style={styles.textContainer}>
                    <ThemedText type="miniText" style={styles.textColor}>Total Expenses: {budget.variableExpenses.totalSum}</ThemedText>
                    <ThemedText type="miniText" style={styles.textColor}>Planned Savings: {budget.plannedSaving}</ThemedText>
                    <ThemedText type="miniText" style={styles.textColor}>Remaining Balance: {budget.remainingBalance}</ThemedText>
                    <ThemedText type="miniText" style={styles.textColor}>Amount After Budgeting: {budget.amountAfterBudgetting}</ThemedText>
                </View>

                <View style={styles.progressContainer}>
                    <ThemedText type="defaultSemiBold" style={[styles.color, styles.textColor]}>{result}</ThemedText>
                </View>
            </View>

            <Link href={"/home"} style={[styles.button, styles.buttonColor]}>
                <ThemedText type='defaultSemiBold' style={styles.buttonText}>Back to Overview</ThemedText>
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignContent: 'center',
        justifyContent: 'center',
    },
    card: {
        backgroundColor: green,
        padding: 40,
        borderRadius: 8,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 5,
    },
    title: {
        textAlign: 'center',
        marginBottom: 20,
    },
    result: {
        fontSize: 18,
        fontWeight: '600',
        marginTop: 10,
    },
    textContainer: {
        backgroundColor: yellow,
        borderTopEndRadius: 10,
        borderTopStartRadius: 10,
        padding: 18,
    },
    progressContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 18,
        borderBottomEndRadius: 18,
        borderBottomStartRadius: 18,
        backgroundColor: purple,
    },
    progressText: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600',
        marginTop: 10,
    },
    button: {
        width: '100%',
        borderColor: '#1E1E1E',
        borderWidth: 1,
        padding: 20,
        borderRadius: 10,
    },
    buttonText: {
        textAlign: 'center',
        color: '#1E1E1E',
    },
    buttonColor: {
        backgroundColor: pink,
        marginBottom: 10,
    },
    color: {
        marginTop: 10,
    },
    textColor: {
        color: '#1E1E1E',
    }
});

export default BudgetReportScreen;