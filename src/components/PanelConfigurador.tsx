'use client';

import { useState } from 'react';
import { useConfigurador } from '../hooks/useConfigurador';

interface RadioOptionProps {
  label: string;
  value: number | string;
  selectedValue: number | string;
  onChange: (value: number | string) => void;
  key?: string;
}

/**
 * Componente RadioButton Moderno
 * Botón tipo radio con estilo Tailwind CSS
 */
function RadioButton({
  label,
  value,
  selectedValue,
  onChange,
}: RadioOptionProps) {
  const isSelected = selectedValue === value;

  return (
    <label className="flex items-center cursor-pointer">
      <input
        type="radio"
        name="radio-option"
        value={value}
        checked={isSelected}
        onChange={(e) => onChange(isNaN(Number(e.target.value)) ? e.target.value : Number(e.target.value))}
        className="hidden"
      />
      <div
        className={`
          px-3 py-2 text-sm rounded-lg border-2 transition-all duration-200
          ${
            isSelected
              ? 'border-blue-500 bg-blue-50 text-blue-700 font-semibold'
              : 'border-gray-300 bg-white text-gray-700 hover:border-blue-300'
          }
        `}
      >
        {label}
      </div>
    </label>
  );
}

/**
 * Componente PanelConfigurador
 * 
 * Layout basado en wireframe:
 * - Header: Barra negra administrativa
 * - Fila de controles: Modelo, Módulo, Acabado, Tirador, Altura (horizontal)
 * - Grid 3 columnas: Izq (Categoría/Cantidad) | Centro (Imagen) | Der (Carrito)
 */
export function PanelConfigurador() {
  const { config, codigo: _codigo, handleChange } = useConfigurador();
  const [cantidad, setCantidad] = useState(1);

  const incrementarCantidad = () => setCantidad((prev) => prev + 1);
  const decrementarCantidad = () => setCantidad((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col">
      {/* ================================================================
          HEADER: BARRA NEGRA ADMINISTRATIVA
          ================================================================ */}
      <header className="w-full bg-black text-white p-4 font-bold">
        Barra de navegación para administradores
      </header>

      {/* ================================================================
          FILA DE CONTROLES PRINCIPALES
          ================================================================ */}
      <div className="w-full px-4 md:px-8 xl:px-12 flex flex-row flex-wrap gap-4 py-6 justify-center bg-white border-b">
        {/* Modelo Puerta */}
        <div className="w-auto">
          <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase">
            Modelo
          </label>
          <select
            value={config.modeloPuerta}
            onChange={(e) => handleChange('modeloPuerta', e.target.value)}
            className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white cursor-pointer"
          >
            <option value="1">Modelo 1</option>
            <option value="2">Modelo 2</option>
            <option value="3">Modelo 3</option>
            <option value="4">Modelo 4</option>
            <option value="5">Modelo 5</option>
          </select>
        </div>

        {/* Código Módulo */}
        <div className="w-auto">
          <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase">
            Módulo
          </label>
          <select
            value={config.codigoModulo}
            onChange={(e) => handleChange('codigoModulo', e.target.value)}
            className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white cursor-pointer"
          >
            <option value="A">Módulo A</option>
            <option value="B">Módulo B</option>
            <option value="C">Módulo C</option>
            <option value="1">Módulo 1</option>
            <option value="2">Módulo 2</option>
          </select>
        </div>

        {/* Acabado */}
        <div className="w-auto">
          <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase">
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
        <div className="w-auto">
          <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase">
            Tirador
          </label>
          <div className="flex gap-2">
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
        <div className="w-auto">
          <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase">
            Altura
          </label>
          <div className="flex gap-2">
            <RadioButton
              label="Altos"
              value={0}
              selectedValue={config.altura}
              onChange={(value) => handleChange('altura', value)}
            />
            <RadioButton
              label="Bajos de 70"
              value={1}
              selectedValue={config.altura}
              onChange={(value) => handleChange('altura', value)}
            />
            <RadioButton
              label="Bajos de 80"
              value={2}
              selectedValue={config.altura}
              onChange={(value) => handleChange('altura', value)}
            />
          </div>
        </div>
      </div>

      {/* ================================================================
          CUERPO CENTRAL: GRID 3 COLUMNAS
          ================================================================ */}
      <div className="w-full px-4 md:px-8 xl:px-12 grid grid-cols-12 gap-8 py-6 flex-1">
        {/* ============================================================
            COLUMNA IZQUIERDA: CATEGORÍA, SUBCATEGORÍA, CANTIDAD, CARRITO
            ============================================================ */}
        <div className="col-span-12 md:col-span-3 flex flex-col gap-6">
          {/* Categoría */}
          <div className="bg-white p-4 rounded-lg shadow">
            <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase">
              Categoría
            </label>
            <select
              value={config.categoria}
              onChange={(e) => handleChange('categoria', e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white cursor-pointer"
            >
              <option value="10">Categoría 10</option>
              <option value="20">Categoría 20</option>
              <option value="30">Categoría 30</option>
              <option value="40">Categoría 40</option>
              <option value="50">Categoría 50</option>
            </select>
          </div>

          {/* Subcategoría */}
          <div className="bg-white p-4 rounded-lg shadow">
            <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase">
              Subcategoría
            </label>
            <select
              value={config.subcategoria}
              onChange={(e) => handleChange('subcategoria', e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white cursor-pointer"
            >
              <option value="X">Subcategoría X</option>
              <option value="Y">Subcategoría Y</option>
              <option value="Z">Subcategoría Z</option>
              <option value="A">Subcategoría A</option>
              <option value="B">Subcategoría B</option>
            </select>
          </div>

          {/* Medida */}
          <div className="bg-white p-4 rounded-lg shadow">
            <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase">
              Medida
            </label>
            <select
              value={config.medida}
              onChange={(e) => handleChange('medida', e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white cursor-pointer"
            >
              <option value="60">Medida 60</option>
              <option value="80">Medida 80</option>
              <option value="100">Medida 100</option>
              <option value="120">Medida 120</option>
              <option value="150">Medida 150</option>
            </select>
          </div>

          {/* Mano (Dirección) */}
          <div className="bg-white p-4 rounded-lg shadow">
            <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase">
              Mano
            </label>
            <div className="flex flex-col gap-2">
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

          {/* Control de Cantidad */}
          <div className="bg-white p-4 rounded-lg shadow mt-auto">
            <label className="block text-xs font-semibold text-gray-700 mb-3 uppercase">
              Cantidad
            </label>
            <div className="flex items-center gap-3">
              <button
                onClick={decrementarCantidad}
                className="w-10 h-10 rounded-lg border-2 border-gray-300 text-gray-700 hover:border-blue-500 hover:bg-blue-50 transition-all font-bold"
              >
                −
              </button>
              <input
                type="number"
                value={cantidad}
                onChange={(e) => setCantidad(Math.max(1, parseInt(e.target.value) || 1))}
                className="flex-1 text-center px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={incrementarCantidad}
                className="w-10 h-10 rounded-lg border-2 border-gray-300 text-gray-700 hover:border-blue-500 hover:bg-blue-50 transition-all font-bold"
              >
                +
              </button>
            </div>
          </div>

          {/* Botón Añadir al Carrito */}
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-all duration-200 shadow">
            Añadir al Carrito
          </button>
        </div>

        {/* ============================================================
            COLUMNA CENTRAL: VISOR DE IMAGEN
            ============================================================ */}
        <div className="col-span-12 md:col-span-6 flex items-center justify-center">
          <div className="w-full h-full aspect-video min-h-[500px] border-4 border-black bg-white flex items-center justify-center font-bold text-xl">
            imagen
          </div>
        </div>

        {/* ============================================================
            COLUMNA DERECHA: SIDEBAR PEDIDO
            ============================================================ */}
        <div className="col-span-12 md:col-span-3 flex flex-col border-4 border-black bg-white p-4">
          <h2 className="text-center font-bold text-gray-800 mb-4">
            lista de artículos incluidos
          </h2>

          {/* Área vacía central */}
          <div className="flex-1 border-2 border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-center">
            <p className="text-gray-400 text-sm text-center">No hay artículos aún</p>
          </div>

          {/* Botón Finalizar Pedido */}
          <button className="mt-auto border-4 border-black p-2 text-center font-bold w-full hover:bg-gray-100 transition-all">
            finalizar pedido
          </button>
        </div>
      </div>
    </div>
  );
}
