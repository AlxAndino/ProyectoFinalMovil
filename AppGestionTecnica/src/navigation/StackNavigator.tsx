import { useAppSelector } from '../store/hooks';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import NewTaskScreen from '../screens/NewTaskScreen';
import TaskDetailScreen from '../screens/TaskDetailScreen';
import { colors } from '../theme/colors';
import { RootStackParamList } from '../types/navigation';
import TabsNavigator from './TabsNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function StackNavigator() {
  const user = useAppSelector((state) => state.user.currentUser);
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
