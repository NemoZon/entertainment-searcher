import React from 'react';
import { PostHogProvider, PostHog } from 'posthog-react-native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { store } from './src/app/store';

import Login from './src/screens/Login';
import SignIn from './src/screens/SignIn';
import SignUp from './src/screens/SignUp';
import Home from './src/screens/Home';
import Welcome from './src/screens/Welcom';
import Intro from './src/screens/Intro';
import DisplayOne from './src/screens/DisplayOne';
import DisplayTwo from './src/screens/DisplayTwo';
import DisplayThree from './src/screens/DisplayThree';
import Main from './src/screens/Main';
import Personal from './src/screens/Personal';

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
  Home: undefined;
  Personal: undefined;
};

export type PageProps = NativeStackScreenProps<RootStackParamList, any>;

const Stack = createNativeStackNavigator();

const posthog = new PostHog('phc_dkOtPy9QvVYDGG6YKp7Tc7XpFR8M4wiWq2i5MHYFxQU', {
  host: 'https://us.i.posthog.com',
  storage: AsyncStorage,
  persistence: 'file',
});

function RootStack() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="SignIn" component={SignIn} options={{ title: '' }} />
      <Stack.Screen name="SignUp" component={SignUp} options={{ title: '' }} />
      <Stack.Screen name="Welcome" component={Welcome} options={{ title: '' }} />
      <Stack.Screen name="Intro" component={Intro} options={{ title: '' }} />
      <Stack.Screen name="DisplayOne" component={DisplayOne} options={{ title: '' }} />
      <Stack.Screen name="DisplayTwo" component={DisplayTwo} options={{ title: '' }} />
      <Stack.Screen name="DisplayThree" component={DisplayThree} options={{ title: '' }} />
      <Stack.Screen name="Main" component={Main} options={{ title: '' }} />
      <Stack.Screen name="Home" component={Home} options={{ title: '' }} />
      <Stack.Screen name="Personal" component={Personal} options={{ title: '' }} />
    </Stack.Navigator>
  );
}

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <PostHogProvider client={posthog}>
          <RootStack />
        </PostHogProvider>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
