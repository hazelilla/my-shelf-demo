import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackParamList } from './types';
import HomeScreen from './screens/HomeScreen';
import AddBookScreen from './screens/AddBookScreen';
import { Provider } from "react-redux";
import store from "./store";

const Stack = createNativeStackNavigator<StackParamList>();

const App = () => {

  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator>
          <Stack.Screen name='HomeScreen' options={{ headerShown: false }} component={HomeScreen} />
          <Stack.Screen name='FormScreen' options={{ headerShown: false }} component={AddBookScreen} />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}

export default App;
