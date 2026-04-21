import logging
from core.database import get_db_connection

logger = logging.getLogger(__name__)

def obtener_todos_los_articulos():
    """
    Obtiene todos los artículos desde la base de datos usando un patrón robusto.
    """
    conexion = None
    cursor = None
    try:
        # 1. Abrimos la conexión
        conexion = get_db_connection()
        cursor = conexion.cursor()
        
        # 2. Ejecutamos la consulta SQL
        consulta = "SELECT codigo, descripcion, precio_venta FROM articulos;"
        cursor.execute(consulta)
        
        # 3. Recuperamos y devolvemos los resultados
        resultados = cursor.fetchall()
        return resultados
    
    except Exception as e:
        logger.error(f"Error al obtener los artículos: {e}")
        raise e
    finally:
        # REGLA DE ORO DE CLEAN ARCHITECTURE & DEVSECOPS:
        # Siempre cerramos el cursor y la conexión en el bloque finally.
        # Este bloque se ejecuta SIEMPRE, haya ocurrido un error o no, 
        # garantizando que no dejemos conexiones "colgando" (zombies) 
        # que puedan colapsar el servidor de base de datos.
        if cursor is not None:
            cursor.close()
        if conexion is not None:
            conexion.close()
