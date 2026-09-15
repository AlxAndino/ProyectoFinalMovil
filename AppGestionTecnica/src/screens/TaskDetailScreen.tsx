import { updateTaskStatus } from '../store/tasksSlice';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';

import CustomButton from '../components/CustomButton';
import StatusBadge from '../components/StatusBadge';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { colors } from '../theme/colors';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'TaskDetail'>;

export default function TaskDetailScreen({ route, navigation }: Props) {
  const tasks = useAppSelector((state) => state.tasks.items);
  const dispatch = useAppDispatch();
  const task = tasks.find((item) => item.id === route.params.taskId);

  if (!task) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Pendiente no encontrado</Text>
      </View>
    );
  }

  function changeStatus() {
    const nextStatus =
      task!.status === 'Pendiente'
        ? 'En proceso'
        : task!.status === 'En proceso'
          ? 'Completado'
          : 'Pendiente';
    dispatch(updateTaskStatus({ id: task!.id, status: nextStatus }));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{task.title}</Text>
      <StatusBadge status={task.status} />
      <View style={styles.card}>
        <Text style={styles.label}>Descripción</Text>
        <Text style={styles.value}>{task.description}</Text>
        <Text style={styles.label}>Responsable</Text>
        <Text style={styles.value}>{task.responsible}</Text>
        <Text style={styles.label}>Teléfono</Text>
        <Text style={styles.value}>{task.contactPhone}</Text>
        <Text style={styles.label}>Prioridad y turno</Text>
        <Text style={styles.value}>{task.priority} · {task.shift}</Text>
        <Text style={styles.label}>Fecha de creación</Text>
        <Text style={styles.value}>{task.createdAt}</Text>
      </View>
      <CustomButton title="Cambiar estado" onPress={changeStatus} />
      <CustomButton title="Regresar" variant="secondary" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: colors.background },
  title: { color: colors.primary, fontSize: 26, fontWeight: 'bold', marginBottom: 12 },
  card: { backgroundColor: colors.surface, borderRadius: 12, padding: 18, marginVertical: 20 },
  label: { color: colors.textSecondary, fontWeight: '600', marginTop: 9 },
  value: { color: colors.text, fontSize: 16, marginTop: 3 },
});
