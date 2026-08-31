import { FlatList, StyleSheet, Text, View } from 'react-native';

import CustomButton from '../components/CustomButton';
import TaskCard from '../components/TaskCard';
import { useTasks } from '../context/TaskContext';
import { colors } from '../theme/colors';

export default function TaskListScreen({ navigation }: any) {
  const { tasks } = useTasks();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pendientes técnicos</Text>
      <CustomButton
        title="Agregar pendiente"
        onPress={() => navigation.getParent()?.navigate('NewTask')}
      />
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
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 18, backgroundColor: colors.background },
  title: { color: colors.primary, fontSize: 25, fontWeight: 'bold', marginTop: 18, marginBottom: 8 },
  list: { paddingTop: 12, paddingBottom: 30 },
});
