import { useAuth } from "@/hooks/useAuth";
import { ResetPasswordInfo } from "@/types/Auth.types";
import { FirebaseError } from "firebase/app";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'expo-router';
import { forgotPasswordSchema } from "@/validation/yupValidation";
import { InputField } from "@/components/InputField";
import { ThemedText } from "@/components/ThemedText";

const ForgotPasswordScreen = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<ResetPasswordInfo>({
        resolver: yupResolver(forgotPasswordSchema)
    });
    const { resetPassword } = useAuth();
    const router = useRouter();

    const onResetPassword: SubmitHandler<ResetPasswordInfo> = async (data) => {
        setIsSubmitting(true);

        try {
            await resetPassword(data.email);
            setIsSuccess(true);
            setTimeout(() => {
                router.push('/login');
            }, 2000);

        } catch (error) {
            if (error instanceof FirebaseError) {
                switch (error.code) {
                    case "auth/user-not-found":
                        alert("User not found.");
                        break;
                    default:
                        alert("An error occurred.");
                }
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
            <View style={styles.titlePosition}>
                <ThemedText type='subtitle'>Forgot Password</ThemedText>
            </View>

            <InputField
                control={control}
                name="email"
                label="Email"
                placeholder="Enter your email"
                keyboardType="email-address"
                error={errors.email?.message}
            />

            <TouchableOpacity
                style={[styles.button, isSubmitting && styles.buttonDisabled]}
                onPress={handleSubmit(onResetPassword)}
                disabled={isSubmitting}
            >
                <ThemedText type='defaultSemiBold'>
                    {isSubmitting
                        ? "Submitting..."
                        : "Submit"
                    }
                </ThemedText>
            </TouchableOpacity>

            {isSuccess && (
                <ThemedText style={styles.successMessage}>
                    We have sent you an email with instructions to reset your password.
                </ThemedText>
            )}
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
    successMessage: {
        color: 'green',
        textAlign: 'center',
        marginTop: 20,
    }
});

export default ForgotPasswordScreen;