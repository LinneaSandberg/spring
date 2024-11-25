import { StyleSheet, Text, View } from "react-native";

const SignupScreen = () => {
    return (
        <View style={styles.container}>
            <Text>SignUp</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
});

export default SignupScreen;