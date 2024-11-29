import { Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useForm, Controller, set } from 'react-hook-form';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Months } from '@/enum/monthEnum';
import saveMonthlyBudget from '@/services/budgetFunctions/saveMonthlyBudget';
import { Expenses, MonthlyBudget } from '@/types/Budget.types';

const BudgetForm = () => {
    const { currentUser } = useAuth();
    const { control, handleSubmit } = useForm();
    const [month, setMonth] = useState<Months>(Months.January);
    const [year, setYear] = useState(new Date().getFullYear());
    const [totalIncome, setTotalIncome] = useState<number>(0);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const [fixedExpenses, setFixedExpenses] = useState<Expenses>({
        housingCosts: null,
        transportation: null,
        subscriptions: null,
        healthAndWellness: null,
        entertainment: null,
    });

    const onSubmit = async () => {
        if (!currentUser) return;

        setIsSubmitted(true);

        const budget: MonthlyBudget = {
            month,
            year,
            totalIncome,
            fixedExpenses: [
                { name: "Housing Costs", amount: fixedExpenses.housingCosts ?? 0 },
                { name: "Transportation", amount: fixedExpenses.transportation ?? 0 },
                { name: "Subscriptions", amount: fixedExpenses.subscriptions ?? 0 },
                { name: "Health & Wellness", amount: fixedExpenses.healthAndWellness ?? 0 },
                { name: "Entertainment", amount: fixedExpenses.entertainment ?? 0 }
            ],
        };

        await saveMonthlyBudget(currentUser.uid, budget);
        setIsSubmitted(false);
    };

    return (
        <ScrollView style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Year"
                keyboardType="numeric"
                value={year.toString()}
                onChangeText={text => setYear(parseInt(text) || new Date().getFullYear())}
            />

            <Text style={styles.subTitle}>Total income</Text>
            <TextInput
                style={styles.input}
                placeholder="Total Income"
                keyboardType="numeric"
                value={totalIncome.toString()}
                onChangeText={text => setTotalIncome(parseFloat(text) || 0)}
            />



            <Text style={styles.subTitle}>Fixed Expenses</Text>

            <Text style={styles.expenseTitle}>Housing Costs</Text>
            <Controller
                control={control}
                name="housingCosts"
                render={({ field: { onChange, onBlur } }) => (
                    <TextInput
                        style={styles.input}
                        placeholder="Rent/Mortgage, Electricity, Heating"
                        keyboardType="numeric"
                        placeholderTextColor="#aaa"
                        value={fixedExpenses.housingCosts?.toString() ?? ""}
                        onBlur={onBlur}
                        onChangeText={text => {
                            const amount = text ? parseFloat(text) : null;
                            setFixedExpenses(prev => ({ ...prev, housingCosts: amount }));
                            onChange(amount);
                        }}
                    />
                )}
            />

            <Text style={styles.expenseTitle}>Transportation</Text>
            <Controller
                control={control}
                name="transportation"
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.input}
                        placeholder="Public transport, Gas"
                        keyboardType="numeric"
                        value={fixedExpenses.transportation?.toString() ?? ''}
                        onBlur={onBlur}
                        onChangeText={text => {
                            const amount = text ? parseFloat(text) : null;
                            setFixedExpenses(prev => ({ ...prev, transportation: amount }));
                            onChange(amount);
                        }}
                    />
                )}
            />

            <Text style={styles.expenseTitle}>Subscriptions</Text>
            <Controller
                control={control}
                name="subscriptions"
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.input}
                        placeholder="Phone, Internet, Streaming services"
                        keyboardType="numeric"
                        placeholderTextColor="#aaa"
                        value={fixedExpenses.subscriptions?.toString() ?? ''}
                        onBlur={onBlur}
                        onChangeText={text => {
                            const amount = text ? parseFloat(text) : null;
                            setFixedExpenses(prev => ({ ...prev, subscriptions: amount }));
                            onChange(amount);
                        }}
                    />
                )}
            />

            <Text style={styles.expenseTitle}>Health & Wellness</Text>
            <Controller
                control={control}
                name="healthAndWellness"
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.input}
                        placeholder="Gym, Medical expenses"
                        keyboardType="numeric"
                        placeholderTextColor="#aaa"
                        value={fixedExpenses.healthAndWellness?.toString() || ''}
                        onBlur={onBlur}
                        onChangeText={text => {
                            const amount = text ? parseFloat(text) : null;
                            setFixedExpenses(prev => ({ ...prev, healthAndWellness: amount }));
                            onChange(amount);
                        }}
                    />
                )}
            />

            <Text style={styles.expenseTitle}>Entertainment & Leisure</Text>
            <Controller
                control={control}
                name="entertainment"
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.input}
                        placeholder="Movies, Dining out"
                        keyboardType="numeric"
                        placeholderTextColor="#aaa"
                        value={fixedExpenses.entertainment?.toString() || ''}
                        onBlur={onBlur}
                        onChangeText={text => {
                            const amount = text ? parseFloat(text) : null;
                            setFixedExpenses(prev => ({ ...prev, entertainment: amount }));
                            onChange(amount);
                        }}
                    />
                )}
            />
            <TouchableOpacity
                style={[styles.button, isSubmitted && styles.buttonDisabled]}
                onPress={handleSubmit(onSubmit)}
                disabled={isSubmitted}
            >
                <Text style={styles.buttonText}>
                    {isSubmitted ? "Submitting..." : "Submit"}
                </Text>
            </TouchableOpacity>
        </ScrollView >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#F5F5F5',
        padding: 20,
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
        borderRadius: 8,
        borderWidth: 1,
        marginBottom: 15,
        paddingLeft: 8,
        paddingRight: 8,
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
        fontWeight: 'bold',
        textAlign: 'center',
    },
    error: {
        color: '#E74C3C',
        fontSize: 12,
        marginBottom: 10,
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