import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import { NewsScreen, PortfolioScreen, ProfileScreen } from '../screens';
import AuthNavigator from './AuthNavigator';
import HomeStackNavigator from './HomeStackNavigator';
import { useAuth } from '../context/AuthContext';

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
    backgroundColor: '#000101',
  },
};

const AppNavigator = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Entypo name="home" size={20} color={focused ? '#FFBF00' : 'white'} />
              <Text style={{ color: focused ? '#FFBF00' : 'white', fontSize: 13 }}>Home</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="News"
        component={NewsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Entypo name="news" size={20} color={focused ? '#FFBF00' : 'white'} />
              <Text style={{ color: focused ? '#FFBF00' : 'white', fontSize: 13 }}>News</Text>
            </View>
          ),
        }}
      />
      {isAuthenticated && (
         <Tab.Screen
            name="Portfolio"
            component={PortfolioScreen}
            options={{
              tabBarIcon: ({ focused }) => (
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <Entypo name="wallet" size={20} color={focused ? '#FFBF00' : 'white'} />
                  <Text style={{ color: focused ? '#FFBF00' : 'white', fontSize: 13 }}>Portfolio</Text>
                </View>
              ),
            }}
          />
        )}
      {isAuthenticated ? (
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Entypo name="user" size={20} color={focused ? '#FFBF00' : 'white'} />
                <Text style={{ color: focused ? '#FFBF00' : 'white', fontSize: 13 }}>Profile</Text>
              </View>
            ),
          }}
        />
      ) : (
        <Tab.Screen
          name="Auth"
          component={AuthNavigator}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Entypo name="login" size={20} color={focused ? '#FFBF00' : 'white'} />
                <Text style={{ color: focused ? '#FFBF00' : 'white', fontSize: 13 }}>Login</Text>
              </View>
            ),
          }}
        />
      )}
    </Tab.Navigator>
  );
};

export default AppNavigator;