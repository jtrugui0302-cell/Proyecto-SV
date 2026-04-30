import useSWR from 'swr';
import { 
  moduloAdapter, 
  modeloMaterialAdapter, 
  articulosCategorizacionAdapter 
} from '../adapters/diccionarios.adapter';

// Definimos los tipos de datos basándonos en lo que envía el backend
export interface Modulo {
  id: number;
  codigo_modulo: string;
  descripcion: string;
}

export interface ModeloMaterial {
  id: string;
  grupo_modelo: string;
  modelo: string;
}

export interface ArticuloCategorizacion {
  id: number;
  nombre_categoria: string;
  cod_categoria: string;
  nombre_subcategoria: string;
  cod_subcategoria: string;
  url: string;
}

// Función fetcher genérica para SWR
const fetcher = (url: string) => fetch(url).then((res) => res.json());

// URL base de la API (en un proyecto real esto iría en un archivo .env)
const API_BASE_URL = 'http://localhost:8000/api/diccionarios';

export function useDiccionarios() {
  // SWR maneja el caching, deduplicación, reintentos y estados de carga automáticamente.
  const { data: rawModulos, error: errorModulos, isLoading: loadingModulos } = useSWR(
    `${API_BASE_URL}/modulos`,
    fetcher
  );

  const { data: rawModelos, error: errorModelos, isLoading: loadingModelos } = useSWR(
    `${API_BASE_URL}/modelos`,
    fetcher
  );

  const { data: rawCategorias, error: errorCategorias, isLoading: loadingCategorias } = useSWR(
    `${API_BASE_URL}/categorias`,
    fetcher
  );

  // APLICAMOS LOS ADAPTADORES para blindar los datos
  const modulos = moduloAdapter(rawModulos);
  const modelos = modeloMaterialAdapter(rawModelos);
  const categoriasData = articulosCategorizacionAdapter(rawCategorias);

  // Derivar las categorías principales únicas (eliminando duplicados).
  const categoriasUnicas = Array.from(
    new Map(
      categoriasData.map((c) => [
        c.cod_categoria, 
        { cod_categoria: c.cod_categoria, nombre_categoria: c.nombre_categoria }
      ])
    ).values()
  );

  return {
    // Datos crudos
    modulos: modulos || [],
    modelos: modelos || [],
    categoriasData: categoriasData || [],
    
    // Datos derivados
    categoriasUnicas,

    // Estados combinados
    isLoading: loadingModulos || loadingModelos || loadingCategorias,
    isError: errorModulos || errorModelos || errorCategorias,
  };
}
