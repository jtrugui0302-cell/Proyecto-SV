from pydantic import BaseModel

# ¿Para qué sirve Pydantic? (Nota para el desarrollador Junior)
# Pydantic es una librería utilizada ampliamente en FastAPI para la validación y transformación de datos.
# Su función principal es asegurar que los datos que entran a nuestra aplicación (y los que salen)
# cumplen estrictamente con la estructura y los tipos de datos que hemos definido.
# Por ejemplo, garantiza que 'precio_base' sea siempre un número decimal (float). 
# Si el cliente nos envía algo incorrecto (como un texto en lugar de un número),
# Pydantic automáticamente devolverá un error claro al cliente, ahorrando tener que 
# escribir manualmente un montón de validaciones `if` para cada campo.

class Articulo(BaseModel):
    codigo: str
    descripcion: str
    precio_venta: float
