import { useState } from "react";
import { useCart } from "../context/CartContext";
import { Trash2, RotateCcw, PackageCheck, CheckCircle, AlertTriangle } from "lucide-react";
import toast from "react-hot-toast";

export default function Carrito() {
  const {
    carrito,
    eliminarDelCarrito,
    cambiarCantidad,
    vaciarCarrito,
    subtotal,
    iva,
    totalPagar,
  } = useCart();

  // Estados de los modales
  const [isConfirmVaciarOpen, setIsConfirmVaciarOpen] = useState(false);
  const [isConfirmPedidoOpen, setIsConfirmPedidoOpen] = useState(false);

  // Abrir modal de vaciar carrito explícitamente
  const handleOpenVaciarModal = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsConfirmVaciarOpen(true);
  };

  // Confirmar acción de vaciar
  const handleConfirmarVaciar = () => {
    vaciarCarrito();
    setIsConfirmVaciarOpen(false);
    toast.success("El carrito ha sido vaciado.");
  };

  // Confirmar acción de enviar pedido
  const handleConfirmarPedido = () => {
    vaciarCarrito();
    setIsConfirmPedidoOpen(false);
    toast.success("¡Pedido enviado con éxito!");
  };

  return (
    <div className="relative max-w-4xl mx-auto p-6 text-slate-800 dark:text-slate-100">
      {/* Cabecera del Carrito */}
      <div className="flex items-center justify-between mb-6 border-b border-slate-200 dark:border-slate-800 pb-4">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <PackageCheck className="text-blue-600 dark:text-blue-400" />
          Carrito de Compras
        </h2>

        {/* Botón para Abrir Modal de Vaciar Carrito */}
        {carrito && carrito.length > 0 && (
          <button
            type="button"
            onClick={handleOpenVaciarModal}
            className="flex items-center gap-2 text-xs font-bold text-rose-600 hover:text-rose-700 bg-rose-50 dark:bg-rose-950/50 hover:bg-rose-100 dark:hover:bg-rose-900/40 px-3.5 py-2 rounded-xl transition-all cursor-pointer border border-rose-200 dark:border-rose-800"
          >
            <Trash2 size={16} />
            <span>Vaciar Carrito</span>
          </button>
        )}
      </div>

      {!carrito || carrito.length === 0 ? (
        <div className="text-center py-12 bg-slate-100 dark:bg-slate-800/50 rounded-3xl border border-slate-200 dark:border-slate-700">
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            No hay productos en el carrito.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Lista de productos */}
          <div className="divide-y divide-slate-200 dark:divide-slate-800">
            {carrito.map((item) => (
              <div
                key={item.id}
                className="py-4 flex flex-col sm:flex-row items-center justify-between gap-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-2xl shadow-sm"
                />

                <div className="flex-1 text-center sm:text-left">
                  <h3 className="font-bold text-slate-900 dark:text-white">
                    {item.name}
                  </h3>
                  <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                    {item.especie || item.categoria || "Especie Marina"}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    ${(item.precio || 15000).toLocaleString("es-CO")} COP c/u
                  </p>
                </div>

                {/* Controles de Cantidad */}
                <div className="flex items-center gap-3 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl">
                  <button
                    type="button"
                    onClick={() => cambiarCantidad(item.id, item.cantidad - 1)}
                    className="w-7 h-7 flex items-center justify-center font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg cursor-pointer"
                  >
                    -
                  </button>
                  <span className="font-semibold text-sm w-4 text-center">
                    {item.cantidad}
                  </span>
                  <button
                    type="button"
                    onClick={() => cambiarCantidad(item.id, item.cantidad + 1)}
                    className="w-7 h-7 flex items-center justify-center font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg cursor-pointer"
                  >
                    +
                  </button>
                </div>

                {/* Subtotal ítem */}
                <p className="font-bold text-slate-900 dark:text-white min-w-[100px] text-right">
                  ${((item.precio || 15000) * item.cantidad).toLocaleString("es-CO")}
                </p>

                {/* Eliminar ítem individual */}
                <button
                  type="button"
                  onClick={() => eliminarDelCarrito(item.id)}
                  className="p-2 text-rose-500 hover:bg-rose-500/10 rounded-xl transition-colors cursor-pointer"
                  title="Eliminar de la lista"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>

          {/* Totales */}
          <div className="border-t border-slate-200 dark:border-slate-800 pt-6 text-right space-y-2">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Subtotal:{" "}
              <span className="font-semibold text-slate-900 dark:text-white">
                ${subtotal?.toLocaleString("es-CO")} COP
              </span>
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              IVA (19%):{" "}
              <span className="font-semibold text-slate-900 dark:text-white">
                ${iva?.toLocaleString("es-CO")} COP
              </span>
            </p>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 pt-2">
              Total a Pagar: ${totalPagar?.toLocaleString("es-CO")} COP
            </p>
          </div>

          {/* Botón Enviar Pedido */}
          <button
            type="button"
            onClick={() => setIsConfirmPedidoOpen(true)}
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg transition-all cursor-pointer text-sm"
          >
            Enviar Pedido
          </button>
        </div>
      )}

      {/* ========================================== */}
      {/* MODAL 1: CONFIRMAR VACIAR CARRITO           */}
      {/* ========================================== */}
      {isConfirmVaciarOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-sm bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-6 text-center border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in duration-150">
            <div className="w-12 h-12 bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400 rounded-full flex items-center justify-center mx-auto mb-3">
              <RotateCcw size={24} />
            </div>
            <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              ¿Vaciar el carrito?
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
              Esta acción eliminará todos los productos cargados en tu lista.
            </p>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setIsConfirmVaciarOpen(false)}
                className="w-1/2 py-2.5 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-semibold rounded-xl text-sm transition-all cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirmarVaciar}
                className="w-1/2 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-sm shadow-md transition-all cursor-pointer"
              >
                Sí, vaciar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* MODAL 2: CONFIRMAR ENVIAR PEDIDO           */}
      {/* ========================================== */}
      {isConfirmPedidoOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-sm bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-6 text-center border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in duration-150">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mx-auto mb-3">
              <PackageCheck size={24} />
            </div>
            <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              ¿Enviar pedido?
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
              Se procesará tu solicitud y la orden quedará registrada.
            </p>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setIsConfirmPedidoOpen(false)}
                className="w-1/2 py-2.5 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-semibold rounded-xl text-sm transition-all cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirmarPedido}
                className="w-1/2 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm shadow-md transition-all cursor-pointer"
              >
                Sí, enviar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}