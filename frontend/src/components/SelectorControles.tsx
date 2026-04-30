import React from 'react';
import { RadioButton } from './RadioButton';
import type { ConfiguracionProducto } from '../configuradorProductos';
import { useDiccionarios } from '../hooks/useDiccionarios';

interface SelectorControlesProps {
  config: ConfiguracionProducto;
  handleChange: (field: keyof ConfiguracionProducto, value: string | number) => void;
}

/**
 * Componente: SelectorControles
 * Responsabilidad: Agrupar los selectores principales de configuración en la parte superior.
 */
export function SelectorControles({ config, handleChange }: SelectorControlesProps) {
  const { modelos, modulos, isLoading, isError } = useDiccionarios();

  if (isError) return <div className="text-red-500 text-center py-4">Error al cargar los datos del servidor.</div>;

  return (
    <div className="w-full px-4 md:px-8 xl:px-12 py-6 flex justify-center">
      <div className="flex flex-wrap gap-4 w-full justify-center">
        {/* Modelo Puerta */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex-1 min-w-[150px] flex flex-col items-center justify-center text-center">
          <label className="text-xs font-bold text-[#00aec7] uppercase mb-2">
            Modelo de Puerta
          </label>
          <select
            value={config.modeloPuerta}
            onChange={(e) => handleChange('modeloPuerta', e.target.value)}
            className="w-full px-2 py-1 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00aec7] focus:border-transparent bg-white cursor-pointer text-center"
            disabled={isLoading}
          >
            <option value="" disabled>{isLoading ? 'Cargando...' : 'Selecciona...'}</option>
            {modelos.map((m) => (
              <option key={m.id} value={m.id}>{m.modelo}</option>
            ))}
          </select>
        </div>

        {/* Código Módulo */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex-1 min-w-[150px] flex flex-col items-center justify-center text-center">
          <label className="text-xs font-bold text-[#00aec7] uppercase mb-2">
            Color del Módulo
          </label>
          <select
            value={config.codigoModulo}
            onChange={(e) => handleChange('codigoModulo', e.target.value)}
            className="w-full px-2 py-1 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00aec7] focus:border-transparent bg-white cursor-pointer text-center"
            disabled={isLoading}
          >
            <option value="" disabled>{isLoading ? 'Cargando...' : 'Selecciona...'}</option>
            {modulos.map((m) => (
              <option key={m.id} value={m.codigo_modulo}>{m.descripcion}</option>
            ))}
          </select>
        </div>

        {/* Acabado */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex-1 min-w-[150px] flex flex-col items-center justify-center text-center">
          <label className="text-xs font-bold text-[#00aec7] uppercase mb-2">
            Acabado
          </label>
          <div className="flex gap-2">
            <RadioButton
              label="Base"
              value={0}
              selectedValue={config.acabado}
              onChange={(value) => handleChange('acabado', value)}
            />
            <RadioButton
              label="Premium"
              value={1}
              selectedValue={config.acabado}
              onChange={(value) => handleChange('acabado', value)}
            />
          </div>
        </div>

        {/* Tirador */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex-1 min-w-[150px] flex flex-col items-center justify-center text-center">
          <label className="text-xs font-bold text-[#00aec7] uppercase mb-2">
            Tirador
          </label>
          <div className="flex gap-2 flex-wrap justify-center">
            <RadioButton
              label="Sin Tirador"
              value={0}
              selectedValue={config.tirador}
              onChange={(value) => handleChange('tirador', value)}
            />
            <RadioButton
              label="Con Tirador"
              value={1}
              selectedValue={config.tirador}
              onChange={(value) => handleChange('tirador', value)}
            />
          </div>
        </div>

        {/* Altura */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex-1 min-w-[150px] flex flex-col items-center justify-center text-center">
          <label className="text-xs font-bold text-[#00aec7] uppercase mb-2">
            Altura
          </label>
          <div className="flex gap-2 flex-wrap justify-center">
            <RadioButton
              label="Modulos Altos"
              value={0}
              selectedValue={config.altura}
              onChange={(value) => handleChange('altura', value)}
            />
            <RadioButton
              label="Modulos 70"
              value={1}
              selectedValue={config.altura}
              onChange={(value) => handleChange('altura', value)}
            />
            <RadioButton
              label="Modulos 80"
              value={2}
              selectedValue={config.altura}
              onChange={(value) => handleChange('altura', value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
