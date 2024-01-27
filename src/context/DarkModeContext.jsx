import React, { createContext, useState } from "react";

const DarkModeContext = createContext({});

const DarkModeProvider = ({ children }) => {
  const [darkModeActive, setDarkModeActive] =
    useState(false);

  const toggleDarkMode = () => {
    document
      .querySelector(":root")
      .classList.toggle("dark-mode");
    setDarkModeActive((bool) => !bool);
  };

  const values = {
    toggleDarkMode,
    darkModeActive,
  };

  return (
    <DarkModeContext.Provider value={values}>
      {children}
    </DarkModeContext.Provider>
  );
};

export default DarkModeProvider;
