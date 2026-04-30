import React from 'react';

/**
 * Componente: ConfiguradorHeader
 * Responsabilidad: Mostrar la identidad de marca y el título de la aplicación.
 */
export function ConfiguradorHeader() {
  return (
    <header className="w-full bg-white shadow-sm border-b-4 border-[#eb5c00]">
      <div className="ps-2 py-4 flex flex-wrap items-center gap-2">
        <img
          src="/logo-santiago-vargas.png"
          alt="Logo Santiago Vargas"
          className="h-12 sm:h-16 w-auto object-contain pb-2"
        />
        <p className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#00aec7] uppercase tracking-wide ps-2 sm:ps-6 md:ps-10">
          Configurador de muebles
        </p>
      </div>
    </header>
  );
}
