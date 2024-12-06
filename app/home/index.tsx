import BudgetAndExpenses from "@/components/BudgetAndExpenses";
import useUser from "@/hooks/useUser";
import { Link } from "expo-router";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from "react-native";

const HomeScreen = () => {
    const { data, loading } = useUser();
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" />
            ) : (
                <>
                    <Text style={styles.title}>Hello, {data?.name}</Text>

                    <Link href="/budget" style={styles.link}>
                        <Text style={styles.buttonText}>Go to Budget</Text>
                    </Link>

                    <ScrollView style={styles.scrollView}>
                        <BudgetAndExpenses month={currentMonth} year={currentYear} />
                    </ScrollView>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        padding: 20,
        boxSizing: 'border-box',
    },
    title: {
        fontSize: 30,
        marginBottom: 20,
        textAlign: 'center',
        color: '#1E1E1E',
    },
    link: {
        textAlign: 'center',
        marginBottom: 10,
        backgroundColor: '#FFD700',
        borderColor: '#1E1E1E',
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
    },
    buttonText: {
        color: '#1E1E1E',
        fontSize: 18,
        textAlign: 'center',
    },
    scrollView: {
        marginTop: 10,
        maxHeight: '70%',
    },
});

export default HomeScreen;