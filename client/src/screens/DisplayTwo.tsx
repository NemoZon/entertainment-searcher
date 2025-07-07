import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import BaseScreen from './BaseScreen';
import Button from '../components/Button';
import { useAppDispatch, useAppSelector } from '../hooks.ts/reducer';
import { fetchLocations, saveLocation } from '../features/locationActions';
import { PageProps } from '../../App';
import { Location } from '../types/Location';

const DisplayTwo = ({ navigation }: PageProps) => {
  const dispatch = useAppDispatch();
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  const locations = useAppSelector(state => state.location.locations); // ✅ propriété au pluriel
  const userId = useAppSelector(state => state.user.id);

  useEffect(() => {
    if (!userId) {
      Alert.alert("Erreur", "Utilisateur non connecté.");
      return;
    }

    dispatch(fetchLocations());
  }, [dispatch, userId]);

  const handleValidate = () => {
    if (!selectedCity || !userId) {
      Alert.alert("Erreur", "Merci de choisir une ville.");
      return;
    }

    dispatch(saveLocation({ userId, city: selectedCity }))
      .unwrap()
      .then(() => {
        navigation.navigate('DisplayThree');
      })
      .catch(() => {
        Alert.alert("Erreur", "Impossible d'enregistrer votre ville.");
      });
  };

  return (
    <BaseScreen>
      <Text style={styles.title}>Choisis ta ville !</Text>

      <View style={styles.grid}>
        {locations.map((location: Location) => (
          <TouchableOpacity
            key={location.id}
            style={[
              styles.button,
              selectedCity === location.city && styles.selectedButton,
            ]}
            onPress={() => setSelectedCity(location.city)}
          >
            <Text
              style={[
                styles.buttonText,
                selectedCity === location.city && styles.selectedButtonText,
              ]}
            >
              {location.city}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Button onPress={handleValidate} disabled={!selectedCity} type="primary">
        Valider
      </Button>
    </BaseScreen>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
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
    margin: 5,
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

export default DisplayTwo;
