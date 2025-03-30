import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import BaseScreen from './BaseScreen';
import Button from '../components/Button';
import {PageProps} from '../../App';

const interests = ['Concerts', 'Théâtre', 'Sports', 'Ateliers', 'Dance'];

const DisplayOne = ({navigation}: PageProps) => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  // Fonction pour gérer la sélection/désélection
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
      <View style={styles.container}>
        <Text style={styles.title}>Nous avons besoin de te connaître !</Text>
        <Text style={styles.text}>Sélectionne tes centres d'intérêts</Text>

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
                  selectedInterests.includes(interest) &&
                    styles.selectedButtonText,
                ]}>
                {interest}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Button
          onPress={() => navigation.navigate('DisplayTwo')}
          disabled={selectedInterests.length === 0} // Désactivé si aucun choix
          type="primary">
          Valider
        </Button>
      </View>
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
    textAlign: 'center',
    marginBottom: 10,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
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
