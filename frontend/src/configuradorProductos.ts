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
  // Dígitos 3-5: Modelo de puerta (3 caracteres, ej: "001")
  modeloPuerta: string;
  
  // Dígito 6: Código de módulo (alfanumérico, 1 carácter)
  // Ej: "A", "B", "1", etc.
  codigoModulo: string;
  
  // Dígito 7: Acabado (0 = Base, 1 = Premium)
  acabado: -1 | 0 | 1;
  
  // Dígito 8: Tirador (0 = Sin tirador, 1 = Con tirador)
  tirador: -1 | 0 | 1;
  
  // Dígito 9: Altura (0 = Sin altura, 1 = 70cm, 2 = 80cm)
  altura: -1 | 0 | 1 | 2;
  
  // Dígitos 10-11: Categoría (2 caracteres, ej: "10", "99")
  categoria: string;
  
  // Dígito 12: Subcategoría (alfanumérico, 1 carácter)
  // Ej: "A", "X", "5", etc.
  subcategoria: string;
  
  // Dígitos 13-14: Medida (2 caracteres, vienen pre-asignados de la DB)
  // Ej: "80", "12", etc.
  medida: string;
  
  // Dígito 15: Dirección puerta (0 = Sin dirección, 1 = Izquierda, 2 = Derecha)
  direccionPuerta: -1 | 0 | 1 | 2;
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
 * - Posición 7:       Acabado (0 = Base, 1 = Premium)
 * - Posición 8:       Tirador (0 = Sin tirador, 1 = Con tirador)
 * - Posición 9:       Altura (0 = Sin altura, 1 = 70cm, 2 = 80cm)
 * - Posiciones 10-11: Categoría (2 dígitos)
 * - Posición 12:      Subcategoría (1 carácter alfanumérico)
 * - Posiciones 13-14: Medida (2 dígitos)
 * - Posición 15:      Dirección puerta (0 = Sin dirección, 1 = Izquierda, 2 = Derecha)
 * 
 * @param config Objeto ConfiguracionProducto con las opciones del producto
 * @returns String de exactamente 15 caracteres con el código generado
 */
export function generarCodigoSV(config: ConfiguracionProducto): string {
  const errorLongitud = () => {
    throw new Error("El código de producto generado no tiene la longitud válida");
  };

  const validarLongitudExacta = (valor: string, longitud: number) => {
    if (typeof valor !== "string" || valor.length !== longitud) errorLongitud();
  };

  const validarSeleccion = (valor: number, permitidos: readonly number[]) => {
    if (!permitidos.includes(valor)) errorLongitud();
  };

  // Prefijo fijo (posiciones 1-2)
  const prefijo = "38";

  // Reglas estrictas: no se arreglan datos (no padStart, no charAt, no defaults)
  validarLongitudExacta(config.modeloPuerta, 3);
  validarLongitudExacta(config.codigoModulo, 1);
  validarSeleccion(config.acabado, [0, 1] as const);
  validarSeleccion(config.tirador, [0, 1] as const);
  validarSeleccion(config.altura, [0, 1, 2] as const);
  validarLongitudExacta(config.categoria, 2);
  validarLongitudExacta(config.subcategoria, 1);
  validarLongitudExacta(config.medida, 2);
  validarSeleccion(config.direccionPuerta, [0, 1, 2] as const);

  const codigoCompleto =
    prefijo +
    config.modeloPuerta +
    config.codigoModulo +
    config.acabado.toString() +
    config.tirador.toString() +
    config.altura.toString() +
    config.categoria +
    config.subcategoria +
    config.medida +
    config.direccionPuerta.toString();

  return codigoCompleto;
}

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
  modeloPuerta: "001",
  codigoModulo: "A",
  acabado: 0,  // Base
  tirador: 1,  // Con tirador
  altura: 0,   // Sin altura
  categoria: "10",
  subcategoria: "X",
  medida: "80",
  direccionPuerta: 1,  // Izquierda
};
