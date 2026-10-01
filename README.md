# Marketplace de Alojamientos

## Descripción
Aplicación web desarrollada en Angular para **Inversiones LR**, que permite a los huéspedes explorar alojamientos temporales, filtrarlos, ver su detalle, obtener una cotización y registrar una reserva simulada. Esta primera versión incluye únicamente el frontend; los datos se leen desde un archivo JSON a través de un servicio de Angular.

Proyecto del curso Desarrollo de Sistemas de Información 3, Ingeniería de Sistemas, Universidad El Bosque.

## Integrantes
- Andrés Felipe Sierra Monroy
- [Nombre completo del compañero]

## Tecnologías utilizadas
- Angular [versión, la ves en package.json] y TypeScript
- Bootstrap 5
- RxJS y Angular Router
- Git y GitHub
- WebStorm

## Requisitos para ejecutar la aplicación
- Node.js (versión LTS)
- npm
- Angular CLI: `npm install -g @angular/cli`

## Instalación
```bash
git clone https://github.com/felipesierra9/marketplace-alojamientos.git
cd marketplace-alojamientos
npm install
```

## Ejecución
```bash
ng serve
```
Luego abre `http://localhost:4200` en el navegador.

## Principales funcionalidades
- Página de inicio con nombre de la plataforma, descripción y alojamientos destacados.
- Listado de alojamientos activos con imagen, ciudad, tipo, capacidad, precio, calificación y servicios.
- Filtros por ciudad, tipo, número de huéspedes y precio máximo, con opción para limpiarlos.
- Detalle del alojamiento con galería, características, reglas, servicios y reseñas.
- Cotización con número de noches, subtotal, tarifa de limpieza, tarifa de servicio (10 %) y total.
- Validación de las reglas de negocio (fechas, capacidad, precio).
- Reserva simulada con estado inicial CONFIRMADA, guardada en localStorage.
- Vista "Mis reservas" con mensaje cuando no hay reservas.
- Diseño responsive.

## Estructura general del proyecto
```
src/app/
├── components/   Componentes reutilizables (navbar, tarjeta, formularios)
├── pages/        Vistas de cada ruta (home, listado, detalle, mis-reservas)
├── models/       Interfaces TypeScript
├── services/     Acceso a datos, cotización y reservas
├── app.routes.ts Navegación
└── app.config.ts Configuración
public/assets/
├── data/         marketplace-data.json
└── images/       Imágenes de los alojamientos
```

## Datos
Los datos iniciales están en `public/assets/data/marketplace-data.json` y se consultan mediante `AlojamientoService`.
