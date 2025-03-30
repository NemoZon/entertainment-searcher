import React, {useState} from 'react';
import BaseScreen from './BaseScreen';
import {StyleSheet, View} from 'react-native';
import Input from '../components/Input';
import Title from '../components/Title';
import Button from '../components/Button';
import DateInput from '../components/DateInput';
import {registration} from '../features/userActions';
import {useAppDispatch, useAppSelector} from '../hooks.ts/reducer';
import {Text} from '@react-navigation/elements';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [passwordRepeat, setPasswordRepeat] = useState('');
  const [date, setDate] = useState<Date>();

  const {error} = useAppSelector(state => state.user);

  const dispatch = useAppDispatch();

  const handleSignUp = () => {
    if (email && password && name) {
      dispatch(registration({email, password, name}));
    }
  };

  return (
    <BaseScreen>
      <Title style={styles.title}>C’est ici que tout commence !</Title>
      <View style={styles.inputs}>
        <Input
          autoComplete="username"
          placeholder="Nom d'utilisateur"
          value={name}
          onChangeText={setName}
        />
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
        {/* <Input
          placeholder="Confirmation mot de passe"
          value={passwordRepeat}
          onChangeText={setPasswordRepeat}
        /> */}
        <DateInput
          placeholder="Date de naissance"
          dateState={[date, setDate]}
        />
      </View>
      <Button style={styles.button} onPress={handleSignUp}>
        Inscription
      </Button>
      <Text style={styles.error}>{error}</Text>
    </BaseScreen>
  );
};

const styles = StyleSheet.create({
  forgotPassword: {
    alignSelf: 'flex-end',
  },
  button: {alignSelf: 'center', marginTop: 19},
  forgotPassword__text: {
    fontSize: 14,
    color: '#6A707C',
    fontWeight: 'bold',
  },
  title: {
    maxWidth: 280,
    marginBottom: 48,
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

export default SignUp;
