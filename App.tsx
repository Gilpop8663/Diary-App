import React, { useState } from 'react';
import Realm from 'realm';
import { NavigationContainer } from '@react-navigation/native';
import Navigator from './src/navigator/Navigator';
import AppLoading from 'expo-app-loading';

const FeelingSchema = {
  name: 'Feeling',
  properties: {
    _id: 'int',
    emotion: 'string',
    message: 'string',
  },
  primaryKey: '_id',
};

export default function App() {
  const [ready, setReady] = useState(false);
  const startLoading = async () => {
    const realm = await Realm.open({
      path: 'gilDiaryDB',
      schema: [FeelingSchema],
    });
    console.log(realm);
    return console.log('hi');
  };
  const onFinish = () => setReady(true);
  if (!ready) {
    return (
      <AppLoading
        onError={console.error}
        onFinish={onFinish}
        startAsync={startLoading}
      />
    );
  }
  return (
    <NavigationContainer>
      <Navigator />
    </NavigationContainer>
  );
}
