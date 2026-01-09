import { LinearGradient } from "expo-linear-gradient";
import { ActivityIndicator, Text, View } from "react-native";
import useThem from "../hooks/useThem";

const LoadingSpinner = () => {
  const { colors } = useThem();

  return (
    <LinearGradient colors={colors.gradients.background}
     style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
     
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>

        <ActivityIndicator size="large" color={colors.primary} />
        
        <Text style={{ color: colors.text, marginTop: 12 }}>Loading your todos...</Text>
      </View>
    </LinearGradient>
  );
};

export default LoadingSpinner;