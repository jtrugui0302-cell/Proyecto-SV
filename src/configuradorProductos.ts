/**
 * Módulo de Configurador de Productos - Proyecto SV
 * 
 * Propósito: Definir la lógica para generar códigos dinámicos de productos
 * basados en las opciones seleccionadas por el usuario.
 */

/**
 * Interface ConfiguracionProducto
 * 
 * Define la estructura de datos para un producto configurable en el Proyecto SV.
 * Cada propiedad corresponde a una parte del código de 15 dígitos.
 */
export interface ConfiguracionProducto {
  // Dígitos 3-5: Modelo de puerta (ej: "1" se convierte a "001")
  modeloPuerta: string;
  
  // Dígito 6: Código de módulo (alfanumérico, 1 carácter)
  // Ej: "A", "B", "1", etc.
  codigoModulo: string;
  
  // Dígito 7: Acabado (solo acepta 1 o 2)
  acabado: "1" | "2";
  
  // Dígito 8: Tirador (solo acepta 1 o 2)
  tirador: "1" | "2";
  
  // Dígito 9: Altura (solo acepta 0, 1 o 2)
  altura: "0" | "1" | "2";
  
  // Dígitos 10-11: Categoría (2 dígitos, ej: "10", "99")
  categoria: string;
  
  // Dígito 12: Subcategoría (alfanumérico, 1 carácter)
  // Ej: "A", "X", "5", etc.
  subcategoria: string;
  
  // Dígitos 13-14: Medida (2 dígitos, vienen pre-asignados de la DB)
  // Ej: "80", "120", etc.
  medida: string;
  
  // Dígito 15: Dirección puerta (solo acepta 0, 1 o 2)
  direccionPuerta: "0" | "1" | "2";
}

/**
 * Función generarCodigoSV
 * 
 * Genera un código de producto de 15 dígitos basado en la configuración proporcionada.
 * 
 * Estructura del código:
 * - Posiciones 1-2:   Prefijo fijo "38"
 * - Posiciones 3-5:   Modelo de puerta (ej: "001")
 * - Posición 6:       Código de módulo (1 carácter alfanumérico)
 * - Posición 7:       Acabado (1 o 2)
 * - Posición 8:       Tirador (1 o 2)
 * - Posición 9:       Altura (0, 1 o 2)
 * - Posiciones 10-11: Categoría (2 dígitos)
 * - Posición 12:      Subcategoría (1 carácter alfanumérico)
 * - Posiciones 13-14: Medida (2 dígitos)
 * - Posición 15:      Dirección puerta (0, 1 o 2)
 * 
 * @param config Objeto ConfiguracionProducto con las opciones del producto
 * @returns String de exactamente 15 caracteres con el código generado
 */
export function generarCodigoSV(config: ConfiguracionProducto): string {
  // Paso 1: Prefijo fijo (posiciones 1-2)
  const prefijo = "38";
  
  // Paso 2: Modelo de puerta (posiciones 3-5)
  // padStart(3, "0") asegura que el modelo tenga 3 dígitos
  // Ej: "1" → "001", "12" → "012", "123" → "123"
  const modelo = config.modeloPuerta.padStart(3, "0");
  
  // Paso 3: Código de módulo (posición 6)
  // Solo toma el primer carácter para asegurar que sea alfanumérico de 1 carácter
  const modulo = config.codigoModulo.charAt(0);
  
  // Paso 4: Acabado (posición 7)
  // Validado por TypeScript (solo "1" o "2")
  const acabado = config.acabado;
  
  // Paso 5: Tirador (posición 8)
  // Validado por TypeScript (solo "1" o "2")
  const tirador = config.tirador;
  
  // Paso 6: Altura (posición 9)
  // Validado por TypeScript (solo "0", "1" o "2")
  const altura = config.altura;
  
  // Paso 7: Categoría (posiciones 10-11)
  // padStart(2, "0") asegura exactamente 2 dígitos
  // Ej: "5" → "05", "99" → "99"
  const categoria = config.categoria.padStart(2, "0");
  
  // Paso 8: Subcategoría (posición 12)
  // Solo toma el primer carácter para asegurar que sea 1 carácter alfanumérico
  const subcategoria = config.subcategoria.charAt(0);
  
  // Paso 9: Medida (posiciones 13-14)
  // padStart(2, "0") asegura exactamente 2 dígitos
  // Ej: "8" → "08", "80" → "80"
  const medida = config.medida.padStart(2, "0");
  
  // Paso 10: Dirección puerta (posición 15)
  // Validado por TypeScript (solo "0", "1" o "2")
  const direccion = config.direccionPuerta;
  
  // Paso 11: Concatenar todos los componentes
  const codigoCompleto = 
    prefijo +        // 2 caracteres
    modelo +         // 3 caracteres
    modulo +         // 1 carácter
    acabado +        // 1 carácter
    tirador +        // 1 carácter
    altura +         // 1 carácter
    categoria +      // 2 caracteres
    subcategoria +   // 1 carácter
    medida +         // 2 caracteres
    direccion;       // 1 carácter
                     // Total: 15 caracteres
  
  return codigoCompleto;
}

// ============================================================================
// EJEMPLO DE USO Y TESTING
// ============================================================================

/**
 * Objeto de ejemplo: Configuración de una puerta estándar
 * 
 * Este ejemplo simula un usuario que configura:
 * - Modelo 1 (se convierte a "001")
 * - Módulo A
 * - Acabado 1 (primera opción)
 * - Tirador 2 (segunda opción)
 * - Altura 0 (altura estándar)
 * - Categoría 10
 * - Subcategoría X
 * - Medida 80 (80cm)
 * - Dirección 1 (puerta derecha)
 */
export const ejemploProducto: ConfiguracionProducto = {
  modeloPuerta: "1",
  codigoModulo: "A",
  acabado: "1",
  tirador: "2",
  altura: "0",
  categoria: "10",
  subcategoria: "X",
  medida: "80",
  direccionPuerta: "1",
};

// Generar el código
const codigoGenerado = generarCodigoSV(ejemploProducto);

// Mostrar el resultado en consola
console.log("=== CONFIGURADOR DE PRODUCTOS - PROYECTO SV ===");
console.log("Configuración:", ejemploProducto);
console.log("Código generado:", codigoGenerado);
console.log("Longitud del código:", codigoGenerado.length);
console.log("=====================================");

// Validación: El código debe tener exactamente 15 caracteres
if (codigoGenerado.length === 15) {
  console.log("✓ El código generado es válido (15 dígitos)");
} else {
  console.log("✗ Error: El código no tiene 15 dígitos");
}
