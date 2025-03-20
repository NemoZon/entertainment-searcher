import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './src/screens/Login';
import {NavigationContainer} from '@react-navigation/native';
import SignIn from './src/screens/SignIn';

const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen name="SignIn" component={SignIn} options={{title: ''}} />
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
