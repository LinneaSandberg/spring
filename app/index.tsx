import { Link } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';

const LandingPage = () => {
    return (
        <ImageBackground source={require('../assets/images/grass.jpg')} style={styles.backgroundImage}>
            <View style={styles.container}>
                <View>
                    <Text style={styles.title}>SPRING</Text>
                    <Text style={styles.description}>
                        Bring spring to your economy
                    </Text>
                </View>
                <View>
                    <Link style={styles.loginLink} href="/login">Login</Link>
                    <Link style={styles.signupLink} href="/signup">Register an account</Link>
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        boxSizing: 'border-box',
        marginTop: 200,
        marginBottom: 100,
    },
    title: {
        fontSize: 80,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#FFD700',
    },
    description: {
        fontSize: 26,
        marginBottom: 40,
        textAlign: 'center',
        color: '#FFFFF2',
    },
    loginLink: {
        fontSize: 22,
        fontWeight: 'semibold',
        textAlign: 'center',
        marginBottom: 10,
        backgroundColor: '#FFD700',
        // borderColor: '#1E1E1E',
        // borderWidth: 1,
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
        backgroundColor: '#d64c0e',
        borderColor: '#1E1E1E',
        borderWidth: 1,
        padding: 10,
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