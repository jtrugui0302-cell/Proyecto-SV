/**
 * Módulo de Carrito de Compras - Proyecto SV
 * 
 * Propósito: Gestionar la lógica de cálculo de totales de pedidos
 * considerando los precios fijos de productos y descuentos del cliente.
 */

/**
 * Interface Producto
 * 
 * Representa un producto con su código único y precio fijo en BD.
 * El código está vinculado al código de 15 dígitos generado por el configurador.
 */
export interface Producto {
  // Código único del producto (ej: "38001A12010X801" del configurador)
  codigo: string;
  
  // Precio fijo en base de datos (en euros, con precisión decimal)
  // Ej: 125.50, 99.99, 1500.00
  precio: number;
}

/**
 * Interface ElementoCarrito
 * 
 * Representa un item dentro del carrito de compras con el producto
 * y la cantidad solicitada por el cliente.
 */
export interface ElementoCarrito {
  // Referencia al producto con su código y precio
  producto: Producto;
  
  // Cantidad de unidades del producto (Ej: 1, 2, 5)
  cantidad: number;
}

/**
 * Interface Cliente
 * 
 * Representa la información del cliente que realiza la compra,
 * incluyendo su descuento comercial personalizado.
 */
export interface Cliente {
  // Nombre de la empresa o persona
  nombre: string;
  
  // CIF/NIF para facturación (ej: "12345678A")
  cif: string;
  
  // Porcentaje de descuento aplicado a todos los pedidos
  // Ej: 15 representa un 15% de descuento
  porcentajeDescuento: number;
}

/**
 * Interface TotalesPedido
 * 
 * Resumen de los cálculos monetarios del pedido incluyendo
 * subtotal, descuento e importe final.
 */
export interface TotalesPedido {
  // Suma de (precio * cantidad) de todos los elementos sin descuentos
  // Ej: 250.50 + 100.00 = 350.50
  subtotal: number;
  
  // Cantidad en euros del descuento aplicado al subtotal
  // Ej: 350.50 * 0.15 = 52.575 € (se puede redondear según políticas)
  importeDescuento: number;
  
  // Subtotal menos el importe del descuento
  // Ej: 350.50 - 52.575 = 297.925 €
  totalFinal: number;
}

function toCents(valor: number): number {
  return Math.round(valor * 100);
}

function fromCents(cents: number): number {
  return cents / 100;
}

/**
 * Función calcularTotalesPedido
 * 
 * Calcula los totales de un pedido basándose en los elementos del carrito
 * y el descuento del cliente. Es una función pura sin efectos secundarios.
 * 
 * @param elementos Array de ElementoCarrito con los productos y cantidades
 * @param porcentajeDescuento Porcentaje de descuento del cliente (ej: 10 para 10%)
 * @returns Objeto TotalesPedido con subtotal, descuento y total final
 * 
 * Ejemplo:
 * const carrito: ElementoCarrito[] = [
 *   { producto: { codigo: "P001", precio: 100 }, cantidad: 2 },
 *   { producto: { codigo: "P002", precio: 50 }, cantidad: 3 }
 * ];
 * const totales = calcularTotalesPedido(carrito, 10);
 * // Subtotal: 350 | Descuento: 35 | Total: 315
 */
export function calcularTotalesPedido(
  elementos: ElementoCarrito[],
  porcentajeDescuento: number
): TotalesPedido {
  if (porcentajeDescuento < 0 || porcentajeDescuento > 100) {
    throw new Error("El descuento debe estar entre 0 y 100");
  }

  // Política monetaria:
  // (Precio Unitario * Cantidad) -> Redondear a 2 decimales
  // Aplicar Descuento -> Redondear a 2 decimales
  const subtotalCents = elementos.reduce((acumCents, elemento) => {
    if (elemento.cantidad < 1) {
      throw new Error("La cantidad debe ser al menos 1");
    }

    if (elemento.producto.precio < 0) {
      throw new Error("El precio no puede ser negativo");
    }

    const lineaCents = toCents(elemento.producto.precio * elemento.cantidad);
    return acumCents + lineaCents;
  }, 0);

  const importeDescuentoCents = Math.round(
    (subtotalCents * porcentajeDescuento) / 100
  );

  const totalFinalCents = subtotalCents - importeDescuentoCents;

  return {
    subtotal: fromCents(subtotalCents),
    importeDescuento: fromCents(importeDescuentoCents),
    totalFinal: fromCents(totalFinalCents),
  };
}

/**
 * Datos de prueba: Cliente con 10% de descuento
 */
export const clienteEjemplo: Cliente = {
  nombre: "Maderas SV Premium",
  cif: "B12345678",
  porcentajeDescuento: 10,
};

/**
 * Datos de prueba: Carrito con 2 productos distintos
 * 
 * Producto 1: Puerta estándar
 * - Código: 38001A12010X801 (generado por el configurador)
 * - Precio: 125.50 €
 * - Cantidad: 2 unidades
 * - Subtotal parcial: 251.00 €
 * 
 * Producto 2: Puerta premium
 * - Código: 38010P22199A1201 (generado por el configurador)
 * - Precio: 275.99 €
 * - Cantidad: 1 unidad
 * - Subtotal parcial: 275.99 €
 */
export const carritoEjemplo: ElementoCarrito[] = [
  {
    producto: {
      codigo: "38001A12010X801",
      precio: 125.50,
    },
    cantidad: 2,
  },
  {
    producto: {
      codigo: "38010P22199A1201",
      precio: 275.99,
    },
    cantidad: 1,
  },
];
