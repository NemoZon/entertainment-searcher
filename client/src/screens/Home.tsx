import {View, Text} from 'react-native';
import React from 'react';
import {useAppSelector} from '../hooks.ts/reducer';
import BaseScreen from './BaseScreen';

const Home = () => {
  const user = useAppSelector(state => state.user);
  return (
    <BaseScreen>
      <View>
        <Text>Logged in as {user.email}</Text>
      </View>
    </BaseScreen>
  );
};

export default Home;
