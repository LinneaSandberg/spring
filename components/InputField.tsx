import React, { useState } from 'react';
import { View, TextInput, StyleSheet, KeyboardTypeOptions } from 'react-native';
import { Controller } from 'react-hook-form';
import { ThemedText } from './ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';

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
    const textColor = useThemeColor({ light: 'black', dark: 'white' }, 'text');
    const focusedBorderColor = useThemeColor({ light: '#1E1E1E', dark: 'white' }, 'text');
    const [isFocused, setIsFocused] = useState(false);


    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    return (
        <View>
            <ThemedText type='default'>{label}</ThemedText>
            <Controller
                control={control}
                name={name}
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        style={[
                            styles.input,
                            { color: textColor },
                            isFocused && { borderColor: focusedBorderColor }
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
            {error && <ThemedText style={[styles.error, styles.errorMargin]}>{error}</ThemedText>}
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        fontSize: 16,
        padding: 10,
        borderWidth: 1,
        borderColor: '#989898',
        borderRadius: 10,
        marginBottom: 15,
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
