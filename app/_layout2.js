import React from 'react';
import { Stack } from 'expo-router';
import { ThemesProvider } from './src/Theme';
import { TypeColorProvider } from './src/TypeColor'; 

export default function ProfileLayout() {
  return (
    <ThemesProvider>
      <TypeColorProvider>
        <Stack>
          <Stack.Screen
            name="pokemon"
            options={{
              title: 'Pokémon',
              headerShown: true,
            }}
          />
          <Stack.Screen
            name="pokemondetails"
            options={{
              title: 'Details',
              headerShown: true,
            }}
          />
        </Stack>
      </TypeColorProvider>
    </ThemesProvider>
  );
}
