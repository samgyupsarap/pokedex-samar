import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";

const typeColorMap = {
  Grass: "#a8d5ba", // Light green
  Water: "#a3c9f1", // Light blue
  Fire: "#f8b5b0", // Light red
  Electric: "#fef7a4", // Light yellow
  Psychic: "#f8b1c6", // Light pink

};

export default function PokemonDetails() {
  const route = useRoute();
  const { pokemon } = route.params;


  const backgroundColor = typeColorMap[pokemon.type[0]] || "#f0f0f0"; 

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor }]}>
      <Text style={styles.pokemonName}>{pokemon.name.english}</Text>
      <Image
        source={{ uri: pokemon.image.hires }}
        style={styles.pokemonImage}
      />
      <Text style={styles.pokemonType}>Type: {pokemon.type.join(", ")}</Text>

      {/* Display additional details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.detailLabel}>Height:</Text>
        <Text style={styles.detailValue}>{pokemon.profile.height}</Text>

        <Text style={styles.detailLabel}>Weight:</Text>
        <Text style={styles.detailValue}>{pokemon.profile.weight}</Text>

        <Text style={styles.detailLabel}>Abilities:</Text>
        {pokemon.profile.ability.map(([ability, isHidden], index) => (
          <Text key={index} style={styles.detailValue}>
            {ability} {isHidden ? "(Hidden)" : ""}
          </Text>
        ))}

        <Text style={styles.detailLabel}>Gender Ratio:</Text>
        <Text style={styles.detailValue}>{pokemon.profile.gender}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  pokemonName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  pokemonImage: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  pokemonType: {
    fontSize: 18,
    color: "#555",
    marginBottom: 10,
  },
  detailsContainer: {
    marginTop: 20,
    width: "100%",
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 5,
  },
  detailValue: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
});
