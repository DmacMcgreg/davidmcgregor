import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'sovereign' | 'neural-lux';

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = 'theme-preference';
const DEFAULT_THEME: Theme = 'sovereign';

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return DEFAULT_THEME;

  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'sovereign' || stored === 'neural-lux') {
    return stored;
  }
  return DEFAULT_THEME;
}

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'sovereign' ? 'neural-lux' : 'sovereign'));
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
