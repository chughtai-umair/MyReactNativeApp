import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LogIn = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError(""); // Clear previous errors

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    try {
      const usersData = await AsyncStorage.getItem("users");
      let users = usersData ? JSON.parse(usersData) : [];

      // Check if user exists
      const foundUser = users.find(
        (user) => user.email === email && user.password === password
      );

      if (foundUser) {
        await AsyncStorage.setItem("currentUser", JSON.stringify(foundUser));
        Alert.alert("Success", "Logged in successfully!");
        navigation.replace("Home");
      } else {
        setError("Invalid email or password.");
      }
    } catch (error) {
      console.log("Error logging in:", error);
      setError("An error occurred. Please try again.");
    }

    // try {
    //   const storedUser = await AsyncStorage.getItem("user");
    //   if (storedUser) {
    //     const user = JSON.parse(storedUser);

    //     if (user.email === email && user.password === password) {
    //       Alert.alert("Login Successful!", "Welcome back!");
    //       navigation.replace("Home");
    //     } else {
    //       setError("Invalid email or password.");
    //     }
    //   } else {
    //     setError("No account found. Please sign up.");
    //   }
    // } catch (error) {
    //   console.log("Error retrieving user:", error);
    //   setError("An error occurred. Please try again.");
    // }
  };

  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <Text style={styles.title}>Login</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter Email"
          placeholderTextColor="#888888"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Enter Password"
          placeholderTextColor="#888888"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.linkButton}
          onPress={() => navigation.navigate("SignIn")}
        >
          <Text style={styles.linkText}>Don't have an account? Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LogIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#a47148",
    justifyContent: "center",
    alignItems: "center",
  },
  container2: {
    backgroundColor: "#ffedd8",
    padding: 20,
    borderTopLeftRadius: 200,
    borderBottomRightRadius: 200,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 150,
    marginTop: 40,
  },
  title: {
    fontSize: 50,
    color: "#a47148",
    fontWeight: "bold",
    marginBottom: 40,
    marginTop: 100,
  },
  input: {
    width: "100%",
    backgroundColor: "white",
    color: "#a47148",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 50,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1.5,
    borderColor: "#a47148",
  },
  button: {
    backgroundColor: "#a47148",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  error: {
    color: "red",
    fontSize: 14,
    marginBottom: 10,
  },
  linkButton: {
    marginTop: 15,
  },
  linkText: {
    color: "#a47148",
    fontSize: 14,
  },
});
