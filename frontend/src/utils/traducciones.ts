/**
 * Utilidades de Traducción para la Vista - Proyecto SV
 * 
 * Propósito: Convertir valores técnicos o numéricos de la configuración
 * en etiquetas legibles para el usuario final.
 */

export const traduccionAcabado = (valor: number | string): string => {
  const map: Record<string, string> = { '0': 'Base', '1': 'Premium' };
  return map[String(valor)] || '-';
};

export const traduccionTirador = (valor: number | string): string => {
  const map: Record<string, string> = { '0': 'Sin Tirador', '1': 'Con Tirador' };
  return map[String(valor)] || '-';
};

export const traduccionAltura = (valor: number | string): string => {
  const map: Record<string, string> = { '0': 'Altos', '1': 'Bajos de 70', '2': 'Bajos de 80' };
  return map[String(valor)] || '-';
};

export const traduccionMano = (valor: number | string): string => {
  const map: Record<string, string> = { '0': 'Sin mano', '1': 'Izquierda', '2': 'Derecha' };
  return map[String(valor)] || '-';
};
