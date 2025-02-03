import React, { useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const WelcomeScreen = ({ navigation }) => {
  useEffect(() => {
    const checkUser = async () => {
      try {
        const user = await AsyncStorage.getItem("user");
        if (user) {
          navigation.replace("LogIn"); // Agar user saved hai to Login par bhejo
        } else {
          navigation.replace("SignIn"); // Agar user nahi mila to SignUp par bhejo
        }
      } catch (error) {
        console.log("Error checking user:", error);
        navigation.replace("SignIn"); // Error ki surat me SignUp par bhejo
      }
    };

    setTimeout(checkUser, 3000); // 3 sec loading delay
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.projectName}>My Project</Text>
      <ActivityIndicator size="large" color="white" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  projectName: {
    color: "white",
    fontSize: 24,
    marginBottom: 20,
  },
});

export default WelcomeScreen;
