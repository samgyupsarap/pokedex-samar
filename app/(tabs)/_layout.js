// Layout.js
import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { ThemesProvider, useThemes } from "../src/Theme"; // Ensure correct path
import { FavoritesProvider } from "./FavoriteContext"; // Ensure correct path

function TabNavigator() {
  const { isDarkTheme } = useThemes();

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: isDarkTheme ? "#333" : "#fff",
        },
        tabBarActiveTintColor: isDarkTheme ? "#fff" : "#000",
        tabBarInactiveTintColor: isDarkTheme ? "#888" : "#666",
      }}
    >
      <Tabs.Screen
        name="pokemon"
        options={{
          title: "All Pokemons",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorites",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "App Settings",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

export default function Layout() {
  return (
    <ThemesProvider>
      <FavoritesProvider>
        <TabNavigator />
      </FavoritesProvider>
    </ThemesProvider>
  );
}
