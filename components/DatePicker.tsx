import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import { Controller } from 'react-hook-form';

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
            <Text style={styles.label}>{label}</Text>

            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                <Text>{date.format('YYYY-MM-DD')}</Text>
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
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default DatePicker;