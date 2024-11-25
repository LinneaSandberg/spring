import { Link } from 'expo-router';
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const LandingPage = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to the Budget App!</Text>
            <Text style={styles.description}>
                This app helps you manage your expenses efficiently and stay on track with your savings goals.
            </Text>


            <Link href="/login">Login</Link>
            <Link href="/signup">Sign up</Link>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        padding: 40,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
    },
    description: {
        fontSize: 16,
        marginBottom: 40,
        textAlign: 'center',
    },
});

export default LandingPage;