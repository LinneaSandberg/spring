import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RegisterInfo } from '@/types/Auth.types';
import LoadingSpinner from '../LoadingSpinner';
import { InputField } from '../InputField';
import { registrationSchema } from '@/validation/yupValidation';

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

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Register an account</Text>

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
                <Text style={styles.buttonText}>
                    {isRegistering ? "Registering..." : "Register"}
                </Text>
            </TouchableOpacity>

            {isRegistering && <LoadingSpinner />}
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
    title: {
        fontSize: 30,
        marginBottom: 20,
        textAlign: 'center',
        color: '#1E1E1E',
    },
    button: {
        textAlign: 'center',
        marginBottom: 10,
        backgroundColor: '#FFD700',
        borderColor: '#1E1E1E',
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
    },
    buttonDisabled: {
        backgroundColor: '#A9A9A9',
    },
    buttonText: {
        color: '#1E1E1E',
        fontSize: 18,
        textAlign: 'center',
    },
});

export default RegisterForm;