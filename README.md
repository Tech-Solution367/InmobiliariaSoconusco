# Inmobiliaria Soconusco

Este es un proyecto de sitio web para una inmobiliaria, construido con Next.js, Tailwind CSS y MongoDB.

## Requisitos Previos

1.  **Node.js**: Asegúrate de tener Node.js instalado.
2.  **MongoDB**: Necesitas tener una instancia de MongoDB ejecutándose localmente o una URI de conexión a un clúster en la nube.

## Configuración

1.  El archivo `.env.local` ya está configurado para conectar a una base de datos local:
    ```
    MONGODB_URI=mongodb://localhost:27017/inmobiliaria_soconusco
    ```
    Si usas otra configuración, actualiza este archivo.

## Instalación

Si aún no has instalado las dependencias:

```bash
cd web
npm install
```

## Ejecución

Para iniciar el servidor de desarrollo:

```bash
cd web
npm run dev
```

Luego abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Características

-   Listado de propiedades.
-   Detalle de propiedad con imágenes y vista 360° (iframe).
-   Formulario para subir propiedades (imágenes por URL).
-   Contacto vía WhatsApp.
