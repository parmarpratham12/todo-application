import { View, Text } from 'react-native'
import React, { use } from 'react'
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons';
import useThem from '@/hooks/useThem';

const TabsLayout= () => {
  const {colors}=useThem();
  return (
    <Tabs 
       screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        // headerStyle: { backgroundColor: 'white' },
        // headerTitleStyle: { color: 'gray' },
        tabBarStyle: { 
            backgroundColor: colors.surface,
            borderTopWidth: 1,
            borderTopColor: colors.border,
            height: 90,
            paddingBottom: 5,
            paddingTop: 5


        },
        tabBarLabelStyle: {
            fontSize: 10,
            fontWeight: 'bold',
            marginBottom: 10,
        
        },   
        headerShown: false,

       }}
       >
      <Tabs.Screen
        name="index"
        options={{ 
            title: "To-Do",
            tabBarIcon: ({ color, size }) => (
                <Ionicons name= 'flash-outline' size={size} color={color}/>
                      )
}}
      />
      <Tabs.Screen
        name="setting"
        options={{ 
            title: "Settings",
            tabBarIcon: ({ color, size }) => (
                <Ionicons name= 'settings' size={size} color={color}/>

  )
}}
      />


      
    </Tabs>
  )
  


}

export default TabsLayout