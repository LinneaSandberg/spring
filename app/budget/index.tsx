import BudgetForm from "@/components/BudgetForm";
import { View, StyleSheet, Text } from "react-native";

const BudgetScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Budget Tracker</Text>

            <BudgetForm />
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