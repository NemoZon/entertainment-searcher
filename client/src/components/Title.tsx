import {StyleSheet, Text} from 'react-native';
import React from 'react';

type TitleProps = {
  children: React.ReactNode;
  style?: object;
};

const Title = ({children, style = {}}: TitleProps) => {
  return <Text style={[styles.text, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default Title;
