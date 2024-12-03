import React from 'react';
import { View, TextInput, Text, StyleSheet, KeyboardTypeOptions } from 'react-native';
import { Controller } from 'react-hook-form';

interface InputFieldProps {
    control: any;
    name: string;
    label: string;
    placeholder: string;
    keyboardType?: KeyboardTypeOptions;
    secureTextEntry?: boolean;
    error?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
    control,
    name,
    label,
    placeholder,
    keyboardType,
    secureTextEntry,
    error
}) => {
    return (
        <View>
            <Text style={styles.label}>{label}</Text>
            <Controller
                control={control}
                name={name}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.input}
                        placeholder={placeholder}
                        keyboardType={keyboardType}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        secureTextEntry={secureTextEntry}
                    />
                )}
            />
            {error && <Text style={[styles.error, styles.errorMargin]}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        height: 40,
        borderColor: '#ccc',
        backgroundColor: '#F3F3F3',
        borderRadius: 10,
        borderWidth: 1,
        marginBottom: 15,
        paddingLeft: 8,
    },
    label: {
        marginBottom: 5,
        marginLeft: 8,
        fontWeight: 'bold',
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
