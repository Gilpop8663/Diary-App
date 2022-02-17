import React from 'react';
import Home from '../screens/Home';
import Write from '../screens/Write';
const {
  createNativeStackNavigator,
} = require('@react-navigation/native-stack');

const Tabs = createNativeStackNavigator();

export default function Navigator() {
  return (
    <Tabs.Navigator
      screenOptions={{ headerShown: false, presentation: 'modal' }}
    >
      <Tabs.Screen name="Home" component={Home} />
      <Tabs.Screen name="Write" component={Write} />
    </Tabs.Navigator>
  );
}
