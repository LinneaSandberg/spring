import { View, Text, StyleSheet, Alert } from "react-native";

const EditBudgetScreen = () => {

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Update Budget</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
});

export default EditBudgetScreen;
