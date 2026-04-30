import { 
  moduloAdapter, 
  modeloMaterialAdapter, 
  articulosCategorizacionAdapter 
} from '../adapters/diccionarios.adapter';

describe('Adapters de Diccionarios', () => {

  describe('moduloAdapter', () => {
    it('debe devolver un array vacío si la entrada no es un array', () => {
      expect(moduloAdapter(null)).toEqual([]);
      expect(moduloAdapter({})).toEqual([]);
      expect(moduloAdapter(undefined)).toEqual([]);
    });

    it('debe mapear correctamente y asignar valores por defecto si faltan', () => {
      const input = [
        { id: '1', codigo_modulo: 'A', descripcion: 'Blanco' },
        { id: 2 } // Faltan campos
      ];
      const result = moduloAdapter(input);
      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({ id: 1, codigo_modulo: 'A', descripcion: 'Blanco' });
      expect(result[1]).toEqual({ id: 2, codigo_modulo: '', descripcion: 'Sin descripción' });
    });
  });

  describe('modeloMaterialAdapter', () => {
    it('debe transformar los datos y proteger contra nulos', () => {
      const input = [
        { id: '001', grupo_modelo: '1000', modelo: 'Roble' },
        { id: '002' }
      ];
      const result = modeloMaterialAdapter(input);
      expect(result[0]).toEqual({ id: '001', grupo_modelo: '1000', modelo: 'Roble' });
      expect(result[1]).toEqual({ id: '002', grupo_modelo: '', modelo: 'Modelo Desconocido' });
    });
  });

  describe('articulosCategorizacionAdapter', () => {
    it('debe mapear correctamente las categorías', () => {
      const input = [
        { id: 10, nombre_categoria: 'BAJOS', cod_categoria: '02', nombre_subcategoria: '1 Puerta', cod_subcategoria: 'A', url: '/img.png' }
      ];
      const result = articulosCategorizacionAdapter(input);
      expect(result[0].nombre_categoria).toBe('BAJOS');
      expect(result[0].id).toBe(10);
    });
  });

});
