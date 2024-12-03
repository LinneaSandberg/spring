import React, { useRef, useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { RegisterInfo } from '@/types/Auth.types';
import LoadingSpinner from './LoadingSpinner';

interface RegisterFormProps {
    onRegister: SubmitHandler<RegisterInfo>;
}

const registrationSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, 'Name must be at least 3 characters')
        .required('Name is required'),
    email: Yup.string()
        .email('Invalid email format')
        .required('Email is required'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
        .required('Confirm Password is required'),
});

const RegisterForm: React.FC<RegisterFormProps> = ({ onRegister }) => {
    const [isRegistering, setIsRegistering] = useState(false);
    const {
        control,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm<RegisterInfo>({
        resolver: yupResolver(registrationSchema),
    });

    const passwordRef = useRef("");
    passwordRef.current = watch("password");

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

            <Controller
                control={control}
                name="name"
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.input}
                        placeholder="Name"
                        placeholderTextColor="#aaa"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
            />
            {errors.name && <Text style={[styles.error, styles.errorMargin]}>{errors.name.message}</Text>}

            <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor="#aaa"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
            />
            {errors.email && <Text style={[styles.error, styles.errorMargin]}>{errors.email.message}</Text>}

            <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor="#aaa"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        secureTextEntry
                    />
                )}
            />
            {errors.password && <Text style={[styles.error, styles.errorMargin]}>{errors.password.message}</Text>}

            <Controller
                control={control}
                name="confirmPassword"
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.input}
                        placeholder="Confirm Password"
                        placeholderTextColor="#aaa"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        secureTextEntry
                    />
                )}
            />
            {errors.confirmPassword && <Text style={[styles.error, styles.errorMargin]}>{errors.confirmPassword.message}</Text>}

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
    input: {
        height: 40,
        borderColor: '#ccc',
        backgroundColor: '#F3F3F3',
        borderRadius: 10,
        borderWidth: 1,
        marginBottom: 15,
        paddingLeft: 8,
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
    error: {
        color: 'red',
        fontSize: 12,
    },
    errorMargin: {
        marginBottom: 20,
        marginTop: -10,
        marginLeft: 8,
        textAlign: 'left',
        fontWeight: 'bold',
    },
});

export default RegisterForm;