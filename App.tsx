import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackParamList } from './types';
import HomeScreen from './screens/HomeScreen';
import FormScreen from './screens/FormScreen';

const Stack = createNativeStackNavigator<StackParamList>();

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='HomeScreen' options={{headerShown: false}} component={HomeScreen}/>
        <Stack.Screen name='FormScreen' options={{headerShown: false}} component={FormScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
