import { useState, useMemo } from 'react';
import type { ItemCarrito } from '../types/carrito';

/**
 * Custom Hook: useCarrito
 * 
 * Centraliza la lógica de gestión del carrito de compras.
 * Cumple con el principio de separación de capas al extraer la lógica
 * de estado fuera de los componentes visuales.
 */
export function useCarrito() {
  const [items, setItems] = useState<ItemCarrito[]>([]);

  const agregarItem = (nuevoItem: ItemCarrito) => {
    setItems((prev) => [...prev, nuevoItem]);
  };

  const eliminarItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const actualizarCantidad = (id: string, variacion: number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;

        const nuevaCantidad = item.cantidad + variacion;
        if (nuevaCantidad < 1) return item;

        return {
          ...item,
          cantidad: nuevaCantidad,
          precioTotal: nuevaCantidad * item.precioUnitario,
        };
      })
    );
  };

  const totalPedido = useMemo(() => 
    items.reduce((acc, item) => acc + item.precioTotal, 0),
    [items]
  );

  return {
    items,
    totalPedido,
    agregarItem,
    eliminarItem,
    actualizarCantidad,
  };
}
