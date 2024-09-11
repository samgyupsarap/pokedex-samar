import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useFavorites } from "./FavoriteContext"; // Import your FavoritesContext
import { useNavigation } from "@react-navigation/native"; // Import useNavigation
import { useThemes } from "../src/Theme"; // Import useThemes from Theme context

export default function Pokemon() {
  const [pokemonData, setPokemonData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // State for error handling
  const [selectedType, setSelectedType] = useState(null); // State for filtering by type
  const { favorites, toggleFavorite } = useFavorites(); // Use the context to access favorites
  const navigation = useNavigation(); // Use navigation
  const { isDarkTheme } = useThemes(); // Get theme from context

  useEffect(() => {
    fetch("http://192.168.100.10:9090/pokemon", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setPokemonData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setError("Failed to load Pokémon data.");
        setLoading(false);
      });
  }, []);

  // Get unique Pokémon types
  const uniqueTypes = [
    ...new Set(pokemonData.flatMap((pokemon) => pokemon.type)),
  ];

  // Filter Pokémon by the selected type
  const filteredPokemon = selectedType
    ? pokemonData.filter((pokemon) => pokemon.type.includes(selectedType))
    : pokemonData;

  if (loading) {
    return (
      <View
        style={[
          styles.loadingContainer,
          { backgroundColor: isDarkTheme ? "#000" : "#fff" },
        ]}
      >
        <Text style={{ color: isDarkTheme ? "#fff" : "#000" }}>
          Loading Pokémon...
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View
        style={[
          styles.loadingContainer,
          { backgroundColor: isDarkTheme ? "#000" : "#fff" },
        ]}
      >
        <Text style={{ color: isDarkTheme ? "#fff" : "#000" }}>{error}</Text>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkTheme ? "#333" : "#fff" },
      ]}
    >
      {/* Type filter section */}
      <ScrollView horizontal style={styles.typeFilterContainer}>
        <TouchableOpacity
          onPress={() => setSelectedType(null)}
          style={[
            styles.typeButton,
            !selectedType && styles.selectedTypeButton,
            { backgroundColor: isDarkTheme ? "#555" : "#ddd" },
          ]}
        >
          <Text
            style={[
              styles.typeButtonText,
              { color: isDarkTheme ? "#fff" : "#000" },
            ]}
          >
            All
          </Text>
        </TouchableOpacity>
        {uniqueTypes.map((type) => (
          <TouchableOpacity
            key={type}
            onPress={() => setSelectedType(type)}
            style={[
              styles.typeButton,
              selectedType === type && styles.selectedTypeButton,
              { backgroundColor: isDarkTheme ? "#555" : "#ddd" },
            ]}
          >
            <Text
              style={[
                styles.typeButtonText,
                { color: isDarkTheme ? "#fff" : "#000" },
              ]}
            >
              {type}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        data={filteredPokemon}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("pokemondetails", { pokemon: item })
            }
            style={[
              styles.pokemonCard,
              { backgroundColor: isDarkTheme ? "#444" : "#f9f9f9" },
            ]}
          >
            <Text
              style={[
                styles.pokemonName,
                { color: isDarkTheme ? "#fff" : "#000" },
              ]}
            >
              {item.name.english}
            </Text>
            <Image
              source={{ uri: item.image.hires }}
              style={styles.pokemonImage}
            />
            <Text
              style={[
                styles.pokemonType,
                { color: isDarkTheme ? "#ccc" : "#555" },
              ]}
            >
              Type: {item.type.join(", ")}
            </Text>
            {/* Button to toggle favorite */}
            <TouchableOpacity
              style={[
                styles.favoriteButton,
                { backgroundColor: isDarkTheme ? "#666" : "#007bff" },
              ]}
              onPress={() => toggleFavorite(item.id)}
            >
              <Text style={styles.buttonText}>
                {favorites.includes(item.id)
                  ? "Remove from Favorites"
                  : "Add to Favorites"}
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  typeFilterContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  typeButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  selectedTypeButton: {
    backgroundColor: "#007bff",
  },
  typeButtonText: {
    fontWeight: "bold",
  },
  pokemonCard: {
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    alignItems: "center",
    borderColor: "#ddd",
    borderWidth: 1,
  },
  pokemonName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  pokemonImage: {
    width: 150,
    height: 150,
  },
  pokemonType: {
    marginTop: 10,
    fontSize: 16,
  },
  favoriteButton: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
