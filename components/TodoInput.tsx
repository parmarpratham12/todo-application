import { View, Text, Alert } from 'react-native'
import React from 'react'
import useThem from '@/hooks/useThem';
import { createHomeStyles } from '@/assets/images/Styles/home.styles';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const TodoInput = () => {

    const { colors } = useThem();  
    const homeStyles = createHomeStyles(colors);
    const [newTodo, setNewTodo] = React.useState("");
    const addTodo = useMutation(api.todos.addTodos);
    const handleAddTodo = async () => {


        if (newTodo.trim()) {

        try { 
            await addTodo({ title: newTodo.trim() });
            setNewTodo("");
        }
        catch (error) {
            console.log("Error adding todo:", error);
            Alert.alert("Error", "Failed to add task. Please try again.");
        }
        }
    };



  return (
    <View style={homeStyles.inputSection} >
    <View style={homeStyles.inputWrapper} >
        <TextInput
          style={homeStyles.input}
          placeholder="what needs to be done? "
          value={newTodo}
          onChangeText={setNewTodo}
          onSubmitEditing={handleAddTodo}
          multiline
            placeholderTextColor={colors.textMuted}
        />

        <TouchableOpacity onPress={handleAddTodo} activeOpacity={0.8} 
        disabled = {!newTodo.trim()}>
            <LinearGradient 
            colors={newTodo.trim() ? colors.gradients.primary : colors.gradients.muted}
            style={[homeStyles.addButton, !newTodo.trim() && homeStyles.addButtonDisabled]} >

                <Ionicons name ="add"size={24} color = "#ffffff" />
            </LinearGradient>
        </TouchableOpacity>

        </View>
        </View>
  )
}

export default TodoInput;