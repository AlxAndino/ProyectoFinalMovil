import { useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export default function LoginScreen() {
  const { signIn } = useAuth();
  const { colors } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [authError, setAuthError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleLogin() {
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    const validPassword = password.length >= 6;

    setEmailError(validEmail ? '' : 'Ingrese un correo válido');
    setPasswordError(validPassword ? '' : 'La contraseña debe tener al menos 6 caracteres');

    if (validEmail && validPassword) {
      setSubmitting(true);
      setAuthError('');
      const error = await signIn(email.trim(), password);
      setSubmitting(false);
      if (error) setAuthError('Correo o contraseña incorrectos.');
    }
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Image source={require('../../assets/icon.png')} style={styles.logo} />
      <Text style={[styles.title, { color: colors.primary }]}>Gestión Técnica</Text>
      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Control de turnos y pendientes</Text>

      <CustomInput
        label="Correo electrónico"
        placeholder="usuario@empresa.com"
        value={email}
        onChangeText={setEmail}
        error={emailError}
        keyboardType="email-address"
      />
      <CustomInput
        label="Contraseña"
        placeholder="Mínimo 6 caracteres"
        value={password}
        onChangeText={setPassword}
        error={passwordError}
        secureTextEntry
      />
      {authError ? <Text style={[styles.error, { color: colors.danger }]}>{authError}</Text> : null}
      {submitting ? <ActivityIndicator color={colors.primary} /> : <CustomButton title="Iniciar sesión" onPress={handleLogin} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  logo: {
    width: 90,
    height: 90,
    alignSelf: 'center',
    marginBottom: 18,
    borderRadius: 18
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 30,
    fontSize: 16
  }, error: { textAlign: 'center', marginBottom: 8 },
});
