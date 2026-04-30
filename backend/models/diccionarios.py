from sqlalchemy import Column, Integer, String, Text
from backend.core.database import Base

class Modulo(Base):
    __tablename__ = "modulos"

    id = Column(Integer, primary_key=True, index=True)
    codigo_modulo = Column(String(1), nullable=False)
    descripcion = Column(String(255), nullable=False)


class ModeloMaterial(Base):
    __tablename__ = "modelos_material"

    id = Column(String(10), primary_key=True, index=True)
    grupo_modelo = Column(String(50))
    modelo = Column(String(255))


class ArticuloCategorizacion(Base):
    __tablename__ = "articulos_categorizacion"

    id = Column(Integer, primary_key=True, index=True)
    nombre_categoria = Column(String, nullable=False)
    cod_categoria = Column(String, nullable=False)
    nombre_subcategoria = Column(String, nullable=False)
    cod_subcategoria = Column(String, nullable=False)
    url = Column(Text, nullable=False)
