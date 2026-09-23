import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { TaskStatus } from '../types/task';

type StatusBadgeProps = {
    status: TaskStatus;
};

export default function StatusBadge({
    status,
}: StatusBadgeProps) {
    const { colors } = useTheme();
    const backgroundColor =
        status === 'Completado'
            ? colors.completed
            : status === 'En proceso'
                ? colors.inProgress
                : colors.pending;

    return (
        <View style={[styles.badge, { backgroundColor }]}>
            <Text style={[styles.text, { color: colors.white }]}>{status}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    badge: {
        alignSelf: 'flex-start',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
    },
    text: {
        fontSize: 12,
        fontWeight: 'bold',
    },
});
