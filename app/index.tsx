import { Link } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LandingPage = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>SPRING</Text>
            <Text style={styles.description}>
                Bring spring to your economy
            </Text>


            <Link style={styles.bigLink} href="/login">Login</Link>
            <Link style={styles.registerLink} href="/signup">Don´t already have an account register here!</Link>
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
        fontSize: 60,
        marginBottom: 20,
        textAlign: 'center',
        color: '#E96B6B',
    },
    description: {
        fontSize: 16,
        marginBottom: 40,
        textAlign: 'center',
        color: '#1E1E1E',
    },
    bigLink: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 10,
        backgroundColor: '#FAECC4',
        borderColor: '#1E1E1E',
        borderWidth: 1,
        padding: 10,
        borderRadius: 20,
        color: '#1E1E1E',
    },
    registerLink: {
        fontSize: 14,
        textAlign: 'center',
    },
});

export default LandingPage;