import { Text, StyleSheet, TouchableOpacity, Alert, ScrollView, KeyboardAvoidingView } from 'react-native';
import { useForm, SubmitHandler } from 'react-hook-form';
import React, { useState } from 'react';
import { BudgetFormValues } from '@/types/Budget.types';
import { yupResolver } from '@hookform/resolvers/yup';
import { budgetSchema } from '@/validation/yupValidation';
import { InputField } from '../InputField';
import { DocumentData } from 'firebase/firestore';

interface BudgetFormProps {
    initialValues?: DocumentData;
    onSubmit: (data: BudgetFormValues) => Promise<void>;
}

const BudgetForm: React.FC<BudgetFormProps> = ({ initialValues, onSubmit }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    const { control, handleSubmit, formState: { errors } } = useForm<BudgetFormValues>({
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
            plannedExpenses: undefined,
            plannedSaving: undefined,
        },
    });

    const onSubmitForm: SubmitHandler<BudgetFormValues> = async (data) => {
        try {
            setIsSubmitting(true);
            await onSubmit(data);
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

                <InputField
                    placeholder='How much do you think you will use more than planned?'
                    control={control}
                    name="plannedExpenses"
                    label="Planned Expenses"
                    keyboardType="numeric"
                    defaultValue={initialValues?.plannedExpenses?.toString() || ''}
                    error={errors.plannedExpenses?.message}
                />

                <InputField
                    placeholder='How much are you planning to save this month?'
                    control={control}
                    name="plannedSaving"
                    label="Planned Saving"
                    keyboardType="numeric"
                    defaultValue={initialValues?.plannedSaving?.toString() || ''}
                    error={errors.plannedSaving?.message}
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