import React, { createContext, useState } from "react";

export const themeDataContext = createContext();

const ThemeContext = ({ children }) => {
  const [dark, setDark] = useState(false);

  const toggleTheme = () => {
    setDark(!dark);
    document.documentElement.classList.toggle("dark");
  };
  const value = {
    dark,
    setDark,
    toggleTheme,
  };
  return (
    <div>
      <themeDataContext.Provider value={value}>
        {children}
      </themeDataContext.Provider>
    </div>
  );
};

export default ThemeContext;
