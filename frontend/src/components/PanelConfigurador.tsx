'use client';

import { useState } from 'react';
import { useConfigurador } from '../hooks/useConfigurador';
import { generarCodigoSV } from '../configuradorProductos';

interface RadioOptionProps {
  label: string;
  value: number | string;
  selectedValue: number | string;
  onChange: (value: number | string) => void;
  key?: string;
}

export interface ItemCarrito {
  id: string;
  titulo: string; // Ej: "Modelo 3 - Módulo 1"
  detalles: string; // Ej: "Categoría 10, Premium, Con Tirador..."
  cantidad: number;
  precioUnitario: number;
  precioTotal: number;
}

// ============================================================================
// FUNCIONES DE TRADUCCIÓN (View Model)
// ============================================================================

const traduccionAcabado = (valor: number | string): string => {
  const map: Record<string, string> = { '0': 'Base', '1': 'Premium' };
  return map[String(valor)] || '-';
};

const traduccionTirador = (valor: number | string): string => {
  const map: Record<string, string> = { '0': 'Sin Tirador', '1': 'Con Tirador' };
  return map[String(valor)] || '-';
};

const traduccionAltura = (valor: number | string): string => {
  const map: Record<string, string> = { '0': 'Altos', '1': 'Bajos de 70', '2': 'Bajos de 80' };
  return map[String(valor)] || '-';
};

const traduccionMano = (valor: number | string): string => {
  const map: Record<string, string> = { '0': 'Sin mano', '1': 'Izquierda', '2': 'Derecha' };
  return map[String(valor)] || '-';
};

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
          ${isSelected
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
  const [carrito, setCarrito] = useState<ItemCarrito[]>([]);
  const [errorValidacion, setErrorValidacion] = useState<string | null>(null);
  const PRECIO_BASE = 150.00;

  const incrementarCantidad = () => setCantidad((prev) => prev + 1);
  const decrementarCantidad = () => setCantidad((prev) => (prev > 1 ? prev - 1 : 1));

  const agregarAlCarrito = () => {
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

    // En el render no debemos romper React, pero al "Añadir al carrito" sí mostramos el error de dominio.
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

    const precioUnitario = PRECIO_BASE;
    const precioTotal = cantidad * PRECIO_BASE;

    const nuevoItem: ItemCarrito = {
      id,
      titulo,
      detalles,
      cantidad,
      precioUnitario,
      precioTotal,
    };

    setCarrito((prev) => [...prev, nuevoItem]);
  };

  const eliminarDelCarrito = (id: string) => {
    setCarrito((prev) => prev.filter((item) => item.id !== id));
  };

  const actualizarCantidadCarrito = (id: string, variacion: number) => {
    setCarrito((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;

        const nuevaCantidad = item.cantidad + variacion;
        if (nuevaCantidad < 1) return item;

        return {
          ...item,
          cantidad: nuevaCantidad,
          precioTotal: nuevaCantidad * item.precioUnitario,
        };
      }),
    );
  };

  const totalPedido = carrito.reduce((acc, item) => acc + item.precioTotal, 0);

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col">
      {/* ================================================================
          HEADER
          ================================================================ */}
      <header className="w-full bg-white shadow-sm border-b-4 border-[#eb5c00]">
        <div className="px-4 md:px-12 xl:px-16 py-4 flex items-center gap-4">
          <img
            src="/logo-santiago-vargas.png"
            alt="Logo Santiago Vargas"
            className="h-16 w-auto object-contain pb-2"
          />
          <p className="text-3xl font-extrabold text-[#00aec7] uppercase tracking-wide ps-10">
            Configurador de muebles
          </p>
        </div>
      </header>

      {/* ================================================================
          FILA DE CONTROLES PRINCIPALES
          ================================================================ */}
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
            >
              <option value="" disabled>
                Selecciona...
              </option>
              <option value="001">Modelo 1</option>
              <option value="002">Modelo 2</option>
              <option value="003">Modelo 3</option>
              <option value="004">Modelo 4</option>
              <option value="005">Modelo 5</option>
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
            >
              <option value="" disabled>
                Selecciona...
              </option>
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

      {/* ================================================================
          CUERPO CENTRAL: GRID 3 COLUMNAS
          ================================================================ */}
      <div className="w-full px-4 md:px-8 xl:px-12 grid grid-cols-12 gap-8 py-6 flex-1">
        {/* ============================================================
            COLUMNA IZQUIERDA: CATEGORÍA, SUBCATEGORÍA, CANTIDAD, CARRITO
            ============================================================ */}
<div className="col-span-12 lg:col-span-3 flex flex-col gap-6">
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
              <option value="" disabled>
                Selecciona...
              </option>
              <option value="05">Categoría 05</option>
              <option value="10">Categoría 10</option>
              <option value="15">Categoría 15</option>
              <option value="20">Categoría 20</option>
              <option value="25">Categoría 25</option>
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
              <option value="" disabled>
                Selecciona...
              </option>
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
              <option value="" disabled>
                Selecciona...
              </option>
              <option value="60">Medida 60</option>
              <option value="80">Medida 80</option>
              <option value="10">Medida 100</option>
              <option value="12">Medida 120</option>
              <option value="15">Medida 150</option>
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

          {/* Resumen de Configuración */}
          <div className="bg-slate-50 p-4 rounded-xl shadow-inner border border-gray-200 mt-2">
            <h3 className="text-xs font-bold text-[#00aec7] uppercase tracking-wider mb-3">
              Resumen de Selección
            </h3>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-gray-600">
              <li>
                <span className="font-semibold text-gray-800">Modelo:</span> {config.modeloPuerta || '-'}
              </li>
              <li>
                <span className="font-semibold text-gray-800">Módulo:</span> {config.codigoModulo || '-'}
              </li>
              <li>
                <span className="font-semibold text-gray-800">Categoría:</span> {config.categoria || '-'}
              </li>
              <li>
                <span className="font-semibold text-gray-800">Subcategoría:</span> {config.subcategoria || '-'}
              </li>
              <li>
                <span className="font-semibold text-gray-800">Medida:</span> {config.medida || '-'}
              </li>
              <li>
                <span className="font-semibold text-gray-800">Acabado:</span> {traduccionAcabado(config.acabado)}
              </li>
              <li>
                <span className="font-semibold text-gray-800">Tirador:</span> {traduccionTirador(config.tirador)}
              </li>
              <li>
                <span className="font-semibold text-gray-800">Altura:</span> {traduccionAltura(config.altura)}
              </li>
              <li className="col-span-2">
                <span className="font-semibold text-gray-800">Mano:</span> {traduccionMano(config.direccionPuerta)}
              </li>
            </ul>
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

          {errorValidacion && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-bold">
              {errorValidacion}
            </div>
          )}

          {/* Botón Añadir al Carrito */}
          <button
            onClick={agregarAlCarrito}
            className="w-full bg-[#eb5c00] hover:bg-[#c94e00] text-white text-lg font-bold py-3 rounded-xl shadow-lg transition-all duration-200 w-full mt-4 transform hover:shadow-xl"
          >
            Añadir al Carrito
          </button>
        </div>

        {/* ============================================================
            COLUMNA CENTRAL: VISOR DE IMAGEN
            ============================================================ */}
          <div className="col-span-12 lg:col-span-5 xl:col-span-4 flex flex-col items-center justify-center">
            <div className="w-full max-w-[700px] aspect-square mx-auto border border-gray-300 bg-white rounded-xl flex items-center justify-center font-bold text-gray-400 text-xl shadow-sm">
            imagens
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
        <div className="col-span-12 lg:col-span-4 xl:col-span-5 flex flex-col bg-slate-50 rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-center font-bold text-gray-800 mb-4 text-lg uppercase tracking-wide">
            Resumen del Pedido
          </h2>

          {/* Área vacía central */}
          <div className="flex-1 border-2 border-dashed border-gray-300 rounded-lg p-4 max-h-[800px] overflow-y-auto">
            {carrito.length === 0 ? (
              <div className="w-full h-full flex items-center justify-center">
                <p className="text-gray-400 text-sm text-center italic">No hay artículos aún</p>
              </div>
            ) : (
              <div className="w-full">
                {carrito.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-3 flex justify-between items-center relative"
                  >
                    <div className="pr-10">
                      <div className="font-bold text-[#00aec7]">{item.titulo}</div>
                      <div className="text-xs text-gray-500 mt-1">{item.detalles}</div>

                      <div className="mt-2 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => actualizarCantidadCarrito(item.id, -1)}
                          className="w-7 h-7 rounded-md border border-gray-300 text-gray-700 hover:border-[#00aec7] hover:bg-blue-50 transition-all font-bold"
                          aria-label="Reducir cantidad"
                          title="Reducir"
                        >
                          −
                        </button>
                        <div className="min-w-[28px] text-center text-sm font-semibold text-gray-800">
                          {item.cantidad}
                        </div>
                        <button
                          type="button"
                          onClick={() => actualizarCantidadCarrito(item.id, 1)}
                          className="w-7 h-7 rounded-md border border-gray-300 text-gray-700 hover:border-[#00aec7] hover:bg-blue-50 transition-all font-bold"
                          aria-label="Aumentar cantidad"
                          title="Aumentar"
                        >
                          +
                        </button>
                        <div className="ml-2 text-xs text-gray-600">
                          x {item.precioUnitario.toFixed(2)}€
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <div className="font-bold text-lg">{item.precioTotal.toFixed(2)}€</div>
                      <button
                        type="button"
                        onClick={() => eliminarDelCarrito(item.id)}
                        className="text-red-600 hover:text-red-700"
                        aria-label="Eliminar del carrito"
                        title="Eliminar"
                      >
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
                          <path d="M9 3h6l1 2h4v2h-2l-1 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L6 7H4V5h4l1-2Zm1.2 6.3 1.4 1.4L12 12l1.4-1.3 1.4-1.4 1.4 1.4L13.4 13.4l1.4 1.4-1.4 1.4L12 14.8l-1.4 1.4-1.4-1.4 1.4-1.4-1.4-1.4 1.4-1.4ZM10.2 5l-.5 1h4.6l-.5-1h-3.6Z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
            <div className="font-bold text-gray-700">Total</div>
            <div className="text-2xl font-extrabold text-gray-900">{totalPedido.toFixed(2)}€</div>
          </div>

          {/* Botón Finalizar Pedido */}
          <button className="mt-6 bg-[#eb5c00] hover:bg-[#c94e00] text-white font-bold py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl w-full">
            Finalizar Pedido
          </button>
        </div>
      </div>

      <footer className="w-full bg-white-900 text-white border-t-4 border-[#00aec7]">
        {/* py-3 reduce drásticamente el alto. flex-row pone todo en una línea */}
        <div className="px-4 md:px-8 xl:px-12 py-3 flex flex-col md:flex-row justify-between items-center gap-4">

          {/* 1. Copyright a la izquierda */}
          <div className="text-xs text-slate-400">
            © Santiago Vargas {new Date().getFullYear()}
          </div>

          {/* 2. Redes Sociales a la derecha (Texto + Iconos juntos) */}
          <div className="flex items-center gap-3">
            <p className="text-xs font-semibold uppercase tracking-wider hidden sm:block text-black">
              Síguenos:
            </p>

            <div className="flex items-center gap-2">
              {/* Iconos más pequeños (w-8 h-8) para no engordar el footer */}
              <a href="https://www.facebook.com/josesantiagovargassa/" aria-label="Facebook" className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-slate-700 text-white-400 bg-[#0180ff] hover:opacity-80 hover:border-[#00aec7] transition-colors">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" aria-hidden="true">
                  <path d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.9.3-1.5 1.6-1.5H16.7V5c-.3 0-1.4-.1-2.6-.1-2.6 0-4.4 1.6-4.4 4.6V11H7v3h2.7v8h3.8Z" />
                </svg>
              </a>

              <a href="https://es.pinterest.com/jsantiagovargas/" aria-label="Pinterest" className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-slate-700 text-[#ff0000] hover:opacity-80 hover:border-[#eb5c00] transition-colors">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7" aria-hidden="true">
                  {/* Este nuevo path solo dibuja la letra P estilizada de Pinterest */}
                  <path d="M12.289 2C6.617 2 2 6.617 2 12.289c0 4.335 2.674 8.013 6.471 9.511-.088-.81-.166-2.052.034-2.939l1.241-5.274s-.317-.633-.317-1.57c0-1.471.853-2.57 1.914-2.57.903 0 1.339.677 1.339 1.489 0 .908-.578 2.266-.876 3.527-.249 1.053.528 1.911 1.566 1.911 1.88 0 3.328-1.982 3.328-4.843 0-2.532-1.819-4.301-4.416-4.301-3.002 0-4.763 2.252-4.763 4.577 0 .907.35 1.88.787 2.408.086.104.099.196.073.302l-.291 1.185c-.047.19-.153.23-.353.137-1.319-.613-2.143-2.537-2.143-4.08 0-3.323 2.415-6.375 6.962-6.375 3.655 0 6.496 2.604 6.496 6.085 0 3.631-2.289 6.554-5.466 6.554-1.068 0-2.071-.555-2.415-1.213l-.658 2.503c-.238.914-.881 2.061-1.313 2.76 1.018.314 2.1.484 3.221.484 5.671 0 10.289-4.618 10.289-10.289C22.578 6.617 17.96 2 12.289 2z" />
                </svg>
              </a>

              <a href="https://x.com/jsantiagovargas?lang=es" aria-label="X" className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-black border border-slate-700 text-white hover:opacity-80 hover:border-[#00aec7] transition-colors">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                  <path d="M18.9 2H22l-6.8 7.8L23 22h-6.9l-5.4-6.9L4.7 22H2l7.4-8.5L1 2h7l5 6.4L18.9 2Zm-1.2 18h1.7L8.2 3.9H6.4L17.7 20Z" />
                </svg>
              </a>

              <a href="https://www.youtube.com/@josesantiagovargas/videos" aria-label="YouTube" className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-slate-700 text-[#ff0000] hover:opacity-80 hover:border-[#eb5c00] transition-colors">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" aria-hidden="true">
                  <path d="M21.6 7.2a3 3 0 0 0-2.1-2.1C17.7 4.6 12 4.6 12 4.6s-5.7 0-7.5.5A3 3 0 0 0 2.4 7.2 31.2 31.2 0 0 0 2 12a31.2 31.2 0 0 0 .4 4.8 3 3 0 0 0 2.1 2.1c1.8.5 7.5.5 7.5.5s5.7 0 7.5-.5a3 3 0 0 0 2.1-2.1A31.2 31.2 0 0 0 22 12a31.2 31.2 0 0 0-.4-4.8ZM10 15.5v-7l6 3.5-6 3.5Z" />
                </svg>
              </a>

              <a href="https://www.linkedin.com/company/jsantiagovargas/" aria-label="LinkedIn" className="inline-flex items-center justify-center w-8 h-8 rounded-full border bg-[#0267c8] border-slate-700 text-white hover:opacity-80 hover:border-[#00aec7] transition-colors">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                  <path d="M6.5 6.8A2.3 2.3 0 1 0 6.5 2a2.3 2.3 0 0 0 0 4.8ZM4 22h5V8.5H4V22Zm7.5-13.5H16v1.8h.1c.6-1.1 2-2.2 4.1-2.2 4.4 0 5.2 2.9 5.2 6.6V22h-5v-6.2c0-1.5 0-3.4-2.1-3.4-2.1 0-2.4 1.6-2.4 3.3V22h-5V8.5Z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
