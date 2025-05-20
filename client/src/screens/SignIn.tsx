import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { usePostHog } from 'posthog-react-native';

import BaseScreen from './BaseScreen';
import Title from '../components/Title';
import Input from '../components/Input';
import Button from '../components/Button';
import { RootStackParamList } from '../../App';
import { users } from '../mocks/users';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const posthog = usePostHog();

  const handleSignIn = () => {
    const user = users.find(u => u.email === email.trim());

    if (user && user.password === password) {
      posthog?.identify(user.id, { email: user.email });
      posthog?.capture('user_logged_in', { email: user.email });

      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    } else {
      setError('Identifiants incorrects 😬');
      posthog?.capture('login_failed', { email_attempted: email });
    }
  };

  return (
    <BaseScreen>
      <View style={styles.content}>
        <Title style={styles.title}>Content de te revoir !</Title>
        <View style={styles.inputs}>
          <Input
            autoComplete="email"
            placeholder="E-mail"
            value={email}
            onChangeText={setEmail}
          />
          <Input
            autoComplete="password"
            placeholder="Mot de passe"
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity style={styles.forgotPassword} onPress={() => {}}>
            <Text style={styles.forgotPassword__text}>
              Bah alors, t’as oublié ton mdp mon reuf ?
            </Text>
          </TouchableOpacity>
        </View>
        <Button style={styles.button} onPress={handleSignIn}>
          Connexion
        </Button>
        <Text style={styles.error}>{error}</Text>
      </View>
    </BaseScreen>
  );
};

const styles = StyleSheet.create({
  forgotPassword: {
    alignSelf: 'flex-end',
  },
  button: {
    alignSelf: 'center',
  },
  forgotPassword__text: {
    fontSize: 14,
    color: '#6A707C',
    fontWeight: 'bold',
  },
  title: {
    maxWidth: 280,
  },
  content: {
    marginTop: 30,
    gap: 30,
  },
  inputs: {
    gap: 15,
  },
  error: {
    color: 'red',
    textAlign: 'center',
  },
});

export default SignIn;
