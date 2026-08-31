import {
    Pressable,
    StyleSheet,
    Text,
} from 'react-native';

import { colors } from '../theme/colors';

type CustomButtonProps = {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'danger';
};

export default function CustomButton({
    title,
    onPress,
    variant = 'primary',
}: CustomButtonProps) {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                styles.button,
                styles[variant],
                pressed && styles.pressed,
            ]}
        >
            <Text style={styles.text}>{title}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        width: '100%',
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 6,
    },
    primary: {
        backgroundColor: colors.primary,
    },
    secondary: {
        backgroundColor: colors.secondary,
    },
    danger: {
        backgroundColor: colors.danger,
    },
    pressed: {
        opacity: 0.7,
    },
    text: {
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
});