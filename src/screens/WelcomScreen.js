import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Button,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const WelcomeScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [hasAccount, setHasAccount] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const user = await AsyncStorage.getItem("user");
        if (user) {
          setHasAccount(true);
        }
      } catch (error) {
        console.log("Error checking user:", error);
      }
      setLoading(false);
    };

    setTimeout(checkUser, 3000);
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="white" />
        <Text style={styles.text}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome</Text>
      {hasAccount ? (
        <Button title="LogIn" onPress={() => navigation.navigate("LogIn")} />
      ) : (
        <Button title="SignUp" onPress={() => navigation.navigate("SignIn")} />
      )}
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
  text: {
    color: "white",
    fontSize: 24,
    marginBottom: 20,
  },
});

export default WelcomeScreen;
