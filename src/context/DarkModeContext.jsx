import { createContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

export const DarkModeContext = createContext({});

const DarkModeProvider = ({ children }) => {
  const prefersDarkmode =
    (window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)")
        .matches) ||
    false;
  const [darkModeActive, setDarkModeActive] =
    useLocalStorageState(prefersDarkmode, "dark-mode");

  useEffect(() => {
    if (darkModeActive) {
      document
        .querySelector(":root")
        .classList.add("dark-mode");
    }
  }, [darkModeActive]);

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
