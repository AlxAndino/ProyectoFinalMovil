import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import StackNavigator from './src/navigation/StackNavigator';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar style="light" />
        <StackNavigator />
      </NavigationContainer>
    </Provider>
  );
}
