import React, {useEffect} from 'react';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import Login from './src/screens/Login';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import SignIn from './src/screens/SignIn';
import SignUp from './src/screens/SignUp';
import {store} from './src/app/store';
import {Provider} from 'react-redux';
import {useAppSelector} from './src/hooks.ts/reducer';
import Home from './src/screens/Home';
import Welcome from './src/screens/Welcom';
import Intro from './src/screens/Intro';
import DisplayOne from './src/screens/DisplayOne';
import DisplayTwo from './src/screens/DisplayTwo';
import DisplayThree from './src/screens/DisplayThree';
import Main from './src/screens/Main';

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
};

export type PageProps = NativeStackScreenProps<RootStackParamList, any>;

const Stack = createNativeStackNavigator();

function RootStack() {
  const {id} = useAppSelector(state => state.user);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    if (id) {
      navigation.reset({
        index: 0,
        routes: [{name: 'Home'}],
      });
    }
  }, [navigation, id]);

  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen name="SignIn" component={SignIn} options={{title: ''}} />
      <Stack.Screen name="SignUp" component={SignUp} options={{title: ''}} />
      <Stack.Screen name="Home" component={Home} options={{title: ''}} />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen name="SignIn" component={SignIn} options={{title: ''}} />
      <Stack.Screen name="SignUp" component={SignUp} options={{title: ''}} />
      <Stack.Screen name="Welcome" component={Welcome} options={{title: ''}} />
      <Stack.Screen name="Intro" component={Intro} options={{title: ''}} />
      <Stack.Screen
        name="DisplayOne"
        component={DisplayOne}
        options={{title: ''}}
      />
      <Stack.Screen
        name="DisplayTwo"
        component={DisplayTwo}
        options={{title: ''}}
      />
      <Stack.Screen
        name="DisplayThree"
        component={DisplayThree}
        options={{title: ''}}
      />
      <Stack.Screen name="Main" component={Main} options={{title: ''}} />
    </Stack.Navigator>
  );
}

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
