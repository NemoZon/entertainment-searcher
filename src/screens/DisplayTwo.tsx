import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import BaseScreen from './BaseScreen';
import Button from '../components/Button';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

// Typage des routes
type RootStackParamList = {
  DisplayTwo: undefined;
  DisplayOne: undefined;
  DisplayThree: undefined;
};

type DisplayTwoProps = NativeStackScreenProps<RootStackParamList, 'DisplayTwo'>;

// Liste des villes françaises
const cities = [
  'Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice', 'Nantes', 'Strasbourg', 'Montpellier',
  'Bordeaux', 'Lille', 'Rennes', 'Reims', 'Saint-Étienne', 'Le Havre', 'Toulon', 'Grenoble',
  'Dijon', 'Angers', 'Nîmes', 'Villeurbanne', 'Clermont-Ferrand', 'Le Mans', 'Aix-en-Provence',
  'Brest', 'Tours', 'Amiens', 'Limoges', 'Annecy', 'Perpignan'];

const DisplayTwo = ({ navigation }: DisplayTwoProps) => {
  const [selectedCity, setSelectedCity] = useState<string>('');

  return (
    <BaseScreen>
      <View style={styles.container}>
        <Text style={styles.title}>Il nous faut encore{'\n'}quelques informations</Text>
        <Text style={styles.text}>Donne-nous la ville où tu souhaites avoir des événements</Text>

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedCity}
            onValueChange={(itemValue) => setSelectedCity(itemValue)}
            style={styles.picker}
            dropdownIconColor="black"
          >
            <Picker.Item label="Sélectionne une ville" value="" color="gray" />
            {cities.map((city, index) => (
              <Picker.Item key={index} label={city} value={city} color="black" />
            ))}
          </Picker>
        </View>

        {/* Bouton Valider */}
        <Button
          onPress={() => navigation.navigate('DisplayThree')}
          disabled={selectedCity === ''}
          type="primary"
        >
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
  pickerContainer: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 3,
    backgroundColor: 'white',
    overflow: 'hidden',
    marginBottom: 20,
  },
  picker: {
    height: 50,
    color: 'black',
  },
});

export default DisplayTwo;
