from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.routers import diccionarios

app = FastAPI(title="Configurador SV API")

# Configuración básica de CORS para que el frontend React (Vite) pueda comunicarse
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # En producción cambiar por la URL del frontend ej: ["http://localhost:5173"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incluir las rutas
app.include_router(diccionarios.router)

@app.get("/")
def read_root():
    return {"message": "API del Configurador SV funcionando correctamente"}
