import { View, Text } from 'react-native'
import React from 'react'
import useThem from '@/hooks/useThem'
import { createSettingsStyles } from '@/assets/images/Styles/setting.styles';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const ProgressStats = () => {

    const {colors}=useThem();
     const settingStyle = createSettingsStyles(colors);
     const todos= useQuery(api.todos.getTodos);
     const totalTodos = todos?.length || 0;
     const completedTodos = todos?  todos.filter(todo => todo.iscompleted).length || 0 : 0;
     const activeTodos = totalTodos - completedTodos;
  return (

    <LinearGradient colors = {colors.gradients.surface } style={settingStyle.section}>
    <Text style={settingStyle.sectionTitle}>Progress Stats</Text>
      {/* TotalTodos */}
      <View style={settingStyle.statsContainer}>
    
    <LinearGradient colors={colors.gradients.background} 
    style={[settingStyle.statCard , {backgroundColor: colors.primary}]}>

      
      <View style={settingStyle.statIconContainer}>


      <LinearGradient colors={colors.gradients.primary} 
        style={settingStyle.statIcon}>
          <Ionicons name="list" size={20} color="#fff"/>
           
          </LinearGradient> 

        </View>
         
        
      <View>
        <Text style={settingStyle.statNumber}>{totalTodos}</Text>
        <Text style={settingStyle.statLabel}>Total Todos</Text>
      </View>

    </LinearGradient> 
    

    {/*  completed todos */}
    <LinearGradient colors={colors.gradients.background} 
    style={[settingStyle.statCard , {backgroundColor: colors.success}]}>

      
      <View style={settingStyle.statIconContainer}>


      <LinearGradient colors={colors.gradients.success} 
        style={settingStyle.statIcon}>
          <Ionicons name="checkmark-circle" size={20} color="#fff"/>
           
          </LinearGradient> 

        </View>
         
        
      <View>
        <Text style={settingStyle.statNumber}>{completedTodos}</Text>
        <Text style={settingStyle.statLabel}>Completed Todos</Text>
      </View>

    </LinearGradient> 


    {/* active todos */}
    <LinearGradient colors={colors.gradients.background} 
    style={[settingStyle.statCard , {backgroundColor: colors.warning}]}>

      
      <View style={settingStyle.statIconContainer}>


      <LinearGradient colors={colors.gradients.warning} 
        style={settingStyle.statIcon}>
          <Ionicons name="time" size={20} color="#fff"/>
           
          </LinearGradient> 

        </View>
         
        
      <View>
        <Text style={settingStyle.statNumber}>{activeTodos}</Text>
        <Text style={settingStyle.statLabel}>Active Todos</Text>
      </View>

    </LinearGradient>
    </View>
    </LinearGradient>
  );
};

export default ProgressStats