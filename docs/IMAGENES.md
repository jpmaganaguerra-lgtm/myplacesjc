# Imágenes del sitio · MyPlace San José del Cabo

Regla única: **suelta el archivo con el nombre exacto en su carpeta y aparece solo.**
Mientras no exista, el sitio muestra una imagen provisional dibujada con código.
Formato: JPG o WebP (cambia la extensión en `js/images.js` si usas WebP). Peso objetivo: 250–450 KB por imagen.

## Mapa

```
assets/img/
├─ hero/                 PORTADA
│  ├─ hero-dorada.jpg    2400×1500 · horizontal 16:10 · hora dorada (foto principal)
│  ├─ hero-azul.jpg      2400×1500 · opcional · misma toma en hora azul; se funden entre sí
│  └─ hero-frente.png    2400×1000 · opcional · PNG transparente con vegetación en primer plano
├─ habitaciones/         SECCIÓN "DÓNDE QUEDARTE" (también miniaturas del panel de reserva)
│  ├─ hab-suite1.jpg         1200×1800 · vertical 2:3
│  ├─ hab-residencia2.jpg    1200×1800
│  ├─ hab-estudio.jpg        1200×1800
│  └─ hab-habitacion.jpg     1200×1800
├─ destino/              SECCIÓN "TODO CABE EN UN DÍA"
│  ├─ destino-centro.jpg     1200×1500 · vertical 4:5 · centro histórico
│  ├─ destino-playas.jpg     1200×1500 · playas
│  ├─ destino-golf.jpg       1200×1500 · campo de golf
│  └─ destino-mar.jpg        1200×1500 · mar y sierra
├─ amenidades/
│  └─ amenidades-alberca.jpg 1200×1600 · vertical alto
├─ reserva/
│  └─ reserva-noche.jpg      2400×1400 · horizontal · escena nocturna, se atenúa al 50 %
└─ og/
   └─ og-1200x630.jpg        1200×630 · imagen al compartir en redes
```

## Dónde se usa cada imagen

| Archivo | Se ve en |
|---|---|
| hero-dorada / hero-azul / hero-frente | Portada |
| hab-suite1 | Tarjeta 01 de habitaciones · miniatura del panel · menú (opción Habitaciones) |
| hab-residencia2, hab-estudio, hab-habitacion | Tarjetas 02–04 · miniaturas del panel |
| destino-centro | Acordeón Destino · menú (San José del Cabo) |
| destino-playas | Acordeón Destino |
| destino-golf | Acordeón Destino · menú (Golf y playas) |
| destino-mar | Acordeón Destino · menú (Reservar) |
| amenidades-alberca | Amenidades · menú (Amenidades) |
| reserva-noche | Fondo de la sección final |
| og-1200x630 | Vista previa al compartir (usa URL absoluta al publicar) |

## Criterio de dirección de arte

- Luz de hora dorada, amanecer o noche. Nada de mediodía plano.
- Mucho espacio vacío y arquitectura; personas espontáneas, nunca posadas.
- Paleta cálida y apagada: marfil, arena, arcilla, olivo, espresso.
- Un punto de enfoque por foto. Los recortes en pantalla cambian: deja aire alrededor del sujeto.
- Ajusta el encuadre por foto en `IMG_POS` (`js/images.js`), por ejemplo `'50% 30%'`.

## Opciones en `js/images.js`

- Ruta vacía `''` → imagen provisional.
- `'off'` → oculta ese espacio.
- Si hay `hero-dorada.jpg` pero no `hero-azul.jpg`, la portada usa solo la foto (sin fundido).
- Texto alternativo de cada imagen en `IMG_ALT`.

## Video de portada

```
assets/video/hero/
├─ hero-1080-av1.mp4    AV1 10 bits · 1920×1080 · ~5.6 MB · escritorio (primera opción)
├─ hero-1080-h264.mp4   H.264 · 1920×1080 · ~8.7 MB · escritorio (respaldo)
├─ hero-720-av1.mp4     AV1 10 bits · 1280×720 · ~2.5 MB · móvil y tablet (primera opción)
├─ hero-720-h264.mp4    H.264 · 1280×720 · ~4.1 MB · móvil y tablet (respaldo)
└─ hero-poster.jpg      1920×1080 · primer cuadro, visible al instante
```

- Bucle continuo de 23 s (fundido de 1.2 s entre final y principio), sin audio, 30 fps, sin desenfoque.
- El navegador reproduce la primera versión compatible. AV1 pesa la mitad que H.264 con la misma calidad; H.264 es el respaldo para equipos que no leen AV1.
- La calidad máxima la limita el archivo original (1080p ya comprimido y algo suave). Con un original en 4K o con mayor bitrate, el resultado mejora.
- Si existe el video, tiene prioridad sobre las fotos de la portada.
- Con ahorro de datos, conexión 2G/3G o "reducir movimiento", solo se muestra el póster.
- Se pausa cuando la portada sale de pantalla o la pestaña se oculta.
- Diagnóstico: el elemento `.hero` lleva `data-video="loading | playing | poster-only | error | no-poster"` (se ve en el inspector). `no-poster` o `error` casi siempre significa que falta la carpeta `assets/` en el hosting.
- Máscara en `css/video.css`: velo oscuro ligero y viñeta; para desenfocar los bordes agrega la clase `soft` a `.veil`.
- Video nuevo: `tools/encode-hero-video.sh archivo.mp4`.
