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
  // Paso 1: Calcular el subtotal usando .reduce()
  // .reduce() es una función pura que acumula valores de forma funcional
  // Para cada elemento, multiplicamos precio * cantidad y lo sumamos al acumulador
  const subtotal = elementos.reduce((acumulador, elemento) => {
    // precio * cantidad suma al acumulador
    return acumulador + elemento.producto.precio * elemento.cantidad;
  }, 0); // Valor inicial del acumulador: 0
  
  // Paso 2: Calcular el importe del descuento
  // Es un porcentaje del subtotal
  // Ej: Si subtotal = 350 y descuento = 10, entonces descuento = 350 * (10/100) = 35
  const importeDescuento = subtotal * (porcentajeDescuento / 100);
  
  // Paso 3: Calcular el total final
  // Restamos el importe del descuento al subtotal
  // Ej: 350 - 35 = 315
  const totalFinal = subtotal - importeDescuento;
  
  // Paso 4: Retornar el objeto TotalesPedido
  // TypeScript valida automáticamente que el objeto tenga las propiedades correctas
  return {
    subtotal,
    importeDescuento,
    totalFinal,
  };
}

// ============================================================================
// EJEMPLO DE USO Y DEMOSTRACIÓN
// ============================================================================

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

// Calcular los totales del ejemplo
const totalesEjemplo = calcularTotalesPedido(
  carritoEjemplo,
  clienteEjemplo.porcentajeDescuento
);

// Mostrar los resultados en consola
console.log("\n=== CARRITO DE COMPRAS - PROYECTO SV ===\n");
console.log("Cliente:", clienteEjemplo.nombre);
console.log("CIF:", clienteEjemplo.cif);
console.log("Descuento aplicado:", clienteEjemplo.porcentajeDescuento + "%");
console.log("\n--- Elementos del Carrito ---");

carritoEjemplo.forEach((elemento, indice) => {
  console.log(
    `${indice + 1}. Código: ${elemento.producto.codigo} | Precio: €${elemento.producto.precio.toFixed(2)} | Cantidad: ${elemento.cantidad} | Subtotal: €${(elemento.producto.precio * elemento.cantidad).toFixed(2)}`
  );
});

console.log("\n--- Totales ---");
console.log(`Subtotal (sin descuento): €${totalesEjemplo.subtotal.toFixed(2)}`);
console.log(`Importe Descuento (10%): €${totalesEjemplo.importeDescuento.toFixed(2)}`);
console.log(`Total Final: €${totalesEjemplo.totalFinal.toFixed(2)}`);
console.log("\n====================================\n");

/**
 * Demostración de Precisión Decimal
 * 
 * TypeScript/JavaScript maneja números de punto flotante con precisión
 * IEEE 754 de 64 bits. En operaciones monetarias, es crítico asegurar
 * que se redondean correctamente para evitar errores de centavos.
 */
console.log("=== PRECISIÓN DECIMAL EN OPERACIONES MONETARIAS ===\n");

const carritoDecimalTest: ElementoCarrito[] = [
  { producto: { codigo: "P001", precio: 33.33 }, cantidad: 3 },
  { producto: { codigo: "P002", precio: 12.99 }, cantidad: 7 },
];

const totalesDecimal = calcularTotalesPedido(carritoDecimalTest, 8.5);

console.log("Carrito test:");
console.log("- 3 x €33.33 = €99.99");
console.log("- 7 x €12.99 = €90.93");
console.log("Subtotal esperado: €190.92");
console.log("Descuento esperado (8.5%): €16.2282");
console.log("Total esperado: €174.6918\n");

console.log("Valores calculados:");
console.log(`Subtotal: €${totalesDecimal.subtotal.toFixed(2)}`);
console.log(`Descuento: €${totalesDecimal.importeDescuento.toFixed(4)} (sin redondear)`);
console.log(`Total Final: €${totalesDecimal.totalFinal.toFixed(2)}`);
console.log("\n✓ Los cálculos mantienen precisión en operaciones decimales\n");
