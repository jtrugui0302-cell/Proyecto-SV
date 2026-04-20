/**
 * Pruebas Unitarias - Configurador de Productos Proyecto SV
 * 
 * Test suite para validar la lógica de generación de códigos de 15 dígitos
 */

import type { ConfiguracionProducto } from './configuradorProductos';
import { generarCodigoSV, ejemploProducto } from './configuradorProductos';

// ============================================================================
// PRUEBAS BÁSICAS - VALIDACIÓN DEL FORMATO
// ============================================================================

describe('generarCodigoSV - Validación de Formato', () => {
  
  test('El código generado debe tener exactamente 15 caracteres', () => {
    const codigo = generarCodigoSV(ejemploProducto);
    expect(codigo).toHaveLength(15);
  });

  test('El código debe comenzar con el prefijo "38"', () => {
    const codigo = generarCodigoSV(ejemploProducto);
    expect(codigo.substring(0, 2)).toBe('38');
  });
});

// ============================================================================
// PRUEBAS DE CONSISTENCIA - MISMA ENTRADA SIEMPRE GENERA MISMO CÓDIGO
// ============================================================================

describe('generarCodigoSV - Consistencia', () => {
  
  test('Aplicar la misma configuración debe generar el mismo código (función pura)', () => {
    const codigo1 = generarCodigoSV(ejemploProducto);
    const codigo2 = generarCodigoSV(ejemploProducto);
    expect(codigo1).toBe(codigo2);
  });

  test('Configuraciones diferentes deben generar códigos diferentes', () => {
    const config1: ConfiguracionProducto = {
      modeloPuerta: "001",
      codigoModulo: "A",
      acabado: 0,
      tirador: 0,
      altura: 0,
      categoria: "10",
      subcategoria: "X",
      medida: "80",
      direccionPuerta: 0,
    };

    const config2: ConfiguracionProducto = {
      modeloPuerta: "002", // Diferente
      codigoModulo: "A",
      acabado: 0,
      tirador: 0,
      altura: 0,
      categoria: "10",
      subcategoria: "X",
      medida: "80",
      direccionPuerta: 0,
    };

    const codigo1 = generarCodigoSV(config1);
    const codigo2 = generarCodigoSV(config2);
    expect(codigo1).not.toBe(codigo2);
  });
});

// ============================================================================
// PRUEBAS DE POSICIONES ESPECÍFICAS - CADA DÍGITO EN SU LUGAR
// ============================================================================

describe('generarCodigoSV - Posiciones Específicas', () => {
  
  test('Posición 6: Código de módulo (debe ser solo 1 carácter)', () => {
    const config: ConfiguracionProducto = {
      modeloPuerta: "999",
      codigoModulo: "M", // Solo 1 carácter
      acabado: 0,
      tirador: 0,
      altura: 0,
      categoria: "99",
      subcategoria: "S",
      medida: "99",
      direccionPuerta: 0,
    };
    
    const codigo = generarCodigoSV(config);
    // Posición 6 (índice 5)
    expect(codigo.charAt(5)).toBe('M');
  });

  test('Posición 7: Acabado (debe ser 0 o 1)', () => {
    const config: ConfiguracionProducto = {
      modeloPuerta: "001",
      codigoModulo: "A",
      acabado: 1,
      tirador: 0,
      altura: 0,
      categoria: "10",
      subcategoria: "X",
      medida: "80",
      direccionPuerta: 0,
    };
    
    const codigo = generarCodigoSV(config);
    // Posición 7 (índice 6)
    expect(codigo.charAt(6)).toBe('1');
  });

  test('Posición 8: Tirador (debe ser 0 o 1)', () => {
    const config: ConfiguracionProducto = {
      modeloPuerta: "001",
      codigoModulo: "A",
      acabado: 0,
      tirador: 1,
      altura: 0,
      categoria: "10",
      subcategoria: "X",
      medida: "80",
      direccionPuerta: 0,
    };
    
    const codigo = generarCodigoSV(config);
    // Posición 8 (índice 7)
    expect(codigo.charAt(7)).toBe('1');
  });

  test('Posición 9: Altura (debe ser 0, 1 o 2)', () => {
    const config: ConfiguracionProducto = {
      modeloPuerta: "001",
      codigoModulo: "A",
      acabado: 0,
      tirador: 0,
      altura: 2,
      categoria: "10",
      subcategoria: "X",
      medida: "80",
      direccionPuerta: 0,
    };
    
    const codigo = generarCodigoSV(config);
    // Posición 9 (índice 8)
    expect(codigo.charAt(8)).toBe('2');
  });

  test('Posición 12: Subcategoría (debe ser solo 1 carácter alfanumérico)', () => {
    const config: ConfiguracionProducto = {
      modeloPuerta: "001",
      codigoModulo: "A",
      acabado: 0,
      tirador: 0,
      altura: 0,
      categoria: "10",
      subcategoria: "7", // Puede ser un número también
      medida: "80",
      direccionPuerta: 0,
    };
    
    const codigo = generarCodigoSV(config);
    // Posición 12 (índice 11)
    expect(codigo.charAt(11)).toBe('7');
  });

  test('Posición 15: Dirección puerta (debe ser 0, 1 o 2)', () => {
    const config: ConfiguracionProducto = {
      modeloPuerta: "001",
      codigoModulo: "A",
      acabado: 0,
      tirador: 0,
      altura: 0,
      categoria: "10",
      subcategoria: "X",
      medida: "80",
      direccionPuerta: 2,
    };
    
    const codigo = generarCodigoSV(config);
    // Posición 15 (índice 14)
    expect(codigo.charAt(14)).toBe('2');
  });
});

// ============================================================================
// CASOS DE USO REALES
// ============================================================================

describe('generarCodigoSV - Casos de Uso Reales', () => {
  
  test('Crear código para puerta estándar 80cm', () => {
    const config: ConfiguracionProducto = {
      modeloPuerta: "001",
      codigoModulo: "A",
      acabado: 0,
      tirador: 1,
      altura: 0,
      categoria: "10",
      subcategoria: "X",
      medida: "80",
      direccionPuerta: 1,
    };
    
    const codigo = generarCodigoSV(config);
    expect(codigo).toBe('38001A01010X801');
  });

  test('Crear código para puerta de lujo 100cm', () => {
    const config: ConfiguracionProducto = {
      modeloPuerta: "005",
      codigoModulo: "P",
      acabado: 1,
      tirador: 1,
      altura: 2,
      categoria: "50",
      subcategoria: "Z",
      medida: "10",
      direccionPuerta: 0,
    };
    
    const codigo = generarCodigoSV(config);
    expect(codigo).toBe('38005P11250Z100');
  });

  test('Crear código con modelo de 3 dígitos sin relleno necesario', () => {
    const config: ConfiguracionProducto = {
      modeloPuerta: "123",
      codigoModulo: "B",
      acabado: 0,
      tirador: 0,
      altura: 1,
      categoria: "25",
      subcategoria: "Y",
      medida: "90",
      direccionPuerta: 2,
    };
    
    const codigo = generarCodigoSV(config);
    expect(codigo).toHaveLength(15);
    expect(codigo.substring(2, 5)).toBe('123');
  });
});

// ============================================================================
// PRUEBAS DE VALIDACIÓN ESTRICTA - THROW EN ENTRADAS INVÁLIDAS
// ============================================================================

describe('generarCodigoSV - Validación estricta', () => {
  const mensaje = "El código de producto generado no tiene la longitud válida";

  test('Modelo debe tener exactamente 3 caracteres', () => {
    const config: ConfiguracionProducto = {
      modeloPuerta: "1",
      codigoModulo: "A",
      acabado: 0,
      tirador: 0,
      altura: 0,
      categoria: "10",
      subcategoria: "X",
      medida: "80",
      direccionPuerta: 0,
    };

    expect(() => generarCodigoSV(config)).toThrow(mensaje);
  });

  test('Código de módulo debe tener exactamente 1 carácter (no se trunca)', () => {
    const config: ConfiguracionProducto = {
      modeloPuerta: "001",
      codigoModulo: "AB",
      acabado: 0,
      tirador: 0,
      altura: 0,
      categoria: "10",
      subcategoria: "X",
      medida: "80",
      direccionPuerta: 0,
    };

    expect(() => generarCodigoSV(config)).toThrow(mensaje);
  });

  test('Categoría debe tener exactamente 2 caracteres', () => {
    const config: ConfiguracionProducto = {
      modeloPuerta: "001",
      codigoModulo: "A",
      acabado: 0,
      tirador: 0,
      altura: 0,
      categoria: "1",
      subcategoria: "X",
      medida: "80",
      direccionPuerta: 0,
    };

    expect(() => generarCodigoSV(config)).toThrow(mensaje);
  });

  test('Subcategoría debe tener exactamente 1 carácter', () => {
    const config: ConfiguracionProducto = {
      modeloPuerta: "001",
      codigoModulo: "A",
      acabado: 0,
      tirador: 0,
      altura: 0,
      categoria: "10",
      subcategoria: "XY",
      medida: "80",
      direccionPuerta: 0,
    };

    expect(() => generarCodigoSV(config)).toThrow(mensaje);
  });

  test('Medida debe tener exactamente 2 caracteres', () => {
    const config: ConfiguracionProducto = {
      modeloPuerta: "001",
      codigoModulo: "A",
      acabado: 0,
      tirador: 0,
      altura: 0,
      categoria: "10",
      subcategoria: "X",
      medida: "800",
      direccionPuerta: 0,
    };

    expect(() => generarCodigoSV(config)).toThrow(mensaje);
  });

  test('No se aceptan valores -1 (equivale a selección faltante)', () => {
    const config: ConfiguracionProducto = {
      modeloPuerta: "001",
      codigoModulo: "A",
      acabado: -1,
      tirador: 0,
      altura: 0,
      categoria: "10",
      subcategoria: "X",
      medida: "80",
      direccionPuerta: 0,
    };

    expect(() => generarCodigoSV(config)).toThrow(mensaje);
  });
});
