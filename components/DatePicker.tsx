import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import { Controller } from 'react-hook-form';
import { ThemedText } from './ThemedText';

interface DatePickerProps {
    control: any;
    name: string;
    label: string;
}

const DatePicker: React.FC<DatePickerProps> = ({ control, name, label }) => {
    const [date, setDate] = useState(dayjs());
    const [showDatePicker, setShowDatePicker] = useState(false);

    return (
        <View style={styles.container}>
            <ThemedText type='default'>{label}</ThemedText>
            <TouchableOpacity style={styles.button} onPress={() => setShowDatePicker(true)}>
                <ThemedText type='miniText'>{date.format('YYYY-MM-DD')}</ThemedText>
            </TouchableOpacity>

            {showDatePicker && (
                <Controller
                    control={control}
                    name={name}
                    render={({ field: { onChange } }) => (
                        <DateTimePicker
                            mode="single"
                            date={date.toDate()}
                            onChange={(params) => {
                                if (params.date) {
                                    const selectedDate = dayjs(params.date);
                                    setDate(selectedDate);
                                    onChange(selectedDate.toDate());
                                    setShowDatePicker(false);
                                }
                            }}
                        />
                    )}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        marginBottom: 30,
    },
    button: {
        fontSize: 16,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: '#333',
    },
});

export default DatePicker;