import { View, Text, StyleSheet } from 'react-native';
import RegisterForm from "@/components/RegisterForm";
import { useAuth } from '@/hooks/useAuth';
import { SubmitHandler } from 'react-hook-form';
import { RegisterInfo } from '@/types/Auth.types';
import { doc, setDoc } from 'firebase/firestore';
import { registerUserCol } from '@/services/firebase';
import { FirebaseError } from 'firebase/app';
import { useRouter } from 'expo-router';

const RegisterScreen = () => {
    const { signup } = useAuth();
    const router = useRouter();

    const handleRegistration: SubmitHandler<RegisterInfo> = async (data) => {
        try {
            const newUser = await signup(data.email, data.password);
            const docRef = doc(registerUserCol, newUser.user.uid);

            await setDoc(docRef, {
                uid: newUser.user.uid,
                email: data.email,
                _id: docRef.id,
                name: data.name,
            });

            alert('User registered successfully');
            router.push('/login');

        } catch (error) {
            if (error instanceof FirebaseError) {
                alert(error.message);
            } else if (error instanceof Error) {
                alert(error.message);
            } else {
                alert('An error occurred');
            }
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Register an account</Text>
            <RegisterForm onRegister={handleRegistration} />
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
        fontSize: 30,
        marginBottom: 20,
        textAlign: 'center',
        color: '#1E1E1E',
    },
});

export default RegisterScreen;