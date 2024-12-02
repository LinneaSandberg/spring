import { Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView, KeyboardAvoidingView } from 'react-native';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import React, { useState } from 'react';
import { Budget } from '@/types/Budget.types';
import { useRouter } from "expo-router";
import * as Yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

const createNumberField = () => Yup.number().default(0);

const budgetSchema = Yup.object({
    _id: Yup.string().optional(),
    month: Yup.number().required(),
    year: Yup.number().required(),
    totalIncome: Yup.number().required("You need to enter your total income"),
    fixedExpenses: Yup.object({
        housingCosts: createNumberField(),
        transportation: createNumberField(),
        subscriptions: createNumberField(),
        healthAndWellness: createNumberField(),
        entertainment: createNumberField(),
    }).required(),
    remaningBalance: Yup.number().required(),
    variableExpenses: Yup.object({
        planned: Yup.number().required(),
        expenses: Yup.array()
            .of(
                Yup.object({
                    date: Yup.string().required(),
                    description: Yup.string().required(),
                    amount: Yup.number().required(),
                })
            )
            .default([]),
    }).required(),
}).required();

interface BudgetFormProps {
    initialValues?: Budget;
    onSubmit: (data: Budget) => Promise<void>;
}

const BudgetForm: React.FC<BudgetFormProps> = ({ initialValues, onSubmit }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    const { control, handleSubmit, ...rest } = useForm<Budget>({
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
                <Controller
                    control={control}
                    name="totalIncome"
                    render={({ field: { onChange, value, ...rest } }) => (
                        <TextInput
                            style={styles.input}
                            placeholder="Total Income"
                            keyboardType="numeric"
                            value={value?.toString() || ''}
                            onChangeText={text => onChange(parseFloat(text) || 0)}
                            {...rest}
                        />
                    )}
                />

                <Text style={styles.subTitle}>Fixed Expenses</Text>
                <Controller
                    control={control}
                    name="fixedExpenses.housingCosts"
                    render={({ field: { onChange, value, ...rest } }) => (
                        <>
                            <Text style={styles.expenseTitle}>Housing Costs</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Housing Costs"
                                keyboardType="numeric"
                                value={value?.toString() || ''}
                                onChangeText={text => onChange(parseFloat(text) || 0)}
                                {...rest}
                            />
                        </>
                    )}
                />

                <Controller
                    control={control}
                    name="fixedExpenses.transportation"
                    render={({ field: { onChange, value, ...rest } }) => (
                        <>
                            <Text style={styles.expenseTitle}>Transportation</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Transportation"
                                keyboardType="numeric"
                                value={value?.toString() || ''}
                                onChangeText={text => onChange(parseFloat(text) || 0)}
                                {...rest}
                            />
                        </>
                    )}
                />

                <Controller
                    control={control}
                    name="fixedExpenses.subscriptions"
                    render={({ field: { onChange, value, ...rest } }) => (
                        <>
                            <Text style={styles.expenseTitle}>Subscriptions</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Subscriptions"
                                keyboardType="numeric"
                                value={value?.toString() || ''}
                                onChangeText={text => onChange(parseFloat(text) || 0)}
                                {...rest}
                            />
                        </>
                    )}
                />

                <Controller
                    control={control}
                    name="fixedExpenses.healthAndWellness"
                    render={({ field: { onChange, value, ...rest } }) => (
                        <>
                            <Text style={styles.expenseTitle}>Health & Wellness</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Health & Wellness"
                                keyboardType="numeric"
                                value={value?.toString() || ''}
                                onChangeText={text => onChange(parseFloat(text) || 0)}
                                {...rest}
                            />
                        </>
                    )}
                />

                <Controller
                    control={control}
                    name="fixedExpenses.entertainment"
                    render={({ field: { onChange, value, ...rest } }) => (
                        <>
                            <Text style={styles.expenseTitle}>Entertainment</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Entertainment"
                                keyboardType="numeric"
                                value={value?.toString() || ''}
                                onChangeText={text => onChange(parseFloat(text) || 0)}
                                {...rest}
                            />
                        </>
                    )}
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