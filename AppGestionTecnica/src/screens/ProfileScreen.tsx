import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, Switch, Text, View } from 'react-native';
import CustomButton from '../components/CustomButton';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export default function ProfileScreen() {
  const { user, signOut } = useAuth();
  const { isDark, colors, toggleTheme } = useTheme();
  if (!user) return null;
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <MaterialCommunityIcons name="account-circle" size={110} color={colors.primary} />
      <Text style={[styles.name, { color: colors.primary }]}>Alejandro Andino</Text>
      <Text style={[styles.role, { color: colors.textSecondary }]}>Administrador de sistemas</Text>
      <Text style={[styles.info, { backgroundColor: colors.surface, color: colors.text }]}>Turno: Mañana</Text>
      <Text style={[styles.info, { backgroundColor: colors.surface, color: colors.text }]}>Área: Soporte técnico</Text>
      <Text style={[styles.info, { backgroundColor: colors.surface, color: colors.text }]}>Correo: {user.email}</Text>
      <View style={styles.themeRow}>
        <Text style={{ color: colors.text }}>{isDark ? 'Modo oscuro' : 'Modo claro'}</Text>
        <Switch value={isDark} onValueChange={toggleTheme} />
      </View>
      <CustomButton
        title="Cerrar sesión"
        variant="danger"
        onPress={signOut}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 28 },
  name: { fontSize: 25, fontWeight: 'bold' },
  role: { fontSize: 16, marginBottom: 20 },
  info: { width: '100%', padding: 14, marginBottom: 8, borderRadius: 8 },
  themeRow: { width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 14 },
});
