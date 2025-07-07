import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import BaseScreen from './BaseScreen';
import Button from '../components/Button';
import { useAppSelector, useAppDispatch } from '../hooks.ts/reducer';
import { PageProps } from '../../App';
import { getCategories } from '../features/categoryActions';
import { Category } from '../types/Category';

const DisplayOne = ({ navigation }: PageProps) => {
  const dispatch = useAppDispatch();

  const userId = useAppSelector(state => state.user.id);
  const categories = useAppSelector(state => state.category.categories);
  const loading = useAppSelector(state => state.category.loading);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    if (!userId) {
      console.warn('❌ Aucun utilisateur détecté dans le store Redux.');
      Alert.alert('Erreur', 'Utilisateur non connecté. Veuillez vous inscrire ou vous reconnecter.');
    }
  }, [userId]);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const toggleSelection = (id: string) => {
    setSelectedCategories(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
    console.log('✅ Catégorie cliquée :', id);
  };

  const handleValidate = () => {
    console.log('▶️ Bouton Valider pressé');

    if (!userId || selectedCategories.length === 0) {
      console.warn("⛔️ Pas d'utilisateur ou pas de sélection");
      Alert.alert('Erreur', 'Veuillez sélectionner au moins une catégorie.');
      return;
    }

    // ⚠️ Tu enverras ces données à ton backend plus tard (ex : via savePreferences)
    console.log('📤 Catégories sélectionnées (à enregistrer plus tard) :', selectedCategories);
    navigation.navigate('DisplayTwo');
  };

  return (
    <BaseScreen>
      <Text style={styles.title}>Choisis tes centres d'intérêt !</Text>
      <Text style={styles.text}>Sélectionne pour personnaliser ton expérience.</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <View style={styles.grid}>
          {categories.map((category: Category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.button,
                selectedCategories.includes(category.id) && styles.selectedButton,
              ]}
              onPress={() => toggleSelection(category.id)}
            >
              <Text
                style={[
                  styles.buttonText,
                  selectedCategories.includes(category.id) && styles.selectedButtonText,
                ]}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <Button
        onPress={handleValidate}
        disabled={selectedCategories.length === 0 || loading}
        type="primary"
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
    marginBottom: 10,
  },
  text: {
    fontSize: 20,
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

export default DisplayOne;
