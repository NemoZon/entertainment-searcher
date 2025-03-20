import {SafeAreaView, StyleSheet, View} from 'react-native';
import React from 'react';
import colors from '../tools/colors';

type BaseScreenProps = {
  children: React.ReactNode;
  containerize?: boolean;
};

const BaseScreen = ({children, containerize = true}: BaseScreenProps) => {
  const container = {
    flex: 1,
    paddingHorizontal: containerize ? 20 : 0,
    paddingVertical: containerize ? 10 : 0,
  };
  return (
    <SafeAreaView style={styles.page}>
      <View style={container}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.BACKGROUND,
  },
});

export default BaseScreen;
