import { createContext, useContext, useState, useEffect, useCallback } from 'react';

// 1. Creación del contexto global del carrito
const cartContext = createContext();
const CLAVE_CARRITO = "carrito";

/**
 * Función auxiliar para limpiar y normalizar precios a enteros (COP).
 * Si llega "16.692", "$16.692" o 16.692, lo convierte correctamente a 16692.
 */
function parsePrecio(val) {
  if (typeof val === 'number') {
    // Si es un número decimal menor a 1000 (ej. 16.692), se asume que fue un float mal parseado
    return val < 1000 ? Math.round(val * 1000) : Math.round(val);
  }
  if (!val) return 15000;
  // Si viene como string, remueve todo lo que no sea dígito
  const numeroLimpio = String(val).replace(/[^0-9]/g, '');
  return parseInt(numeroLimpio, 10) || 15000;
}

/**
 * Función auxiliar para inicializar el estado del carrito.
 * Lee y parsea los datos guardados en LocalStorage si existen.
 */
function leerCarritoDeStorage() {
  try {
    const data = localStorage.getItem(CLAVE_CARRITO);
    if (!data) return [];
    
    const parsedData = JSON.parse(data);
    // Aseguramos que los ítems ya almacenados tengan el precio bien normalizado
    return parsedData.map((item) => ({
      ...item,
      precio: parsePrecio(item.precio),
    }));
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  // Estado local del carrito inicializado desde LocalStorage
  const [carrito, setCarrito] = useState(leerCarritoDeStorage());
  
  // Estado para controlar la apertura/cierre del drawer (carrito lateral)
  const [isCartOpen, setIsCartOpen] = useState(false);

  // EFECTO DE PERSISTENCIA: Sincroniza el estado del carrito con LocalStorage en cada cambio
  useEffect(() => {
    localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
  }, [carrito]);

  // Alterna la visibilidad del modal/drawer del carrito
  const toggleCart = useCallback(() => {
    setIsCartOpen((prev) => !prev);
  }, []);

  /**
   * Agrega un personaje/producto al carrito.
   * Si el producto ya existe en la lista, incrementa su cantidad.
   */
  const agregarAlCarrito = useCallback((personaje) => {
    setCarrito((prev) => {
      const yaExiste = prev.find((item) => item.id === personaje.id);

      if (yaExiste) {
        return prev.map((item) =>
          item.id === personaje.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }

      return [
        ...prev,
        {
          id: personaje.id,
          name: personaje.name,
          image: personaje.image,
          precio: parsePrecio(personaje.precio),
          episodio: personaje.primeraAparicion || "Temporada 1",
          cantidad: 1,
        },
      ];
    });
  }, []);

  /**
   * Modifica la cantidad de un ítem existente en el carrito.
   * Mantiene una cantidad mínima de 1.
   */
  const cambiarCantidad = useCallback((id, nuevaCantidad) => {
    if (nuevaCantidad <= 0) return; // Mantiene mínimo 1 elemento al decrementar

    setCarrito((prev) =>
      prev.map((item) => (item.id === id ? { ...item, cantidad: nuevaCantidad } : item))
    );
  }, []);

  /**
   * Elimina un producto específico del carrito por su ID.
   */
  const eliminarDelCarrito = useCallback((id) => {
    setCarrito((prev) => prev.filter((item) => item.id !== id));
  }, []);

  /**
   * Vacía el carrito por completo y elimina la clave de LocalStorage.
   */
  const vaciarCarrito = useCallback(() => {
    setCarrito([]);
    localStorage.removeItem(CLAVE_CARRITO);
  }, []);

  // --- CÁLCULOS FINANCIEROS Y DE LÓGICA DE NEGOCIO --- //

  // Cantidad total de ítems acumulados (sumando las cantidades individuales)
  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  // 1. TOTAL A PAGAR: Suma exacta del precio de los productos multiplicados por su cantidad (IVA Incluido)
  const totalPagar = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  // 2. BASE GRAVABLE / SUBTOTAL: Se desglosa dividiendo entre 1.19 (evita cobrar IVA sobre IVA)
  const subtotal = totalPagar / 1.19;

  // 3. IVA (19% INCLUIDO): Diferencia entre el total a pagar y la base gravable
  const iva = totalPagar - subtotal;

  return (
    <cartContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        cambiarCantidad,
        eliminarDelCarrito,
        vaciarCarrito,
        totalItems,
        subtotal,
        iva,
        totalPagar,
        isCartOpen,
        toggleCart,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}

/**
 * Custom Hook para consumir el contexto del carrito fácilmente en cualquier componente
 */
export function useCart() {
  return useContext(cartContext);
}