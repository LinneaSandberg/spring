import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

const LoadingSpinner = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#0b4e33" />
            <Text style={styles.title}>Loading...</Text>
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
        marginTop: 20,
        textAlign: "center",
        fontSize: 20,
    }
});

export default LoadingSpinner;