import { Text, StyleSheet, TouchableOpacity, Alert, ScrollView, KeyboardAvoidingView } from 'react-native';
import { useForm, SubmitHandler } from 'react-hook-form';
import React, { useState } from 'react';
import { Budget } from '@/types/Budget.types';
import { useRouter } from "expo-router";
import { yupResolver } from '@hookform/resolvers/yup';
import { budgetSchema } from '@/validation/yupValidation';
import { InputField } from '../InputField';

interface BudgetFormProps {
    initialValues?: Budget;
    onSubmit: (data: Budget) => Promise<void>;
}

const BudgetForm: React.FC<BudgetFormProps> = ({ initialValues, onSubmit }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    const { control, handleSubmit, formState: { errors } } = useForm<Budget>({
        resolver: yupResolver(budgetSchema),
        defaultValues: initialValues || {
            month: currentMonth,
            year: currentYear,
            totalIncome: 0,
            fixedExpenses: {
                housingCosts: 0,
                transportation: 0,
                subscriptions: 0,
                healthAndWellness: 0,
                entertainment: 0,
            },
            remaningBalance: 0,
            variableExpenses: {
                planned: 0,
                expenses: [],
            },
        },
    });
    const router = useRouter();

    const onSubmitForm: SubmitHandler<Budget> = async (data) => {
        try {
            setIsSubmitting(true);
            await onSubmit(data);
            setTimeout(() => router.replace('/budget'), 2000);

        } catch (error) {
            if (error instanceof Error) {
                Alert.alert('Error!', error.message);
            } else {
                Alert.alert('Error!', 'Failed to save budget. Please try again.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <ScrollView
                style={{ flex: 1 }}
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{ padding: 20 }}
            >
                <Text style={styles.title}>Budget Tracker</Text>

                <Text style={styles.subTitle}>Total income</Text>
                <InputField
                    placeholder='Total Income'
                    control={control}
                    name="totalIncome"
                    label="Total Income"
                    keyboardType="numeric"
                    defaultValue={initialValues?.totalIncome?.toString() || ''}
                    error={errors.totalIncome?.message}
                />

                <Text style={styles.subTitle}>Fixed Expenses</Text>
                <InputField
                    placeholder='Housing Costs'
                    control={control}
                    name="fixedExpenses.housingCosts"
                    label="Housing Costs"
                    keyboardType="numeric"
                    defaultValue={initialValues?.fixedExpenses?.housingCosts?.toString() || ''}
                    error={errors.fixedExpenses?.housingCosts?.message}
                />

                <InputField
                    placeholder='Transportation'
                    control={control}
                    name="fixedExpenses.transportation"
                    label="Transportation"
                    keyboardType="numeric"
                    defaultValue={initialValues?.fixedExpenses?.transportation?.toString() || ''}
                    error={errors.fixedExpenses?.transportation?.message}
                />

                <InputField
                    placeholder='Subscriptions'
                    control={control}
                    name="fixedExpenses.subscriptions"
                    label="Subscriptions"
                    keyboardType="numeric"
                    defaultValue={initialValues?.fixedExpenses?.subscriptions?.toString() || ''}
                    error={errors.fixedExpenses?.subscriptions?.message}
                />

                <InputField
                    placeholder='Health and Wellness'
                    control={control}
                    name="fixedExpenses.healthAndWellness"
                    label="Health and Wellness"
                    keyboardType="numeric"
                    defaultValue={initialValues?.fixedExpenses?.healthAndWellness?.toString() || ''}
                    error={errors.fixedExpenses?.healthAndWellness?.message}
                />

                <InputField
                    placeholder='Entertainment'
                    control={control}
                    name="fixedExpenses.entertainment"
                    label="Entertainment"
                    keyboardType="numeric"
                    defaultValue={initialValues?.fixedExpenses?.entertainment?.toString() || ''}
                    error={errors.fixedExpenses?.entertainment?.message}
                />

                <TouchableOpacity
                    style={[styles.button, isSubmitting && styles.buttonDisabled]}
                    onPress={handleSubmit(onSubmitForm)}
                    disabled={isSubmitting}
                >
                    <Text style={styles.buttonText}>
                        {isSubmitting ? "Submitting..." : "Submit"}
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView >
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
        marginTop: 60,
        marginBottom: 40,
        textAlign: 'center',
        color: '#1E1E1E',
    },
    subTitle: {
        fontSize: 20,
        marginBottom: 10,
        fontWeight: '600',
        color: '#1E1E1E',
    },
    expenseTitle: {
        fontSize: 16,
        marginVertical: 5,
        fontWeight: '400',
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
        marginTop: 20,
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

export default BudgetForm;