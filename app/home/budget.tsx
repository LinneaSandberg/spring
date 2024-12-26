import LoadingSpinner from "@/components/LoadingSpinner";
import { ThemedText } from "@/components/ThemedText";
import { purple, pink } from "@/constants/Colors";
import useBudget from "@/hooks/useBudget";
import { Expenses } from "@/types/Budget.types";
import { MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";

const BudgetScreen = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    const { budget, loading: budgetLoading } = useBudget(currentMonth, currentYear);

    const renderExpenses = (expenses: Expenses) => {
        return Object.entries(expenses).map(([key, value]) => (
            <View key={key} style={styles.expenseItem}>
                <MaterialIcons name="attach-money" size={20} color="black" />
                <ThemedText type='default' style={styles.color}>{key.charAt(0).toUpperCase() + key.slice(1)}: {value}</ThemedText>
            </View>
        ));
    };

    useEffect(() => {
    }, [budget]);

    if (budgetLoading) {
        return <LoadingSpinner />;
    }

    if (!budget) {
        return (
            <View style={styles.container}>
                <ThemedText>No budget found, create one!</ThemedText>
                <Link href={"/home/add"}>
                    Add a budget
                </Link>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <ThemedText type='title' style={styles.color}>Budget for {budget.month}/{budget.year}</ThemedText>

                <View style={styles.summary}>
                    <ThemedText style={styles.color}>Total income: {budget.totalIncome}</ThemedText>
                    <ThemedText style={styles.color}>Remaining balance: {budget.remainingBalance}</ThemedText>
                    {budget.amountAfterBudgetting > 0 && (
                        <ThemedText style={styles.color}>Amount after budgeting: {budget.amountAfterBudgetting}</ThemedText>
                    )}
                    {budget.plannedExpenses !== undefined && (
                        <ThemedText style={styles.color}>Planned expenses: {budget.plannedExpenses}</ThemedText>
                    )}
                    {budget.plannedSaving !== undefined && (
                        <ThemedText style={styles.color}>Planned savings: {budget.plannedSaving}</ThemedText>
                    )}
                </View>

                {budget.fixedExpenses && (
                    <View style={styles.expenseSection}>
                        <ThemedText style={[styles.sectionTitle, styles.color]}>Fixed Expenses</ThemedText>
                        {Object.keys(budget.fixedExpenses).length > 0
                            ? renderExpenses(budget.fixedExpenses)
                            : <ThemedText style={styles.emptyText}>No fixed expenses found.</ThemedText>
                        }
                    </View>
                )}

                {budget.variableExpenses && budget.variableExpenses.expenses.length > 0 && (
                    <View style={styles.expenseSection}>
                        <ThemedText type="miniText" style={[styles.color, styles.smalMar]}>Amount spent throughout the month{" "}
                            <ThemedText type="miniBold" style={styles.color}>{budget.variableExpenses.totalSum}</ThemedText>
                        </ThemedText>
                        <ThemedText type="miniText" style={[styles.color, styles.smalMar]}>Money left to spend{" "}
                            <ThemedText type="miniBold" style={styles.color}>{budget.remainingBalance - budget.variableExpenses.totalSum}</ThemedText>
                        </ThemedText>
                    </View>
                )}
            </View>
            <Link href={"/home"} style={[styles.button, styles.buttonColor]}>
                <ThemedText type='defaultSemiBold' style={styles.buttonText}>Back to Overview</ThemedText>
            </Link>

            <Link href={"/home/report"} style={styles.button}>
                <ThemedText type='defaultSemiBold' style={styles.buttonText}>Report</ThemedText>
            </Link>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    card: {
        padding: 40,
        backgroundColor: "#FFF7F7",
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
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    summary: {
        marginBottom: 20,
    },
    smalMar: {
        marginBottom: 8,
    },
    expenseSection: {
        marginTop: 10,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    expenseItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    emptyText: {
        fontStyle: 'italic',
        color: 'red',
    },
    button: {
        width: '100%',
        backgroundColor: purple,
        borderColor: '#1E1E1E',
        borderWidth: 1,
        padding: 20,
        borderRadius: 10,
    },
    buttonText: {
        textAlign: 'center',
        color: '#1E1E1E',
    },
    color: {
        color: '#1E1E1E',
    },
    buttonColor: {
        backgroundColor: pink,
        marginBottom: 10,
    }
});

export default BudgetScreen;
