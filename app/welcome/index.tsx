import { Link } from 'expo-router';
import { View, Text, StyleSheet, Image } from 'react-native';

const NoBudgetInfo = () => {
    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/images/cloud.png')}
                style={styles.image}
            />

            <Text style={styles.title}>Welcome to BudgetWise!</Text>
            <Text style={styles.description}>
                It seems you haven't created a budget yet. Let's get started!
            </Text>

            <Text style={styles.sectionTitle}>How BudgetWise Works</Text>
            <View style={styles.step}>
                <Text style={styles.stepNumber}>1</Text>
                <Text style={styles.stepText}>Create a monthly budget: Set your income and planned expenses.</Text>
            </View>
            <View style={styles.step}>
                <Text style={styles.stepNumber}>2</Text>
                <Text style={styles.stepText}>Track your spending: Add your expenses as you go.</Text>
            </View>
            <View style={styles.step}>
                <Text style={styles.stepNumber}>3</Text>
                <Text style={styles.stepText}>Stay on top of your finances: Monitor your spending and adjust your budget as needed.</Text>
            </View>

            <Text style={styles.cta}>Ready to take control of your budget?</Text>

            <Link href="/home" style={styles.link}>
                <Text style={styles.buttonText}>Go to Budget</Text>
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
        width: 200,
        height: 200,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        textAlign: 'center',

        marginBottom:
            20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    step: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    stepNumber: {
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 10,
    },
    stepText: {
        fontSize: 16,
    },
    cta: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
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
});

export default NoBudgetInfo;