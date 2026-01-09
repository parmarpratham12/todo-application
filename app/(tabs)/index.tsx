import { createHomeStyles } from "@/assets/images/Styles/home.styles";
import EmptyStyle from "@/components/EmptyStyle";
import Header from "@/components/Header";
import LoadingSpinner from "@/components/LoadingSpinner";
import TodoInput from "@/components/TodoInput";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import useThem from "@/hooks/useThem";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQuery } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Alert, FlatList, SafeAreaView, StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native";

type Todo = Doc<"todos">; 

export default function Index() {
  const {toggleDarkMode , colors}=useThem();
  const todos = useQuery(api.todos.getTodos);


  const [editingId, setEditingId] = useState<Id<"todos"> | null>(null);
  const [editText, setEditText] = useState<string>("");

  const   homeStyles = createHomeStyles(colors);
  const toggleTodo = useMutation(api.todos.toggleTodo);
  const deleteTodo = useMutation(api.todos.deleteTodo);
  
  const updateTodo  = useMutation(api.todos.updateTodo);
  

  const isLoading = todos === undefined;

  if (isLoading) return <LoadingSpinner />;




  const hanldeToggleTodo = async(id:Id<"todos">) => { 

  try {
    await toggleTodo({id});
   }
    catch (error) {
      console.error("Error toggling todo:", error);
      Alert.alert("Error","Failed to toggle todo.");
  } 


};
const handleDeleteTodo = async (id: Id<"todos">) => { 
  Alert.alert("delete Todo", "Are you sure you want to delete this todo?", 
 
    [
      {text:"Cancel", style:"cancel" },
      {text:"Delete", style:"destructive" , onPress: () => deleteTodo({id})},


    ]
  );
};
   const handleEditTodo = (todo: Todo) => {

    setEditText(todo.title);

    setEditingId(todo._id);
   }

   const handleSaveTodo  = async (todo: Todo) => {  
    if (editingId) {
      
      
      try 
      { await updateTodo({id:editingId, title: editText.trim()})
      setEditingId(null);
      setEditText("");
      
    }catch(error)
    {
      console.error("Error updating todo:", error);
      Alert.alert("Error","Failed to update todo.");
      
    }
  }

   };

   const handleCancleEdit  = () => {

    setEditingId(null);
    setEditText("");

   };


  const renderTodoItem = ({ item }: { item: Todo }) => {  
    const isEditing = editingId === item._id;
    
    return (
      <View style={homeStyles.todoItemWrapper}>
        <LinearGradient
        
        colors={colors.gradients.surface} 
        style={homeStyles.todoItem}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        >
        <TouchableOpacity 
        style={homeStyles.checkbox}
        activeOpacity={0.7}
        onPress={() => hanldeToggleTodo(item._id) }
        
        >
          <LinearGradient
            colors={ item.iscompleted ? colors.gradients.success : colors.gradients.muted}
            style={[
              homeStyles.checkboxInner,
              { borderColor: item.iscompleted ? "transparent" : colors.border },
            ]}
          >
            { item.iscompleted && <Ionicons name="checkmark" size={18} color="#ffffff" />}
          </LinearGradient>
        </TouchableOpacity> 
        
        { isEditing ? ( 
          <View style={homeStyles.editContainer}> 
            <TextInput
              style={homeStyles.editInput}
              value={editText}
              onChangeText={setEditText}
              autoFocus
              multiline
              placeholder="Edit todo..."
              placeholderTextColor={colors.textMuted}
            />
            <View style={homeStyles.editButtons}>
              <TouchableOpacity onPress={() => handleSaveTodo(item)} activeOpacity={0.8}>
                  <LinearGradient colors={colors.gradients.success} style={homeStyles.editButton}>
                    <Ionicons name="checkmark" size={16} color="#fff" />
                    <Text style={homeStyles.editButtonText}>Save</Text>
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleCancleEdit} activeOpacity={0.8}>
                  <LinearGradient colors={colors.gradients.muted} style={homeStyles.editButton}>
                    <Ionicons name="close" size={16} color="#fff" />
                    <Text style={homeStyles.editButtonText}>Cancel</Text>
                  </LinearGradient>
                </TouchableOpacity>
            </View>
          </View>
        ) : ( 
          <View style={homeStyles.todoTextContainer}>
            <Text 
              style={[
                homeStyles.todoText,
                item.iscompleted  && {
                  textDecorationLine: "line-through",
                  color: colors.mutedText,
                  opacity: 0.6,
                }
              ]}
            >
              {item.title}
            </Text>
        
        <View style={homeStyles.todoActions}>
          <TouchableOpacity onPress={() => handleEditTodo(item)} activeOpacity={0.8}>
            <LinearGradient colors={colors.gradients.warning} style={homeStyles.actionButton}>
              <Ionicons name="pencil" size={18} color="#fff" />
            </LinearGradient>
          </TouchableOpacity> 
          <TouchableOpacity onPress={() => handleDeleteTodo(item._id)} activeOpacity={0.8}>
            <LinearGradient colors={colors.gradients.danger} style={homeStyles.actionButton}>
              <Ionicons name="trash" size={18} color="#fff" />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        </View>
        )}
        </LinearGradient>

      </View>
    );
  };

  return (
    <LinearGradient colors={colors.gradients.background} style={homeStyles.container}>
      <StatusBar barStyle={colors.statusBarStyle} />
      <SafeAreaView style={homeStyles.safeArea}>
        <Header />
        <TodoInput />
        
        <FlatList
          data={todos}
          renderItem={renderTodoItem}
          keyExtractor={(item) => item._id.toString()}
          style={homeStyles.todoList}
          contentContainerStyle={homeStyles.todoListContent}
          ListEmptyComponent={<EmptyStyle />}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}  
 


        