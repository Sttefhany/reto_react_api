import { Link } from "react-router-dom";
import { Sun, Moon, ShoppingCart } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useCart } from "../../context/CartContext";
import Navbar from "./Navbar";

import "./Layout.css";

// 1. Importa la imagen de tu logo desde assets (ajusta el nombre del archivo si es .png, .svg, etc.)
import logoImg from "../../assets/12019-sea-2361247_1920.jpg";

function Header() {
  const { tema, cambiarTema } = useTheme();
  const { totalItems, toggleCart } = useCart();

  return (
    <header className="header flex items-center justify-between px-6 py-4 bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white transition-colors duration-300">
      <div className="logo">
        <Link to="/" className="flex items-center gap-2">
          {/* 2. Imagen del logo con tamaño ajustado */}
          <img 
            src={logoImg} 
            alt="Logo Vida Marina" 
            className="h-8 w-auto object-contain" 
          />
          <h2 className="text-xl font-bold">¡Hostias tias tio!, voy nadando</h2>
        </Link>
      </div>

      <Navbar />

      <div className="login-container flex items-center gap-3">
        {/* Botón flotante para abrir el panel del carrito */}
        <button
          type="button"
          onClick={toggleCart}
          title="Ver carrito de compras"
          className="relative p-2.5 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-100 hover:opacity-80 transition-all cursor-pointer flex items-center justify-center"
        >
          <ShoppingCart size={20} />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-rose-500 text-white font-bold text-xs w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
              {totalItems}
            </span>
          )}
        </button>

        {/* Botón de cambio de tema */}
        <button
          type="button"
          onClick={cambiarTema}
          title={tema === "claro" ? "Cambiar a modo oscuro" : "Cambiar a modo claro"}
          className="p-2.5 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-yellow-400 hover:opacity-80 transition-all cursor-pointer flex items-center justify-center"
        >
          {tema === "claro" ? (
            <Moon size={20} className="text-slate-700" />
          ) : (
            <Sun size={20} className="text-yellow-400" />
          )}
        </button>

        <Login />
      </div>
    </header>
  );
}

export default Header;