import React, { createContext, useState } from 'react';
import Realm from 'realm';
import { NavigationContainer } from '@react-navigation/native';
import Navigator from './src/navigator/Navigator';
import AppLoading from 'expo-app-loading';
import { DBContext } from './src/hooks/useDB';
import { feelingSchemaProps } from './src/utils/interface';

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
  const [realm, setRealm] = useState<feelingSchemaProps | any>({});
  const startLoading = async () => {
    const connection: Realm = await Realm.open({
      path: 'gilDiaryDB',
      schema: [FeelingSchema],
    });
    setRealm(connection);
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
    <DBContext.Provider value={realm}>
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    </DBContext.Provider>
  );
}
