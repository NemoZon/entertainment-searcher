import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import colors from '../tools/colors';

type ButtonProps = {
  onPress: () => void;
  children: string;
  type?: 'primary' | 'secondary';
  style?: object;
};

const Button = ({
  onPress,
  children,
  type = 'primary',
  style = {},
}: ButtonProps) => {
  const dynamicStyles = {
    button: {
      backgroundColor: type === 'primary' ? colors.SECONDARY : colors.MAIN,
      borderWidth: type === 'secondary' ? 1 : 0,
      borderColor: colors.SECONDARY,
    },
    text: {
      color: type === 'primary' ? colors.MAIN : colors.SECONDARY,
    },
  };
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, dynamicStyles.button, style]}>
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
