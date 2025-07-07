import React, { useState } from 'react';
import BaseScreen from './BaseScreen';
import { StyleSheet, View, Alert } from 'react-native';
import Input from '../components/Input';
import Title from '../components/Title';
import Button from '../components/Button';
import DateInput from '../components/DateInput';
import { registration } from '../features/userActions';
import { useAppDispatch, useAppSelector } from '../hooks.ts/reducer';
import { Text } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

const SignUp = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [auth0_id, setAuth0Id] = useState('');
  const [date, setDate] = useState<Date>();

  const { error } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  const handleSignUp = async () => {
    if (email && auth0_id && name && date) {
      try {
        const result = await dispatch(
          registration({
            email,
            auth0_id,
            name,
          })
        ).unwrap();

        if (result.status === 201) {
          Alert.alert('Succès', 'Inscription réussie !');
          navigation.navigate('Welcome');
        }
      } catch (err) {
        Alert.alert('Erreur', 'Une erreur est survenue lors de l’inscription.');
        console.error('Erreur registration:', err);
      }
    } else {
      Alert.alert('Champs requis', 'Merci de remplir tous les champs.');
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
          placeholder="Identifiant (auth0_id)"
          value={auth0_id}
          onChangeText={setAuth0Id}
        />
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
  button: { alignSelf: 'center', marginTop: 19 },
  title: {
    maxWidth: 280,
    marginBottom: 48,
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
