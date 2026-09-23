import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';

import CustomButton from '../components/CustomButton';
import TaskCard from '../components/TaskCard';
import { useAppSelector } from '../store/hooks';
import { colors } from '../theme/colors';

export default function TaskListScreen({ navigation }: any) {
  const { items: tasks, loading, error } = useAppSelector((state) => state.tasks);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pendientes técnicos</Text>
      <CustomButton
        title="Agregar pendiente"
        onPress={() => navigation.getParent()?.navigate('NewTask')}
      />
      {loading ? <ActivityIndicator color={colors.primary} style={styles.feedback} /> : null}
      {error ? <Text style={styles.error}>{error}</Text> : null}
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
          !loading ? <Text style={styles.empty}>Aún no hay pendientes. Crea el primero.</Text> : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 18, backgroundColor: colors.background },
  title: { color: colors.primary, fontSize: 25, fontWeight: 'bold', marginTop: 18, marginBottom: 8 },
  list: { paddingTop: 12, paddingBottom: 30 },
  feedback: { marginTop: 24 },
  error: { color: colors.danger, textAlign: 'center', marginTop: 18 },
  empty: { color: colors.textSecondary, textAlign: 'center', marginTop: 30 },
});
