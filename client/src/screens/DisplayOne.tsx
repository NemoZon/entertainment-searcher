import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import BaseScreen from './BaseScreen';
import Button from '../components/Button';
import { useAppSelector } from '../hooks.ts/reducer';
import { PageProps } from '../../App';

const interests = ['Concerts', 'Théâtre', 'Sports', 'Ateliers', 'Dance'];

const DisplayOne = ({ navigation }: PageProps) => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  // Vérification de l'état de connexion de l'utilisateur
  const user = useAppSelector(state => state.user);
  const isUserLoggedIn = user.name !== ''; // L'utilisateur est connecté si son nom n'est pas vide

  // Fonction pour gérer la sélection/désélection des centres d'intérêts
  const toggleSelection = (interest: string) => {
    setSelectedInterests(
      prevSelected =>
        prevSelected.includes(interest)
          ? prevSelected.filter(item => item !== interest) // Désélectionne
          : [...prevSelected, interest], // Ajoute à la sélection
    );
  };

  return (
    <BaseScreen>
      {/* Texte dynamique basé sur la connexion de l'utilisateur */}
      <Text style={styles.title}>
        {isUserLoggedIn ? 'Choisi tes centres d\'intérêt !' : 'Nous avons besoin de te connaître !'}
      </Text>
      <Text style={styles.text}>
        {isUserLoggedIn
          ? 'Sélectionne tes centres d\'intérêts pour personnaliser ton expérience.'
          : 'Sélectionne tes centres d\'intérêts pour commencer.'}
      </Text>

      {/* Section des boutons */}
      <View style={styles.grid}>
        {interests.map((interest, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.button,
              selectedInterests.includes(interest) && styles.selectedButton,
            ]}
            onPress={() => toggleSelection(interest)}>
            <Text
              style={[
                styles.buttonText,
                selectedInterests.includes(interest) && styles.selectedButtonText,
              ]}>
              {interest}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Bouton pour valider la sélection */}
      <Button
        onPress={() => navigation.navigate('DisplayTwo')}
        disabled={selectedInterests.length === 0} // Désactivé si aucun centre d'intérêt n'est sélectionné
        type="primary">
        Valider
      </Button>
    </BaseScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 10,
  },
  text: {
    fontSize: 20,
    textAlign: 'left',
    marginBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 20,
  },
  button: {
    borderWidth: 2,
    borderColor: 'black',
    paddingVertical: 20,
    paddingHorizontal: 40,
  },
  buttonText: {
    fontSize: 18,
    color: 'black',
  },
  selectedButton: {
    backgroundColor: 'black',
  },
  selectedButtonText: {
    color: 'white',
  },
});

export default DisplayOne;
