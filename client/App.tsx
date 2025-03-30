import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './src/screens/Login';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import SignIn from './src/screens/SignIn';
import SignUp from './src/screens/SignUp';
import {store} from './src/app/store';
import {Provider} from 'react-redux';
import {useAppSelector} from './src/hooks.ts/reducer';
import Home from './src/screens/Home';

const Stack = createNativeStackNavigator();

function RootStack() {
  const {id} = useAppSelector(state => state.user);

  const navigation = useNavigation<
    NativeStackNavigationProp<{
      Login: undefined;
      SignIn: undefined;
      SignUp: undefined;
      Home: undefined;
    }>
  >();

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
