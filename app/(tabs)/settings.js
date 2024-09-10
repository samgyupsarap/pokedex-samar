// Settings.js
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useThemes } from "../src/Theme"; // Ensure this path is correct
import { Link, router } from "expo-router";

export default function Settings() {
  const { isDarkTheme, toggleTheme } = useThemes();

  return (
    <View style={[styles.container, { backgroundColor: isDarkTheme ? "#000" : "#fff" }]}>
      <Text style={[styles.title, { color: isDarkTheme ? "#fff" : "#000" }]}>App Settings</Text>
      <Text style={{ color: isDarkTheme ? "#fff" : "#000" }}>
        Current Theme: {isDarkTheme ? "Dark" : "Light"}
      </Text>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: isDarkTheme ? "#444" : "#ddd" }]}
        onPress={toggleTheme}
      >
        <Text style={[styles.buttonText, { color: isDarkTheme ? "#fff" : "#000" }]}>Toggle Theme</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: isDarkTheme ? "#444" : "#ddd" }]}
        onPress={() => router.push("/")}
      >
        <Text style={[styles.buttonText, { color: isDarkTheme ? "#fff" : "#000" }]}>Go to Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
