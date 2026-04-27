import React from 'react';
import { RadioButton } from './RadioButton';
import type { ConfiguracionProducto } from '../configuradorProductos';
import { 
  traduccionAcabado, 
  traduccionTirador, 
  traduccionAltura, 
  traduccionMano 
} from '../utils/traducciones';

interface OpcionesDetalleProps {
  config: ConfiguracionProducto;
  cantidad: number;
  errorValidacion: string | null;
  handleChange: (field: keyof ConfiguracionProducto, value: string | number) => void;
  onIncrementar: () => void;
  onDecrementar: () => void;
  onSetCantidad: (val: number) => void;
  onAgregar: () => void;
}

/**
 * Componente: OpcionesDetalle
 * Responsabilidad: Control de categorías, subcategorías, medidas, mano y cantidad.
 * Incluye el resumen de selección y el disparador para añadir al carrito.
 */
export function OpcionesDetalle({
  config,
  cantidad,
  errorValidacion,
  handleChange,
  onIncrementar,
  onDecrementar,
  onSetCantidad,
  onAgregar,
}: OpcionesDetalleProps) {
  return (
    <div className="col-span-12 lg:col-span-3 flex flex-col gap-6">
      {/* Categoría */}
      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
        <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase">Categoría</label>
        <select
          value={config.categoria}
          onChange={(e) => handleChange('categoria', e.target.value)}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white cursor-pointer"
        >
          <option value="" disabled>Selecciona...</option>
          <option value="05">Categoría 05</option>
          <option value="10">Categoría 10</option>
          <option value="15">Categoría 15</option>
          <option value="20">Categoría 20</option>
          <option value="25">Categoría 25</option>
        </select>
      </div>

      {/* Subcategoría */}
      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
        <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase">Subcategoría</label>
        <select
          value={config.subcategoria}
          onChange={(e) => handleChange('subcategoria', e.target.value)}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white cursor-pointer"
        >
          <option value="" disabled>Selecciona...</option>
          <option value="X">Subcategoría X</option>
          <option value="Y">Subcategoría Y</option>
          <option value="Z">Subcategoría Z</option>
          <option value="A">Subcategoría A</option>
          <option value="B">Subcategoría B</option>
        </select>
      </div>

      {/* Medida */}
      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
        <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase">Medida</label>
        <select
          value={config.medida}
          onChange={(e) => handleChange('medida', e.target.value)}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white cursor-pointer"
        >
          <option value="" disabled>Selecciona...</option>
          <option value="60">Medida 60</option>
          <option value="80">Medida 80</option>
          <option value="10">Medida 100</option>
          <option value="12">Medida 120</option>
          <option value="15">Medida 150</option>
        </select>
      </div>

      {/* Mano (Dirección) */}
      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
        <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase">Mano</label>
        <div className="flex flex-row flex-wrap gap-2">
          <RadioButton
            label="Sin mano"
            value={0}
            selectedValue={config.direccionPuerta}
            onChange={(value) => handleChange('direccionPuerta', value)}
          />
          <RadioButton
            label="Izquierda"
            value={1}
            selectedValue={config.direccionPuerta}
            onChange={(value) => handleChange('direccionPuerta', value)}
          />
          <RadioButton
            label="Derecha"
            value={2}
            selectedValue={config.direccionPuerta}
            onChange={(value) => handleChange('direccionPuerta', value)}
          />
        </div>
      </div>

      {/* Resumen de Configuración */}
      <div className="bg-slate-50 p-4 rounded-xl shadow-inner border border-gray-200 mt-2">
        <h3 className="text-xs font-bold text-[#00aec7] uppercase tracking-wider mb-3">Resumen de Selección</h3>
        <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-gray-600">
          <li><span className="font-semibold text-gray-800">Modelo:</span> {config.modeloPuerta || '-'}</li>
          <li><span className="font-semibold text-gray-800">Módulo:</span> {config.codigoModulo || '-'}</li>
          <li><span className="font-semibold text-gray-800">Categoría:</span> {config.categoria || '-'}</li>
          <li><span className="font-semibold text-gray-800">Subcategoría:</span> {config.subcategoria || '-'}</li>
          <li><span className="font-semibold text-gray-800">Medida:</span> {config.medida || '-'}</li>
          <li><span className="font-semibold text-gray-800">Acabado:</span> {traduccionAcabado(config.acabado)}</li>
          <li><span className="font-semibold text-gray-800">Tirador:</span> {traduccionTirador(config.tirador)}</li>
          <li><span className="font-semibold text-gray-800">Altura:</span> {traduccionAltura(config.altura)}</li>
          <li className="col-span-2"><span className="font-semibold text-gray-800">Mano:</span> {traduccionMano(config.direccionPuerta)}</li>
        </ul>
      </div>

      {/* Control de Cantidad */}
      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 mt-auto">
        <label className="block text-xs font-semibold text-gray-700 mb-3 uppercase">Cantidad</label>
        <div className="flex items-center gap-3 mb-4">
          <button onClick={onDecrementar} className="w-10 h-10 rounded-lg border-2 border-gray-300 hover:border-[#00aec7] transition-all font-bold">−</button>
          <input
            type="number"
            value={cantidad}
            onChange={(e) => onSetCantidad(Math.max(1, parseInt(e.target.value) || 1))}
            className="flex-1 text-center px-3 py-2 border border-gray-300 rounded-lg"
          />
          <button onClick={onIncrementar} className="w-10 h-10 rounded-lg border-2 border-gray-300 hover:border-[#00aec7] transition-all font-bold">+</button>
        </div>
      </div>

      {errorValidacion && <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-bold">{errorValidacion}</div>}

      <button
        onClick={onAgregar}
        className="w-full bg-[#eb5c00] hover:bg-[#c94e00] text-white text-lg font-bold py-3 rounded-xl shadow-lg transition-all transform hover:shadow-xl"
      >
        Añadir al Carrito
      </button>
    </div>
  );
}
