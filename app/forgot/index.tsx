import { useAuth } from "@/hooks/useAuth";
import { ResetPasswordInfo } from "@/types/Auth.types";
import { FirebaseError } from "firebase/app";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useRouter } from 'expo-router';

const registrationSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email format')
        .required('Email is required'),
});

const ForgotScreen = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [resetPasswordSubmit, setResetPasswordSubmit] = useState(false);
    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<ResetPasswordInfo>({
        resolver: yupResolver(registrationSchema)
    });
    const { resetPassword } = useAuth();
    const router = useRouter();

    const onResetPassword: SubmitHandler<ResetPasswordInfo> = async (data) => {
        setIsSubmitting(true);

        try {
            await resetPassword(data.email);
            setResetPasswordSubmit(true);
            router.push('/login');
            Alert.alert('Success', 'Password reset email sent.');

        } catch (error) {
            if (error instanceof FirebaseError) {
                alert(error.message);
            } else if (error instanceof Error) {
                alert(error.message);
            } else {
                alert('An error occurred');
            }
        }
        setIsSubmitting(false);
    }

    return (
        <View style={styles.formContainer}>
            <Text style={styles.title}>Forgot Password</Text>

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
            {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

            <TouchableOpacity
                style={[styles.button, isSubmitting && styles.buttonDisabled]}
                onPress={handleSubmit(onResetPassword)}
                disabled={isSubmitting}
            >
                <Text style={styles.buttonText}>
                    {isSubmitting
                        ? "Submitting..."
                        : "Submit"
                    }
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    formContainer: {
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
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 10,
        backgroundColor: '#FAECC4',
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
        fontSize: 16,
        textAlign: 'center',
    },
    error: {
        color: 'red',
        marginBottom: 12,
    },
});

export default ForgotScreen;