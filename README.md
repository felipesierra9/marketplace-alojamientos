# Marketplace de Alojamientos

Aplicación web desarrollada con Angular para **Inversiones LR**, que permite a los huéspedes explorar alojamientos temporales, filtrarlos, ver su detalle, obtener una cotización y registrar una reserva simulada.

Proyecto del curso **Desarrollo de Sistemas de Información 3**, Ingeniería de Sistemas, Universidad El Bosque.

## Descripción

Esta primera versión incluye únicamente el **frontend**. No existe un backend: los datos iniciales se leen desde un archivo JSON a través de un servicio de Angular y las reservas se guardan en el `localStorage` del navegador.

El objetivo es utilizar el dominio de un marketplace de alojamientos como escenario para construir una aplicación web estructurada con Angular, con separación de responsabilidades entre páginas, componentes, servicios y modelos.

## Integrantes

- Andrés Felipe Sierra Monroy (gerente del proyecto)
- Alejandro Molina Bocanegra

## Tecnologías utilizadas

- Angular 20 o superior y TypeScript
- Angular Router (navegación) y HttpClient (lectura de datos)
- Signals de Angular y RxJS
- Bootstrap 5 y CSS
- Git y GitHub
- WebStorm

## Requisitos para ejecutar la aplicación

- Node.js en su versión LTS (20.19 o superior)
- npm (se instala junto con Node.js)
- Git

No es necesario instalar Angular CLI de forma global: el proyecto lo incluye entre sus dependencias.

## Instalación

```bash
git clone https://github.com/felipesierra9/marketplace-alojamientos.git
cd marketplace-alojamientos
npm install
```

## Ejecución

```bash
npm start
```

Luego abre `http://localhost:4200` en el navegador. La aplicación se recarga automáticamente al modificar el código.

Para generar la versión de producción:

```bash
npm run build
```

El resultado queda en la carpeta `dist/`.

## Principales funcionalidades

- **Página inicial** con el nombre de la plataforma, una breve descripción, los alojamientos destacados y el acceso a la búsqueda.
- **Listado de alojamientos** activos, con imagen, nombre, ciudad, tipo, capacidad, precio por noche, calificación y servicios.
- **Búsqueda y filtrado dinámico** por ciudad, número de huéspedes, tipo de alojamiento y precio máximo, con opción para limpiar los filtros y mensaje cuando no hay resultados.
- **Detalle del alojamiento** mediante el sistema de rutas de Angular: galería de imágenes, descripción, ubicación, capacidad, habitaciones, camas, baños, servicios, reglas, calificación y reseñas.
- **Cotización** a partir de la fecha de llegada, la fecha de salida y el número de huéspedes, con el desglose de noches, subtotal, tarifa de limpieza, tarifa de servicio y total.
- **Reserva simulada** con nombre y correo del huésped, validación de los datos y estado inicial `CONFIRMADA`.
- **Mis reservas**: consulta de las reservas realizadas, con mensaje cuando no existen y opciones para cancelarlas o eliminarlas con confirmación.
- **Notificaciones emergentes** para informar el resultado de las acciones.
- **Diseño responsive**, con menú desplegable en pantallas pequeñas.

## Reglas de negocio

- La fecha de salida debe ser posterior a la fecha de llegada.
- La fecha de llegada no puede ser anterior a la fecha actual.
- El número de huéspedes debe ser mayor que cero y no puede superar la capacidad del alojamiento.
- El precio por noche debe ser mayor que cero.
- Una cotización solo se genera con fechas válidas, y una reserva solo se realiza después de generar una cotización válida.
- Cálculo de la cotización:
  - Subtotal = noches × precio por noche
  - Tarifa de servicio = 10 % del subtotal
  - Total = subtotal + tarifa de limpieza + tarifa de servicio
- No se muestran los alojamientos marcados como inactivos.
- Cuando una búsqueda no encuentra resultados, se informa al usuario.

Ejemplo: 2 noches en el Loft moderno en Chapinero para 2 huéspedes dan un subtotal de $ 360.000, limpieza de $ 45.000, servicio de $ 36.000 y un total de $ 441.000.

## Rutas de la aplicación

| Ruta | Página |
| --- | --- |
| `/` | Inicio |
| `/alojamientos` | Listado de alojamientos con filtros |
| `/alojamientos/:id` | Detalle, cotización y reserva |
| `/mis-reservas` | Reservas realizadas |

Cualquier otra ruta redirige al inicio.

## Estructura general del proyecto

```
src/app/
├── components/               Componentes reutilizables
│   ├── alojamiento-card/     Tarjeta de un alojamiento
│   ├── formulario-cotizacion/  Fechas, huéspedes y cálculo de la cotización
│   ├── formulario-reserva/   Datos del huésped y creación de la reserva
│   ├── navbar/               Barra de navegación
│   └── toasts/               Notificaciones emergentes
├── pages/                    Una página por ruta
│   ├── home/                 Inicio
│   ├── listado/              Listado y filtros
│   ├── detalle/              Detalle del alojamiento
│   └── mis-reservas/         Reservas realizadas
├── models/                   Interfaces de TypeScript
│   ├── alojamiento.ts
│   ├── resena.ts
│   ├── cotizacion.ts
│   └── reserva.ts
├── services/                 Acceso a datos y lógica
│   ├── alojamiento.service.ts  Lectura del JSON (solo alojamientos activos)
│   ├── cotizacion.service.ts   Validaciones y cálculo de la cotización
│   ├── reserva.service.ts      Reservas en localStorage
│   └── toast.service.ts        Notificaciones
├── app.routes.ts             Navegación
└── app.config.ts             Configuración de la aplicación
public/assets/
├── data/                     marketplace-data.json
└── images/                   Imágenes de los alojamientos
```

## Datos

Los datos iniciales están en `public/assets/data/marketplace-data.json` y se consultan únicamente mediante `AlojamientoService`; la interfaz no importa el archivo directamente. Contiene dos listas: `alojamientos` y `resenas`.

Las reservas no forman parte del JSON: se crean durante la ejecución y se guardan en el `localStorage` del navegador, por lo que se conservan al recargar la página.
