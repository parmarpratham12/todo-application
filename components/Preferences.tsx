import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { createSettingsStyles } from '@/assets/images/Styles/setting.styles';
import useThem from '@/hooks/useThem';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Switch } from 'react-native-gesture-handler';

const Preferences = () => {

const [isAutoSync, setIsAutoSync] = useState(true);
const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);

const{colors, isDarkMode, toggleDarkMode}=useThem();

 const settingStyle = createSettingsStyles(colors);

  return (
    <LinearGradient colors={colors.gradients.surface} style={settingStyle.section}>
        <Text style={settingStyle.sectionTitle}>Preferences</Text>

        {/* Dark Mode */}
<View style={settingStyle.settingItem}>

    <View style={settingStyle.settingLeft} >

    <LinearGradient colors={ colors.gradients.primary } style={settingStyle.settingIcon}>
        <Ionicons name="moon" size={18} color= "#ffff" />


    </LinearGradient>
    <Text style={settingStyle.settingText}>Dark Mode</Text>

    </View>
<Switch
value={isDarkMode}
onValueChange={toggleDarkMode}
thumbColor={"#ffff "}
trackColor={{false:colors.border, true: colors.primary}}

/>

</View>


         {/* Notifications Mode */}
<View style={settingStyle.settingItem}>

    <View style={settingStyle.settingLeft} >

    <LinearGradient colors={ colors.gradients.warning} style={settingStyle.settingIcon}>
        <Ionicons name="notifications" size={18} color= "#ffff" />


    </LinearGradient>
    <Text style={settingStyle.settingText}>Notifications</Text>
    </View>
<Switch
value={isNotificationsEnabled}
onValueChange={() => setIsNotificationsEnabled(!isNotificationsEnabled) }
thumbColor={"#ffff "}
trackColor={{false:colors.border, true: colors.warning}}

/>

</View> 



     {/* Auto Sync Mode */}
<View style={settingStyle.settingItem}>

    <View style={settingStyle.settingLeft} >

    <LinearGradient colors={ colors.gradients.success} style={settingStyle.settingIcon}>
        <Ionicons name="sync" size={18} color= "#ffff" />


    </LinearGradient>
    <Text style={settingStyle.settingText}>Auto Sync</Text>
    </View>
<Switch
value={isAutoSync}
onValueChange={() => setIsAutoSync(!isAutoSync) }
thumbColor={"#ffff "}
trackColor={{false:colors.border, true: colors.success}}

/>

</View> 



        </LinearGradient>
  )
}

export default Preferences