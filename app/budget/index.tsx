import BudgetForm from "@/components/BudgetForm";
import { View, Text, StyleSheet } from "react-native";

const BudgetScreen = () => {


    return (
        <View style={styles.container}>
            <Text>Budget Screen</Text>

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
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
    }
});

export default BudgetScreen;