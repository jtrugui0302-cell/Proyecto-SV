from typing import List, Dict, Any
from psycopg2.extras import RealDictConnection

def get_all_modulos(db: RealDictConnection) -> List[Dict[str, Any]]:
    cursor = db.cursor()
    try:
        cursor.execute("SELECT id, codigo_modulo, descripcion FROM modulos")
        return cursor.fetchall()
    finally:
        cursor.close()

def get_all_modelos(db: RealDictConnection) -> List[Dict[str, Any]]:
    cursor = db.cursor()
    try:
        cursor.execute("SELECT id, grupo_modelo, modelo FROM modelo_material ORDER BY id")
        return cursor.fetchall()
    finally:
        cursor.close()

def get_all_categorias(db: RealDictConnection) -> List[Dict[str, Any]]:
    cursor = db.cursor()
    try:
        cursor.execute("SELECT id, nombre_categoria, cod_categoria, nombre_subcategoria, cod_subcategoria, url FROM articulos_categorizacion")
        return cursor.fetchall()
    finally:
        cursor.close()
