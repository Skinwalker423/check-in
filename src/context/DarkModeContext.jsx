import {
  createContext,
  useContext,
  useEffect,
} from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

export const DarkModeContext = createContext({});

const DarkModeProvider = ({ children }) => {
  const [darkModeActive, setDarkModeActive] =
    useLocalStorageState(false, "dark-mode");

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

const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (context === undefined) {
    throw new Error(
      "DarkmodeContext was used outside of provider"
    );
  }
  return context;
};

export { DarkModeProvider, useDarkMode };
