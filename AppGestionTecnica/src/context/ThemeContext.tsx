import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

const lightColors = {
  primary: '#173B57', primaryLight: '#2F6690', secondary: '#4F9D69',
  background: '#F4F7FA', surface: '#FFFFFF', text: '#1F2933',
  textSecondary: '#64748B', border: '#D8E0E8', low: '#2E8B57',
  medium: '#D99A00', high: '#E66A2C', critical: '#C62828',
  pending: '#D99A00', inProgress: '#2F80ED', completed: '#2E8B57',
  danger: '#C62828', white: '#FFFFFF',
};

const darkColors: ThemeColors = {
  ...lightColors,
  primary: '#6FB3D2', primaryLight: '#8DC7E0', secondary: '#65B97B',
  background: '#101820', surface: '#1C2731', text: '#F1F5F9',
  textSecondary: '#B2C0CC', border: '#3A4A58', white: '#FFFFFF',
};

export type ThemeColors = typeof lightColors;
type ThemeContextType = {
  isDark: boolean;
  colors: ThemeColors;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('theme').then((value) => setIsDark(value === 'dark'));
  }, []);

  function toggleTheme() {
    setIsDark((current) => {
      const next = !current;
      AsyncStorage.setItem('theme', next ? 'dark' : 'light');
      return next;
    });
  }

  return (
    <ThemeContext.Provider value={{ isDark, colors: isDark ? darkColors : lightColors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme debe usarse dentro de ThemeProvider');
  return context;
}
