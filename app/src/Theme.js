// src/Theme.js
import React, { createContext, useContext, useState } from 'react';

const ThemesContext = createContext();

export function ThemesProvider({ children }) {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme(prev => !prev);
  };

  return (
    <ThemesContext.Provider value={{ isDarkTheme, toggleTheme }}>
      {children}
    </ThemesContext.Provider>
  );
}

export function useThemes() {
  const context = useContext(ThemesContext);
  if (context === undefined) {
    throw new Error('useThemes must be used within a ThemesProvider');
  }
  return context;
}
