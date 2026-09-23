import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import LoginScreen from '../screens/LoginScreen';
import NewTaskScreen from '../screens/NewTaskScreen';
import TaskDetailScreen from '../screens/TaskDetailScreen';
import { RootStackParamList } from '../types/navigation';
import TabsNavigator from './TabsNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function StackNavigator() {
  const { user, loading } = useAuth();
  const { colors } = useTheme();

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: colors.white,
        headerStyle: { backgroundColor: colors.primary },
      }}
    >
      {!user ? (
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      ) : (
        <>
          <Stack.Screen name="MainTabs" component={TabsNavigator} options={{ headerShown: false }} />
          <Stack.Screen name="NewTask" component={NewTaskScreen} options={{ title: 'Nuevo pendiente' }} />
          <Stack.Screen name="TaskDetail" component={TaskDetailScreen} options={{ title: 'Detalle del pendiente' }} />
        </>
      )}
    </Stack.Navigator>
  );
}
