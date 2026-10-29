# Backoffice del blog (Guías de viaje)

Se entra en **https://myplacesjc.netlify.app/admin/** con correo y contraseña. Cada artículo tiene versión en inglés y en español, cada una con su propia dirección web y su propio SEO. Al pulsar **Publicar**, el sitio se reconstruye solo en ~1 minuto.

## Activación (una sola vez, en Netlify)
1. Netlify → tu sitio → **Site configuration → Identity → Enable Identity**.
2. Identity → **Registration preferences → Invite only**.
3. Identity → **Services → Git Gateway → Enable Git Gateway**.
4. Identity → **Invite users** → escribe el correo de cada editor. Les llega un enlace; al abrirlo eligen contraseña y entran al editor.
5. Confirma que el repositorio usa la rama `main` (si tu rama se llama distinto, cambia `branch: main` en `admin/config.yml`) y que Netlify toma la configuración de `netlify.toml` (comando `node tools/build-blog.js`, carpeta de publicación `.`).

## Escribir un artículo
- **Guías de viaje → Nueva guía.** Arriba elige el idioma (EN / ES) y llena cada versión.
- **Publicado**: apagado = borrador (no sale en el sitio). Enciéndelo para publicar esa versión.
- **Dirección web (url_slug)**: obligatoria en inglés, da nombre al archivo; en español escríbela en español. Solo minúsculas, números y guiones. No la cambies tras publicar: rompería el enlace que ya conoce Google.
- **Título** 10–60 caracteres. **Descripción SEO** 120–160. Primer párrafo: la respuesta directa a la pregunta del título.
- **Imágenes**: se suben a `assets/img/blog`. Escribe siempre el texto alternativo.
- Un artículo solo en inglés es válido: la versión en español simplemente no aparece (el índice en español existe cuando hay al menos una guía publicada en español).
- Meta recomendada: 900+ palabras. El build avisa en el registro de Netlify si algo no cumple.

## Qué se genera
`/blog/` y `/blog/posts/<url>.html` (EN) · `/es/blog/` y `/es/blog/posts/<url>.html` (ES) · hreflang entre versiones · `sitemap.xml` · `robots.txt`.

## Notas técnicas
- Los textos viven en `content/blog/<url>.en.md` y `.es.md`; los textos del índice, en `content/blog-settings.yml` (Ajustes en el editor).
- `content/`, `tools/` y `netlify.toml` no se sirven públicamente (404). `/admin/` va con noindex.
- Los archivos generados (`blog/`, `es/blog/`, sitemap) se regeneran en cada publicación; no los edites a mano.
