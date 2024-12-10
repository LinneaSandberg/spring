import { ThemedText } from '@/components/ThemedText';
import { Link } from 'expo-router';
import { View, StyleSheet, Image } from 'react-native';

const NoBudgetInfo = () => {
    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/images/cloud.png')}
                style={styles.image}
            />

            <ThemedText type='subtitle'>Welcome to BudgetWise!</ThemedText>

            <ThemedText type='default'>
                It seems you haven't created a budget yet. Let's get started!
            </ThemedText>

            <ThemedText type='defaultSemiBold'>How BudgetWise Works</ThemedText>

            <View style={styles.step}>
                <ThemedText type='defaultSemiBold'>1</ThemedText>
                <ThemedText type='default'>Create a monthly budget: Set your income and planned expenses.</ThemedText>
            </View>

            <View style={styles.step}>
                <ThemedText type='defaultSemiBold'>2</ThemedText>
                <ThemedText type='default'>Track your spending: Add your expenses as you go.</ThemedText>
            </View>

            <View style={styles.step}>
                <ThemedText type='defaultSemiBold'>3</ThemedText>
                <ThemedText type='default'>Stay on top of your finances: Monitor your spending and adjust your budget as needed.</ThemedText>
            </View>

            <ThemedText type='defaultSemiBold'>Ready to take control of your budget?</ThemedText>

            <Link href="/home" style={styles.button}>
                <ThemedText style={styles.buttonText} type='defaultSemiBold'>Go to Budget</ThemedText>
            </Link>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 20,
    },
    image: {
        width: 400,
        height: 200,
        marginBottom: 20,
    },
    step: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    button: {
        marginBottom: 10,
        backgroundColor: '#FDD848',
        borderColor: '#1E1E1E',
        borderWidth: 1,
        padding: 20,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
    },
    buttonText: {
        color: '#1E1E1E',
    },
});

export default NoBudgetInfo;