import { createTask } from '../store/tasksSlice';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import { useTheme } from '../context/ThemeContext';
import { useAppDispatch } from '../store/hooks';
import { RootStackParamList } from '../types/navigation';
import { TaskPriority, WorkShift } from '../types/task';

type Props = NativeStackScreenProps<RootStackParamList, 'NewTask'>;

export default function NewTaskScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [responsible, setResponsible] = useState('');
  const [phone, setPhone] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('Media');
  const [shift, setShift] = useState<WorkShift>('Mañana');
  const [error, setError] = useState('');

  async function saveTask() {
    if (!title.trim() || !description.trim() || !responsible.trim() || !phone.trim()) {
      setError('Todos los campos son obligatorios');
      return;
    }
    if (!/^\d{4}-?\d{4}$/.test(phone.trim())) {
      setError('Ingrese un teléfono válido de 8 dígitos');
      return;
    }
    try {
      await dispatch(createTask({
        title: title.trim(),
        description: description.trim(),
        responsible: responsible.trim(),
        contactPhone: phone.trim(),
        priority,
        status: 'Pendiente',
        shift,
      })).unwrap();
      Alert.alert('Registro exitoso', 'El pendiente técnico fue guardado correctamente.');
      navigation.goBack();
    } catch (message) {
      setError(typeof message === 'string' ? message : 'No se pudo guardar el pendiente.');
    }
  }
  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: colors.background }]} keyboardShouldPersistTaps="handled">
      <Text style={[styles.title, { color: colors.primary }]}>Nuevo pendiente técnico</Text>
      <CustomInput label="Título" placeholder="Ej. Revisar servidor" value={title} onChangeText={setTitle} />
      <CustomInput label="Descripción" placeholder="Detalle del trabajo requerido" value={description} onChangeText={setDescription} multiline />
      <CustomInput label="Responsable" placeholder="Nombre del técnico" value={responsible} onChangeText={setResponsible} />
      <CustomInput label="Teléfono" placeholder="9999-9999" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
      <Text style={[styles.label, { color: colors.text }]}>Prioridad</Text>
      <View style={styles.row}>
        {(['Baja', 'Media', 'Alta', 'Crítica'] as TaskPriority[]).map((item) => (
          <Text
            key={item}
            onPress={() => setPriority(item)}
            style={[
              styles.option,
              { borderColor: colors.border, backgroundColor: colors.surface, color: colors.text },
              priority === item && { backgroundColor: colors.primary, color: colors.white, borderColor: colors.primary },
            ]}
          >
            {item}
          </Text>
        ))}
      </View>
      <Text style={[styles.label, { color: colors.text }]}>Turno</Text>
      <View style={styles.row}>
        {(['Mañana', 'Tarde', 'Noche'] as WorkShift[]).map((item) => (
          <Text
            key={item}
            onPress={() => setShift(item)}
            style={[
              styles.option,
              { borderColor: colors.border, backgroundColor: colors.surface, color: colors.text },
              shift === item && { backgroundColor: colors.primary, color: colors.white, borderColor: colors.primary },
            ]}
          >
            {item}
          </Text>
        ))}
      </View>

      {error ? <Text style={[styles.error, { color: colors.danger }]}>{error}</Text> : null}
      <CustomButton title="Guardar pendiente" onPress={saveTask} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20
  },
  label: {
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
    paddingVertical: 9,
    paddingHorizontal: 13,
    borderRadius: 20,
  },
  error: {
    fontWeight: '600',
    marginBottom: 8
  },
});
