import type { Modulo, ModeloMaterial, ArticuloCategorizacion } from '../hooks/useDiccionarios';

/**
 * Adaptador para la tabla de Módulos.
 * Transforma los datos del backend a un formato más semántico y seguro.
 */
export const moduloAdapter = (data: any): Modulo[] => {
  if (!Array.isArray(data)) return [];
  
  return data.map((item) => ({
    id: Number(item.id) || 0,
    codigo_modulo: String(item.codigo_modulo || ''),
    descripcion: String(item.descripcion || 'Sin descripción'),
  }));
};

/**
 * Adaptador para Modelos de Puerta.
 */
export const modeloMaterialAdapter = (data: any): ModeloMaterial[] => {
  if (!Array.isArray(data)) return [];

  return data.map((item) => ({
    id: String(item.id || ''),
    grupo_modelo: String(item.grupo_modelo || ''),
    modelo: String(item.modelo || 'Modelo Desconocido'),
  }));
};

/**
 * Adaptador para Categorización de Artículos.
 */
export const articulosCategorizacionAdapter = (data: any): ArticuloCategorizacion[] => {
  if (!Array.isArray(data)) return [];

  return data.map((item) => ({
    id: Number(item.id) || 0,
    nombre_categoria: String(item.nombre_categoria || 'General'),
    cod_categoria: String(item.cod_categoria || ''),
    nombre_subcategoria: String(item.nombre_subcategoria || 'Varios'),
    cod_subcategoria: String(item.cod_subcategoria || ''),
    url: String(item.url || ''),
  }));
};
