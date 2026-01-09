import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import useThem from '@/hooks/useThem';
import { createSettingsStyles } from '@/assets/images/Styles/setting.styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import ProgressStats from '@/components/ProgressStats';
import Preferences from '@/components/Preferences';
import DangerZone from '@/components/DangerZone';

const settingscreen = () => {


const{colors}=useThem();

 const settingStyle = createSettingsStyles(colors);



  return (
      
    <LinearGradient colors={colors.gradients.background} style={settingStyle.container}> 


<SafeAreaView style={settingStyle.safeArea}>
            {/* HEADER */}

      <View style={settingStyle.header}>
      <View style={settingStyle.titleContainer}>
        <LinearGradient colors={ colors.gradients.primary } style={settingStyle.iconContainer}>
          <Ionicons name="settings" size={28} color= "#ffff" />
        </LinearGradient>
          <Text style={settingStyle.title}>Settings</Text>
      </View>
    </View>

    <ScrollView style={settingStyle.scrollView}
      contentContainerStyle={settingStyle.content}
      showsVerticalScrollIndicator={false}
      >
<ProgressStats/>

{/* preferences */}
    <Preferences/>

    <DangerZone/>

    </ScrollView>
</SafeAreaView>
    </LinearGradient>
      
    
  )
}

export default settingscreen