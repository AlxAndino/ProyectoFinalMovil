import { changeTaskStatus } from '../store/tasksSlice';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Alert, StyleSheet, Text, View } from 'react-native';

import CustomButton from '../components/CustomButton';
import StatusBadge from '../components/StatusBadge';
import { useTheme } from '../context/ThemeContext';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'TaskDetail'>;

export default function TaskDetailScreen({ route, navigation }: Props) {
  const { colors } = useTheme();
  const tasks = useAppSelector((state) => state.tasks.items);
  const dispatch = useAppDispatch();
  const task = tasks.find((item) => item.id === route.params.taskId);

  if (!task) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.title, { color: colors.primary }]}>Pendiente no encontrado</Text>
      </View>
    );
  }

  async function changeStatus() {
    const nextStatus =
      task!.status === 'Pendiente'
        ? 'En proceso'
        : task!.status === 'En proceso'
          ? 'Completado'
          : 'Pendiente';
    try {
      await dispatch(changeTaskStatus({ id: task!.id, status: nextStatus })).unwrap();
    } catch (message) {
      Alert.alert('No se pudo actualizar', typeof message === 'string' ? message : 'Inténtelo nuevamente.');
    }
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.primary }]}>{task.title}</Text>
      <StatusBadge status={task.status} />
      <View style={[styles.card, { backgroundColor: colors.surface }]}>
        <Text style={[styles.label, { color: colors.textSecondary }]}>Descripción</Text>
        <Text style={[styles.value, { color: colors.text }]}>{task.description}</Text>
        <Text style={[styles.label, { color: colors.textSecondary }]}>Responsable</Text>
        <Text style={[styles.value, { color: colors.text }]}>{task.responsible}</Text>
        <Text style={[styles.label, { color: colors.textSecondary }]}>Teléfono</Text>
        <Text style={[styles.value, { color: colors.text }]}>{task.contactPhone}</Text>
        <Text style={[styles.label, { color: colors.textSecondary }]}>Prioridad y turno</Text>
        <Text style={[styles.value, { color: colors.text }]}>{task.priority} · {task.shift}</Text>
        <Text style={[styles.label, { color: colors.textSecondary }]}>Fecha de creación</Text>
        <Text style={[styles.value, { color: colors.text }]}>{task.createdAt}</Text>
      </View>
      <CustomButton title="Cambiar estado" onPress={changeStatus} />
      <CustomButton title="Regresar" variant="secondary" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 12 },
  card: { borderRadius: 12, padding: 18, marginVertical: 20 },
  label: { fontWeight: '600', marginTop: 9 },
  value: { fontSize: 16, marginTop: 3 },
});
