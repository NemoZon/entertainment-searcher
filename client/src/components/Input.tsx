import {StyleSheet, TextInput, TextInputProps} from 'react-native';
import React from 'react';

type InputProps = {
  autoComplete?: TextInputProps['autoComplete'];
  keyboardType?: TextInputProps['keyboardType'];
  value: TextInputProps['value'];
  placeholder?: TextInputProps['placeholder'];
  onChangeText: TextInputProps['onChangeText'];
  placeholderTextColor?: TextInputProps['placeholderTextColor'];
};

const Input = ({
  autoComplete,
  keyboardType,
  value,
  placeholder,
  onChangeText,
  placeholderTextColor,
}: InputProps) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      autoComplete={autoComplete}
      keyboardType={keyboardType}
      onChangeText={onChangeText}
      placeholderTextColor={placeholderTextColor ?? '#8391A1'}
      value={value}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    padding: 18,
    borderWidth: 1,
    borderColor: '#E8ECF4',
    borderRadius: 8,
    backgroundColor: '#F7F8F9',
  },
});

export default Input;
