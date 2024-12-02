import { Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import React, { useState } from 'react';
import { Budget } from '@/types/Budget.types';
import { useRouter } from "expo-router";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";

const createNumberField = () => Yup.number().default(0);

const budgetSchema = Yup.object({
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


    const onSubmitForm = async (data: Budget) => {
        setIsSubmitting(true);

        try {

            const sumOfFixedExpenses = Object.values(data.fixedExpenses).reduce((sum, cost) => sum + (cost || 0), 0);
            const remainingBalance = data.totalIncome - sumOfFixedExpenses;

            console.log("Remaining balance:", remainingBalance);
            await onSubmit({ ...data, remaningBalance: remainingBalance });
            router.push('/home');
            Alert.alert('Budget saved successfully');

        } catch (error) {
            Alert.alert('Error!', 'Failed to save budget. Please try again.');
            console.error("Error submitting budget:", error);

        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.heading}>Budget Tracker</Text>

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
        </ScrollView >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        padding: 20,
        marginTop: 60,
    },
    heading: {
        fontSize: 28,
        marginBottom: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#2C3E50',
    },
    subTitle: {
        fontSize: 22,
        marginBottom: 10,
        fontWeight: '600',
        color: '#34495E',
    },
    expenseTitle: {
        fontSize: 18,
        marginVertical: 5,
        fontWeight: '500',
        color: '#555',
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        borderWidth: 1,
        marginBottom: 15,
        paddingLeft: 8,
        fontSize: 16,
    },
    button: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 10,
        backgroundColor: '#FFD700',
        borderColor: '#1E1E1E',
        borderWidth: 1,
        padding: 12,
        borderRadius: 8,
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
        color: '#E74C3C',
        fontSize: 12,
    },
    description: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 20,
    },
    picker: {
        height: 50,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 15,
        paddingHorizontal: 10,
    }
});

export default BudgetForm;