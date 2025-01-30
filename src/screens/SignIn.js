import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const SignIn = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <TextInput
        style={styles.input}
        placeholder="User Name"
        placeholderTextColor="#888888"
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Email"
        placeholderTextColor="#888888"
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Password"
        placeholderTextColor="#888888"
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        placeholderTextColor="#888888"
        secureTextEntry
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignIn;

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
    color: "#000000", // Black text
    fontSize: 16,
    fontWeight: "bold",
  },
});
