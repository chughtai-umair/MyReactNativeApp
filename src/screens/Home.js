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
import axios from "axios"; // Import axios

const Home = ({ navigation }) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [responseCount, setResponseCount] = useState(0);
  const [sentence1, setSentence1] = useState(""); // State for first input
  const [sentence2, setSentence2] = useState(""); // State for second input
  const [similarityResult, setSimilarityResult] = useState(null); // Store API response
  const [loading, setLoading] = useState(false); // Loading state

  const API_URL = "https://82d2-59-103-32-34.ngrok-free.app/predict"; // Replace with your ML model API URL

  const insets = useSafeAreaInsets();

  useEffect(() => {
    StatusBar.setBarStyle("dark-content");
    StatusBar.setBackgroundColor("#FFFFFF");
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
              <Icon name="user" size={20} color="#000000" />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.header}>
          <Text style={styles.title}>SimilarSense</Text>
          <Text style={styles.subtitle}>Check similar queries</Text>
        </View>

        {isDropdownVisible && (
          <View style={styles.dropdown}>
            <Text style={styles.dropdownItem}>Username</Text>
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
    backgroundColor: "#212121",
    paddingHorizontal: 20,
  },
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  header: {
    width: "100%",
    height: 100,
    alignItems: "center",
    marginBottom: 30,
  },
  profileIconWrapper: {
    position: "relative",
    right: -130,
    top: -120,
  },
  profileIcon: {
    width: 40,
    height: 40,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#000000",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#F1F1F1",
  },
  subtitle: {
    fontSize: 18,
    color: "#B0B0B0",
    marginTop: 10,
  },
  dropdown: {
    position: "absolute",
    right: 20,
    top: 70,
    backgroundColor: "#333333",
    borderRadius: 8,
    padding: 10,
    width: 150,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 5 },
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
    backgroundColor: "#2C2C2C",
    color: "#F1F1F1",
    borderColor: "#444444",
    borderWidth: 1,
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#F1F1F1",
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#444444",
  },
  buttonText: {
    color: "#212121",
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
    color: "#F1F1F1",
  },
});
