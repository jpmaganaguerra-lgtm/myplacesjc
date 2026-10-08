# MyPlace San José del Cabo · sitio de transición

Sitio estático (HTML + CSS + JS). No requiere instalación. Abre `index.html` o sube la carpeta tal cual a cualquier hosting.

```
myplace-sjc/
├─ index.html              estructura y secciones
├─ css/                    estilos por componente (tokens → base → header → menu → hero → booking → sections → day → drawer → sky → motion)
├─ js/
│  ├─ config.js            URL del motor de reservas
│  ├─ content.js           textos de habitaciones y destino
│  ├─ scenes.js            imágenes provisionales (código)
│  ├─ images.js            manifiesto de imágenes reales
│  ├─ booking.js           calendario, barra de reserva, panel lateral
│  ├─ ui.js                menú, carrusel, destino, scroll
│  ├─ hero-video.js        carga eficiente del video de portada
│  └─ sky.js               sol y luna de líneas
├─ assets/
│  ├─ img/                 fotografía (ver docs/IMAGENES.md)
│  ├─ video/hero/          video de portada en bucle (AV1 + H.264, escritorio y móvil, póster)
│  ├─ icons/               favicon
│  └─ fonts/               reservado para tipografías propias
├─ docs/IMAGENES.md        organigrama y especificaciones de imágenes
├─ tools/build-single.py   genera dist/ con todo en un solo archivo
├─ tools/encode-hero-video.sh  convierte un video nuevo al formato web
└─ dist/                   versión en un archivo para previsualizar (debe abrirse desde dentro de esta carpeta)
```

## Tareas frecuentes

- **Cambiar fotos:** `docs/IMAGENES.md`.
- **Cambiar el video de portada:** `tools/encode-hero-video.sh tu-video.mp4` (requiere ffmpeg). Ajusta la oscuridad en `css/video.css` (`.veil`).
- **Conectar el motor de reservas:** pega la URL en `js/config.js` (`bookingUrl`).
- **Cambiar textos de habitaciones o destino:** `js/content.js`. El título, la portada y las amenidades están en `index.html`.
- **Cambiar colores o tipografía:** `css/tokens.css`. Los colores del fondo de cada sección (el recorrido del día) están en `css/day.css`.
- **Animación del sol y la luna:** `js/sky.js` y `css/sky.css`.

Orden de carga de scripts (no cambiar): config → content → scenes → images → booking → ui → hero-video → sky.

## Cómo abrirlo o subirlo

- Abre `index.html` desde la carpeta raíz, o sube la carpeta **completa** al hosting (index.html, css, js y assets).
- Si falta `assets/`, el video y las fotos no cargan. No subas solo el HTML.
- El hosting debe servir `.mp4` con el tipo `video/mp4` y admitir descargas parciales (lo hacen Netlify, Vercel, GitHub Pages y la mayoría de hostings).
- Si el video no aparece, inspecciona el elemento `.hero` y revisa el atributo `data-video` (ver docs/IMAGENES.md).
