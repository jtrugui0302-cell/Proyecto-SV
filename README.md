# 🛋️ Proyecto SV - Configurador de Muebles

Bienvenido al repositorio oficial del **Configurador de Muebles de Santiago Vargas**. Esta aplicación web permite a los usuarios visualizar y personalizar mobiliario de alta calidad, conectando una interfaz moderna con un potente motor de datos.

---

## 🚀 Características Principales

- **Configuración en Tiempo Real**: Personaliza dimensiones, materiales y acabados.
- **Interfaz Premium**: Diseño moderno, responsivo y optimizado para una experiencia de usuario fluida.
- **Gestión de Datos**: Integración completa con PostgreSQL para el manejo de clientes y catálogo de artículos.
- **Backend Robusto**: API construida con FastAPI para una comunicación rápida y segura.

---

## 🛠️ Stack Tecnológico

El proyecto está dividido en dos grandes bloques:

### Frontend
- **Framework**: [React](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Estilos**: [Tailwind CSS](https://tailwindcss.com/)
- **Iconos**: [Lucide React](https://lucide.dev/) (si aplica)

### Backend
- **Lenguaje**: [Python](https://www.python.org/)
- **Framework**: [FastAPI](https://fastapi.tiangolo.com/)
- **Base de Datos**: [PostgreSQL](https://www.postgresql.org/)
- **ORM/Validación**: Pydantic y conexión directa vía MCP o SQLAlchemy.

---

## 📂 Estructura del Proyecto

```bash
ProyectoWebSV/
├── frontend/             # Aplicación de cliente (React + Vite)
│   ├── src/
│   │   ├── components/   # Componentes reutilizables (Header, Configurator, etc.)
│   │   └── ...
├── backend/              # Lógica de servidor y API (FastAPI)
│   ├── models/           # Esquemas de datos (Pydantic)
│   ├── routers/          # Definición de endpoints
│   └── ...
└── README.md             # Documentación del proyecto
```

---

## ⚙️ Instalación y Ejecución

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/Proyecto-SV.git
cd Proyecto-SV
```

### 2. Configurar el Backend
```bash
cd backend
python -m venv venv
source venv/bin/scripts/activate  # En Windows: venv\Scripts\activate
pip install -r requirements.txt
# Configura tu archivo .env con las credenciales de PostgreSQL
python main.py
```

### 3. Configurar el Frontend
```bash
cd ../frontend
npm install
npm run dev
```

---

## ✒️ Créditos

Este proyecto es desarrollado para **Santiago Vargas**. Todos los derechos reservados.

---

> [!TIP]
> Si deseas contribuir o reportar un error, por favor abre un *Issue* o envía un *Pull Request*.
