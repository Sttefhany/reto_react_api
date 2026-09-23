import { useState } from "react";
import { User, LogOut, X, LogIn, Mail, AlertTriangle } from "lucide-react";
import { useAuth } from "./AuthContext";
import { useCart } from "./CartContext"; // <-- 1. IMPORTAR USECART

export default function Login() {
  const { usuario, login, logout } = useAuth();
  const { vaciarCarrito } = useCart(); // <-- 2. OBTENER VACIARCARRITO

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isConfirmLogoutOpen, setIsConfirmLogoutOpen] = useState(false);

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!nombre.trim() || !email.trim()) {
      alert("Por favor completa tanto el nombre como el correo electrónico.");
      return;
    }

    login(nombre, email);
    setNombre("");
    setEmail("");
    setIsLoginModalOpen(false);
  };

  const handleConfirmLogout = () => {
    logout();
    vaciarCarrito(); // <-- 3. VACIAR EL CARRITO AL CERRAR SESIÓN
    setIsConfirmLogoutOpen(false);
    setIsProfileModalOpen(false);
  };

  // ... (resto de tu componente Login.jsx queda exactamente igual)
  if (usuario) {
    return (
      <>
        {/* Ícono/Botón de Usuario en el Header */}
        <button
          type="button"
          onClick={() => setIsProfileModalOpen(true)}
          className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 px-3.5 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-white"
          title="Ver perfil de usuario"
        >
          <div className="w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xs">
            {usuario.nombre.charAt(0).toUpperCase()}
          </div>
          <span className="font-semibold">{usuario.nombre}</span>
        </button>

        {/* Modal Perfil de Usuario */}
        {isProfileModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="relative w-full max-w-sm bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-6 text-slate-800 dark:text-white border border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setIsProfileModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>

              <div className="flex flex-col items-center text-center my-4">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mb-3">
                  <User size={32} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {usuario.nombre}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1">
                  <Mail size={14} /> {usuario.email}
                </p>
              </div>

              <div className="mt-6">
                <button
                  type="button"
                  onClick={() => setIsConfirmLogoutOpen(true)}
                  className="w-full py-2.5 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <LogOut size={18} />
                  <span>Cerrar Sesión</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal Confirmación Cerrar Sesión */}
        {isConfirmLogoutOpen && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
            <div className="relative w-full max-w-sm bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-6 text-center border border-slate-200 dark:border-slate-800">
              <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 rounded-full flex items-center justify-center mx-auto mb-3">
                <AlertTriangle size={24} />
              </div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                ¿Cerrar sesión?
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
                ¿Estás seguro de que deseas salir?
              </p>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsConfirmLogoutOpen(false)}
                  className="w-1/2 py-2.5 bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-white font-semibold rounded-xl text-sm cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleConfirmLogout}
                  className="w-1/2 py-2.5 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-xl text-sm shadow-md cursor-pointer"
                >
                  Sí, salir
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsLoginModalOpen(true)}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-xl text-sm transition-all shadow-md cursor-pointer"
      >
        <LogIn size={18} />
        <span>Iniciar sesión</span>
      </button>

      {/* Modal Formulario Iniciar Sesión */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 text-slate-800 border border-slate-100">
            {/* Botón Cerrar X */}
            <button
              type="button"
              onClick={() => setIsLoginModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl text-white bg-blue-600 hover:bg-blue-700 transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>

            {/* Cabecera */}
            <div className="mb-6 text-left pr-8">
              <h3 className="text-2xl font-bold text-slate-900">
                Iniciar Sesión
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Ingresa tu nombre y correo para identificarte.
              </p>
            </div>

            {/* Formulario en columna bien estructurado */}
            <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              
              {/* Campo Nombre */}
              <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', width: '100%' }}>
                <label className="text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <User size={15} className="text-blue-600" />
                  <span>Nombre</span>
                  <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Tu nombre aquí..."
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  style={{ width: '100%', boxSizing: 'border-box' }}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-sm outline-none transition-all placeholder:text-slate-400 font-medium"
                />
              </div>

              {/* Campo Correo Obligatorio */}
              <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', width: '100%' }}>
                <label className="text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <Mail size={15} className="text-blue-600" />
                  <span>Correo electrónico</span>
                  <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="ejemplo@correo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ width: '100%', boxSizing: 'border-box' }}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-sm outline-none transition-all placeholder:text-slate-400 font-medium"
                />
              </div>

              {/* Botón Ingresar */}
              <button
                type="submit"
                style={{ width: '100%' }}
                className="w-full mt-2 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-md hover:shadow-blue-500/25 cursor-pointer text-sm tracking-wide"
              >
                Ingresar
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}