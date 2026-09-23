import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [tema, setTema] = useState("claro");

  const cambiarTema = () => {
    setTema((actual) => (actual === "claro" ? "oscuro" : "claro"));
  };

  useEffect(() => {
    const root = document.documentElement;
    if (tema === "oscuro") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [tema]);

  return (
    <ThemeContext.Provider value={{ tema, cambiarTema }}>
      {children}
    </ThemeContext.Provider>
  );
};

export function useTheme() {
  return useContext(ThemeContext);
}