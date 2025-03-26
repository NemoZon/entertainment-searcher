import React, { useState } from 'react';
import BaseScreen from './BaseScreen';
import { StyleSheet, View } from 'react-native';
import Input from '../components/Input';
import Title from '../components/Title';
import Button from '../components/Button';
import DateInput from '../components/DateInput';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

// 🔹 Définition des routes pour le typage
type RootStackParamList = {
  SignUp: undefined;
  Welcome: undefined;
};

type SignUpProps = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

const SignUp = ({ navigation }: SignUpProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [date, setDate] = useState<Date>();

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
        <Input
          placeholder="Confirmation mot de passe"
          value={passwordRepeat}
          onChangeText={setPasswordRepeat}
        />
        <DateInput placeholder="Date de naissance" dateState={[date, setDate]} />
      </View>
      <Button onPress={() => navigation.navigate('Welcome')} type="primary">
        Suivant
      </Button>
    </BaseScreen>
  );
};

const styles = StyleSheet.create({
  forgotPassword: {
    alignSelf: 'flex-end',
  },
  button: { alignSelf: 'center', marginTop: 19 },
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
});

export default SignUp;
