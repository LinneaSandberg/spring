import BudgetCard from "@/components/BudgetCard";
import { useAuth } from "@/hooks/useAuth";
import { db } from "@/services/firebase";
import { Link } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const HomeScreen = () => {
    const { currentUser: user } = useAuth();
    const [userName, setUserName] = useState<string | null>(null);
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    useEffect(() => {
        const fetchUserData = async () => {
            if (!user) return;

            const userDoc = await getDoc(doc(db, 'users', user.uid));

            if (userDoc.exists()) {
                setUserName(userDoc.data().name);
            }
        };

        fetchUserData();
    }, [user]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Hello, {userName}</Text>

            <Link href="/budget" style={styles.link}>
                <Text style={styles.buttonText}>Go to Budget</Text>
            </Link>

            <ScrollView style={styles.scrollView}>
                <BudgetCard month={currentMonth} year={currentYear} />
            </ScrollView>
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