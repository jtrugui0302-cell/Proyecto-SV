import React from 'react';

interface VisorProductoProps {
  cantidad: number;
  precioBase: number;
}

/**
 * Componente: VisorProducto
 * Responsabilidad: Mostrar la previsualización del producto y el desglose de precio actual.
 */
export function VisorProducto({ cantidad, precioBase }: VisorProductoProps) {
  return (
    <div className="col-span-12 lg:col-span-5 xl:col-span-4 flex flex-col items-center justify-center">
      <div className="w-full max-w-[700px] aspect-square mx-auto border border-gray-300 bg-white rounded-xl flex items-center justify-center font-bold text-gray-400 text-xl shadow-sm">
        imagens
      </div>

      <div className="w-full max-w-[280px] mx-auto mt-6 bg-white border-2 border-[#00aec7] rounded-xl p-4 text-center shadow-md">
        <p className="text-sm text-gray-500 mb-1">
          Precio Unitario: <span className="font-semibold text-gray-700">{precioBase.toFixed(2)}€</span>
        </p>
        <p className="text-2xl font-bold text-[#00aec7]">
          Total: {(cantidad * precioBase).toFixed(2)}€
        </p>
      </div>
    </div>
  );
}
