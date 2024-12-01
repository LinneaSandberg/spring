import { Link } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';

const LandingPage = () => {
    return (
        <ImageBackground source={require('../assets/images/grass.jpg')} style={styles.backgroundImage}>
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>SPRING</Text>
                    <Text style={styles.description}>
                        Bring spring to your economy
                    </Text>
                </View>


                <View style={styles.buttonCon}>
                    <Link style={styles.bigLink} href="/login">Login</Link>
                    <Link style={styles.registerLink} href="/signup">Don´t already have an account register here!</Link>
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
        fontSize: 16,
        marginBottom: 40,
        textAlign: 'center',
        color: '#1E1E1E',
    },
    bigLink: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 10,
        backgroundColor: '#FFD700',
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
    },
    buttonCon: {
    },
    titleContainer: {

    }
});

export default LandingPage;