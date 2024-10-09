import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen, RegisterScreen } from '../screens';
import { Easing } from 'react-native-reanimated';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        transitionSpec: {
          open: {
            animation: 'timing',
            config: {
              duration: 400,
              easing: Easing.out(Easing.poly(4)),
            },
          },
          close: {
            animation: 'timing',
            config: {
              duration: 400,
              easing: Easing.in(Easing.poly(4)),
            },
          },
        },
        cardStyleInterpolator: ({ current, layouts }) => {
          return {
            cardStyle: {
              opacity: current.progress,
              transform: [
                {
                  translateX: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [layouts.screen.width, 0],
                  }),
                },
              ],
            },
          };
        },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;