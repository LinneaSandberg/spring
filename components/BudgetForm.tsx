import { Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import React, { useState } from 'react';

interface BudgetFormProps {
}

const BudgetForm: React.FC<BudgetFormProps> = ({ }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.heading}>Budget Tracker</Text>


            <Controller
                // control={control}
                name="totalIncome"
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        style={styles.input}
                        placeholder="Total Income"
                        keyboardType="numeric"
                        value={value?.toString() || ''}
                        onChangeText={text => onChange(parseFloat(text) || 0)}
                    />
                )}
            />

            <Text style={styles.subTitle}>Fixed Expenses</Text>
            {['Housing Costs', 'Transportation', 'Subscriptions', 'Health & Wellness', 'Entertainment'].map((expenseName, index) => (
                <Controller
                    key={expenseName}
                    // control={control}
                    name={`fixedExpenses.${index}.amount`}
                    render={({ field: { onChange, value } }) => (
                        <>
                            <Text style={styles.expenseTitle}>{expenseName}</Text>
                            <TextInput
                                style={styles.input}
                                placeholder={expenseName}
                                keyboardType="numeric"
                                value={value?.toString() || ''}
                                onChangeText={text => onChange(parseFloat(text) || 0)}
                            />
                        </>
                    )}
                />
            ))}

            <TouchableOpacity
                style={[styles.button, isSubmitting && styles.buttonDisabled]}
                // onPress={handleSubmit(onFormSubmit)}
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