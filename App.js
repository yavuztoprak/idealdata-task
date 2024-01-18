import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Wallet from './views/Wallet';
import Hisseler from './views/Hisseler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const Mockdata = {
  "stocks": [
    {
      "symbol": "GARAN",
      "currentPrice": 9.45,
      "buyPrice": 9.40,
      "sellPrice": 9.50
    },
    {
      "symbol": "AKBNK",
      "currentPrice": 6.30,
      "buyPrice": 6.25,
      "sellPrice": 6.35
    },
    {
      "symbol": "SISE",
      "currentPrice": 5.80,
      "buyPrice": 5.75,
      "sellPrice": 5.85
    }
  ]
}

const userBalance = "1000"

export default function App() {
  AsyncStorage.setItem('stocks', JSON.stringify(Mockdata));
  useEffect(() => {
    const initializeData = async () => {
      const balance = await AsyncStorage.getItem('balance');
      if (balance === null) {
        AsyncStorage.setItem('balance', userBalance);
      }
    }

    initializeData();
  }, [])



  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerTitleAlign: 'center',
        }}
      >

        <Tab.Screen
          name="Hisseler"
          component={Hisseler}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons
                name={focused ? 'trending-up' : 'trending-up-outline'}
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Portföyüm"
          component={Wallet}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons
                name={focused ? 'wallet' : 'wallet-outline'}
                size={size}
                color={color}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}