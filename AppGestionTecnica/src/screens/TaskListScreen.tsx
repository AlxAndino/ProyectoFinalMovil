import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';

import CustomButton from '../components/CustomButton';
import TaskCard from '../components/TaskCard';
import { useTheme } from '../context/ThemeContext';
import { useAppSelector } from '../store/hooks';

export default function TaskListScreen({ navigation }: any) {
  const { colors } = useTheme();
  const { items: tasks, loading, error } = useAppSelector((state) => state.tasks);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.primary }]}>Pendientes técnicos</Text>
      <CustomButton
        title="Agregar pendiente"
        onPress={() => navigation.getParent()?.navigate('NewTask')}
      />
      {loading ? <ActivityIndicator color={colors.primary} style={styles.feedback} /> : null}
      {error ? <Text style={[styles.error, { color: colors.danger }]}>{error}</Text> : null}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskCard
            task={item}
            onPress={() => navigation.getParent()?.navigate('TaskDetail', { taskId: item.id })}
          />
        )}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          !loading ? <Text style={[styles.empty, { color: colors.textSecondary }]}>Aún no hay pendientes. Crea el primero.</Text> : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 18 },
  title: { fontSize: 25, fontWeight: 'bold', marginTop: 18, marginBottom: 8 },
  list: { paddingTop: 12, paddingBottom: 30 },
  feedback: { marginTop: 24 },
  error: { textAlign: 'center', marginTop: 18 },
  empty: { textAlign: 'center', marginTop: 30 },
});
