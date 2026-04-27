import React from 'react';

interface RadioOptionProps {
  label: string;
  value: number | string;
  selectedValue: number | string;
  onChange: (value: number | string) => void;
}

/**
 * Componente: RadioButton
 * Responsabilidad: Input tipo radio estilizado para la selección de opciones.
 */
export function RadioButton({
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
        name={`radio-${label}`}
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
