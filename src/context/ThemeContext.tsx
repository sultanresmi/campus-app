import React, { createContext, useContext, useState, ReactNode } from 'react';

export type FontSizeOption = 'small' | 'medium' | 'large';

interface ThemeColors {
  background: string;
  cardBackground: string;
  headerBackground: string;
  textPrimary: string;
  textSecondary: string;
  border: string;
  primary: string;
  tabBar: string;
}

const lightColors: ThemeColors = {
  background: '#f8fafc',
  cardBackground: '#ffffff',
  headerBackground: '#1d61d2',
  textPrimary: '#0f172a',
  textSecondary: '#64748b',
  border: '#e2e8f0',
  primary: '#1d61d2',
  tabBar: '#ffffff',
};

const darkColors: ThemeColors = {
  background: '#0f172a',
  cardBackground: '#1e293b',
  headerBackground: '#091e42',
  textPrimary: '#f8fafc',
  textSecondary: '#94a3b8',
  border: '#334155',
  primary: '#38bdf8',
  tabBar: '#1e293b',
};

interface ThemeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  fontSize: FontSizeOption;
  setFontSize: (size: FontSizeOption) => void;
  fontScale: number;
  colors: ThemeColors;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [fontSize, setFontSize] = useState<FontSizeOption>('medium');

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  const fontScale = fontSize === 'small' ? 0.85 : fontSize === 'large' ? 1.15 : 1;
  const colors = isDarkMode ? darkColors : lightColors;

  return (
    <ThemeContext.Provider
      value={{
        isDarkMode,
        toggleDarkMode,
        fontSize,
        setFontSize,
        fontScale,
        colors,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};