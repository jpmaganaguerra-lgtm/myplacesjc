# MyPlace San José del Cabo · sitio de transición

Sitio estático (HTML + CSS + JS). No requiere instalación. Abre `index.html` o sube la carpeta tal cual a cualquier hosting.

```
myplace-sjc/
├─ index.html              estructura y secciones
├─ css/                    estilos por componente (tokens → base → header → menu → hero → booking → sections → drawer → sky → motion)
├─ js/
│  ├─ config.js            URL del motor de reservas
│  ├─ content.js           textos de habitaciones y destino
│  ├─ scenes.js            imágenes provisionales (código)
│  ├─ images.js            manifiesto de imágenes reales
│  ├─ booking.js           calendario, barra de reserva, panel lateral
│  ├─ ui.js                menú, carrusel, destino, scroll
│  └─ sky.js               sol y luna de líneas
├─ assets/
│  ├─ img/                 fotografía (ver docs/IMAGENES.md)
│  ├─ icons/               favicon
│  └─ fonts/               reservado para tipografías propias
├─ docs/IMAGENES.md        organigrama y especificaciones de imágenes
├─ tools/build-single.py   genera dist/ con todo en un solo archivo
└─ dist/                   versión en un archivo para previsualizar
```

## Tareas frecuentes

- **Cambiar fotos:** `docs/IMAGENES.md`.
- **Conectar el motor de reservas:** pega la URL en `js/config.js` (`bookingUrl`).
- **Cambiar textos de habitaciones o destino:** `js/content.js`. El título, la portada y las amenidades están en `index.html`.
- **Cambiar colores o tipografía:** `css/tokens.css`.
- **Animación del sol y la luna:** `js/sky.js` y `css/sky.css`.

Orden de carga de scripts (no cambiar): config → content → scenes → images → booking → ui → sky.
