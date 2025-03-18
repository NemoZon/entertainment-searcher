import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Button from './src/components/Button';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Button onPress={() => console.log('Button pressed')}>Press me</Button>
      <Button type="secondary" onPress={() => console.log('Button pressed')}>
        Press me
      </Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});

export default App;
