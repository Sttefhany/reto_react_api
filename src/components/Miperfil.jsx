import React from 'react';
import './Miperfil.css';
import { useAuth } from '../Auth/AuthContext';
import mimagen from '../assets/calvin.webp'; // O la imagen que desees

export default function Miperfil() {
  const { usuario } = useAuth(); // Lee el usuario logueado de tu AuthContext

  return (
    <div className="Miperfil-container">
      <div className="Miperfil">
        {/* Muestra el nombre real de la sesión activa */}
        <h1>Mi perfil - {usuario?.nombre || 'Usuario'}</h1>
        
        <img 
          src={mimagen} 
          alt={usuario?.nombre || 'Perfil'} 
          className="perfil-imagen" 
        />
        
        <p>Email: {usuario?.email || 'Sin correo'}</p>
        <p className="mt-2 text-sm text-slate-500">Este es mi primer componente</p>
      </div>
    </div>
  );
}