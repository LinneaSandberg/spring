import { Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useState } from 'react';

const BudgetForm = () => {
    const { control, handleSubmit } = useForm();
    const [isSubmitted, setIsSubmitted] = useState(false);

    const onSubmit = (data: any) => {
        console.log(data);
        setIsSubmitted(true);
        // Handle form submission logic here
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.heading}>Budget Tracker</Text>

            <Text style={styles.subTitle}>Income</Text>
            <Controller
                control={control}
                name="salary"
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.input}
                        placeholder="Salary"
                        placeholderTextColor="#aaa"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
            />

            <Controller
                control={control}
                name="otherIncome"
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.input}
                        placeholder="Other Income"
                        placeholderTextColor="#aaa"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
            />

            <Text style={styles.subTitle}>Expenses</Text>

            <Text style={styles.expenseTitle}>Housing Costs</Text>
            <Controller
                control={control}
                name="housingCosts"
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.input}
                        placeholder="Rent/Mortgage, Electricity, Heating"
                        placeholderTextColor="#aaa"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
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
                        placeholder="Public transport, Gas, Car insurance"
                        placeholderTextColor="#aaa"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
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
                        placeholderTextColor="#aaa"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
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
                        placeholderTextColor="#aaa"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
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
                        placeholderTextColor="#aaa"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
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
        </ScrollView>
    );
};

export default BudgetForm;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#F5F5F5',
    },
    heading: {
        fontSize: 28,
        marginBottom: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#333',
    },
    subTitle: {
        fontSize: 22,
        marginBottom: 10,
        fontWeight: '600', // Semi-bold for emphasis
        color: '#333', // Change as per theme
    },
    expenseTitle: {
        fontSize: 16,
        marginVertical: 5,
        fontWeight: '500',
        color: '#555', // A lighter shade for less emphasis
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        borderWidth: 1,
        marginBottom: 15,
        paddingLeft: 8,
    },
    button: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 10,
        backgroundColor: '#FAECC4',
        borderColor: '#1E1E1E',
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
    },
    buttonDisabled: {
        backgroundColor: '#A9A9A9', // Grey when disabled
    },
    buttonText: {
        color: '#1E1E1E',
        fontSize: 16,
        textAlign: 'center',
    },
    error: {
        color: 'red',
        fontSize: 12,
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        color: '#666', // Color for secondary text
        textAlign: 'center',
        marginBottom: 20,
    },
});
