import { StyleSheet, Text, View } from 'react-native';
import CustomButton from '../components/CustomButton';
import { useTheme } from '../context/ThemeContext';
import { useAppSelector } from '../store/hooks';

export default function HomeScreen({ navigation }: any) {
  const { colors } = useTheme();
  const tasks = useAppSelector((state) => state.tasks.items);
  const pending = tasks.filter((task) => task.status === 'Pendiente').length;
  const inProgress = tasks.filter((task) => task.status === 'En proceso').length;
  const completed = tasks.filter((task) => task.status === 'Completado').length;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.primary }]}>Resumen de operaciones</Text>
      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Estado actual de los pendientes técnicos</Text>
      <View style={styles.row}>
        <View style={[styles.summary, { borderTopColor: colors.pending, backgroundColor: colors.surface }]}>
          <Text style={[styles.number, { color: colors.text }]}>{pending}</Text>
          <Text style={[styles.label, { color: colors.textSecondary }]}>Pendientes</Text>
        </View>
        <View style={[styles.summary, { borderTopColor: colors.inProgress, backgroundColor: colors.surface }]}>
          <Text style={[styles.number, { color: colors.text }]}>{inProgress}</Text>
          <Text style={[styles.label, { color: colors.textSecondary }]}>En proceso</Text>
        </View>
        <View style={[styles.summary, { borderTopColor: colors.completed, backgroundColor: colors.surface }]}>
          <Text style={[styles.number, { color: colors.text }]}>{completed}</Text>
          <Text style={[styles.label, { color: colors.textSecondary }]}>Completados</Text>
        </View>
      </View>
      <CustomButton title="Ver pendientes" onPress={() => navigation.navigate('Pendientes')} />
      <CustomButton
        title="Crear nuevo pendiente"
        variant="secondary"
        onPress={() => navigation.getParent()?.navigate('NewTask')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 20
  },
  subtitle: {
    marginTop: 5,
    marginBottom: 24
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    gap: 8
  },
  summary: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    borderTopWidth: 5,
    alignItems: 'center'
  },
  number: {
    fontSize: 26,
    fontWeight: 'bold'
  },
  label: {
    fontSize: 12,
    textAlign: 'center'
  },
});
