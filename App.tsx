import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import Login from './src/screens/Login';
import SignIn from './src/screens/SignIn';
import SignUp from './src/screens/SignUp';
import Welcome from './src/screens/Welcom'; // Ajout du nouvel écran

// 🔹 Typage des routes
export type RootStackParamList = {
  Login: undefined;
  SignIn: undefined;
  SignUp: undefined;
  Welcome: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootStack() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="SignIn" component={SignIn} options={{ title: '' }} />
      <Stack.Screen name="SignUp" component={SignUp} options={{ title: '' }} />
      <Stack.Screen name="Welcome" component={Welcome} options={{ title: '' }} />
    </Stack.Navigator>
  );
}

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}

export default App;
