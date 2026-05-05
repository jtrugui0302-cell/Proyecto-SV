from fastapi import APIRouter, Depends
from typing import List
from psycopg2.extras import RealDictConnection

from backend.core.database import get_db
from backend.repositories import diccionarios_repo
from backend.schemas.diccionarios import (
    ModuloResponse,
    ModeloMaterialResponse,
    ArticuloCategorizacionResponse
)

router = APIRouter(
    prefix="/api/diccionarios",
    tags=["Diccionarios UI"]
)

@router.get("/modulos", response_model=List[ModuloResponse])
def get_modulos(db: RealDictConnection = Depends(get_db)):
    """
    Retorna todos los colores de módulos para el desplegable.
    """
    return diccionarios_repo.get_all_modulos(db)

@router.get("/modelos", response_model=List[ModeloMaterialResponse])
def get_modelos(db: RealDictConnection = Depends(get_db)):
    """
    Retorna todos los modelos/materiales de puerta.
    """
    return diccionarios_repo.get_all_modelos(db)

@router.get("/categorias", response_model=List[ArticuloCategorizacionResponse])
def get_categorias(db: RealDictConnection = Depends(get_db)):
    """
    Retorna todas las categorías y subcategorías para poblar los desplegables.
    """
    return diccionarios_repo.get_all_categorias(db)
