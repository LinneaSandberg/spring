import AnimatedText from '@/components/AnimatedText';
import { ThemedText } from '@/components/ThemedText';
import { purple } from '@/constants/Colors';
import { Link } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const WelcomeScreen = () => {
    return (
        <View style={styles.container}>
            <AnimatedText text='Spring' />
            <ThemedText type='defaultSemiBold' style={styles.subTitle}>Bring spring into your economy</ThemedText>

            <View style={styles.wrapper}>
                <View style={styles.imageBox}>
                    <AntDesign name="edit" size={80} color="#B3DAAB" />
                </View>
                <View style={styles.step}>
                    <ThemedText type='defaultSemiBold' style={styles.defaultSemiBold}>First</ThemedText>
                    <ThemedText type='default' style={styles.text}>Create a personal budget and a saving goal for the month.</ThemedText>
                </View>
            </View>

            <View style={styles.wrapper}>
                <View style={styles.step}>
                    <ThemedText type='defaultSemiBold' style={styles.defaultSemiBold}>& Then</ThemedText>
                    <ThemedText style={styles.text}>Track your spendings with necessary and unecessary expenses.</ThemedText>
                </View>
                <View style={styles.imageBox}>
                    <Entypo name="line-graph" size={80} color="#9AB2D4" />
                </View>
            </View>

            <View style={styles.wrapper}>
                <View style={styles.imageBox}>
                    <MaterialIcons name="savings" size={80} color="#FFD700" />
                </View>
                <View style={styles.step}>
                    <ThemedText type='defaultSemiBold' style={styles.defaultSemiBold}>Finally</ThemedText>
                    <ThemedText style={styles.text}>Increase awareness of your spending habits will help you achieve your savings goals.</ThemedText>
                </View>
            </View>

            <ThemedText type='miniBold' style={styles.miniText}>Ready to take control of your economy?</ThemedText>

            <Link href="/home" style={styles.button}>
                <ThemedText style={styles.buttonText} type='defaultSemiBold'>Let's get started</ThemedText>
            </Link>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    subTitle: {
        marginBottom: 20,
    },
    miniText: {
        marginVertical: 10,
        textAlign: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    step: {
        paddingHorizontal: 5,
        width: '70%',
    },
    text: {
        fontSize: 14,
        color: '#1E1E1E',
    },
    defaultSemiBold: {
        color: '#1E1E1E',
    },
    button: {
        width: '100%',
        marginBottom: 10,
        backgroundColor: purple,
        borderColor: '#1E1E1E',
        borderWidth: 1,
        padding: 20,
        borderRadius: 10,
    },
    buttonText: {
        color: '#1E1E1E',
        textAlign: 'center',
    },
    wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: "#FFF7F7",
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 5,
    },
    imageBox: {
        width: '30%',
        height: 80,
    },
});

export default WelcomeScreen;