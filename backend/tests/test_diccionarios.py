from fastapi.testclient import TestClient
from backend.main import app

client = TestClient(app)

def test_read_main():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "API del Configurador SV funcionando correctamente"}

def test_get_modulos():
    response = client.get("/api/diccionarios/modulos")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    # Verificamos la estructura si hay datos
    if len(data) > 0:
        assert "id" in data[0]
        assert "codigo_modulo" in data[0]
        assert "descripcion" in data[0]

def test_get_modelos():
    response = client.get("/api/diccionarios/modelos")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    if len(data) > 0:
        assert "id" in data[0]
        assert "grupo_modelo" in data[0]
        assert "modelo" in data[0]

def test_get_categorias():
    response = client.get("/api/diccionarios/categorias")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    if len(data) > 0:
        assert "id" in data[0]
        assert "nombre_categoria" in data[0]
        assert "cod_categoria" in data[0]
        assert "nombre_subcategoria" in data[0]
        assert "cod_subcategoria" in data[0]
        assert "url" in data[0]
