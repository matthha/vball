import { Tabs } from 'expo-router';
import React, { useEffect } from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useDispatch } from 'react-redux';
import { gettingData } from '../data/Action';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const dispatch = useDispatch();

  useEffect(() => {
    // let async temp = await JSON.parse(myGames)
    // setWord(temp)
    dispatch(gettingData())
    },[])

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'How-To',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'book' : 'book-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="teams"
        options={{
          title: 'Team Setup',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'megaphone' : 'megaphone-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="contact"
        options={{
          title: 'Contacts',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'person' : 'person-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="tourny"
        options={{
          title: 'Brackets',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'git-network' : 'git-network-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
