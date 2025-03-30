import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import BaseScreen from './BaseScreen';
import Button from '../components/Button';
import Checkbox from '../components/Checkbox';
import {PageProps} from '../../App';

const Welcome = ({navigation}: PageProps) => {
  const [accepted, setAccepted] = useState(false);

  return (
    <BaseScreen>
      <Text style={styles.title}>Bienvenue !</Text>
      <View style={styles.textContainer}>
        <Text style={styles.textLarge}>
          Avant toute chose, tu retrouveras ici toutes les réglementations.
        </Text>
        <Text style={styles.textMedium}>Il va falloir que tu acceptes !</Text>
        <Text style={styles.textMedium}>
          Grâces au information récolter tu vas pouvoir avoir ton calendrier
          personnalisé !
        </Text>
        <Text style={styles.textMedium}>
          Il faudra aussi que tu te connecte à google pour que cela s'ajouter
          automatiquement !
        </Text>
      </View>

      <View style={styles.checkboxContainer}>
        <Checkbox value={accepted} onValueChange={setAccepted} />
        <Text style={styles.checkboxText}>
          J'accepte les conditions d'utilisation
        </Text>
      </View>

      <Button
        style={styles.button}
        onPress={() => navigation.navigate('Intro')}
        disabled={!accepted}>
        Valider
      </Button>
    </BaseScreen>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 20,
  },
  textContainer: {
    gap: 15,
    marginBottom: 30,
    alignItems: 'flex-start',
  },
  textLarge: {
    fontSize: 25,
    textAlign: 'left',
    fontWeight: 'bold',
  },
  textMedium: {
    fontSize: 20,
    textAlign: 'left',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  checkboxText: {
    fontSize: 15,
    marginLeft: 10,
    color: '#000',
  },
  button: {
    alignSelf: 'center',
  },
});

export default Welcome;
