import { View, StyleSheet, Text } from "react-native";
import { Link } from "expo-router";

const BudgetScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Budget Tracker</Text>

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