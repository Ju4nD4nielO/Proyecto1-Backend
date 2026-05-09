# 🎮 Games Tracker — Backend API

REST API para el proyecto Games Tracker, construida con Node.js, Express y PostgreSQL.

## 🔗 Links
- **Frontend repo**: [link al repo del frontend]
- **App en producción**: [link de render]

## 🛠 Tech Stack
- Node.js + Express
- PostgreSQL
- Docker + Docker Compose

## ⚙️ Correr localmente

### Requisitos
- Node.js 18+
- PostgreSQL corriendo localmente

### Pasos
```bash
# 1. Clonar el repo 
git clone https://github.com/Ju4nD4nielO/Proyecto1-Backend

# 2. Instalar dependencias
npm install

# 3. Crear el archivo .env
cp .env.example .env
# Edita .env con tus credenciales de PostgreSQL

# 4. Crear la base de datos y tabla
psql -U postgres -c "CREATE DATABASE game_tracker;"
psql -U postgres -d game_tracker -f schema.sql

# 5. Correr el servidor
npm run dev
```

El servidor corre en `http://localhost:3000`.

## 🐳 Correr con Docker

```bash
docker compose up --build
```

Levanta el backend en `:3000` y PostgreSQL en `:5432`. La tabla se crea automáticamente.

## 📡 Endpoints de la API

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/games` | Listar todos los juegos |
| GET | `/games/:id` | Obtener un juego por ID |
| POST | `/games` | Crear un juego nuevo |
| PUT | `/games/:id` | Editar un juego existente |
| DELETE | `/games/:id` | Eliminar un juego |

### Ejemplo de body para POST/PUT
```json
{
  "title": "Elden Ring",
  "genre": "RPG",
  "platform": "PC",
  "status": "playing",
  "hours_played": 90,
  "image_url": "https://...",
  "notes": "Increíble juego"
}
```

### Valores válidos para `status`
- `plan_to_play`
- `playing`
- `completed`
- `on_hold`
- `dropped`

### Códigos de respuesta
- `200` — OK
- `201` — Creado exitosamente
- `204` — Eliminado exitosamente
- `400` — Input inválido
- `404` — Juego no encontrado
- `500` — Error del servidor

## 🌐 CORS
CORS está configurado para aceptar peticiones de cualquier origen (`*`) durante desarrollo. Esto es necesario porque el cliente y el servidor corren en puertos distintos, y el navegador bloquea las peticiones cross-origin por defecto.

## ✅ Challenges implementados
- Códigos HTTP correctos (201, 204, 400, 404)
- Validación server-side con respuestas JSON descriptivas
- Soporte para imagen (campo `image_url`)
- Docker + Docker Compose

## 💭 Reflexión
Usar Express con PostgreSQL fue una experiencia muy directa — la separación entre cliente y servidor hace el código mucho más mantenible. Lo usaría de nuevo para proyectos donde se necesite una API que pueda ser consumida por múltiples clientes. Docker simplificó enormemente el setup del entorno, aunque la curva de aprendizaje inicial con los healthchecks y el timing de los contenedores fue un reto.
