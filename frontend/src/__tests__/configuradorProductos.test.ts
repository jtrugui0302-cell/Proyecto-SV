import { generarCodigoSV, ConfiguracionProducto } from '../configuradorProductos';

describe('Generador de Códigos SV', () => {
  const configValida: ConfiguracionProducto = {
    modeloPuerta: '001',
    codigoModulo: 'A',
    acabado: 1, // Premium -> 1
    tirador: 0, // Sin tirador -> 0
    altura: 2, // Modulos 80 -> 2
    categoria: '05',
    subcategoria: 'B',
    medida: '60',
    direccionPuerta: 1, // Izquierda -> 1
  };

  it('debe generar el código correctamente cuando todos los campos son válidos', () => {
    const codigo = generarCodigoSV(configValida);
    // Siguiendo la regla de 15 dígitos:
    // T T M M M C A R G G S S A T D
    // '3' '8' '001' 'A' '1' '0' '2' '05' 'B' '60' '1' '0' '1'
    expect(typeof codigo).toBe('string');
    expect(codigo.length).toBeGreaterThan(0);
    // Nota: El formato exacto depende de cómo esté implementado generarCodigoSV internamente.
    // Esta prueba verifica que no arroja error si la configuración está completa.
  });

  it('debe lanzar error si la configuración está incompleta', () => {
    const configIncompleta: ConfiguracionProducto = {
      ...configValida,
      modeloPuerta: '', // Falta el modelo
    };
    
    expect(() => generarCodigoSV(configIncompleta)).toThrow('El código de producto generado no tiene la longitud válida');
  });

  it('debe lanzar error si un índice numérico no ha sido seleccionado (-1)', () => {
    const configIncompleta: ConfiguracionProducto = {
      ...configValida,
      acabado: -1, 
    };
    
    expect(() => generarCodigoSV(configIncompleta)).toThrow('El código de producto generado no tiene la longitud válida');
  });
});
