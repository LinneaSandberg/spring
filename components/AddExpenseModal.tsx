import React from 'react';
import {
    View,
    Text,
    Modal,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Switch,
    TouchableWithoutFeedback,
    Keyboard,
    KeyboardAvoidingView
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { ExpenseFormValues, VariableExpense } from '@/types/Budget.types';
import { yupResolver } from '@hookform/resolvers/yup';
import DatePicker from './DatePicker';
import { expenseSchema } from '@/validation/yupValidation';
import { Timestamp } from 'firebase/firestore';
import { FontAwesome } from '@expo/vector-icons';

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
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <KeyboardAvoidingView style={styles.modalContainer} behavior="padding">
                        <View style={styles.contentContainer}>
                            <DatePicker control={control} name="date" label="Pick a date for the expense" />
                            <View style={styles.inputContainer}>
                                <Text style={styles.inputLabel}>Description</Text>
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
                            </View>

                            <View style={styles.inputContainer}>
                                <Text style={styles.inputLabel}>Amount</Text>
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
                            </View>


                            <View style={styles.switchContainer}>
                                <Text style={styles.switchLabel}>Unecessary</Text>
                                <Controller
                                    control={control}
                                    name="necessary"
                                    render={({ field: { value, onChange } }) => (
                                        <Switch
                                            value={value}
                                            onValueChange={onChange}
                                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                                            thumbColor={value ? "#f5dd4b" : "#f4f3f4"}
                                        />
                                    )}
                                />
                                <Text style={styles.switchLabel}>Necessary</Text>
                            </View>

                            <View style={styles.modalButtons}>
                                <TouchableOpacity style={styles.modalButton} onPress={handleSubmit(onSubmitForm)}>
                                    <Text style={styles.modalButtonText}>
                                        <FontAwesome name="save" size={16} color="black" /> Save
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.modalButton} onPress={onClose}>
                                    <Text style={styles.modalButtonText}>
                                        <FontAwesome name="close" size={16} color="black" /> Cancel
                                    </Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </TouchableWithoutFeedback>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        paddingTop: 40,
        backgroundColor: '#f5f5f5',
        paddingHorizontal: 20,
    },
    modalTitle: {
        marginTop: 100,
        fontSize: 28,
        marginBottom: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    contentContainer: {
        flex: 1,
        width: '100%',
    },
    inputContainer: {
        width: '100%',
        marginBottom: 30,
    },
    inputLabel: {
        fontSize: 16,
        marginBottom: 5,
        color: '#333',
    },
    input: {
        fontSize: 16,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
        justifyContent: 'space-around',
        width: '90%',
    },
    switchLabel: {
        fontSize: 16,
        color: '#333',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
        paddingHorizontal: 20,
        marginTop: 20,
    },
    modalButton: {
        backgroundColor: '#FFD700',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    modalButtonText: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
    },
    error: {
        color: 'red',
        fontSize: 12,
    },
    errorMargin: {
        marginBottom: 10,
        marginLeft: 10,
        textAlign: 'left',
    }
});

export default AddExpenseModal;