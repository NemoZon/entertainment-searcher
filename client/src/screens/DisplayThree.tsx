import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import BaseScreen from './BaseScreen';
import Button from '../components/Button';
import { PageProps } from '../../App';
import { useAppDispatch, useAppSelector } from '../hooks.ts/reducer';
import { fetchMonths, saveMonths } from '../features/monthActions';

const DisplayThree = ({ navigation }: PageProps) => {
  const [selectedMonths, setSelectedMonths] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const userId = useAppSelector(state => state.user.id);
  const { months, loading } = useAppSelector(state => state.month);

  useEffect(() => {
    dispatch(fetchMonths());
  }, [dispatch]);

  const toggleMonthSelection = (month: string) => {
    setSelectedMonths(prev =>
      prev.includes(month) ? prev.filter(m => m !== month) : [...prev, month]
    );
  };

  const handleValidate = () => {
    if (!userId || selectedMonths.length === 0) {
      return;
    }
    dispatch(saveMonths({ userId, months: selectedMonths }))
      .unwrap()
      .then(() => navigation.navigate('Main'))
      .catch(() => {
        // gestion d'erreur optionnelle
      });
  };

  if (loading) {
    return (
      <BaseScreen>
        <ActivityIndicator size="large" color="black" />
      </BaseScreen>
    );
  }

  return (
    <BaseScreen>
      <View style={styles.container}>
        <Text style={styles.title}>Pour quels mois veux-tu des évents ?</Text>
        <Text style={styles.text}>Dis-nous tout !</Text>

        <View style={styles.monthsContainer}>
          {months.map(month => (
            <TouchableOpacity
              key={month}
              style={[
                styles.monthButton,
                selectedMonths.includes(month) && styles.monthButtonSelected,
              ]}
              onPress={() => toggleMonthSelection(month)}
            >
              <Text
                style={[
                  styles.monthText,
                  selectedMonths.includes(month) && styles.monthTextSelected,
                ]}
              >
                {month}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Button
          onPress={handleValidate}
          disabled={selectedMonths.length === 0}
          type="primary"
        >
          C’est noté le S !
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
    borderWidth: 1,
    borderColor: 'black',
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
