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

const SignIn = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = async () => {
    if (!username || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill all fields.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    try {
      const usersData = await AsyncStorage.getItem("users");
      let users = usersData ? JSON.parse(usersData) : [];

      // Check if email already exists
      const userExists = users.some((user) => user.email === email);
      if (userExists) {
        Alert.alert("Error", "Email already registered. Please log in.");
        return;
      }

      // Add new user to array
      users.push({ username, email, password });

      // Save updated users array
      await AsyncStorage.setItem("users", JSON.stringify(users));

      Alert.alert("Success", "Account Created Successfully!");
      navigation.replace("LogIn");
    } catch (error) {
      console.log("Error saving user:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <Text style={styles.title}>Sign Up</Text>

        <TextInput
          style={styles.input}
          placeholder="User Name"
          placeholderTextColor="#888888"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Email"
          placeholderTextColor="#888888"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Password"
          placeholderTextColor="#888888"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#888888"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate("LogIn")}
        >
          <Text style={styles.backButtonText}>
            Already have an account? Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignIn;

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
    paddingBottom: 100,
    marginTop: 40,
  },
  title: {
    fontSize: 50,
    color: "#a47148",
    fontWeight: "bold",
    marginBottom: 40,
    marginTop: 50,
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
  backButton: {
    marginTop: 15,
  },
  backButtonText: {
    color: "#a47148",
    fontSize: 14,
  },
});
