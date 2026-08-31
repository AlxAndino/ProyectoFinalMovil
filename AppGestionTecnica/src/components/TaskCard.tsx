import {
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { colors } from '../theme/colors';
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
                { borderLeftColor: priorityColor },
                pressed && styles.pressed,
            ]}
        >
            <View style={styles.header}>
                <Text style={styles.title}>{task.title}</Text>
                <StatusBadge status={task.status} />
            </View>

            <Text style={styles.description}>
                {task.description}
            </Text>

            <Text style={styles.detail}>
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
        backgroundColor: colors.surface,
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
        color: colors.text,
        fontSize: 17,
        fontWeight: 'bold',
    },
    description: {
        color: colors.textSecondary,
        marginVertical: 8,
    },
    detail: {
        color: colors.text,
        marginBottom: 5,
    },
    priority: {
        fontWeight: 'bold',
    },
});