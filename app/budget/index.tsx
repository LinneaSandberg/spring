import BudgetForm from "@/components/BudgetForm";
import { View, StyleSheet, Text } from "react-native";
import { Link } from "expo-router";
import useCurrentBudget from "@/hooks/useCurrentBudget";


const BudgetScreen = () => {
    const currentBudget = useCurrentBudget();

    const handleSubmit = () => {
        console.log('submit');
    }


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Budget Tracker</Text>

            {/* {currentBudget ? (
                <BudgetForm initialBudget={currentBudget} onSubmit={} />
            ) : (
                <>
                    <Text>No budget found</Text>
                    <Link href="/budget/add">
                        <Text>Add montly budget</Text>
                    </Link>
                </>
            )} */}
            <Link href="/budget/add">
                <Text>Add montly budget</Text>
            </Link>

            <Link href="/budget/edit">
                <Text>Update montly budget</Text>
            </Link>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        marginTop: 40,
        fontSize: 28,
        marginBottom: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#2C3E50',
    }
});

export default BudgetScreen;