import { createHomeStyles } from "@/assets/images/Styles/home.styles";
import { api } from "@/convex/_generated/api";
import useThem from "@/hooks/useThem";
import { useQuery } from "convex/react";
import { Text, View } from 'react-native';

import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from 'react';

const Header = () => {

const { colors } = useThem();
const homeStyles = createHomeStyles(colors);
const todo = useQuery(api.todos.getTodos);

const completedCount = todo ? todo.filter((todo) => todo.iscompleted).length || 0 : 0;
const totalCount = todo ? todo.length : 0;

const processPercent = totalCount === 0 ? 0 : (completedCount / totalCount) * 100;

  return (  
    <View style ={homeStyles.header}>
      <View style = {homeStyles.titleContainer}>




<LinearGradient colors={colors.gradients.primary} style={homeStyles.iconContainer}>
        <Ionicons name="flash-outline" size={32} color = "#ffffff"/>
      </LinearGradient>

        <View style={homeStyles.titleTextContainer}>
          <Text style={homeStyles.title}>Todo List</Text> 
            <Text style={homeStyles.subtitle}>
            {`${completedCount} of ${totalCount} tasks completed`}</Text>
        </View>
      </View>



{ true && (
<View style={homeStyles.progressContainer}>
 <View style={homeStyles.progressBarContainer}>
    <View style={homeStyles.progressBar}>

        <LinearGradient 
            colors={colors.gradients.success}
            style={[homeStyles.progressFill, {width: `${processPercent}%`}]}
        />
    </View>
    <Text style={homeStyles.progressText}>{`${Math.round(processPercent)}%`}</Text>

    </View>



    </View>

)}
    
</View>
  
);
};

export default Header