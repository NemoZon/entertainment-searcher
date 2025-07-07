import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useAppSelector } from '../hooks.ts/reducer';
import BaseScreen from './BaseScreen';
import Button from '../components/Button';
import Icon from 'react-native-vector-icons/FontAwesome';
import { usePostHog } from 'posthog-react-native';
import { Event } from '../types/Event';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const Home = () => {
  const navigation = useNavigation<NavigationProp>();
  const posthog = usePostHog();

  const user = useAppSelector((state) => state.user);
  const userName = user.firstName || 'Utilisateur';
  const events = useAppSelector((state) => state.event.events);

  const [selectedEvents, setSelectedEvents] = useState<number[]>([]);

  const toggleSelectEvent = (eventId: number) => {
    setSelectedEvents((prev) =>
      prev.includes(eventId)
        ? prev.filter((id) => id !== eventId)
        : [...prev, eventId]
    );
  };

  useEffect(() => {
    if (posthog) {
      posthog.capture('home_screen_viewed');
    }
  }, [posthog]);

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
        {events.length === 0 ? (
          <Text>Aucun événement sélectionné pour le moment.</Text>
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
          })
        )}
      </ScrollView>

      {selectedEvents.length > 0 && (
        <Button
          onPress={() => {
            posthog?.capture('modify_events_clicked', {
              total_selected: selectedEvents.length,
              selected_ids: selectedEvents,
            });
            navigation.navigate('DisplayOne');
          }}
        >
          Modifier événements
        </Button>
      )}
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
});

export default Home;
