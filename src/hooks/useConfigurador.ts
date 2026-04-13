import { useState, useMemo } from 'react';
import type { ConfiguracionProducto } from '../configuradorProductos';
import { generarCodigoSV } from '../configuradorProductos';

// Valores por defecto para inicializar el configurador
const CONFIGURACION_INICIAL: ConfiguracionProducto = {
  modeloPuerta: '1',
  codigoModulo: 'A',
  acabado: 0,           // Base
  tirador: 0,           // Sin tirador
  altura: 0,            // Sin altura
  categoria: '10',
  subcategoria: 'X',
  medida: '80',
  direccionPuerta: 0,   // Sin dirección
};

interface UseConfiguradoResult {
  config: ConfiguracionProducto;
  codigo: string;
  handleChange: (field: keyof ConfiguracionProducto, value: string | number) => void;
}

/**
 * Custom Hook: useConfigurador
 * 
 * Gestiona el estado del configurador de productos y calcula el código en tiempo real.
 * 
 * @returns Objeto con:
 *  - config: estado actual de la configuración
 *  - codigo: código generado de 15 dígitos
 *  - handleChange: función para actualizar cualquier campo
 */
export function useConfigurador(): UseConfiguradoResult {
  const [config, setConfig] = useState<ConfiguracionProducto>(CONFIGURACION_INICIAL);

  // Calcular el código en tiempo real usando useMemo para optimización
  const codigo = useMemo(() => {
    return generarCodigoSV(config);
  }, [config]);

  // Manejador de cambios que acepta cualquier campo de ConfiguracionProducto
  const handleChange = (field: keyof ConfiguracionProducto, value: string | number) => {
    setConfig((prevConfig) => ({
      ...prevConfig,
      [field]: value,
    }));
  };

  return {
    config,
    codigo,
    handleChange,
  };
}
