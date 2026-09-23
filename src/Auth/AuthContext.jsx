import { createContext, useContext, useState, useEffect, useCallback } from "react";

const AuthContext = createContext();
const CLAVE_USUARIO = "usuario_sesion";

function leerUsuarioDeStorage() {
  try {
    const data = localStorage.getItem(CLAVE_USUARIO);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(leerUsuarioDeStorage());

  useEffect(() => {
    if (usuario) {
      localStorage.setItem(CLAVE_USUARIO, JSON.stringify(usuario));
    } else {
      localStorage.removeItem(CLAVE_USUARIO);
    }
  }, [usuario]);

  const login = useCallback((nombre, email) => {
    const datosUsuario = { nombre, email };
    setUsuario(datosUsuario);
  }, []);

  const logout = useCallback(() => {
    setUsuario(null);
  }, []);

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
