import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen, CryptoDetailsScreen, EditCryptoScreen } from '../screens';
import { Easing } from 'react-native-reanimated';

const Stack = createStackNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        transitionSpec: {
          open: {
            animation: 'timing',
            config: {
              duration: 500,
              easing: Easing.out(Easing.exp),
            },
          },
          close: {
            animation: 'timing',
            config: {
              duration: 500,
              easing: Easing.in(Easing.exp),
            },
          },
        },
        cardStyleInterpolator: ({ current, next, layouts }) => {
          return {
            cardStyle: {
              transform: [
                {
                  translateX: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [layouts.screen.width, 0],
                  }),
                },
              ],
            },
            overlayStyle: {
              opacity: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.5],
              }),
            },
          };
        },
      }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="CryptoDetailsScreen" component={CryptoDetailsScreen} />
      <Stack.Screen name="EditCryptoScreen" component={EditCryptoScreen} />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
