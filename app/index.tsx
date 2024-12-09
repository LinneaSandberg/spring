import { Link } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Button } from 'react-native';

const LandingPage = () => {
    return (
        <View style={styles.container}>
            <View style={styles.text}>
                <Text style={styles.title}>SPRING</Text>
            </View>
            {/* <Text style={styles.description}>
                Bring spring to your economy
            </Text> */}
            <View style={styles.buttons}>
                <Link style={styles.loginLink} href="/login">Login</Link>
                <Link style={styles.signupLink} href="/signup">Register an account</Link>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF7F7',
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
    title: {
        fontSize: 80,
        fontWeight: 'bold',
        color: '#FFF7F7',
    },
    // description: {
    //     fontSize: 26,
    //     marginTop: 0,
    //     textAlign: 'center',
    //     color: '#1E1E1E',
    // },
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
    button: {
        backgroundColor: '#FFD700',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 20,
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
    },
    registerLink: {
        fontSize: 14,
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    }
});

export default LandingPage;