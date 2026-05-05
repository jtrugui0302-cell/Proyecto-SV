import { useState, useEffect } from 'react';
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

// URL base de la API (en un proyecto real esto iría en un archivo .env)
const API_BASE_URL = 'http://localhost:8000/api/diccionarios';

export function useDiccionarios() {
  const [modulos, setModulos] = useState<Modulo[]>([]);
  const [modelos, setModelos] = useState<ModeloMaterial[]>([]);
  const [categoriasData, setCategoriasData] = useState<ArticuloCategorizacion[]>([]);
  const [categoriasUnicas, setCategoriasUnicas] = useState<{ cod_categoria: string; nombre_categoria: string }[]>([]);
  
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    async function fetchDiccionarios() {
      try {
        const [resModulos, resModelos, resCategorias] = await Promise.all([
          fetch(`${API_BASE_URL}/modulos`),
          fetch(`${API_BASE_URL}/modelos`),
          fetch(`${API_BASE_URL}/categorias`)
        ]);

        if (!resModulos.ok || !resModelos.ok || !resCategorias.ok) {
          throw new Error('Error fetching data from server');
        }

        const rawModulos = await resModulos.json();
        const rawModelos = await resModelos.json();
        const rawCategorias = await resCategorias.json();

        if (isMounted) {
          const modulosAdaptados = moduloAdapter(rawModulos) || [];
          const modelosAdaptados = modeloMaterialAdapter(rawModelos) || [];
          const categoriasAdaptadas = articulosCategorizacionAdapter(rawCategorias) || [];

          // Derivar las categorías principales únicas (eliminando duplicados).
          const unicas = Array.from(
            new Map(
              categoriasAdaptadas.map((c) => [
                c.cod_categoria, 
                { cod_categoria: c.cod_categoria, nombre_categoria: c.nombre_categoria }
              ])
            ).values()
          );

          setModulos(modulosAdaptados);
          setModelos(modelosAdaptados);
          setCategoriasData(categoriasAdaptadas);
          setCategoriasUnicas(unicas);
          setIsLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          console.error('Error in useDiccionarios:', error);
          setIsError(true);
          setIsLoading(false);
        }
      }
    }

    fetchDiccionarios();

    return () => {
      isMounted = false;
    };
  }, []); // Dependencias vacías para asegurar que se ejecute una sola vez al montar

  return {
    modulos,
    modelos,
    categoriasData,
    categoriasUnicas,
    isLoading,
    isError,
  };
}
