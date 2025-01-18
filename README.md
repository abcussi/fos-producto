# Condaty Marketplace Web App

Aplicación web del marketplace de Condaty desarrollada con Next.js y TypeScript.

## Estructura del Proyecto

```
src/
├── app/                    # Directorio principal de Next.js 13 App Router
│   ├── api/               # API routes
│   │   ├── auth/         # Endpoints de autenticación
│   │   │   ├── login/    # Login endpoint
│   │   │   └── logout/   # Logout endpoint
│   │   └── products/     # Endpoints de productos
│   ├── components/       # Componentes reutilizables
│   │   ├── Buttons/     # Componentes de botones
│   │   ├── Form/        # Componentes de formularios
│   │   ├── Header/      # Componente de navegación
│   │   ├── Modal/       # Componente modal
│   │   └── ProductCard/ # Tarjeta de producto
│   ├── context/         # Contextos de React
│   │   ├── authContext.tsx   # Contexto de autenticación
│   │   └── ProductContext.tsx # Contexto de productos
│   ├── lib/             # Utilidades y hooks
│   │   └── hooks/       # Custom hooks
│   ├── styles/          # Estilos globales
│   └── types/           # Tipos TypeScript
├── public/              # Archivos estáticos
└── test/                # Pruebas unitarias
```

## Tecnologías Utilizadas

- Next.js 13+ (App Router)
- TypeScript
- Styled Components
- TailwindCSS
- Context API para estado global
- Jest para testing

## Requisitos Previos

- Node.js 18 o superior
- npm o yarn
- Docker y Docker Compose (para el backend)

## Instalación y Configuración

1. Clonar el repositorio:
```bash
git clone [URL_DEL_REPOSITORIO]
cd web
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:
Crear archivo `.env` basado en `.env.example`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

4. Iniciar el backend (desde el directorio api):
```bash
cd ../api
docker-compose up --build
```

5. Iniciar la aplicación en desarrollo:
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

## Características Implementadas

### Autenticación
- Login con validación de formularios (Formik + Yup)
- Manejo de sesiones
- Protección de rutas
- Contexto de autenticación

### Gestión de Productos
- Listado con scroll infinito
- Creación/Edición/Eliminación
- Modal de formulario
- Carga con skeleton
- Contexto de productos

### UI/UX
- Diseño responsive
- Loading states
- Manejo de errores
- Feedback visual
- Tema personalizado Condaty

## Decisiones Técnicas

### App Router vs Pages
- Uso del nuevo App Router de Next.js 13+ por sus mejoras en rendimiento y SEO
- Mejor manejo de layouts y rutas anidadas

### Styled Components + TailwindCSS
- Styled Components para componentes reutilizables
- TailwindCSS para utilidades y estilos rápidos
- Theme provider para consistencia

### Context API
- Manejo de estado con Context API por su simplicidad
- Custom hooks para lógica reutilizable
- Separación clara de responsabilidades

## Mejoras Futuras

### Rendimiento
- [ ] Implementar React Query para cache
- [ ] Optimizar carga de imágenes
- [ ] Mejorar SSR
- [ ] Implementar PWA

### Funcionalidades
- [ ] Registro de usuarios
- [ ] Recuperación de contraseña
- [ ] Perfil de usuario
- [ ] Filtros avanzados
- [ ] Sistema de categorías

### UX
- [ ] Modo oscuro
- [ ] Más animaciones y transiciones
- [ ] Mejoras en accesibilidad
- [ ] Notificaciones in-app

### Técnicas
- [ ] Ampliar cobertura de tests
- [ ] Mejor manejo de errores
- [ ] Implementar Storybook
- [ ] CI/CD

## Comandos Disponibles

```bash
npm run dev          # Inicia en modo desarrollo
npm run build       # Construye para producción
npm start          # Inicia en producción
npm run lint       # Ejecuta el linter
npm run test       # Ejecuta tests
```

## Credenciales de Prueba

```
Email: test@example.com
Password: password123
```

## Notas de Implementación

- La aplicación requiere el backend corriendo en Docker
- Los formularios usan Formik para validación
- Se implementó scroll infinito personalizado
- Uso de skeleton loading para mejor UX

## Problemas Conocidos y Soluciones

1. **Problemas con la cache de Next.js**
   - Limpiar `.next`: `rm -rf .next`
   - Reiniciar el servidor de desarrollo

2. **Error de CORS**
   - Verificar la configuración del backend
   - Revisar las variables de entorno

## Contacto

Para más información o soporte:
- Email: cussi.angel.benjamin@gmail.com