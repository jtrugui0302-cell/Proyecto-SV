import React from 'react';
import type { ItemCarrito } from '../types/carrito';

interface SidebarCarritoProps {
  items: ItemCarrito[];
  totalPedido: number;
  onEliminar: (id: string) => void;
  onActualizarCantidad: (id: string, variacion: number) => void;
}

/**
 * Componente: SidebarCarrito
 * Responsabilidad: Mostrar el resumen del pedido y permitir gestionar los items añadidos.
 */
export function SidebarCarrito({
  items,
  totalPedido,
  onEliminar,
  onActualizarCantidad,
}: SidebarCarritoProps) {
  return (
    <div className="col-span-12 lg:col-span-4 xl:col-span-5 flex flex-col bg-slate-50 rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-center font-bold text-gray-800 mb-4 text-lg uppercase tracking-wide">
        Resumen del Pedido
      </h2>

      <div className="flex-1 border-2 border-dashed border-gray-300 rounded-lg p-4 max-h-[800px] overflow-y-auto">
        {items.length === 0 ? (
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-gray-400 text-sm text-center italic">No hay artículos aún</p>
          </div>
        ) : (
          <div className="w-full">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-3 flex justify-between items-center relative"
              >
                <div className="pr-10">
                  <div className="font-bold text-[#00aec7]">{item.titulo}</div>
                  <div className="text-xs text-gray-500 mt-1">{item.detalles}</div>

                  <div className="mt-2 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onActualizarCantidad(item.id, -1)}
                      className="w-7 h-7 rounded-md border border-gray-300 text-gray-700 hover:border-[#00aec7] hover:bg-blue-50 transition-all font-bold"
                    >
                      −
                    </button>
                    <div className="min-w-[28px] text-center text-sm font-semibold text-gray-800">
                      {item.cantidad}
                    </div>
                    <button
                      type="button"
                      onClick={() => onActualizarCantidad(item.id, 1)}
                      className="w-7 h-7 rounded-md border border-gray-300 text-gray-700 hover:border-[#00aec7] hover:bg-blue-50 transition-all font-bold"
                    >
                      +
                    </button>
                    <div className="ml-2 text-xs text-gray-600">
                      x {item.precioUnitario.toFixed(2)}€
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <div className="font-bold text-lg">{item.precioTotal.toFixed(2)}€</div>
                  <button
                    type="button"
                    onClick={() => onEliminar(item.id)}
                    className="text-red-600 hover:text-red-700"
                    title="Eliminar"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path d="M9 3h6l1 2h4v2h-2l-1 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L6 7H4V5h4l1-2Zm1.2 6.3 1.4 1.4L12 12l1.4-1.3 1.4-1.4 1.4 1.4L13.4 13.4l1.4 1.4-1.4 1.4L12 14.8l-1.4 1.4-1.4-1.4 1.4-1.4-1.4-1.4 1.4-1.4ZM10.2 5l-.5 1h4.6l-.5-1h-3.6Z" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
        <div className="font-bold text-gray-700">Total</div>
        <div className="text-2xl font-extrabold text-gray-900">{totalPedido.toFixed(2)}€</div>
      </div>

      <button className="mt-6 bg-[#eb5c00] hover:bg-[#c94e00] text-white font-bold py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl w-full">
        Finalizar Pedido
      </button>
    </div>
  );
}
