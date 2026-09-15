import { addTask } from '../store/tasksSlice';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import { useAppDispatch } from '../store/hooks';
import { colors } from '../theme/colors';
import { RootStackParamList } from '../types/navigation';
import { TaskPriority, WorkShift } from '../types/task';

type Props = NativeStackScreenProps<RootStackParamList, 'NewTask'>;

export default function NewTaskScreen({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [responsible, setResponsible] = useState('');
  const [phone, setPhone] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('Media');
  const [shift, setShift] = useState<WorkShift>('Mañana');
  const [error, setError] = useState('');

  function saveTask() {
    if (!title.trim() || !description.trim() || !responsible.trim() || !phone.trim()) {
      setError('Todos los campos son obligatorios');
      return;
    }
    if (!/^\d{4}-?\d{4}$/.test(phone.trim())) {
      setError('Ingrese un teléfono válido de 8 dígitos');
      return;
    }
    dispatch(addTask({
      title: title.trim(),
      description: description.trim(),
      responsible: responsible.trim(),
      contactPhone: phone.trim(),
      priority,
      status: 'Pendiente',
      shift,
    }));
    Alert.alert('Registro exitoso', 'El pendiente técnico fue creado.');
    navigation.goBack();
  }
  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>Nuevo pendiente técnico</Text>
      <CustomInput label="Título" placeholder="Ej. Revisar servidor" value={title} onChangeText={setTitle} />
      <CustomInput label="Descripción" placeholder="Detalle del trabajo requerido" value={description} onChangeText={setDescription} multiline />
      <CustomInput label="Responsable" placeholder="Nombre del técnico" value={responsible} onChangeText={setResponsible} />
      <CustomInput label="Teléfono" placeholder="9999-9999" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
      <Text style={styles.label}>Prioridad</Text>
      <View style={styles.row}>
        {(['Baja', 'Media', 'Alta', 'Crítica'] as TaskPriority[]).map((item) => (
          <Text
            key={item}
            onPress={() => setPriority(item)}
            style={[styles.option, priority === item && styles.selected]}
          >
            {item}
          </Text>
        ))}
      </View>
      <Text style={styles.label}>Turno</Text>
      <View style={styles.row}>
        {(['Mañana', 'Tarde', 'Noche'] as WorkShift[]).map((item) => (
          <Text
            key={item}
            onPress={() => setShift(item)}
            style={[styles.option, shift === item && styles.selected]}
          >
            {item}
          </Text>
        ))}
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}
      <CustomButton title="Guardar pendiente" onPress={saveTask} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: colors.background,
    flexGrow: 1
  },
  title: {
    color: colors.primary,
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20
  },
  label: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 7
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16
  },
  option: {
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 9,
    paddingHorizontal: 13,
    borderRadius: 20,
    backgroundColor: colors.surface,
    color: colors.text
  },
  selected: {
    backgroundColor: colors.primary,
    color: colors.white,
    borderColor: colors.primary
  },
  error: {
    color: colors.danger,
    fontWeight: '600',
    marginBottom: 8
  },
});
