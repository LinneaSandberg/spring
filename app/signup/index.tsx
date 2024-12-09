import RegisterForm from "@/components/forms/RegisterForm";
import { useAuth } from '@/hooks/useAuth';
import { SubmitHandler } from 'react-hook-form';
import { RegisterInfo } from '@/types/Auth.types';
import { FirebaseError } from 'firebase/app';
import { useRouter } from 'expo-router';
import { createUserInFirestore } from "@/services/firebaseFunctions";

const RegisterScreen = () => {
    const { signup, login } = useAuth();
    const router = useRouter();

    const handleRegistration: SubmitHandler<RegisterInfo> = async (data) => {
        try {
            const newUser = await signup(data.email, data.password);
            await createUserInFirestore(newUser.user.uid, data.email, data.name);

            await login(data.email, data.password);
            router.push('/welcome');

        } catch (error) {
            if (error instanceof FirebaseError) {
                switch (error.code) {
                    case 'auth/email-already-in-use':
                        alert('This email is already in use.');
                        break;
                    case 'auth/weak-password':
                        alert('The password is too weak.');
                        break;
                    default:
                        alert('An error occurred when registering the user.');
                }
            } else if (error instanceof Error) {
                alert(error.message);
            } else {
                alert('An error occurred');
            }
        }
    }
    return <RegisterForm onRegister={handleRegistration} />;
};

export default RegisterScreen;