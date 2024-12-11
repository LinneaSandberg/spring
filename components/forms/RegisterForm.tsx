import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RegisterInfo } from '@/types/Auth.types';
import LoadingSpinner from '../LoadingSpinner';
import { InputField } from '../InputField';
import { registrationSchema } from '@/validation/yupValidation';
import { ThemedText } from '../ThemedText';

interface RegisterFormProps {
    onRegister: SubmitHandler<RegisterInfo>;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onRegister }) => {
    const [isRegistering, setIsRegistering] = useState(false);
    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<RegisterInfo>({
        resolver: yupResolver(registrationSchema),
    });

    const onSubmitRegistration: SubmitHandler<RegisterInfo> = async (data) => {
        setIsRegistering(true);

        try {
            await onRegister(data);
        } catch (error) {
            console.error("Registration failed:", error);
        } finally {
            setIsRegistering(false);
        }
    };

    if (isRegistering) {
        return <LoadingSpinner />;
    }

    return (
        <View style={styles.container}>
            <View style={styles.titlePosition}>
                <ThemedText type='subtitle'>Register an account</ThemedText>
            </View>

            <InputField
                control={control}
                name="name"
                label="Name"
                placeholder="Enter your name"
                error={errors.name?.message}
            />

            <InputField
                control={control}
                name="email"
                label="Email"
                placeholder="Enter your email"
                keyboardType="email-address"
                error={errors.email?.message}
            />

            <InputField
                control={control}
                name="password"
                label="Password"
                placeholder="Enter your password"
                secureTextEntry
                error={errors.password?.message}
            />

            <InputField
                control={control}
                name="confirmPassword"
                label="Confirm Password"
                placeholder="Confirm your password"
                secureTextEntry
                error={errors.confirmPassword?.message}
            />

            <TouchableOpacity
                style={[styles.button, isRegistering && styles.buttonDisabled]}
                onPress={handleSubmit(onSubmitRegistration)}
                disabled={isRegistering}
            >
                <ThemedText type='defaultSemiBold'>
                    {isRegistering ? "Registering..." : "Register"}
                </ThemedText>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        padding: 20,
        boxSizing: 'border-box',
    },
    titlePosition: {
        marginBottom: 20,
        display: 'flex',
        alignItems: 'center',
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
    buttonDisabled: {
        backgroundColor: '#A9A9A9',
    },
});

export default RegisterForm;