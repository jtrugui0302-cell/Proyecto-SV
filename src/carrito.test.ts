/**
 * Pruebas Unitarias - Carrito de Compras Proyecto SV
 * 
 * Test suite para validar la lógica de cálculo de totales de pedidos
 * incluyendo descuentos y precisión decimal en operaciones monetarias.
 */

import type { Producto, ElementoCarrito } from './carrito';
import { calcularTotalesPedido, carritoEjemplo, clienteEjemplo } from './carrito';

// ============================================================================
// PRUEBAS BÁSICAS - VALIDACIÓN DE CÁLCULOS CORRECTOS
// ============================================================================

describe('calcularTotalesPedido - Cálculos Básicos', () => {
  
  test('Carrito con un solo producto sin descuento', () => {
    const carrito: ElementoCarrito[] = [
      {
        producto: { codigo: 'P001', precio: 100 },
        cantidad: 1,
      },
    ];

    const totales = calcularTotalesPedido(carrito, 0);

    expect(totales.subtotal).toBe(100);
    expect(totales.importeDescuento).toBe(0);
    expect(totales.totalFinal).toBe(100);
  });

  test('Carrito con un solo producto con descuento del 10%', () => {
    const carrito: ElementoCarrito[] = [
      {
        producto: { codigo: 'P001', precio: 100 },
        cantidad: 1,
      },
    ];

    const totales = calcularTotalesPedido(carrito, 10);

    expect(totales.subtotal).toBe(100);
    expect(totales.importeDescuento).toBe(10);
    expect(totales.totalFinal).toBe(90);
  });

  test('Carrito con múltiples unidades del mismo producto', () => {
    const carrito: ElementoCarrito[] = [
      {
        producto: { codigo: 'P001', precio: 50 },
        cantidad: 5,
      },
    ];

    const totales = calcularTotalesPedido(carrito, 0);

    expect(totales.subtotal).toBe(250);
    expect(totales.importeDescuento).toBe(0);
    expect(totales.totalFinal).toBe(250);
  });

  test('Carrito con múltiples productos distintos', () => {
    const carrito: ElementoCarrito[] = [
      {
        producto: { codigo: 'P001', precio: 100 },
        cantidad: 2,
      },
      {
        producto: { codigo: 'P002', precio: 50 },
        cantidad: 3,
      },
    ];

    const totales = calcularTotalesPedido(carrito, 0);

    // (100 * 2) + (50 * 3) = 200 + 150 = 350
    expect(totales.subtotal).toBe(350);
    expect(totales.importeDescuento).toBe(0);
    expect(totales.totalFinal).toBe(350);
  });
});

// ============================================================================
// PRUEBAS DE DESCUENTOS - VALIDACIÓN DE APLICACIÓN CORRECTA
// ============================================================================

describe('calcularTotalesPedido - Descuentos', () => {
  
  test('Descuento del 10% se aplica correctamente', () => {
    const carrito: ElementoCarrito[] = [
      {
        producto: { codigo: 'P001', precio: 100 },
        cantidad: 1,
      },
    ];

    const totales = calcularTotalesPedido(carrito, 10);

    expect(totales.subtotal).toBe(100);
    expect(totales.importeDescuento).toBe(10); // 100 * 0.10
    expect(totales.totalFinal).toBe(90); // 100 - 10
  });

  test('Descuento del 15% se aplica correctamente', () => {
    const carrito: ElementoCarrito[] = [
      {
        producto: { codigo: 'P001', precio: 200 },
        cantidad: 1,
      },
    ];

    const totales = calcularTotalesPedido(carrito, 15);

    expect(totales.subtotal).toBe(200);
    expect(totales.importeDescuento).toBe(30); // 200 * 0.15
    expect(totales.totalFinal).toBe(170); // 200 - 30
  });

  test('Descuento del 25% en carrito con múltiples productos', () => {
    const carrito: ElementoCarrito[] = [
      {
        producto: { codigo: 'P001', precio: 100 },
        cantidad: 2,
      },
      {
        producto: { codigo: 'P002', precio: 50 },
        cantidad: 2,
      },
    ];

    const totales = calcularTotalesPedido(carrito, 25);

    // (100 * 2) + (50 * 2) = 200 + 100 = 300
    expect(totales.subtotal).toBe(300);
    expect(totales.importeDescuento).toBe(75); // 300 * 0.25
    expect(totales.totalFinal).toBe(225); // 300 - 75
  });

  test('Descuento del 0% (sin descuento) es válido', () => {
    const carrito: ElementoCarrito[] = [
      {
        producto: { codigo: 'P001', precio: 100 },
        cantidad: 1,
      },
    ];

    const totales = calcularTotalesPedido(carrito, 0);

    expect(totales.subtotal).toBe(100);
    expect(totales.importeDescuento).toBe(0);
    expect(totales.totalFinal).toBe(100);
  });

  test('Descuento del 100% (gratuito) es válido', () => {
    const carrito: ElementoCarrito[] = [
      {
        producto: { codigo: 'P001', precio: 100 },
        cantidad: 1,
      },
    ];

    const totales = calcularTotalesPedido(carrito, 100);

    expect(totales.subtotal).toBe(100);
    expect(totales.importeDescuento).toBe(100);
    expect(totales.totalFinal).toBe(0);
  });
});

// ============================================================================
// PRUEBAS DE PRECISIÓN DECIMAL - OPERACIONES MONETARIAS
// ============================================================================

describe('calcularTotalesPedido - Precisión Decimal', () => {
  
  test('Manejo correcto de precios con decimales', () => {
    const carrito: ElementoCarrito[] = [
      {
        producto: { codigo: 'P001', precio: 12.99 },
        cantidad: 1,
      },
    ];

    const totales = calcularTotalesPedido(carrito, 0);

    expect(totales.subtotal).toBe(12.99);
    expect(totales.totalFinal).toBe(12.99);
  });

  test('Operación: 3 x €33.33 (suma de decimales)', () => {
    const carrito: ElementoCarrito[] = [
      {
        producto: { codigo: 'P001', precio: 33.33 },
        cantidad: 3,
      },
    ];

    const totales = calcularTotalesPedido(carrito, 0);

    // 33.33 * 3 = 99.99 (importante para precisión monetaria)
    expect(totales.subtotal).toBeCloseTo(99.99, 2);
    expect(totales.totalFinal).toBeCloseTo(99.99, 2);
  });

  test('Descuento que resulta en decimal', () => {
    const carrito: ElementoCarrito[] = [
      {
        producto: { codigo: 'P001', precio: 100 },
        cantidad: 1,
      },
    ];

    const totales = calcularTotalesPedido(carrito, 8.5);

    expect(totales.subtotal).toBe(100);
    expect(totales.importeDescuento).toBeCloseTo(8.5, 2); // 100 * 0.085
    expect(totales.totalFinal).toBeCloseTo(91.5, 2); // 100 - 8.5
  });

  test('Múltiples productos con decimales y descuento', () => {
    const carrito: ElementoCarrito[] = [
      {
        producto: { codigo: 'P001', precio: 33.33 },
        cantidad: 3,
      },
      {
        producto: { codigo: 'P002', precio: 12.99 },
        cantidad: 7,
      },
    ];

    const totales = calcularTotalesPedido(carrito, 8.5);

    // (33.33 * 3) + (12.99 * 7) = 99.99 + 90.93 = 190.92
    const subtotalEsperado = 99.99 + 90.93;
    const descuentoEsperado = subtotalEsperado * 0.085;
    const totalEsperado = subtotalEsperado - descuentoEsperado;

    expect(totales.subtotal).toBeCloseTo(subtotalEsperado, 2);
    expect(totales.importeDescuento).toBeCloseTo(descuentoEsperado, 2);
    expect(totales.totalFinal).toBeCloseTo(totalEsperado, 2);
  });
});

// ============================================================================
// PRUEBAS DE CASOS EDGE - BORDES Y EXCEPCIONES
// ============================================================================

describe('calcularTotalesPedido - Casos Edge', () => {
  
  test('Carrito vacío sin descuento', () => {
    const carrito: ElementoCarrito[] = [];
    const totales = calcularTotalesPedido(carrito, 0);

    expect(totales.subtotal).toBe(0);
    expect(totales.importeDescuento).toBe(0);
    expect(totales.totalFinal).toBe(0);
  });

  test('Carrito vacío con descuento', () => {
    const carrito: ElementoCarrito[] = [];
    const totales = calcularTotalesPedido(carrito, 50);

    expect(totales.subtotal).toBe(0);
    expect(totales.importeDescuento).toBe(0);
    expect(totales.totalFinal).toBe(0);
  });

  test('Cantidad cero de un producto (edge case)', () => {
    const carrito: ElementoCarrito[] = [
      {
        producto: { codigo: 'P001', precio: 100 },
        cantidad: 0,
      },
    ];

    const totales = calcularTotalesPedido(carrito, 10);

    expect(totales.subtotal).toBe(0);
    expect(totales.importeDescuento).toBe(0);
    expect(totales.totalFinal).toBe(0);
  });

  test('Precio muy alto con múltiples unidades', () => {
    const carrito: ElementoCarrito[] = [
      {
        producto: { codigo: 'P001', precio: 5000 },
        cantidad: 10,
      },
    ];

    const totales = calcularTotalesPedido(carrito, 20);

    expect(totales.subtotal).toBe(50000);
    expect(totales.importeDescuento).toBe(10000); // 20% de 50000
    expect(totales.totalFinal).toBe(40000);
  });

  test('Precio muy bajo con cantidad alta', () => {
    const carrito: ElementoCarrito[] = [
      {
        producto: { codigo: 'P001', precio: 0.99 },
        cantidad: 100,
      },
    ];

    const totales = calcularTotalesPedido(carrito, 5);

    const subtotalEsperado = 99;
    const descuentoEsperado = 4.95;
    const totalEsperado = 94.05;

    expect(totales.subtotal).toBeCloseTo(subtotalEsperado, 2);
    expect(totales.importeDescuento).toBeCloseTo(descuentoEsperado, 2);
    expect(totales.totalFinal).toBeCloseTo(totalEsperado, 2);
  });
});

// ============================================================================
// PRUEBAS DE FUNCIÓN PURA - CONSISTENCIA Y DETERMINISMO
// ============================================================================

describe('calcularTotalesPedido - Función Pura', () => {
  
  test('Mismos parámetros siempre generan el mismo resultado', () => {
    const carrito: ElementoCarrito[] = [
      {
        producto: { codigo: 'P001', precio: 100 },
        cantidad: 2,
      },
      {
        producto: { codigo: 'P002', precio: 50 },
        cantidad: 3,
      },
    ];

    const totales1 = calcularTotalesPedido(carrito, 15);
    const totales2 = calcularTotalesPedido(carrito, 15);

    expect(totales1).toEqual(totales2);
    expect(totales1.subtotal).toBe(totales2.subtotal);
    expect(totales1.importeDescuento).toBe(totales2.importeDescuento);
    expect(totales1.totalFinal).toBe(totales2.totalFinal);
  });

  test('La función no modifica el array de entrada', () => {
    const producto: Producto = { codigo: 'P001', precio: 100 };
    const carrito: ElementoCarrito[] = [
      { producto, cantidad: 1 },
    ];

    const carritoOriginal = JSON.stringify(carrito);
    calcularTotalesPedido(carrito, 10);
    const carritoActual = JSON.stringify(carrito);

    expect(carritoActual).toBe(carritoOriginal);
  });

  test('Cambios en parámetros generan resultados diferentes', () => {
    const carrito: ElementoCarrito[] = [
      {
        producto: { codigo: 'P001', precio: 100 },
        cantidad: 1,
      },
    ];

    const totales10 = calcularTotalesPedido(carrito, 10);
    const totales20 = calcularTotalesPedido(carrito, 20);

    expect(totales10.importeDescuento).not.toBe(totales20.importeDescuento);
    expect(totales10.totalFinal).not.toBe(totales20.totalFinal);
  });
});

// ============================================================================
// PRUEBAS DE DATOS REALES - CASOS DE USO PRÁCTICOS
// ============================================================================

describe('calcularTotalesPedido - Datos Reales Ejemplo', () => {
  
  test('Ejemplo del proyecto: Cliente con 10% descuento', () => {
    const totales = calcularTotalesPedido(
      carritoEjemplo,
      clienteEjemplo.porcentajeDescuento
    );

    // Carrito: 2x125.50 + 1x275.99 = 251.00 + 275.99 = 526.99
    expect(totales.subtotal).toBeCloseTo(526.99, 2);
    
    // Descuento: 526.99 * 0.10 = 52.699
    expect(totales.importeDescuento).toBeCloseTo(52.699, 2);
    
    // Total: 526.99 - 52.699 = 474.291
    expect(totales.totalFinal).toBeCloseTo(474.291, 2);
  });

  test('Pedido típico: 3 puertas estándar con 5% descuento', () => {
    const carrito: ElementoCarrito[] = [
      {
        producto: {
          codigo: '38001A12010X801',
          precio: 125.50,
        },
        cantidad: 3,
      },
    ];

    const totales = calcularTotalesPedido(carrito, 5);

    // 125.50 * 3 = 376.50
    expect(totales.subtotal).toBeCloseTo(376.50, 2);
    
    // 376.50 * 0.05 = 18.825
    expect(totales.importeDescuento).toBeCloseTo(18.825, 2);
    
    // 376.50 - 18.825 = 357.675
    expect(totales.totalFinal).toBeCloseTo(357.675, 2);
  });

  test('Pedido mixto: Puertas estándar + premium con 20% descuento', () => {
    const carrito: ElementoCarrito[] = [
      {
        producto: { codigo: '38001A12010X801', precio: 125.50 },
        cantidad: 2,
      },
      {
        producto: { codigo: '38010P22199A1201', precio: 275.99 },
        cantidad: 3,
      },
    ];

    const totales = calcularTotalesPedido(carrito, 20);

    // (125.50 * 2) + (275.99 * 3) = 251 + 827.97 = 1078.97
    const subtotalEsperado = 1078.97;
    
    // 1078.97 * 0.20 = 215.794
    const descuentoEsperado = 215.794;
    
    // 1078.97 - 215.794 = 863.176
    const totalEsperado = 863.176;

    expect(totales.subtotal).toBeCloseTo(subtotalEsperado, 2);
    expect(totales.importeDescuento).toBeCloseTo(descuentoEsperado, 2);
    expect(totales.totalFinal).toBeCloseTo(totalEsperado, 2);
  });
});

// ============================================================================
// EJEMPLO DE OUTPUT EN CONSOLA PARA DEBUGGING
// ============================================================================

console.log('\n=== EJECUCIÓN DE TESTS DEL CARRITO ===\n');
console.log('Datos de ejemplo:');
console.log('Cliente:', clienteEjemplo.nombre);
console.log('Descuento cliente:', clienteEjemplo.porcentajeDescuento + '%');
console.log('Artículos en carrito:', carritoEjemplo.length);

const totalesTest = calcularTotalesPedido(
  carritoEjemplo,
  clienteEjemplo.porcentajeDescuento
);

console.log('\nResultados calculados:');
console.log('Subtotal: €' + totalesTest.subtotal.toFixed(2));
console.log('Descuento: €' + totalesTest.importeDescuento.toFixed(2));
console.log('Total Final: €' + totalesTest.totalFinal.toFixed(2));
console.log('');
