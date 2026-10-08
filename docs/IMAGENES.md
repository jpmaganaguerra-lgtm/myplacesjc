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
