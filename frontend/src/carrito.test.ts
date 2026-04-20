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
    expect(totales.importeDescuento).toBe(8.5); // redondeado a 2 decimales
    expect(totales.totalFinal).toBe(91.5);
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
    // El descuento se redondea a 2 decimales
    const descuentoEsperado = 16.23;
    const totalEsperado = 174.69;

    expect(totales.subtotal).toBeCloseTo(subtotalEsperado, 2);
    expect(totales.importeDescuento).toBe(descuentoEsperado);
    expect(totales.totalFinal).toBe(totalEsperado);
  });

  test('Redondeo por línea: (precio*cantidad) se redondea antes de sumar', () => {
    const carrito: ElementoCarrito[] = [
      { producto: { codigo: "P001", precio: 0.335 }, cantidad: 1 }, // 0.34
      { producto: { codigo: "P002", precio: 0.335 }, cantidad: 1 }, // 0.34
    ];

    const totales = calcularTotalesPedido(carrito, 0);
    expect(totales.subtotal).toBe(0.68);
    expect(totales.importeDescuento).toBe(0);
    expect(totales.totalFinal).toBe(0.68);
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
    
    // Descuento: 526.99 * 0.10 = 52.70 (redondeado a 2 decimales)
    expect(totales.importeDescuento).toBe(52.7);
    
    // Total: 526.99 - 52.70 = 474.29
    expect(totales.totalFinal).toBe(474.29);
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
    
    // 376.50 * 0.05 = 18.83 (redondeado a 2 decimales)
    expect(totales.importeDescuento).toBe(18.83);
    
    // 376.50 - 18.83 = 357.67
    expect(totales.totalFinal).toBe(357.67);
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
    
    // 1078.97 * 0.20 = 215.79 (redondeado a 2 decimales)
    const descuentoEsperado = 215.79;
    
    // 1078.97 - 215.79 = 863.18
    const totalEsperado = 863.18;

    expect(totales.subtotal).toBeCloseTo(subtotalEsperado, 2);
    expect(totales.importeDescuento).toBe(descuentoEsperado);
    expect(totales.totalFinal).toBe(totalEsperado);
  });
});

// ============================================================================
// PRUEBAS DE VALIDACIÓN ESTRICTA - THROW EN ENTRADAS INVÁLIDAS
// ============================================================================

describe('calcularTotalesPedido - Validación estricta', () => {
  test('Cantidad menor a 1 -> throw', () => {
    const carrito: ElementoCarrito[] = [
      { producto: { codigo: "P001", precio: 100 }, cantidad: 0 },
    ];

    expect(() => calcularTotalesPedido(carrito, 10)).toThrow(
      "La cantidad debe ser al menos 1"
    );
  });

  test('Precio negativo -> throw', () => {
    const carrito: ElementoCarrito[] = [
      { producto: { codigo: "P001", precio: -0.01 }, cantidad: 1 },
    ];

    expect(() => calcularTotalesPedido(carrito, 0)).toThrow(
      "El precio no puede ser negativo"
    );
  });

  test('Descuento fuera de [0,100] -> throw', () => {
    const carrito: ElementoCarrito[] = [
      { producto: { codigo: "P001", precio: 100 }, cantidad: 1 },
    ];

    expect(() => calcularTotalesPedido(carrito, -1)).toThrow(
      "El descuento debe estar entre 0 y 100"
    );
    expect(() => calcularTotalesPedido(carrito, 101)).toThrow(
      "El descuento debe estar entre 0 y 100"
    );
  });
});
