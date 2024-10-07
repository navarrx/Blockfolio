import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import CryptoDetailsScreen from '../screens/CryptoDetailsScreen';
import EditCryptoScreen from '../screens/EditCryptoScreen';

const Stack = createStackNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="CryptoDetailsScreen" component={CryptoDetailsScreen} />
      <Stack.Screen name="EditCryptoScreen" component={EditCryptoScreen} />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
