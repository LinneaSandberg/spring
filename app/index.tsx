import { ThemedText } from '@/components/ThemedText';
import { Link } from 'expo-router';
import React from 'react';
import { View, StyleSheet } from 'react-native';

const LandingPage = () => {
    return (
        <View style={styles.container}>
            <View style={styles.text}>
                <ThemedText type="title">SPRING</ThemedText>
            </View>
            {/* <ThemedText style={styles.description}>
                Bring spring to your economy
            </ThemedText> */}
            <View style={styles.buttons}>
                <Link style={styles.loginLink} href="/login">Login</Link>
                <Link style={styles.signupLink} href="/signup">Register an account</Link>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        flex: 1,
        alignContent: 'center',
        justifyContent: 'space-between',
        boxSizing: 'border-box',
    },
    text: {
        zIndex: 1,
        backgroundColor: '#FDD848',
        width: '100%',
        height: '30%',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        paddingHorizontal: 20,
    },
    buttons: {
        paddingHorizontal: 20,
        marginBottom: 80,
    },
    loginLink: {
        fontSize: 22,
        fontWeight: 'semibold',
        textAlign: 'center',
        marginBottom: 10,
        backgroundColor: '#D8BCEF',
        borderColor: '#1E1E1E',
        borderWidth: 1,
        padding: 20,
        borderRadius: 10,
    },
    signupLink: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 10,
        backgroundColor: '#FDD848',
        borderColor: '#1E1E1E',
        borderWidth: 1,
        padding: 20,
        borderRadius: 10,
    }
});

export default LandingPage;