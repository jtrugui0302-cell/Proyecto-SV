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
    # [Mejora 1] Rescatamos las variables primero. Si no, `if not all([...])` lanzará un NameError
    db_host = os.getenv("DB_HOST", "localhost")
    db_port = os.getenv("DB_PORT", "5432")
    db_name = os.getenv("DB_NAME")
    db_user = os.getenv("DB_USER")
    db_password = os.getenv("DB_PASSWORD")

    # [Mejora 2] Fail Fast Corregido: Sólo obligamos las esenciales.
    # No es necesario obligar a db_host y db_port si tienen valores por defecto confiables.
    if not all([db_name, db_user, db_password]):
        error_msg = "Faltan credenciales críticas (DB_NAME, DB_USER, DB_PASSWORD) en el archivo .env"
        logger.error(error_msg)
        raise ValueError(error_msg)

    try:
        connection = psycopg2.connect(
            host=db_host,
            port=db_port,
            database=db_name,
            user=db_user,
            password=db_password,
            cursor_factory=RealDictCursor 
        )
        return connection
    
    except psycopg2.OperationalError as op_err:
        # [Mejora 3] Sanitización estricta de Logs (Cero Fugas).
        # Los errores operativos de conexión NUNCA deben imprimir raw la excepción (e).
        logger.error("Error Operacional: Falló la autenticación o configuración de red hacia PostgreSQL (Sanitizado).")
        raise RuntimeError("No se pudo establecer conexión con la base de datos.") from None
        
    except Exception as e:
        # Errores imprevistos genéricos
        logger.error("Error Interno Inesperado al intentar contactar la base de datos.")
        raise RuntimeError("Fallo crítico en el servicio de base de datos.") from None
