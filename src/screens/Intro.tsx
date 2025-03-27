import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import BaseScreen from './BaseScreen';
import Button from '../components/Button';

type RootStackParamList = {
  SignUp: undefined;
  Welcome: undefined;
  Intro: undefined;
  DisplayOne: undefined;
};

type IntroProps = NativeStackScreenProps<RootStackParamList, 'Intro'>;

const images = [
  require('../assets/images/image_1.png'),
  require('../assets/images/image_3.png'),
  require('../assets/images/image_2.png'),
  require('../assets/images/image_4.png'),
  require('../assets/images/image_5.png'),
  require('../assets/images/image_6.png'),
];
const imagePositions = [
    { top: 0, left: 80 },
    { top: 0, left: 0 },
    { top: 80, left: 180 },
    { top: 90, left: 50 },
    { top: 30, left: 170 },
    { top: 90, left: 140 },
  ];

const Intro = ({ navigation }: IntroProps) => {
  return (
    <BaseScreen>
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Bienvenue sur notre application !</Text>
            <Text style={styles.textLarge}>Découvre l’application</Text>
            <Text style={styles.textMedium}>Explication de l’application !</Text>

            <View style={styles.imageContainer}>
                {images.map((img, index) => (
                    <Image key={index} source={img} style={[styles.image, imagePositions[index]]} />
                ))}
            </View>

            <Text style={styles.textMedium}>Si tu as des questions, ne les pose pas s’il te plaît</Text>

            <Button onPress={() => navigation.navigate('DisplayOne')}>Ok ! J'ai compris</Button>
        </ScrollView>
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
    textLarge: {
      fontSize: 25,
      textAlign: 'center',
      marginBottom: 5,
    },
    textMedium: {
      fontSize: 20,
      textAlign: 'center',
      marginBottom: 20,
    },
    imageContainer: {
      width: 300,
      height: 250, // Ajuste la hauteur totale
      position: 'relative',
    },
    image: {
      width: 100,
      height: 100,
      position: 'absolute',
    },

  });

export default Intro;
