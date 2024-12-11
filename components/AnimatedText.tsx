import { purple } from '@/constants/Colors';
import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

interface AnimatedTextProps {
    text: string;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ text }) => {
    const translateValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const startAnimation = () => {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(translateValue, {
                        toValue: 10,
                        duration: 500,
                        useNativeDriver: true,
                    }),
                    Animated.timing(translateValue, {
                        toValue: -10,
                        duration: 500,
                        useNativeDriver: true,
                    }),
                    Animated.timing(translateValue, {
                        toValue: 0,
                        duration: 500,
                        useNativeDriver: true,
                    }),
                ])
            ).start();
        };

        startAnimation();
    }, [translateValue]);

    return (
        <View style={styles.container}>
            <Animated.Text style={[styles.subTitle, { transform: [{ translateY: translateValue }] }]}>
                {text}
            </Animated.Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
    },
    subTitle: {
        color: purple,
        marginBottom: 10,
        fontSize: 60,
        fontWeight: 'bold',
    },
});

export default AnimatedText;