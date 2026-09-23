import {
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { useTheme } from '../context/ThemeContext';
import { TechnicalTask } from '../types/task';
import StatusBadge from './StatusBadge';

type TaskCardProps = {
    task: TechnicalTask;
    onPress: () => void;
};

export default function TaskCard({
    task,
    onPress,
}: TaskCardProps) {
    const { colors } = useTheme();
    const priorityColor =
        task.priority === 'Crítica'
            ? colors.critical
            : task.priority === 'Alta'
                ? colors.high
                : task.priority === 'Media'
                    ? colors.medium
                    : colors.low;

    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                styles.card,
                { borderLeftColor: priorityColor, backgroundColor: colors.surface },
                pressed && styles.pressed,
            ]}
        >
            <View style={styles.header}>
                <Text style={[styles.title, { color: colors.text }]}>{task.title}</Text>
                <StatusBadge status={task.status} />
            </View>

            <Text style={[styles.description, { color: colors.textSecondary }]}>
                {task.description}
            </Text>

            <Text style={[styles.detail, { color: colors.text }]}>
                Responsable: {task.responsible}
            </Text>

            <Text
                style={[
                    styles.priority,
                    { color: priorityColor },
                ]}
            >
                Prioridad: {task.priority}
            </Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        borderLeftWidth: 6,
        borderRadius: 10,
        padding: 14,
        marginBottom: 12,
    },
    pressed: {
        opacity: 0.75,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: 10,
    },
    title: {
        flex: 1,
        fontSize: 17,
        fontWeight: 'bold',
    },
    description: {
        marginVertical: 8,
    },
    detail: {
        marginBottom: 5,
    },
    priority: {
        fontWeight: 'bold',
    },
});
