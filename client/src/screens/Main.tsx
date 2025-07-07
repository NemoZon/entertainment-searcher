import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, Image,
} from 'react-native';
import BaseScreen from './BaseScreen';
import Button from '../components/Button';
import { PageProps } from '../../App';
import { useAppDispatch, useAppSelector } from '../hooks.ts/reducer';
import { fetchEvents, saveEvents } from '../features/eventActions';
import { Event } from '../types/Event';

const Main = ({ navigation }: PageProps) => {
  const dispatch = useAppDispatch();
  const [selectedEvents, setSelectedEvents] = useState<number[]>([]);

  const city = useAppSelector((state) => state.user.locations[0]);
  const months = useAppSelector((state) => state.month.months);
  const events = useAppSelector((state) => state.event.events);
  const loading = useAppSelector((state) => state.event.loading);
  const userId = useAppSelector((state) => state.user.id);

  useEffect(() => {
    if (city && months.length > 0) {
      dispatch(fetchEvents({ city, months }));
    }
  }, [city, months, dispatch]);

  const toggleSelectEvent = (eventId: number) => {
    setSelectedEvents((prev) =>
      prev.includes(eventId)
        ? prev.filter((id) => id !== eventId)
        : [...prev, eventId]
    );
  };

  const handleValidate = async () => {
    if (userId) {
      await dispatch(saveEvents({ userId, eventIds: selectedEvents }));
      navigation.navigate('Home');
    }
  };

  return (
    <BaseScreen>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Voici les événements que nous avons trouvés !</Text>
        <Text style={styles.text}>Tu peux sélectionner ceux qui t’intéressent !</Text>
        <Text style={styles.city}>{city}</Text>

        {loading ? (
          <Text>Chargement...</Text>
        ) : events.length === 0 ? (
          <Text>Aucun événement trouvé</Text>
        ) : (
          events.map((event: Event) => {
            const isSelected = selectedEvents.includes(event.id);
            return (
              <TouchableOpacity
                key={event.id}
                style={[styles.eventCard, isSelected && styles.selectedCard]}
                onPress={() => toggleSelectEvent(event.id)}
              >
                <Image source={{ uri: event.image }} style={styles.eventImage} />
                <View style={styles.eventInfo}>
                  <Text style={[styles.eventName, isSelected && styles.selectedText]}>{event.name}</Text>
                  <Text style={[styles.eventDate, isSelected && styles.selectedText]}>{event.date}</Text>
                  <Text style={[styles.eventPrice, isSelected && styles.selectedText]}>{event.price}</Text>
                </View>
                <Text style={[styles.plus, isSelected && styles.minus]}>{isSelected ? '-' : '+'}</Text>
              </TouchableOpacity>
            );
          })
        )}

        <Button onPress={handleValidate} disabled={selectedEvents.length === 0}>Valider</Button>
      </ScrollView>
    </BaseScreen>
  );
};

const styles = StyleSheet.create({
  container: { paddingVertical: 20, alignItems: 'center' },
  title: { fontSize: 30, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  text: { fontSize: 20, textAlign: 'center', marginBottom: 20 },
  city: { fontSize: 24, fontWeight: 'bold', color: '#FEC180', marginBottom: 20 },
  eventCard: { flexDirection: 'row', backgroundColor: '#D3D3D3', padding: 15, borderRadius: 10, width: '90%', marginBottom: 10 },
  selectedCard: { backgroundColor: 'black' },
  eventImage: { width: 50, height: 50, marginRight: 10 },
  eventInfo: { flex: 1 },
  eventName: { fontSize: 18, fontWeight: 'bold', textDecorationLine: 'underline', color: 'black' },
  eventDate: { fontSize: 16, color: 'black' },
  eventPrice: { fontSize: 14, color: '#A9A9A9' },
  plus: { fontSize: 24, fontWeight: 'bold', color: 'black' },
  minus: { color: 'white' },
  selectedText: { color: 'white' },
});

export default Main;
