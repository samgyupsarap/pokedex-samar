import React, { createContext, useContext } from "react";

const TypeColorContext = createContext();

export function TypeColorProvider({ children }) {
  const getTypeColor = (type) => {
    console.log(`Getting color for type: ${type}`);
    switch (type) {
      case "Grass":
        return "#4caf50";
      case "Water":
        return "#2196f3";
      case "Fire":
        return "#f44336";
      case "Electric":
        return "#ffeb3b";
      case "Psychic":
        return "#e91e63";
      default:
        return "#545151";
    }
  };

  return (
    <TypeColorContext.Provider value={{ getTypeColor }}>
      {children}
    </TypeColorContext.Provider>
  );
}

export function useTypeColor() {
  const context = useContext(TypeColorContext);
  if (context === undefined) {
    throw new Error('useTypeColor must be used within a TypeColorProvider');
  }
  return context;
}
