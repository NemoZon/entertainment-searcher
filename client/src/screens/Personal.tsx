import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppSelector } from '../hooks.ts/reducer';
import BaseScreen from './BaseScreen';
import Icon from 'react-native-vector-icons/FontAwesome';

const Personal = () => {
  const navigation = useNavigation();
  const user = useAppSelector(state => state.user);
  const userName = user.name || 'Utilisateur';

  const [selectedField, setSelectedField] = useState<string | null>(null);

  const toggleSelectField = (field: string) => {
    setSelectedField(prev => (prev === field ? null : field));
  };

  const userInfo = [
    { label: 'Nom et Prénom', value: user.name },
    { label: 'Email', value: user.email },
    { label: 'Mot de passe', value: '********' },
    { label: 'Date de naissance', value: user.birthDate },
  ];

  return (
    <BaseScreen>
      <View style={styles.header}>
        <Text style={styles.title}>Paramètre du compte, {userName}</Text>
      </View>
      <View style={styles.container}>
        {userInfo.map((item, index) => {
          const isSelected = selectedField === item.label;
          return (
            <TouchableOpacity
              key={index}
              style={[styles.card, isSelected && styles.selectedCard]}
              onPress={() => toggleSelectField(item.label)}>
              <Text style={[styles.cardText, isSelected && styles.selectedText]}>
                {item.label}: {item.value}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </BaseScreen>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  container: {
    alignItems: 'center',
  },
  card: {
    width: '90%',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#D3D3D3',
    marginBottom: 10,
  },
  selectedCard: {
    backgroundColor: 'black',
  },
  cardText: {
    fontSize: 18,
    color: 'black',
  },
  selectedText: {
    color: 'white',
  },
});

export default Personal;
