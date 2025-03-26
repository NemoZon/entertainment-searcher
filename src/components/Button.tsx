import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import colors from '../tools/colors';

type ButtonProps = {
  onPress: () => void;
  children: string;
  type?: 'primary' | 'secondary';
  style?: object;
  disabled?: boolean; // Ajout de la propriété disabled
};

const Button = ({
  onPress,
  children,
  type = 'primary',
  style = {},
  disabled = false, // Valeur par défaut à false
}: ButtonProps) => {
  // Styles dynamiques en fonction de la valeur de disabled
  const dynamicStyles = {
    button: {
      backgroundColor: disabled
        ? colors.DISABLED // Couleur du bouton désactivé
        : type === 'primary'
        ? colors.SECONDARY
        : colors.MAIN,
      borderWidth: type === 'secondary' && !disabled ? 1 : 0,
      borderColor: disabled ? colors.DISABLED_BORDER : colors.SECONDARY,
    },
    text: {
      color: disabled ? colors.DISABLED_TEXT : type === 'primary' ? colors.MAIN : colors.SECONDARY,
    },
  };

  return (
    <TouchableOpacity
      onPress={disabled ? () => {} : onPress} // Empêche la pression si désactivé
      style={[styles.button, dynamicStyles.button, style]}
      disabled={disabled} // Assure que l'élément est désactivé
    >
      <Text style={[styles.text, dynamicStyles.text]}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 19,
    borderRadius: 8,
    fontWeight: 'semibold',
    fontSize: 15,
    width: '100%',
  },
  text: {
    textAlign: 'center',
  },
});

export default Button;
