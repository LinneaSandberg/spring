import { useAuth } from "@/hooks/useAuth";
import { db } from "@/services/firebase";
import { Link } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

const HomeScreen = () => {
    const { currentUser: user } = useAuth();
    const [userName, setUserName] = useState<string | null>(null);

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
            <Text style={styles.title}>Hello, this is your dashboard: {userName}</Text>

            <Link href="/budget">
                <Text>Go to Budget</Text>
            </Link>
        </View>
    );
};

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
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 15,
        paddingLeft: 8,
    },
    error: {
        color: 'red',
        fontSize: 12,
    },
});

export default HomeScreen;