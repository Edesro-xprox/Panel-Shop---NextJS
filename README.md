# Proyecto

**Panel LaptopShop** (`panel_shop_frontend`)

## Descripción

Aplicación web de administración para gestionar los productos de NextShop. Incluye inicio de sesión simulado, listado con filtros y paginación, y formularios para crear, editar y activar o desactivar productos.

## Requisitos

- Node.js en una versión compatible con Next.js 16.
- pnpm 11.5.2, indicado por el proyecto como gestor de paquetes.
- Acceso a la API de productos para utilizar las funciones del panel.

## Tecnología / versión

- Next.js: 16.3.6
- React: 19.2.8
- TypeScript: ^5
- Tailwind CSS: ^4
- pnpm: 11.5.2

## Estructura del proyecto

```text
app/
	(auth)/login/        Pantalla de inicio de sesión
	(panel)/             Secciones protegidas del panel
		productos/         Listado, creación y edición de productos
		usuarios/          Listado, creación y edición de usuarios
	globals.css          Estilos globales
components/
	auth/                Componentes de autenticación
	layout/              Logo y navegación lateral
	products/            Filtros, formulario y tabla de productos
	users/               Filtros, formulario y tabla de usuarios
context/               Contexto de autenticación
hooks/                 Hooks de la aplicación
lib/                   API, autenticación simulada y datos mock
public/                Recursos estáticos
services/              Comunicación con los servicios de productos y usuarios
types/                 Tipos TypeScript de productos y usuarios
utils/                 Utilidades
```

## Cómo ejecutar

1. Instala las dependencias:

	 ```bash
	 pnpm install
	 ```

2. Crea `.env` a partir de `.env.example` y configura las URLs de tu entorno:

	 ```powershell
	 Copy-Item .env.example .env
	 ```

	 Define `NEXT_PUBLIC_API_URL` con la URL base de la API, que debe ofrecer los endpoints de productos y usuarios. La sección de usuarios consume `GET /users`, `GET /users/:id`, `POST /users` y `PUT /users/:id`. Define también `NEXT_PUBLIC_BLOB_URL` con la URL base usada para servir las imágenes.

3. Inicia el servidor de desarrollo:

	 ```bash
	 pnpm run dev
	 ```

4. Abre [http://localhost:3000](http://localhost:3000).

Comandos adicionales: `pnpm lint` ejecuta ESLint, `pnpm build` genera la compilación de producción y `pnpm start` inicia esa compilación.

## Accesos

El inicio de sesión es temporal y simulado: se puede ingresar con cualquier usuario y contraseña, siempre que ambos campos no estén vacíos. No se requieren credenciales predefinidas. Este mecanismo es solo para desarrollo y debe reemplazarse antes de publicar la aplicación.

## Autor

Edson Espinoza.
