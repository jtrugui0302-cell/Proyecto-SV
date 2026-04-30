from pydantic import BaseModel, ConfigDict
from typing import List

class ModuloResponse(BaseModel):
    id: int
    codigo_modulo: str
    descripcion: str

    model_config = ConfigDict(from_attributes=True)

class ModeloMaterialResponse(BaseModel):
    id: str
    grupo_modelo: str
    modelo: str

    model_config = ConfigDict(from_attributes=True)

class ArticuloCategorizacionResponse(BaseModel):
    id: int
    nombre_categoria: str
    cod_categoria: str
    nombre_subcategoria: str
    cod_subcategoria: str
    url: str

    model_config = ConfigDict(from_attributes=True)
