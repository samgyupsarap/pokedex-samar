import React, { useState, useEffect } from "react";
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { useFavorites } from "./FavoriteContext";
import { useThemes } from "../src/Theme"; // Import useThemes from Theme context

export default function Favorites() {
  const { favorites, toggleFavorite } = useFavorites();
  const [pokemonData, setPokemonData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isDarkTheme } = useThemes(); // Get theme from context

  useEffect(() => {
    fetch("https://pokemon-api-nssw.onrender.com/pokemon", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const uniquePokemon = removeDuplicates(data);
        setPokemonData(uniquePokemon);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  }, []);

  // Function to remove duplicates based on the ID
  const removeDuplicates = (data) => {
    const seen = new Set();
    return data.filter((pokemon) => {
      const isDuplicate = seen.has(pokemon.id);
      seen.add(pokemon.id);
      return !isDuplicate;
    });
  };

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: isDarkTheme ? "#000" : "#fff" }]}>
        <Text style={{ color: isDarkTheme ? "#fff" : "#000" }}>Loading favorites...</Text>
      </View>
    );
  }

  // Filter the Pokémon list based on the favorite IDs
  const favoritePokemons = pokemonData.filter((pokemon) => favorites.includes(pokemon.id));

  if (favoritePokemons.length === 0) {
    return (
      <View style={[styles.container, { backgroundColor: isDarkTheme ? "#333" : "#fff" }]}>
        <Text style={[styles.noFavoritesText, { color: isDarkTheme ? "#fff" : "#000" }]}>
          No Pokémon added to favorites yet.
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: isDarkTheme ? "#333" : "#fff" }]}>
      <FlatList
        data={favoritePokemons}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={[styles.pokemonCard, { backgroundColor: isDarkTheme ? "#444" : "#f9f9f9" }]}>
            <Text style={[styles.pokemonName, { color: isDarkTheme ? "#fff" : "#000" }]}>
              {item.name.english}
            </Text>
            <Image source={{ uri: item.image.hires }} style={styles.pokemonImage} />
            <Text style={[styles.pokemonType, { color: isDarkTheme ? "#ccc" : "#555" }]}>
              Type: {item.type.join(", ")}
            </Text>
            <TouchableOpacity
              style={[styles.favoriteButton, { backgroundColor: isDarkTheme ? "#ff6666" : "#ff4d4d" }]}
              onPress={() => toggleFavorite(item.id)}
            >
              <Text style={styles.buttonText}>Remove from Favorites</Text>
            </TouchableOpacity>
          </View>
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
  noFavoritesText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
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
