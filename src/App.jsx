import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { CartProvider } from "./context/CartContext";
import { AuthProvider, useAuth } from "./Auth/AuthContext"; // Usamos tu AuthContext
import Layout from "./Componentes/Layout/Layout";
import Inicio from "./pages/Inicio";
import Escenario from "./pages/Escenario/Escenario";
import Productos from "./pages/Catalogo/Productos";
import Contacto from "./pages/Contacto/Contacto";
import Miperfil from "./components/Miperfil";

// Componente para Proteger la Ruta de Perfil
function RutaProtegida({ children }) {
  const { usuario } = useAuth(); 

  // Si NO hay usuario autenticado (se cerró la sesión), lo redirige al inicio o al login
  if (!usuario) {
    return <Navigate to="/" replace />;
  }

  return children;
}

function AppContent() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/escenario" element={<Escenario />} />
        <Route path="/catalogo" element={<Productos />} />
        <Route path="/contacto" element={<Contacto />} />
        
        {/* Ruta Protegida: Si cierra sesión, se sale automáticamente */}
        <Route
          path="/perfil"
          element={
            <RutaProtegida>
              <Miperfil />
            </RutaProtegida>
          }
        />
      </Routes>
    </Layout>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;