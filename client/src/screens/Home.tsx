import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useAppSelector } from '../hooks.ts/reducer';
import BaseScreen from './BaseScreen';
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

// Mock des événements (remplacé plus tard par API)
const mockEvents = [
  {
    id: 1,
    month: 'Juillet',
    name: 'Festival de Musique',
    date: '15 Juillet 2024 - 20h',
    price: 'Gratuit',
    image: 'https://via.placeholder.com/50',
    link: 'https://example.com',
  },
  {
    id: 2,
    month: 'Août',
    name: 'Théâtre en Plein Air',
    date: '10 Août 2024 - 18h',
    price: '10€',
    image: 'https://via.placeholder.com/50',
    link: 'https://example.com',
  },
];

const Home = () => {
  const navigation = useNavigation();
  const user = useAppSelector(state => state.user);
  const userName = user.name || 'Utilisateur';
  const [selectedEvents, setSelectedEvents] = useState<number[]>([]);

  const toggleSelectEvent = (eventId: number) => {
    setSelectedEvents(prev =>
      prev.includes(eventId) ? prev.filter(id => id !== eventId) : [...prev, eventId]
    );
  };

  return (
    <BaseScreen>
      <View style={styles.header}>
        <Text style={styles.title}>Voici tes sélections, {userName} !</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Personal')}>
          <Icon name="cog" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <Text style={styles.subtitle}>Voici les événements à venir :</Text>

      <ScrollView contentContainerStyle={styles.container}>
        {mockEvents.map(event => {
          const isSelected = selectedEvents.includes(event.id);
          return (
            <TouchableOpacity
              key={event.id}
              style={[styles.eventCard, isSelected && styles.selectedCard]}
              onPress={() => toggleSelectEvent(event.id)}>
              <Image source={{ uri: event.image }} style={styles.eventImage} />
              <View style={styles.eventInfo}>
                <Text style={[styles.eventName, isSelected && styles.selectedText]}>
                  {event.name}
                </Text>
                <Text style={[styles.eventDate, isSelected && styles.selectedText]}>
                  {event.date}
                </Text>
                <Text style={[styles.eventPrice, isSelected && styles.selectedText]}>
                  {event.price}
                </Text>
              </View>
              <Text style={[styles.plus, isSelected && styles.minus]}>
                {isSelected ? '-' : '+'}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Bouton pour revenir à DisplayOne */}
      <Button onPress={() => navigation.navigate('DisplayOne')}>
          retour DOne pour l'instant
        </Button>
    </BaseScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  subtitle: {
    fontSize: 20,
    textAlign: 'left',
    marginBottom: 20,
  },
  eventCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D3D3D3',
    padding: 15,
    borderRadius: 10,
    width: '90%',
    marginBottom: 10,
  },
  selectedCard: {
    backgroundColor: 'black',
  },
  eventImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  eventInfo: {
    flex: 1,
  },
  eventName: {
    fontSize: 18,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    color: 'black',
  },
  eventDate: {
    fontSize: 16,
    color: 'black',
  },
  eventPrice: {
    fontSize: 14,
    color: '#A9A9A9',
  },
  plus: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  minus: {
    color: 'white',
  },
  selectedText: {
    color: 'white',
  },
  returnButton: {
    backgroundColor: '#3498db',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    position: 'absolute',
    bottom: 30,
    left: '50%',
    transform: [{ translateX: -90 }],
  },
  returnButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Home;
