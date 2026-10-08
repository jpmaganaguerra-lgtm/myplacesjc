# Logo

## Cómo cambiar el logo

Reemplaza el archivo `logo.svg` con tu propio logo.

### Opciones

**SVG (recomendado):**
- Formato vectorial, escala perfecta en cualquier tamaño
- Usa `fill="currentColor"` para que el color cambio automáticamente entre claro (hero) y oscuro (header sólido)
- Si tu SVG ya tiene color fijo, funciona también

**PNG o JPG:**
- Renombra el archivo a `logo.png` o `logo.jpg`
- Actualiza `assets/icons/favicon.svg` si quieres un favicon diferente

### Dimensiones

- Ancho: 160–200px (se escalará automáticamente)
- Alto: mantén proporción; el sitio ajusta a 32–42px en desktop

### El logo en el sitio

- **Hero (portada):** blanco/marfil sobre fondo oscuro
- **Header sólido** (cuando baja el usuario): negro sobre fondo claro
- El cambio de color es automático con `filter: brightness()`

### Archivo actual

`logo.svg` es un placeholder. Reemplázalo con tu archivo.
