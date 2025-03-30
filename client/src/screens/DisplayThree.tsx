import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import BaseScreen from './BaseScreen';
import Button from '../components/Button';
import {PageProps} from '../../App';

const months = [
  'Janvier',
  'Février',
  'Mars',
  'Avril',
  'Mai',
  'Juin',
  'Juillet',
  'Août',
  'Septembre',
  'Octobre',
  'Novembre',
  'Décembre',
];

const DisplayThree = ({navigation}: PageProps) => {
  const [selectedMonths, setSelectedMonths] = useState<string[]>([]);

  const toggleMonthSelection = (month: string) => {
    setSelectedMonths(prev =>
      prev.includes(month) ? prev.filter(m => m !== month) : [...prev, month],
    );
  };

  return (
    <BaseScreen>
      <View style={styles.container}>
        <Text style={styles.title}>Pour quel mois veux-tu des évents ?</Text>
        <Text style={styles.text}>Dis-nous tout !</Text>

        <View style={styles.monthsContainer}>
          {months.map(month => (
            <TouchableOpacity
              key={month}
              style={[
                styles.monthButton,
                selectedMonths.includes(month) && styles.monthButtonSelected,
              ]}
              onPress={() => toggleMonthSelection(month)}>
              <Text
                style={[
                  styles.monthText,
                  selectedMonths.includes(month) && styles.monthTextSelected,
                ]}>
                {month}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Button
          onPress={() => navigation.navigate('Main')}
          disabled={selectedMonths.length === 0} // Désactivé tant qu'aucun mois n'est sélectionné
          type="primary">
          C'est noté le S !
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
  monthsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  monthButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 5,
    margin: 5,
    fontWeight: 'bold',
  },
  monthButtonSelected: {
    backgroundColor: 'black',
  },
  monthText: {
    fontSize: 18,
    color: 'black',
  },
  monthTextSelected: {
    color: 'white',
  },
});

export default DisplayThree;
