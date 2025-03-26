import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BaseScreen from './BaseScreen';
import Button from '../components/Button';
import Checkbox from '../components/Checkbox';

const TermsScreen = () => {
  const [accepted, setAccepted] = useState(false);

  return (
    <BaseScreen>
      <Text style={styles.title}>Bienvenue !</Text>
      <View style={styles.textContainer}>
        <Text style={styles.textLarge}>
          Avant toute chose, tu retrouveras ici toutes les réglementations.
        </Text>
        <Text style={styles.textMedium}>
          Il va falloir que tu acceptes !
        </Text>
        <Text style={styles.textMedium}>
          Grâce aux informations récoltées, tu vas pouvoir avoir ton calendrier personnalisé
        </Text>
        <Text style={styles.textMedium}>
          Il faudra aussi que tu te connectes à Google pour que cela s'ajoute automatiquement
        </Text>
      </View>

      <View style={styles.checkboxContainer}>
        <Checkbox value={accepted} onValueChange={setAccepted} />
        <Text style={styles.checkboxText}>J'accepte les conditions d'utilisation</Text>
      </View>

      <Button
        style={styles.button}
        onPress={() => {}}
        disabled={!accepted}
      >
        Valider
      </Button>
    </BaseScreen>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'left', // Alignement du texte à gauche
    marginBottom: 20,
  },
  textContainer: {
    gap: 15,
    marginBottom: 30,
    alignItems: 'flex-start', // Aligne les textes à gauche
  },
  textLarge: {
    fontSize: 25,
    textAlign: 'left', // Aligner le texte à gauche
    fontWeight: 'bold',
  },
  textMedium: {
    fontSize: 20,
    textAlign: 'left', // Aligner le texte à gauche
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    alignSelf: 'flex-start', // Aligne la case à cocher à gauche
  },
  checkboxText: {
    fontSize: 15,
    marginLeft: 10,
    color: '#000',
  },
  button: {
    alignSelf: 'center', // Centre le bouton
  },
});

export default TermsScreen;
