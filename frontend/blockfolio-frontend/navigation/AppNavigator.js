import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Entypo from '@expo/vector-icons/Entypo';
import { View, Text } from 'react-native';

import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import PortfolioScreen from '../screens/PortfolioScreen';

const Tab = createBottomTabNavigator();

const screenOptions = {
  tabBarShowLabel: false,
  headerShown: false,
  tabBarStyle: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 60,
    backgroundColor: '#fff',
  },
};

const AppNavigator = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Entypo name="home" size={24} color={focused ? '#FFBF00' : '#3F3F3F'} />
              <Text style={{ color: focused ? '#FFBF00' : '#3F3F3F' }}>Home</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Login"
        component={LoginScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Entypo name="login" size={24} color={focused ? '#FFBF00' : '#3F3F3F'} />
              <Text style={{ color: focused ? 'black' : 'gray' }}>Login</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Portfolio"
        component={PortfolioScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Entypo name="wallet" size={24} color={focused ? '#FFBF00' : '#3F3F3F'} />
              <Text style={{ color: focused ? 'black' : 'gray' }}>Portfolio</Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;