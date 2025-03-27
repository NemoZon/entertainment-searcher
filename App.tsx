import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import Login from './src/screens/Login';
import SignIn from './src/screens/SignIn';
import SignUp from './src/screens/SignUp';
import Welcome from './src/screens/Welcom';
import Intro from './src/screens/Intro';
import DisplayOne from './src/screens/DisplayOne';
import DisplayTwo from './src/screens/DisplayTwo';
import DisplayThree from './src/screens/DisplayThree';
import Main from './src/screens/Main';

// 🔹 Typage des routes
export type RootStackParamList = {
  Login: undefined;
  SignIn: undefined;
  SignUp: undefined;
  Welcome: undefined;
  Intro: undefined;
  DisplayOne: undefined;
  DisplayTwo: undefined;
  DisplayThree: undefined;
  Main: undefined;
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
      <Stack.Screen name="Intro" component={Intro} options={{ title: '' }} />
      <Stack.Screen name="DisplayOne" component={DisplayOne} options={{ title: '' }} />
      <Stack.Screen name="DisplayTwo" component={DisplayTwo} options={{ title: '' }} />
      <Stack.Screen name="DisplayThree" component={DisplayThree} options={{ title: '' }} />
      <Stack.Screen name="Main" component={Main} options={{ title: '' }} />


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
