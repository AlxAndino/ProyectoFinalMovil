import {
    KeyboardTypeOptions,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

import { useTheme } from '../context/ThemeContext';

type CustomInputProps = {
    label: string;
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;
    error?: string;
    secureTextEntry?: boolean;
    keyboardType?: KeyboardTypeOptions;
    multiline?: boolean;
};

export default function CustomInput({
    label,
    placeholder,
    value,
    onChangeText,
    error,
    secureTextEntry = false,
    keyboardType = 'default',
    multiline = false,
}: CustomInputProps) {
    const { colors } = useTheme();

    return (
        <View style={styles.container}>
            <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
            <TextInput
                style={[
                    styles.input,
                    { backgroundColor: colors.surface, borderColor: colors.border, color: colors.text },
                    multiline && styles.multiline,
                    error ? { borderColor: colors.danger } : undefined,
                ]}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
                multiline={multiline}
                placeholderTextColor={colors.textSecondary}
            />

            {error ? (
                <Text style={[styles.error, { color: colors.danger }]}>{error}</Text>
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: 12,
    },
    label: {
        fontSize: 15,
        fontWeight: '600',
        marginBottom: 6,
    },
    input: {
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 12,
        fontSize: 16,
    },
    multiline: {
        minHeight: 90,
        textAlignVertical: 'top',
    },
    error: {
        marginTop: 4,
    },
});
