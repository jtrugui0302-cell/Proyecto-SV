import React from 'react';

/**
 * Componente: ConfiguradorHeader
 * Responsabilidad: Mostrar la identidad de marca y el título de la aplicación.
 */
export function ConfiguradorHeader() {
  return (
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
  );
}
