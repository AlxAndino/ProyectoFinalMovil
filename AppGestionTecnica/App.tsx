import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import { TaskProvider } from './src/context/TaskContext';
import StackNavigator from './src/navigation/StackNavigator';

export default function App() {
  return (
    <TaskProvider>
      <NavigationContainer>
        <StatusBar style="light" />
        <StackNavigator />
      </NavigationContainer>
    </TaskProvider>
  );
}
