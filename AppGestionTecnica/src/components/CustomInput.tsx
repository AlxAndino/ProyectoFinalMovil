import {
    KeyboardTypeOptions,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

import { colors } from '../theme/colors';

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
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>

            <TextInput
                style={[
                    styles.input,
                    multiline && styles.multiline,
                    error ? styles.inputError : undefined,
                ]}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
                multiline={multiline}
            />

            {error ? (
                <Text style={styles.error}>{error}</Text>
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
        color: colors.text,
        fontSize: 15,
        fontWeight: '600',
        marginBottom: 6,
    },
    input: {
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 10,
        backgroundColor: colors.surface,
        paddingHorizontal: 12,
        paddingVertical: 12,
        fontSize: 16,
        color: colors.text,
    },
    multiline: {
        minHeight: 90,
        textAlignVertical: 'top',
    },
    inputError: {
        borderColor: colors.danger,
    },
    error: {
        color: colors.danger,
        marginTop: 4,
    },
});