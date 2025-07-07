import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { usePostHog } from 'posthog-react-native';

import { login } from '../features/userActions';
import BaseScreen from './BaseScreen';
import Title from '../components/Title';
import Input from '../components/Input';
import Button from '../components/Button';
import { RootStackParamList } from '../../App';
import { useAppDispatch } from '../hooks.ts/reducer';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [auth0_id, setAuth0Id] = useState('');
  const [error, setError] = useState('');

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const posthog = usePostHog();
  const dispatch = useAppDispatch(); // ✅ utilise bien ton hook typé

  const handleSignIn = async () => {
    try {
      const result = await dispatch(login({ email: email.trim(), password: auth0_id })).unwrap();
      const user = result.data;

      posthog?.identify(user.id, { email: user.email });
      posthog?.capture('user_logged_in', { email: user.email });

      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    } catch (err: any) {
      setError(err?.message || 'Identifiants incorrects 😬');
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
            placeholder="Mot de passe (auth0_id)"
            value={auth0_id}
            onChangeText={setAuth0Id}
          />
          <TouchableOpacity style={styles.forgotPassword} onPress={() => {}}>
            <Text style={styles.forgotPassword__text}>
              Bah alors, t’as oublié ton ID mon reuf ?
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
