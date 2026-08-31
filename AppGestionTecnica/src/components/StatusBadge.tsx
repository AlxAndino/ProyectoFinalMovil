import { StyleSheet, Text, View } from 'react-native';

import { colors } from '../theme/colors';
import { TaskStatus } from '../types/task';

type StatusBadgeProps = {
    status: TaskStatus;
};

export default function StatusBadge({
    status,
}: StatusBadgeProps) {
    const backgroundColor =
        status === 'Completado'
            ? colors.completed
            : status === 'En proceso'
                ? colors.inProgress
                : colors.pending;

    return (
        <View style={[styles.badge, { backgroundColor }]}>
            <Text style={styles.text}>{status}</Text>
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
        color: colors.white,
        fontSize: 12,
        fontWeight: 'bold',
    },
});