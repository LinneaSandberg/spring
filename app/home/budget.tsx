import LoadingSpinner from "@/components/LoadingSpinner";
import { ThemedText } from "@/components/ThemedText";
import useBudget from "@/hooks/useBudget";
import { Link } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";

const BudgetScreen = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    const { budget, loading: budgetLoading } = useBudget(currentMonth, currentYear);

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
            <ThemedText>{currentDate.toLocaleString('default', { month: 'long' })}</ThemedText>

            <View style={styles.wrapper}>
                <View style={styles.sumBox}>
                    <ThemedText>{budget.remaningBalance}</ThemedText>
                    <ThemedText>{budget.plannedExpenses}</ThemedText>
                    <ThemedText>{budget.plannedSaving}</ThemedText>
                </View>
                <View style={styles.buttomBox}>
                    <Link style={styles.button} href={`/home/edit?month=${currentMonth}&year=${currentYear}`}>
                        <ThemedText style={styles.buttonText}>Update Budget</ThemedText>
                    </Link>
                </View>
            </View>
            {/* <View style={styles.box}>
                <ThemedText>Budget Screen</ThemedText>
            </View> */}
        </View>
    );
};

export default BudgetScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    wrapper: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#B3DAAB',
        width: '100%',
    },
    sumBox: {
        width: "70%",
        height: 100,
        margin: 10,
    },
    buttomBox: {
        width: "30%",
        height: 100,
    },
    button: {
        backgroundColor: '#FFD700',
        padding: 10,
        borderRadius: 10,
    },
    buttonText: {
        color: 'white',
    }
});