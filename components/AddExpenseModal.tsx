import React from 'react';
import {
    View,
    Modal,
    StyleSheet,
    TouchableOpacity,
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
import { InputField } from './InputField';
import { ThemedText } from './ThemedText';

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
                <View style={styles.titlePosition}>
                    <ThemedText style={styles.color} type='subtitle'>Add Expense</ThemedText>
                </View>

                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <KeyboardAvoidingView style={styles.modalContainer} behavior="padding">
                        <View style={styles.contentContainer}>

                            <DatePicker control={control} name="date" label="Pick a date for the expense" />

                            <InputField
                                control={control}
                                name="description"
                                label="Description"
                                placeholder="Description"
                                error={errors.description?.message}
                            />

                            <InputField
                                control={control}
                                name="amount"
                                label="Amount"
                                placeholder="Amount"
                                keyboardType="numeric"
                                error={errors.amount?.message}
                            />

                            <View style={styles.switchContainer}>
                                <ThemedText style={styles.color} type='miniBold'>Unecessary</ThemedText>
                                <Controller
                                    control={control}
                                    name="necessary"
                                    render={({ field: { value, onChange } }) => (
                                        <Switch
                                            value={value}
                                            onValueChange={onChange}
                                            trackColor={{ false: "#767577", true: "#9AB2D4" }}
                                            thumbColor={value ? "#FDD848" : "#f4f3f4"}
                                        />
                                    )}
                                />
                                <ThemedText style={styles.color} type='miniBold'>Necessary</ThemedText>
                            </View>

                            <View style={styles.modalButtons}>
                                <TouchableOpacity style={styles.modalButton} onPress={handleSubmit(onSubmitForm)}>
                                    <ThemedText style={styles.color} type='defaultSemiBold'>
                                        <FontAwesome name="save" size={16} color="black" /> Save
                                    </ThemedText>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.modalButton} onPress={onClose}>
                                    <ThemedText style={styles.color} type='defaultSemiBold'>
                                        <FontAwesome name="close" size={16} color="black" /> Cancel
                                    </ThemedText>
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
        backgroundColor: "#FFF7F7",
        paddingHorizontal: 20,
    },
    color: {
        color: '#333',
    },
    titlePosition: {
        marginTop: 60,
        marginBottom: 20,
        display: 'flex',
        alignItems: 'center',
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