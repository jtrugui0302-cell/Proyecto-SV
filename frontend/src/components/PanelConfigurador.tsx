'use client';

import { useState } from 'react';
import { useConfigurador } from '../hooks/useConfigurador';
import { useCarrito } from '../hooks/useCarrito';
import { generarCodigoSV } from '../configuradorProductos';
import type { ItemCarrito } from '../types/carrito';

// Componentes Refactorizados
import { ConfiguradorHeader } from './ConfiguradorHeader';
import { SelectorControles } from './SelectorControles';
import { OpcionesDetalle } from './OpcionesDetalle';
import { VisorProducto } from './VisorProducto';
import { SidebarCarrito } from './SidebarCarrito';
import { ConfiguradorFooter } from './ConfiguradorFooter';

import { 
  traduccionAcabado, 
  traduccionTirador, 
  traduccionAltura, 
  traduccionMano 
} from '../utils/traducciones';

/**
 * Componente: PanelConfigurador (Orquestador)
 * 
 * Responsabilidad: Coordinar el estado del configurador y el carrito,
 * distribuyendo las propiedades a los sub-componentes especializados.
 * Sigue el patrón Container/Presenter.
 */
export function PanelConfigurador() {
  // HOOKS DE ESTADO Y LÓGICA
  const { config, handleChange } = useConfigurador();
  const { items, totalPedido, agregarItem, eliminarItem, actualizarCantidad } = useCarrito();
  
  const [cantidad, setCantidad] = useState(1);
  const [errorValidacion, setErrorValidacion] = useState<string | null>(null);
  
  const PRECIO_BASE = 150.00;

  // MANEJADORES DE EVENTOS
  const incrementarCantidad = () => setCantidad((prev) => prev + 1);
  const decrementarCantidad = () => setCantidad((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAgregarAlCarrito = () => {
    const faltantes: string[] = [];

    if (!config.modeloPuerta) faltantes.push('Modelo');
    if (!config.codigoModulo) faltantes.push('Módulo');
    if (!config.categoria) faltantes.push('Categoría');
    if (!config.subcategoria) faltantes.push('Subcategoría');
    if (!config.medida) faltantes.push('Medida');
    if (config.acabado === -1) faltantes.push('Acabado');
    if (config.tirador === -1) faltantes.push('Tirador');
    if (config.altura === -1) faltantes.push('Altura');
    if (config.direccionPuerta === -1) faltantes.push('Mano');

    if (faltantes.length > 0) {
      setErrorValidacion(`Por favor, selecciona: ${faltantes.join(', ')}`);
      return;
    }

    setErrorValidacion(null);

    let codigoProducto: string;
    try {
      codigoProducto = generarCodigoSV(config);
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Error de configuración';
      setErrorValidacion(message);
      return;
    }

    const id = globalThis.crypto?.randomUUID?.() ?? Date.now().toString();
    const titulo = `Modelo ${config.modeloPuerta} - Módulo ${config.codigoModulo}`;
    const detalles = [
      `Código ${codigoProducto}`,
      `Categoría ${config.categoria}`,
      `Subcategoría ${config.subcategoria}`,
      `Medida ${config.medida}`,
      traduccionAcabado(config.acabado),
      traduccionTirador(config.tirador),
      traduccionAltura(config.altura),
      traduccionMano(config.direccionPuerta),
    ].join(', ');

    const nuevoItem: ItemCarrito = {
      id,
      titulo,
      detalles,
      cantidad,
      precioUnitario: PRECIO_BASE,
      precioTotal: cantidad * PRECIO_BASE,
    };

    agregarItem(nuevoItem);
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col">
      <ConfiguradorHeader />

      <SelectorControles 
        config={config} 
        handleChange={handleChange} 
      />

      <main className="w-full px-4 md:px-8 xl:px-12 grid grid-cols-12 gap-8 py-6 flex-1">
        <OpcionesDetalle 
          config={config}
          cantidad={cantidad}
          errorValidacion={errorValidacion}
          handleChange={handleChange}
          onIncrementar={incrementarCantidad}
          onDecrementar={decrementarCantidad}
          onSetCantidad={setCantidad}
          onAgregar={handleAgregarAlCarrito}
        />

        <VisorProducto 
          cantidad={cantidad} 
          precioBase={PRECIO_BASE} 
        />

        <SidebarCarrito 
          items={items}
          totalPedido={totalPedido}
          onEliminar={eliminarItem}
          onActualizarCantidad={actualizarCantidad}
        />
      </main>

      <ConfiguradorFooter />
    </div>
  );
}
