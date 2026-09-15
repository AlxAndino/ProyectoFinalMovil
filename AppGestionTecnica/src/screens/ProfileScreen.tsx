import { useAppDispatch, useAppSelector } from '../store/hooks';
import { logout } from '../store/userSlice';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import CustomButton from '../components/CustomButton';
import { colors } from '../theme/colors';

export default function ProfileScreen() {
  const user = useAppSelector((state) => state.user.currentUser);
  const dispatch = useAppDispatch();
  if (!user) return null;
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="account-circle" size={110} color={colors.primary} />
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.role}>{user.role}</Text>
      <Text style={styles.info}>Turno: {user.shift}</Text>
      <Text style={styles.info}>Área: {user.area}</Text>
      <Text style={styles.info}>Correo: {user.email}</Text>
      <CustomButton
        title="Cerrar sesión"
        variant="danger"
        onPress={() => dispatch(logout())}
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
