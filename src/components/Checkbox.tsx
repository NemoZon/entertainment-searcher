import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Remplacer l'importation



type CheckboxProps = {
  value: boolean; // Définit le type boolean pour la valeur
  onValueChange: (newValue: boolean) => void; // Fonction qui change la valeur
};

const Checkbox = ({ value, onValueChange }: CheckboxProps) => {
  return (
    <Pressable style={[styles.checkbox, value && styles.checked]} onPress={() => onValueChange(!value)}>
      {value && <Icon name="check" size={20} color="white" />} {/* Utilisation de react-native-vector-icons */}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  checked: {
    backgroundColor: '#000',
  },
});

export default Checkbox;
