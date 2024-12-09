import React, { useState } from 'react';
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
    defaultValue?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
    control,
    name,
    label,
    placeholder,
    keyboardType,
    secureTextEntry,
    error,
    defaultValue
}) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    return (
        <View>
            <Text style={styles.label}>{label}</Text>
            <Controller
                control={control}
                name={name}
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        style={[
                            styles.input,
                            isFocused && styles.inputFocused
                        ]}
                        placeholder={placeholder}
                        keyboardType={keyboardType}
                        onBlur={handleBlur}
                        onChangeText={onChange}
                        onFocus={handleFocus}
                        value={value}
                        secureTextEntry={secureTextEntry}
                        defaultValue={defaultValue}
                    />
                )}
            />
            {error && <Text style={[styles.error, styles.errorMargin]}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        fontSize: 16,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 15,
    },
    inputFocused: {
        borderColor: 'blue',
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: '#333',
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
