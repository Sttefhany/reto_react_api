import { useState } from "react";
import { X, Trash2, ShoppingBag, RotateCcw, PackageCheck, CheckCircle2 } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../Auth/AuthContext";

export default function CartDrawer() {
  const {
    carrito,
    isCartOpen,
    toggleCart,
    cambiarCantidad,
    eliminarDelCarrito,
    vaciarCarrito,
    subtotal,
    iva,
    totalPagar,
  } = useCart();

  const { usuario } = useAuth();

  // Estados locales para controlar los modales de confirmación y éxito
  const [isConfirmVaciarOpen, setIsConfirmVaciarOpen] = useState(false);
  const [isConfirmPedidoOpen, setIsConfirmPedidoOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  if (!isCartOpen) return null;

  // Manejador para validar el clic en "Pagar Pedido"
  const handleAbrirModalPagar = () => {
    if (!usuario) {
      alert("¡Debes iniciar sesión para poder realizar el pago de tu pedido!");
      return;
    }
    setIsConfirmPedidoOpen(true);
  };

  // Manejador para vaciar el carrito
  const handleConfirmarVaciar = () => {
    vaciarCarrito();
    setIsConfirmVaciarOpen(false);
  };

  // Manejador para procesar el pago y mostrar modal de éxito
  const handleConfirmarPedido = () => {
    vaciarCarrito();
    setIsConfirmPedidoOpen(false);
    setIsSuccessModalOpen(true); // Abre el modal de éxito de la compra
  };

  // Manejador para cerrar todo después de ver la confirmación de pago
  const handleCerrarExito = () => {
    setIsSuccessModalOpen(false);
    toggleCart(); // Cierra el drawer completo
  };

  // Función de utilidad para formatear la moneda colombiana
  const formatCOP = (valor) =>
    valor.toLocaleString("es-CO", {
      maximumFractionDigits: 0,
    });

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Fondo semitransparente */}
        <div
          className="absolute inset-0 bg-black/50 transition-opacity"
          onClick={toggleCart}
        />

        {/* Contenedor del panel derecho */}
        <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
          <div className="w-screen max-w-md bg-white dark:bg-slate-900 shadow-2xl flex flex-col">
            {/* Header del Panel */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <ShoppingBag className="text-cyan-500" size={22} />
                <h2 className="text-lg font-bold text-slate-800 dark:text-white">
                  Tu Carrito
                </h2>
              </div>
              <button
                type="button"
                onClick={toggleCart}
                className="p-2 text-slate-500 hover:text-slate-800 dark:hover:text-white rounded-full cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Lista de productos */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {carrito.length === 0 ? (
                <div className="text-center py-20 text-slate-400">
                  <ShoppingBag size={48} className="mx-auto mb-3 opacity-40" />
                  <p>Tu carrito está vacío</p>
                </div>
              ) : (
                carrito.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-200 dark:border-slate-700"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-slate-800 dark:text-slate-100 truncate text-sm">
                        {item.name}
                      </h4>
                      <p className="text-cyan-600 dark:text-cyan-400 font-bold text-sm">
                        ${formatCOP(item.precio * item.cantidad)}
                      </p>

                      {/* Botones de aumentar/disminuir */}
                      <div className="flex items-center gap-3 mt-2">
                        <button
                          type="button"
                          onClick={() => cambiarCantidad(item.id, item.cantidad - 1)}
                          className="w-6 h-6 flex items-center justify-center bg-slate-200 dark:bg-slate-700 rounded text-slate-700 dark:text-slate-200 font-bold hover:bg-slate-300 cursor-pointer"
                        >
                          -
                        </button>
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                          {item.cantidad}
                        </span>
                        <button
                          type="button"
                          onClick={() => cambiarCantidad(item.id, item.cantidad + 1)}
                          className="w-6 h-6 flex items-center justify-center bg-slate-200 dark:bg-slate-700 rounded text-slate-700 dark:text-slate-200 font-bold hover:bg-slate-300 cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Botón de eliminación manual */}
                    <button
                      type="button"
                      onClick={() => eliminarDelCarrito(item.id)}
                      className="text-rose-400 hover:text-rose-600 p-2 cursor-pointer"
                      title="Eliminar producto"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Resumen de totales y pago */}
            {carrito.length > 0 && (
              <div className="border-t border-slate-200 dark:border-slate-800 p-6 space-y-3 bg-slate-50 dark:bg-slate-900">
                <div className="flex justify-between text-sm text-slate-500 dark:text-slate-400">
                  <span>Subtotal</span>
                  <span>${formatCOP(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm text-slate-500 dark:text-slate-400">
                  <span>IVA (19%)</span>
                  <span>${formatCOP(iva)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-slate-800 dark:text-white pt-2 border-t border-slate-200 dark:border-slate-800">
                  <span>Total a Pagar</span>
                  <span className="text-cyan-600 dark:text-cyan-400">
                    ${formatCOP(totalPagar)}
                  </span>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsConfirmVaciarOpen(true)}
                    className="w-1/3 py-2.5 px-4 border border-rose-500 text-rose-500 hover:bg-rose-500 hover:text-white rounded-xl font-medium transition-colors text-sm cursor-pointer"
                  >
                    Vaciar
                  </button>

                  <button
                    type="button"
                    onClick={handleAbrirModalPagar}
                    className="w-2/3 py-2.5 px-4 bg-cyan-600 hover:bg-cyan-500 text-slate-900 font-bold rounded-xl transition-colors text-sm cursor-pointer"
                  >
                    Pagar Pedido
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MODAL 1: CONFIRMAR VACIAR CARRITO */}
      {isConfirmVaciarOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="relative w-full max-w-sm bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-6 text-center border border-slate-200 dark:border-slate-800">
            <div className="w-12 h-12 bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400 rounded-full flex items-center justify-center mx-auto mb-3">
              <RotateCcw size={24} />
            </div>
            <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              ¿Vaciar el carrito?
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
              Se eliminarán todos los productos cargados en tu carrito.
            </p>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setIsConfirmVaciarOpen(false)}
                className="w-1/2 py-2.5 bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-white font-semibold rounded-xl text-sm cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirmarVaciar}
                className="w-1/2 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-sm shadow-md cursor-pointer"
              >
                Sí, vaciar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: CONFIRMAR PAGAR PEDIDO */}
      {isConfirmPedidoOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="relative w-full max-w-sm bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-6 text-center border border-slate-200 dark:border-slate-800">
            <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900/40 text-cyan-600 dark:text-cyan-400 rounded-full flex items-center justify-center mx-auto mb-3">
              <PackageCheck size={24} />
            </div>
            <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              ¿Confirmar pedido?
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
              Se procesará tu compra y el carrito quedará listo.
            </p>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setIsConfirmPedidoOpen(false)}
                className="w-1/2 py-2.5 bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-white font-semibold rounded-xl text-sm cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirmarPedido}
                className="w-1/2 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-slate-900 font-bold rounded-xl text-sm shadow-md cursor-pointer"
              >
                Sí, pagar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: ÉXITO DE COMPRA REALIZADA */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="relative w-full max-w-sm bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-6 text-center border border-slate-200 dark:border-slate-800">
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 size={36} />
            </div>
            <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              ¡Pago Exitoso!
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-1 font-semibold">
              ¡Gracias por tu compra, {usuario?.nombre}!
            </p>
            <p className="text-xs text-slate-400 mb-6">
              Tu pedido ha sido procesado con éxito.
            </p>

            <button
              type="button"
              onClick={handleCerrarExito}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-sm shadow-md cursor-pointer transition-all"
            >
              Aceptar
            </button>
          </div>
        </div>
      )}
    </>
  );
}