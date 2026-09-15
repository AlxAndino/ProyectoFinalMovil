import { StyleSheet, Text, View } from 'react-native';
import CustomButton from '../components/CustomButton';
import { useAppSelector } from '../store/hooks';
import { colors } from '../theme/colors';

export default function HomeScreen({ navigation }: any) {
  const tasks = useAppSelector((state) => state.tasks.items);
  const pending = tasks.filter((task) => task.status === 'Pendiente').length;
  const inProgress = tasks.filter((task) => task.status === 'En proceso').length;
  const completed = tasks.filter((task) => task.status === 'Completado').length;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resumen de operaciones</Text>
      <Text style={styles.subtitle}>Estado actual de los pendientes técnicos</Text>
      <View style={styles.row}>
        <View style={[styles.summary, { borderTopColor: colors.pending }]}>
          <Text style={styles.number}>{pending}</Text>
          <Text style={styles.label}>Pendientes</Text>
        </View>
        <View style={[styles.summary, { borderTopColor: colors.inProgress }]}>
          <Text style={styles.number}>{inProgress}</Text>
          <Text style={styles.label}>En proceso</Text>
        </View>
        <View style={[styles.summary, { borderTopColor: colors.completed }]}>
          <Text style={styles.number}>{completed}</Text>
          <Text style={styles.label}>Completados</Text>
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
    backgroundColor: colors.background
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: colors.primary,
    marginTop: 20
  },
  subtitle: {
    color: colors.textSecondary,
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
    backgroundColor: colors.surface,
    padding: 12,
    borderRadius: 10,
    borderTopWidth: 5,
    alignItems: 'center'
  },
  number: {
    color: colors.text,
    fontSize: 26,
    fontWeight: 'bold'
  },
  label: {
    color: colors.textSecondary,
    fontSize: 12,
    textAlign: 'center'
  },
});
