import React, { useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("LogIn"); // Navigate to Login screen after 3 seconds
    }, 1000);

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.projectName}>My Project</Text>
      <ActivityIndicator size="large" color="#FFFFFF" style={styles.loading} />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000", // Black background
    justifyContent: "center",
    alignItems: "center",
  },
  projectName: {
    fontSize: 32,
    color: "#FFFFFF", // White text for project name
    fontWeight: "bold",
    marginBottom: 20,
  },
  loading: {
    marginTop: 10,
  },
});
