import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { ExpenseFormValues, VariableExpense } from '@/types/Budget.types';
import { yupResolver } from '@hookform/resolvers/yup';
import DatePicker from './DatePicker';
import { expenseSchema } from '@/validation/yupValidation';
import { Timestamp } from 'firebase/firestore';

interface AddExpenseModalProps {
    visible: boolean;
    onClose: () => void;
    onSubmit: (data: VariableExpense) => void;
    budgetId: string;
}

const AddExpenseModal: React.FC<AddExpenseModalProps> = ({
    visible,
    onClose,
    onSubmit,
    budgetId
}) => {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ExpenseFormValues>({
        resolver: yupResolver(expenseSchema),
        defaultValues: {
            date: new Date(),
            description: "",
            amount: 0,
            necessary: false,
        }
    });

    const onSubmitForm = (data: ExpenseFormValues) => {
        const expenseData: VariableExpense = {
            ...data,
            _id: budgetId,
            date: Timestamp.fromDate(data.date),
        };
        onSubmit(expenseData);
        reset();
        onClose();
    };

    return (
        <Modal visible={visible} animationType="slide">
            <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>Add Expense</Text>

                <DatePicker control={control} name="date" label="Date" />

                <Controller
                    control={control}
                    name="description"
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            style={styles.input}
                            placeholder="Description"
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />
                {errors.description && <Text style={[styles.error, styles.errorMargin]}>{errors.description.message}</Text>}

                <Controller
                    control={control}
                    name="amount"
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            style={styles.input}
                            placeholder="Amount"
                            keyboardType="numeric"
                            onChangeText={(text) => onChange(parseFloat(text) || 0)}
                            value={value.toString()}
                        />
                    )}
                />
                {errors.amount && <Text style={[styles.error, styles.errorMargin]}>{errors.amount.message}</Text>}

                <Controller
                    control={control}
                    name="necessary"
                    render={({ field: { value, onChange } }) => (
                        <TouchableOpacity onPress={() => onChange(!value)}>
                            <Text>Necessary: {value ? 'Yes' : 'No'}</Text>
                        </TouchableOpacity>
                    )}
                />

                <View style={styles.modalButtons}>
                    <TouchableOpacity style={styles.modalButton} onPress={handleSubmit(onSubmitForm)}>
                        <Text style={styles.modalButtonText}>Save</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.modalButton} onPress={onClose}>
                        <Text style={styles.modalButtonText}>Cancel</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        width: '80%',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '80%',
    },
    modalButton: {
        backgroundColor: '#FFD700',
        padding: 10,
        borderRadius: 5,
    },
    modalButtonText: {
        color: 'black',
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

export default AddExpenseModal;