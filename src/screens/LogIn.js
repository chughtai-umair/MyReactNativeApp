import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

const LogIn = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const validateAndLogin = () => {
    setError(""); // Clear previous errors

    // Basic email validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email.");
      return; // Exit if email is invalid
    }

    // Password validation (minimum 6 characters)
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return; // Exit if password is too short
    }

    // If validation passes
    Alert.alert("Login Successful!", "Welcome back!");
    navigation.navigate("SignIn"); // Navigate to SignIn screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter Email"
        placeholderTextColor="#888888"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
      />

      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter Password"
        placeholderTextColor="#888888"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />

      {/* Display error message */}
      {error ? <Text style={styles.error}>{error}</Text> : null}

      {/* Login Button */}
      <TouchableOpacity style={styles.button} onPress={validateAndLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Sign In Link */}
      <TouchableOpacity
        style={styles.linkButton}
        onPress={() => navigation.navigate("SignIn")}
      >
        <Text style={styles.linkText}>Don't have an account? Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LogIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000", // Black background
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 32,
    color: "#FFFFFF", // White text
    fontWeight: "bold",
    marginBottom: 30,
  },
  input: {
    width: "100%",
    backgroundColor: "#1A1A1A", // Dark gray input background
    color: "#FFFFFF",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#444444",
  },
  button: {
    backgroundColor: "#FFFFFF", // White button
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "#000000", // Black text for button
    fontSize: 16,
    fontWeight: "bold",
  },

  error: {
    color: "red", // Red text for error messages
    fontSize: 14,
    marginBottom: 10,
  },
});
