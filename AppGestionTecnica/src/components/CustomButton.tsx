import {
    Pressable,
    StyleSheet,
    Text,
} from 'react-native';

import { useTheme } from '../context/ThemeContext';

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
    const { colors } = useTheme();
    const backgroundColor = variant === 'primary'
        ? colors.primary
        : variant === 'secondary'
            ? colors.secondary
            : colors.danger;

    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                styles.button,
                { backgroundColor },
                pressed && styles.pressed,
            ]}
        >
            <Text style={[styles.text, { color: colors.white }]}>{title}</Text>
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
    pressed: {
        opacity: 0.7,
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});
