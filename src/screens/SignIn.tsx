import React, {useState} from 'react';
import BaseScreen from './BaseScreen';
import Title from '../components/Title';
import Input from '../components/Input';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Button from '../components/Button';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
        <Button style={styles.button} onPress={() => {}}>
          Connexion
        </Button>
      </View>
    </BaseScreen>
  );
};

const styles = StyleSheet.create({
  forgotPassword: {
    alignSelf: 'flex-end',
  },
  button: {alignSelf: 'center'},
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
});

export default SignIn;
