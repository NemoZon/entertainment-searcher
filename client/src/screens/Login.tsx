import {Text, StyleSheet, View, Image} from 'react-native';
import React from 'react';
import BaseScreen from './BaseScreen';
import colors from '../tools/colors';
import Button from '../components/Button';

const Login = () => {
  return (
    <BaseScreen>
      <View style={styles.content}>
        <Image
          style={styles.logo}
          source={require('../assets/images/logo.png')}
        />
        <Text style={styles.text}>Planifiez moins, vivez plus</Text>
        <View style={styles.buttons}>
          <Button onPress={() => {}} type="primary">
            Connexion
          </Button>
          <Button onPress={() => {}} type="secondary">
            S’inscrire
          </Button>
        </View>
      </View>
    </BaseScreen>
  );
};

const styles = StyleSheet.create({
  logo: {
    marginBottom: 20,
  },
  content: {
    flex: 1,
    marginTop: 50,
    alignItems: 'center',
  },
  text: {
    color: colors.SECONDARY,
    marginBottom: 26,
  },
  buttons: {
    gap: 15,
  },
});

export default Login;
