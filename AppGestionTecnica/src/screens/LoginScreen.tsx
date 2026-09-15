import { useAppDispatch } from '../store/hooks';
import { login } from '../store/userSlice';
import { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import { colors } from '../theme/colors';

export default function LoginScreen() {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  function handleLogin() {
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    const validPassword = password.length >= 6;

    setEmailError(validEmail ? '' : 'Ingrese un correo válido');
    setPasswordError(validPassword ? '' : 'La contraseña debe tener al menos 6 caracteres');

    if (validEmail && validPassword) {
      // La contraseña permanece en el formulario; no se guarda en Redux.
      dispatch(login({
        name: 'Alejandro Andino',
        email: email.trim(),
        role: 'Administrador de sistemas',
        shift: 'Mañana',
        area: 'Soporte técnico',
      }));
    }
  }

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/icon.png')} style={styles.logo} />
      <Text style={styles.title}>Gestión Técnica</Text>
      <Text style={styles.subtitle}>Control de turnos y pendientes</Text>

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
      <CustomButton title="Iniciar sesión" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: colors.background
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
    color: colors.primary,
    textAlign: 'center'
  },
  subtitle: {
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 30,
    fontSize: 16
  },
});
