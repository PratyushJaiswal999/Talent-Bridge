import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // Check local storage for preference, otherwise default to "synthwave"
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("talentbridge-theme") || "light";
  });

  useEffect(() => {
    // Apply the theme to the <html> document element for DaisyUI
    document.documentElement.setAttribute("data-theme", theme);
    // Persist user preference
    localStorage.setItem("talentbridge-theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook to use the theme context
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
