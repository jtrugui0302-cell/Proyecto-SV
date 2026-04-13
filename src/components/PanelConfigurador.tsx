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
          px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200
          ${
            isSelected
              ? 'bg-[#00aec7] text-white shadow-md hover:bg-[#0098a6] border border-[#00aec7]'
              : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100'
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
  const PRECIO_BASE = 150.00;

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
      <div className="w-full px-4 md:px-8 xl:px-12 py-6 flex justify-center">
        <div className="flex flex-wrap gap-4 w-full justify-center">
          {/* Modelo Puerta */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex-1 min-w-[150px] flex flex-col items-center justify-center text-center">
            <label className="text-xs font-bold text-[#00aec7] uppercase mb-2">
              Modelo
            </label>
            <select
              value={config.modeloPuerta}
              onChange={(e) => handleChange('modeloPuerta', e.target.value)}
              className="w-full px-2 py-1 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00aec7] focus:border-transparent bg-white cursor-pointer text-center"
            >
              <option value="1">Modelo 1</option>
              <option value="2">Modelo 2</option>
              <option value="3">Modelo 3</option>
              <option value="4">Modelo 4</option>
              <option value="5">Modelo 5</option>
            </select>
          </div>

          {/* Código Módulo */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex-1 min-w-[150px] flex flex-col items-center justify-center text-center">
            <label className="text-xs font-bold text-[#00aec7] uppercase mb-2">
              Módulo
            </label>
            <select
              value={config.codigoModulo}
              onChange={(e) => handleChange('codigoModulo', e.target.value)}
              className="w-full px-2 py-1 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00aec7] focus:border-transparent bg-white cursor-pointer text-center"
            >
              <option value="A">Módulo A</option>
              <option value="B">Módulo B</option>
              <option value="C">Módulo C</option>
              <option value="1">Módulo 1</option>
              <option value="2">Módulo 2</option>
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
                label="Altos"
                value={0}
                selectedValue={config.altura}
                onChange={(value) => handleChange('altura', value)}
              />
              <RadioButton
                label="Bajos 70"
                value={1}
                selectedValue={config.altura}
                onChange={(value) => handleChange('altura', value)}
              />
              <RadioButton
                label="Bajos 80"
                value={2}
                selectedValue={config.altura}
                onChange={(value) => handleChange('altura', value)}
              />
            </div>
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
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
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
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
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
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
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
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
            <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase">
              Mano
            </label>
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

          {/* Control de Cantidad */}
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 mt-auto">
            <label className="block text-xs font-semibold text-gray-700 mb-3 uppercase">
              Cantidad
            </label>
            <div className="flex items-center gap-3 mb-4">
              <button
                onClick={decrementarCantidad}
                className="w-10 h-10 rounded-lg border-2 border-gray-300 text-gray-700 hover:border-[#00aec7] hover:bg-blue-50 transition-all font-bold"
              >
                −
              </button>
              <input
                type="number"
                value={cantidad}
                onChange={(e) => setCantidad(Math.max(1, parseInt(e.target.value) || 1))}
                className="flex-1 text-center px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00aec7]"
              />
              <button
                onClick={incrementarCantidad}
                className="w-10 h-10 rounded-lg border-2 border-gray-300 text-gray-700 hover:border-[#00aec7] hover:bg-blue-50 transition-all font-bold"
              >
                +
              </button>
            </div>
          </div>

          {/* Botón Añadir al Carrito */}
          <button className="w-full bg-[#eb5c00] hover:bg-[#c94e00] text-white text-lg font-bold py-3 rounded-xl shadow-lg transition-all duration-200 w-full mt-4 transform hover:shadow-xl">
            Añadir al Carrito
          </button>
        </div>

        {/* ============================================================
            COLUMNA CENTRAL: VISOR DE IMAGEN
            ============================================================ */}
        <div className="col-span-12 md:col-span-4 flex flex-col items-center justify-center">
          <div className="w-full max-w-[800px] aspect-square mx-auto border border-gray-300 bg-white rounded-xl flex items-center justify-center font-bold text-gray-400 text-xl shadow-sm">
            imagen
          </div>

          {/* Tarjeta de Precio */}
          <div className="w-full max-w-[280px] mx-auto mt-6 bg-white border-2 border-[#00aec7] rounded-xl p-4 text-center shadow-md">
            <p className="text-sm text-gray-500 mb-1">
              Precio Unitario: <span className="font-semibold text-gray-700">{PRECIO_BASE.toFixed(2)}€</span>
            </p>
            <p className="text-2xl font-bold text-[#00aec7]">
              Total: {(cantidad * PRECIO_BASE).toFixed(2)}€
            </p>
          </div>
        </div>

        {/* ============================================================
            COLUMNA DERECHA: SIDEBAR PEDIDO
            ============================================================ */}
        <div className="col-span-12 md:col-span-5 flex flex-col bg-slate-50 rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-center font-bold text-gray-800 mb-4 text-lg uppercase tracking-wide">
            Resumen del Pedido
          </h2>

          {/* Área vacía central */}
          <div className="flex-1 border-2 border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-center">
            <p className="text-gray-400 text-sm text-center italic">No hay artículos aún</p>
          </div>

          {/* Botón Finalizar Pedido */}
          <button className="mt-6 bg-[#eb5c00] hover:bg-[#c94e00] text-white font-bold py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl w-full">
            Finalizar Pedido
          </button>
        </div>
      </div>
    </div>
  );
}
