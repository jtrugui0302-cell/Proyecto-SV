from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from backend.core.database import get_db
from backend.models.diccionarios import Modulo, ModeloMaterial, ArticuloCategorizacion
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
def get_modulos(db: Session = Depends(get_db)):
    """
    Retorna todos los colores de módulos para el desplegable.
    """
    return db.query(Modulo).all()

@router.get("/modelos", response_model=List[ModeloMaterialResponse])
def get_modelos(db: Session = Depends(get_db)):
    """
    Retorna todos los modelos/materiales de puerta.
    """
    # Ordenamos explícitamente por 'id'
    return db.query(ModeloMaterial).order_by(ModeloMaterial.id).all()

@router.get("/categorias", response_model=List[ArticuloCategorizacionResponse])
def get_categorias(db: Session = Depends(get_db)):
    """
    Retorna todas las categorías y subcategorías para poblar los desplegables.
    """
    return db.query(ArticuloCategorizacion).all()
