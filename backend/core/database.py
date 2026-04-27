import os
import psycopg2
from psycopg2.extras import RealDictCursor
import logging
from dotenv import load_dotenv

# Cargar variables de entorno desde el archivo .env
load_dotenv()

# Configuramos un logger básico para registrar eventos o errores en la consola
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def get_db_connection():
    """
    Establece y devuelve una conexión a la base de datos PostgreSQL.
    
    Esta función está pensada para ser llamada cada vez que un endpoint (ruta)
    necesite consultar o modificar datos en la base de datos.
    """
    db_host = os.getenv("DB_HOST")
    db_port = os.getenv("DB_PORT")
    db_name = os.getenv("DB_NAME")
    db_user = os.getenv("DB_USER")
    db_password = os.getenv("DB_PASSWORD")

    if not db_user or not db_password or not db_name:
        raise ValueError("Faltan variables de entorno críticas (DB_USER, DB_PASSWORD o DB_NAME) para la conexión a la base de datos.")

    try:
        # psycopg2.connect() es la función que intenta establecer la comunicación
        # con tu servidor local de PostgreSQL leyendo desde variables de entorno.
        connection = psycopg2.connect(
            host=os.getenv("DB_HOST"),
            port=os.getenv("DB_PORT"),
            database=os.getenv("DB_NAME"),
            user=os.getenv("DB_USER"),
            password=os.getenv("DB_PASSWORD"),
            
            # IMPORTANTE: RealDictCursor hace que la base de datos devuelva la información
            # como diccionarios de Python (ej: {"id": 1, "nombre": "Mesa"}) 
            # en lugar de tuplas clásicas (ej: (1, "Mesa")).
            # Esto es clave para FastAPI porque los diccionarios se convierten a JSON automáticamente.
            cursor_factory=RealDictCursor 
        )
        return connection
    
    except Exception as e:
        # Si algo sale mal (ej: el programa de la BD está apagado o la contraseña es incorrecta),
        # entraremos a este bloque 'except' para capturar el error.
        logger.error(f"Error crítico al conectar con la base de datos: {e}")
        
        # Volvemos a 'lanzar' (raise) el error para que FastAPI sepa que hubo un fallo
        # de conexión y pueda responder con un error HTTP 500 al cliente.
        raise e
