import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios"; // Import axios

const Home = ({ navigation }) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [responseCount, setResponseCount] = useState(0);
  const [sentence1, setSentence1] = useState(""); // State for first input
  const [sentence2, setSentence2] = useState(""); // State for second input
  const [similarityResult, setSimilarityResult] = useState(null); // Store API response
  const [loading, setLoading] = useState(false); // Loading state
  const [user, setUser] = useState(null);

  const API_URL = "https://2c18-59-103-32-34.ngrok-free.app/predict"; // Replace with your ML model API URL

  const insets = useSafeAreaInsets();

  useEffect(() => {
    StatusBar.setBarStyle("dark-content");
    StatusBar.setBackgroundColor("#FFFFFF");

    async function getData() {
      const userData = await AsyncStorage.getItem("currentUser");
      if (!userData) {
        navigation.replace("LogIn");
      }
      const parsedUser = JSON.parse(userData); // Convert string to object
      setUser(parsedUser);
    }
    getData();
  }, []);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const handleCheckSimilarity = async () => {
    if (!sentence1 || !sentence2) {
      alert("Please enter both sentences.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(API_URL, {
        question1: sentence1, // Use "question1" instead of "sentence1"
        question2: sentence2, // Use "question2" instead of "sentence2"
      });

      // Handle response
      setSimilarityResult(response.data); // Assuming API returns JSON response
      setResponseCount(responseCount + 1); // Increment response count
    } catch (error) {
      console.error("Error checking similarity:", error);
      if (error.response) {
        // Log the API response for debugging
        console.error("API Response:", error.response.data);
        alert(
          `${
            error.response.data.error ||
            "Failed to fetch similarity. Please try again."
          }`
        );
      } else {
        alert(
          "Failed to fetch similarity. Please check your network connection."
        );
      }
    }
    setLoading(false);
  };

  return (
    <ScrollView
      style={[styles.container, { paddingTop: insets.top }]}
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <KeyboardAvoidingView behavior="padding" style={styles.wrapper}>
        <View>
          <TouchableOpacity
            onPress={toggleDropdown}
            style={styles.profileIconWrapper}
          >
            <View style={styles.profileIcon}>
              <Icon name="user" size={20} color="white" />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.header}>
          <Text style={styles.title}>SimilarSense</Text>
          <Text style={styles.subtitle}>Check similar queries</Text>
        </View>

        {isDropdownVisible && (
          <View style={styles.dropdown}>
            <Text style={styles.dropdownItem}>
              {user ? user.username : "user not available"}
            </Text>
            <TouchableOpacity>
              <Text
                style={styles.dropdownItem}
                onPress={() => navigation.replace("LogIn")}
              >
                Logout
              </Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter first query..."
            placeholderTextColor="#B0B0B0"
            multiline
            value={sentence1}
            onChangeText={setSentence1}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter second query..."
            placeholderTextColor="#B0B0B0"
            multiline
            value={sentence2}
            onChangeText={setSentence2}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleCheckSimilarity}>
          <Text style={styles.buttonText}>
            {loading ? "Checking..." : "Check Similarity"}
          </Text>
        </TouchableOpacity>

        {similarityResult && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>
              {similarityResult.result === "Duplicate"
                ? "The sentences are semantically same ✅"
                : "The sentences are semantically different ❌"}
            </Text>
          </View>
        )}

        <View style={styles.responseCountContainer}>
          <Text style={styles.responseCountText}>
            Number of responses: {responseCount}
          </Text>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffedd8",
    paddingHorizontal: 20,
  },
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    width: "100%",
    height: 100,
    alignItems: "center",
    marginBottom: 30,
  },
  profileIconWrapper: {
    position: "relative",
    right: -140,
    top: -120,
  },
  profileIcon: {
    width: 40,
    height: 40,
    backgroundColor: "#bc8a5f",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#a47148",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#a47148",
  },
  subtitle: {
    fontSize: 18,
    color: "#a47148",
    marginTop: 10,
  },
  dropdown: {
    position: "absolute",
    right: 20,
    top: 70,
    backgroundColor: "#a47148",
    borderRadius: 8,
    padding: 10,
    width: 150,
  },
  dropdownItem: {
    color: "#FFFFFF",
    fontSize: 16,
    paddingVertical: 10,
    textAlign: "center",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 30,
  },
  input: {
    backgroundColor: "#ffff",
    color: "#a47148",
    borderColor: "#a47148",
    borderWidth: 1,
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#ffff",
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#a47148",
  },
  buttonText: {
    color: "#a47148",
    fontSize: 18,
    fontWeight: "bold",
  },
  resultContainer: {
    marginTop: 20,
    backgroundColor: "#2C2C2C",
    padding: 15,
    borderRadius: 8,
  },
  resultText: {
    fontSize: 18,
    color: "#F1F1F1",
    textAlign: "center",
  },
  responseCountContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 30,
  },
  responseCountText: {
    fontSize: 18,
    color: "#a47148",
  },
});
