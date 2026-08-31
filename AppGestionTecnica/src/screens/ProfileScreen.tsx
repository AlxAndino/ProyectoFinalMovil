import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import CustomButton from '../components/CustomButton';
import { colors } from '../theme/colors';

export default function ProfileScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="account-circle" size={110} color={colors.primary} />
      <Text style={styles.name}>Alejandro Andino</Text>
      <Text style={styles.role}>Administrador de sistemas</Text>
      <Text style={styles.info}>Turno: Mañana</Text>
      <Text style={styles.info}>Área: Soporte técnico</Text>
      <CustomButton
        title="Cerrar sesión"
        variant="danger"
        onPress={() => navigation.getParent()?.replace('Login')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 28, backgroundColor: colors.background },
  name: { color: colors.primary, fontSize: 25, fontWeight: 'bold' },
  role: { color: colors.textSecondary, fontSize: 16, marginBottom: 20 },
  info: { width: '100%', backgroundColor: colors.surface, color: colors.text, padding: 14, marginBottom: 8, borderRadius: 8 },
});
