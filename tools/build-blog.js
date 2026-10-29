#!/usr/bin/env node
'use strict';
/* Genera el blog (guías de viaje) en inglés y español como HTML estático, más sitemap.xml y robots.txt.

   Uso:   node tools/build-blog.js
          SITE=https://www.tudominio.com node tools/build-blog.js     (cambia el dominio en todo lo generado)

   Netlify lo corre solo en cada publicación (ver netlify.toml), así que lo que escribes en el backoffice (/admin) aparece en el sitio.

   Fuente de verdad (lo que edita el backoffice):
     content/blog/<nombre>.en.md   versión en inglés de cada guía   (front matter + markdown)
     content/blog/<nombre>.es.md   versión en español (opcional)
     content/blog-settings.yml     textos de los índices del blog (título, descripción, introducción)
   Configuración técnica:  tools/blog-config.json  (dominio, imagen por defecto, WhatsApp)

   Genera:  blog/index.html, blog/posts/<slug>.html          (inglés)
            es/blog/index.html, es/blog/posts/<slug>.html    (español, solo si hay guías en español)
            sitemap.xml, robots.txt
   Una versión se publica solo si tiene published: true, título y texto. Los borradores no aparecen. */

const fs = require('fs'), path = require('path');
const yaml = require('./vendor/js-yaml.cjs.js');
const { marked } = require('./vendor/marked.umd.js');

const ROOT = path.resolve(__dirname, '..');
const read = f => fs.readFileSync(path.join(ROOT, f), 'utf8');
const cfg = JSON.parse(read('tools/blog-config.json'));
const settings = yaml.load(read('content/blog-settings.yml'), { schema: yaml.CORE_SCHEMA }) || {};
const SITE = (process.env.SITE || cfg.site).replace(/\/+$/, '');
const BRAND = 'MyPlace San José del Cabo';
const warn = [];

/* ---------- textos fijos por idioma ---------- */
const L = {
  en: {
    htmlLang: 'en-US', ogLocale: 'en_US', home: '/', homeName: 'Home', blogName: 'Travel guides',
    guides: 'Guides', book: 'Book', other: 'ES', otherTitle: 'Leer en español',
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    date: (m, d, y) => `${m} ${d}, ${y}`, read: 'min read', readGuide: 'Read the guide', moreGuides: 'More guides', travelGuides: 'Travel guides',
    updated: d => `Last updated ${d}. Hours, rates and seasons change, so confirm details with each provider before you go.`,
    ctaAria: 'Book direct', ctaH: 'Stay close to <em>it all.</em>',
    ctaP: '55 suites and residences next to the golf course in San José del Cabo. Book direct, or message us with any question.',
    ctaDates: 'Check dates', ctaWa: 'Message us on WhatsApp', waText: "Hi, I'd like information about MyPlace San José del Cabo.",
    region: 'Baja California Sur, Mexico', navAria: 'Main', crumbAria: 'Breadcrumb', ogAltDefault: 'MyPlace San José del Cabo, suites and residences by the golf course'
  },
  es: {
    htmlLang: 'es-MX', ogLocale: 'es_MX', home: '/?lang=es', homeName: 'Inicio', blogName: 'Guías de viaje',
    guides: 'Guías', book: 'Reservar', other: 'EN', otherTitle: 'Read in English',
    months: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
    date: (m, d, y) => `${d} ${m} ${y}`, read: 'min de lectura', readGuide: 'Leer la guía', moreGuides: 'Más guías', travelGuides: 'Guías de viaje',
    updated: d => `Última actualización: ${d}. Los horarios, tarifas y temporadas cambian, así que confirma los detalles con cada proveedor antes de ir.`,
    ctaAria: 'Reserva directa', ctaH: 'Quédate cerca de <em>todo.</em>',
    ctaP: '55 suites y residencias junto al campo de golf en San José del Cabo. Reserva directo o escríbenos con cualquier duda.',
    ctaDates: 'Ver fechas', ctaWa: 'Escríbenos por WhatsApp', waText: 'Hola, me gustaría información sobre MyPlace San José del Cabo.',
    region: 'Baja California Sur, México', navAria: 'Principal', crumbAria: 'Ruta de navegación', ogAltDefault: 'MyPlace San José del Cabo, suites y residencias junto al campo de golf'
  }
};
const LANGS = ['en', 'es'];
const OUT = { en: 'blog', es: 'es/blog' };
const idxPath = lg => '/' + OUT[lg] + '/';
const postPath = (lg, slug) => '/' + OUT[lg] + '/posts/' + slug + '.html';
const homeHref = lg => L[lg].home;
const waLink = lg => 'https://wa.me/' + cfg.whatsapp + '?text=' + encodeURIComponent(L[lg].waText);

/* ---------- utilidades ---------- */
const esc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const ld = o => '<script type="application/ld+json">\n' + JSON.stringify(o, null, 1).replace(/</g, '\\u003c') + '\n</script>';
const plain = h => h.replace(/<[^>]+>/g, ' ').replace(/&[a-z#0-9]+;/gi, ' ').replace(/\s+/g, ' ').trim();
const abs = p => SITE + p;
const str = v => (v == null ? '' : String(v)).trim();
const isoDate = v => v instanceof Date ? v.toISOString().slice(0, 10) : str(v).slice(0, 10);
const nice = (lg, d) => { const [y, m, dd] = d.split('-').map(Number); return L[lg].date(L[lg].months[m - 1], dd, y); };

/* ---------- lectura del contenido ---------- */
function parseFile(file) {
  const raw = fs.readFileSync(file, 'utf8').replace(/^﻿/, '');
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) throw new Error('no tiene front matter (--- ... ---)');
  return { data: yaml.load(m[1], { schema: yaml.CORE_SCHEMA }) || {}, body: (m[2] || '').trim() };
}

function glanceHtml(p) {
  if (!p.glance.length) return '';
  return '<aside class="glance">\n<p class="lab">' + esc(p.glanceTitle) + '</p>\n<ul>\n' +
    p.glance.map(g => `<li><strong>${esc(g.label)}:</strong> ${esc(g.text)}</li>`).join('\n') + '\n</ul>\n</aside>\n';
}

function renderBody(p) {
  let h = marked.parse(p.md, { gfm: true });
  const g = glanceHtml(p);
  if (g) { const i = h.indexOf('<h2'); h = i < 0 ? g + h : h.slice(0, i) + g + '\n' + h.slice(i); }   /* el cuadro "De un vistazo" va antes del primer subtítulo */
  /* Enlaces a la reserva: apuntan a la portada en el idioma de la guía y se miden como conversión. */
  h = h.replace(/<a href="\/(?:\?lang=(?:en|es))?#reservar"/g, `<a href="${homeHref(p.lang)}#reservar" data-track="blog_cta" data-loc="${esc(p.slug)}"`);
  return h;
}

const dir = path.join(ROOT, 'content', 'blog');
const entries = {};                       /* base → { en: {...}, es: {...} } */
fs.readdirSync(dir).filter(f => /\.(en|es)\.md$/.test(f)).sort().forEach(f => {
  const [, base, lg] = f.match(/^(.+)\.(en|es)\.md$/);
  let doc;
  try { doc = parseFile(path.join(dir, f)); } catch (e) { warn.push(`ERROR ${f}: ${e.message} (se omite)`); return; }
  const d = doc.data, title = str(d.title);
  const published = d.published === true || str(d.published).toLowerCase() === 'true';
  if (!published) return;                                              /* borrador */
  if (!title || !doc.body) { warn.push(`${f}: publicada pero sin título o sin texto (se omite)`); return; }
  const glance = (Array.isArray(d.glance) ? d.glance : []).filter(g => g && str(g.label) && str(g.text)).map(g => ({ label: str(g.label), text: str(g.text) }));
  const p = {
    lang: lg, base, file: f, slug: str(d.url_slug) || base, title, md: doc.body,
    desc: str(d.description), excerpt: str(d.excerpt), category: (str(d.category) && !(lg === 'es' && str(d.category) === 'Guides')) ? str(d.category) : L[lg].guides,
    date: isoDate(d.date), modified: isoDate(d.updated) || isoDate(d.date), keywords: str(d.keywords),
    image: str(d.image), imageAlt: str(d.image_alt), glanceTitle: str(d.glance_title), glance
  };
  if (!p.date) { warn.push(`${f}: sin fecha (se omite)`); return; }
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(p.slug)) { warn.push(`${f}: la dirección "${p.slug}" no es válida (solo minúsculas, números y guiones; se omite)`); return; }
  if (lg === 'es' && !str(d.url_slug)) warn.push(`${f}: sin dirección propia en español; usa "${p.slug}" (el nombre del archivo en inglés)`);
  p.html = renderBody(p);
  p.words = plain(p.html).split(' ').filter(Boolean).length;
  p.readTime = Math.max(1, Math.round(p.words / 220));
  p.path = postPath(lg, p.slug); p.url = abs(p.path);
  (entries[base] = entries[base] || {})[lg] = p;
});

const posts = { en: [], es: [] };
Object.values(entries).forEach(e => LANGS.forEach(lg => { if (e[lg]) posts[lg].push(e[lg]); }));
LANGS.forEach(lg => posts[lg].sort((a, b) => b.date.localeCompare(a.date) || b.title.localeCompare(a.title)));   /* más reciente primero; el mismo día, orden fijo por título */

/* Validaciones de SEO y enlaces (avisos, no detienen la publicación) */
const known = new Set();
LANGS.forEach(lg => posts[lg].forEach(p => known.add(p.path)));
const seen = {};
LANGS.forEach(lg => posts[lg].forEach(p => {
  if (seen[lg + p.slug]) warn.push(`${p.file}: la dirección "${p.slug}" ya la usa otra guía en ${lg}`);
  seen[lg + p.slug] = 1;
  if (p.words < 900) warn.push(`${p.file}: ${p.words} palabras (mínimo recomendado 900)`);
  if (p.title.length > 60) warn.push(`${p.file}: título de ${p.title.length} caracteres (ideal 50 a 60)`);
  if (p.desc.length < 120 || p.desc.length > 160) warn.push(`${p.file}: descripción de ${p.desc.length} caracteres (ideal 120 a 160)`);
  if (!p.excerpt) warn.push(`${p.file}: sin resumen corto (se usa la descripción)`);
  if (p.image && !/^https?:/.test(p.image) && !fs.existsSync(path.join(ROOT, p.image))) warn.push(`${p.file}: no encuentro la imagen ${p.image}`);
  if (p.image && !p.imageAlt) warn.push(`${p.file}: imagen sin texto alternativo`);
  (p.html.match(/href="(\/(?:es\/)?blog\/posts\/[^"#?]*)/g) || []).forEach(h => {
    const m = h.slice(6); if (!known.has(m)) warn.push(`${p.file}: enlace roto ${m}`);
  });
}));
if (!posts.en.length) warn.push('No hay guías publicadas en inglés: el blog en inglés quedará vacío.');

/* ---------- piezas de página ---------- */
function alternates(lg, selfUrl, altUrl) {
  const en = lg === 'en' ? selfUrl : altUrl, es = lg === 'es' ? selfUrl : altUrl;
  if (!altUrl) return '';
  return `<link rel="alternate" hreflang="en-US" href="${en}">\n<link rel="alternate" hreflang="es-MX" href="${es}">\n<link rel="alternate" hreflang="x-default" href="${en}">\n`;
}

function head({ lang, title, desc, url, type, image, imageIsDefault, imageAlt, alt, extra }) {
  return `<!DOCTYPE html>
<html lang="${L[lang].htmlLang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="robots" content="index, follow, max-image-preview:large">
<meta name="theme-color" content="#16130F">
<link rel="canonical" href="${esc(url)}">
${alternates(lang, url, alt && alt.url)}<meta property="og:type" content="${type}">
<meta property="og:site_name" content="${BRAND}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${esc(url)}">
<meta property="og:locale" content="${L[lang].ogLocale}">
<meta property="og:image" content="${esc(image)}">
${imageIsDefault ? '<meta property="og:image:width" content="1200">\n<meta property="og:image:height" content="630">\n' : ''}<meta property="og:image:alt" content="${esc(imageAlt)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(desc)}">
<meta name="twitter:image" content="${esc(image)}">
${extra || ''}<link rel="icon" href="/assets/icons/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/css/tokens.css">
<link rel="stylesheet" href="/blog/blog.css">
`;
}

function header(lang, alt) {
  const l = L[lang];
  return `<header class="bh">
  <a class="wm" href="${homeHref(lang)}">MyPlace<small>San José del Cabo</small></a>
  <nav aria-label="${l.navAria}">
    <a href="${idxPath(lang)}">${l.guides}</a>${alt ? `\n    <a class="ls" href="${alt.path}" hreflang="${alt.lang === 'es' ? 'es-MX' : 'en-US'}" lang="${alt.lang}" title="${esc(l.otherTitle)}">${l.other}</a>` : ''}
    <a class="bk" href="${homeHref(lang)}#reservar" data-track="blog_cta" data-loc="header">${l.book}</a>
  </nav>
</header>`;
}

function footer(lang) {
  const l = L[lang];
  return `<footer class="bf">
  <a href="${homeHref(lang)}">MY PLACE - SAN JOSÉ DEL CABO</a>
  <a href="${idxPath(lang)}">${l.travelGuides}</a>
  <span>${l.region}</span>
  <span>MyPlace Leisure Homes STR</span>
</footer>
<script src="/js/config.js"></script>
<script src="/js/analytics.js"></script>
</body>
</html>
`;
}

function cta(lang) {
  const l = L[lang];
  return `<section class="cta" aria-label="${l.ctaAria}">
  <h2>${l.ctaH}</h2>
  <p>${l.ctaP}</p>
  <div class="btns">
    <a class="btn pri" href="${homeHref(lang)}#reservar" data-track="blog_cta" data-loc="footer-cta">${l.ctaDates}</a>
    <a class="btn" href="${waLink(lang)}" target="_blank" rel="noopener" data-track="whatsapp_click" data-loc="blog">${l.ctaWa}</a>
  </div>
</section>`;
}

function crumbs(lang, items) {
  return `<nav class="crumbs" aria-label="${L[lang].crumbAria}"><ol>` + items.map((it, i) =>
    it.href && i < items.length - 1 ? `<li><a href="${it.href}">${esc(it.name)}</a></li>` : `<li aria-current="page">${esc(it.name)}</li>`).join('') + '</ol></nav>';
}
const crumbLd = items => ({
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: abs(it.path) }))
});

/* ---------- limpiar lo generado antes (así una guía borrada o en borrador desaparece) ---------- */
fs.rmSync(path.join(ROOT, 'blog', 'posts'), { recursive: true, force: true });
fs.rmSync(path.join(ROOT, 'es', 'blog'), { recursive: true, force: true });
fs.mkdirSync(path.join(ROOT, 'blog', 'posts'), { recursive: true });

const defaultImage = abs(cfg.ogImage);
const set = lg => settings[lg] || {};
const hasIdx = lg => posts[lg].length > 0 && !!str(set(lg).h1);

/* ---------- artículos ---------- */
LANGS.forEach(lg => posts[lg].forEach(p => {
  const l = L[lg], other = lg === 'en' ? 'es' : 'en';
  const altPost = entries[p.base] && entries[p.base][other];
  const alt = altPost ? { lang: other, path: altPost.path, url: altPost.url } : (hasIdx(other) ? { lang: other, path: idxPath(other), url: abs(idxPath(other)) } : null);
  const items = [{ name: l.homeName, path: l.home.split('?')[0], href: homeHref(lg) }, { name: l.blogName, path: idxPath(lg), href: idxPath(lg) }, { name: p.title, path: p.path }];
  const custom = !!p.image, image = custom ? (/^https?:/.test(p.image) ? p.image : abs(p.image)) : defaultImage;
  const imgAlt = custom ? (p.imageAlt || p.title) : (set(lg).og_alt || l.ogAltDefault);
  const article = {
    '@context': 'https://schema.org', '@type': 'BlogPosting',
    headline: p.title, description: p.desc, image: [image],
    datePublished: p.date, dateModified: p.modified,
    author: { '@type': 'Organization', name: BRAND, url: abs('/') },
    publisher: { '@type': 'Organization', name: BRAND, url: abs('/'), logo: { '@type': 'ImageObject', url: abs('/assets/logo/logo.png') } },
    mainEntityOfPage: { '@type': 'WebPage', '@id': p.url },
    inLanguage: l.htmlLang, articleSection: p.category, keywords: p.keywords, wordCount: p.words
  };
  const related = posts[lg].filter(x => x.slug !== p.slug);
  const html = head({
    lang: lg, title: p.title, desc: p.desc, url: p.url, type: 'article', image, imageIsDefault: !custom, imageAlt: imgAlt, alt,
    extra: `<meta property="article:published_time" content="${p.date}">\n<meta property="article:modified_time" content="${p.modified}">\n<meta property="article:section" content="${esc(p.category)}">\n` +
      ld(article) + '\n' + ld(crumbLd(items)) + '\n'
  }) + `</head>
<body class="blog">
${header(lg, alt)}
<main>
<article class="wrap">
  ${crumbs(lg, items)}
  <div class="ph">
    <p class="lab">${esc(p.category)} · <time datetime="${p.date}">${nice(lg, p.date)}</time> · ${p.readTime} ${l.read}</p>
    <h1>${esc(p.title)}</h1>
  </div>${custom ? `\n  <figure class="pimg"><img src="${esc(p.image)}" alt="${esc(p.imageAlt)}" decoding="async"></figure>` : ''}
  <div class="body">
${p.html}
  </div>
  <p class="pf">${l.updated(nice(lg, p.modified))}</p>
</article>
${cta(lg)}${related.length ? `
<section class="more wrap" aria-label="${l.moreGuides}">
  <span class="lab">${l.moreGuides}</span>
  <div class="cards">
${related.map(r => `    <a class="card" href="${r.path}"><span class="lab">${nice(lg, r.date)} · ${r.readTime} ${l.read}</span><h3>${esc(r.title)}</h3><p>${esc(r.excerpt || r.desc)}</p></a>`).join('\n')}
  </div>
</section>` : ''}
</main>
${footer(lg)}`;
  const out = path.join(ROOT, OUT[lg], 'posts', p.slug + '.html');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html);
}));

/* ---------- índices ---------- */
LANGS.forEach(lg => {
  if (!hasIdx(lg)) { if (lg === 'es' && posts.es.length) warn.push('Hay guías en español pero faltan los textos del índice en content/blog-settings.yml (es)'); return; }
  const l = L[lg], s = set(lg), other = lg === 'en' ? 'es' : 'en', url = abs(idxPath(lg));
  const alt = hasIdx(other) ? { lang: other, path: idxPath(other), url: abs(idxPath(other)) } : null;
  const items = [{ name: l.homeName, path: l.home.split('?')[0], href: homeHref(lg) }, { name: l.blogName, path: idxPath(lg) }];
  const blog = {
    '@context': 'https://schema.org', '@type': 'Blog', name: str(s.h1), description: str(s.description), url, inLanguage: l.htmlLang,
    publisher: { '@type': 'Organization', name: BRAND, url: abs('/') },
    blogPost: posts[lg].map(p => ({ '@type': 'BlogPosting', headline: p.title, url: p.url, datePublished: p.date, description: p.desc }))
  };
  const html = head({
    lang: lg, title: str(s.title), desc: str(s.description), url, type: 'website', image: defaultImage, imageIsDefault: true, imageAlt: str(s.og_alt) || l.ogAltDefault, alt,
    extra: ld(blog) + '\n' + ld(crumbLd(items)) + '\n'
  }) + `</head>
<body class="blog">
${header(lg, alt)}
<main>
<div class="wrap">
  ${crumbs(lg, items)}
  <div class="ph">
    <p class="lab">${l.travelGuides}</p>
    <h1>${esc(s.h1)}</h1>
    <p class="intro">${esc(s.intro)}</p>
  </div>
  <div class="cards idx">
${posts[lg].map(p => `    <a class="card" href="${p.path}"><span class="lab">${esc(p.category)} · ${nice(lg, p.date)} · ${p.readTime} ${l.read}</span><h3>${esc(p.title)}</h3><p>${esc(p.excerpt || p.desc)}</p><span class="go">${l.readGuide}</span></a>`).join('\n')}
  </div>
</div>
${cta(lg)}
</main>
${footer(lg)}`;
  const out = path.join(ROOT, OUT[lg], 'index.html');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html);
});

/* ---------- sitemap.xml y robots.txt ---------- */
const all = LANGS.flatMap(lg => posts[lg]);
const lastAll = all.reduce((m, p) => p.modified > m ? p.modified : m, '2000-01-01');
const homeMod = process.env.HOME_LASTMOD || lastAll;
const urls = [
  { loc: abs('/'), mod: homeMod, freq: 'monthly', pr: '1.0' },
  { loc: abs('/faq.html'), mod: homeMod, freq: 'monthly', pr: '0.6' }
];
LANGS.forEach(lg => { if (hasIdx(lg)) urls.push({ loc: abs(idxPath(lg)), mod: lastAll, freq: 'weekly', pr: '0.8' }); });
all.forEach(p => urls.push({ loc: p.url, mod: p.modified, freq: 'monthly', pr: '0.7' }));
fs.writeFileSync(path.join(ROOT, 'sitemap.xml'),
  '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  urls.map(u => `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${u.mod}</lastmod>\n    <changefreq>${u.freq}</changefreq>\n    <priority>${u.pr}</priority>\n  </url>`).join('\n') + '\n</urlset>\n');
fs.writeFileSync(path.join(ROOT, 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /admin/\n\nSitemap: ${abs('/sitemap.xml')}\n`);

/* ---------- resumen ---------- */
console.log('Sitio:', SITE);
LANGS.forEach(lg => posts[lg].forEach(p => console.log(` - [${lg}] ${p.slug}: ${p.words} palabras, ${p.readTime} min, título ${p.title.length} car., descripción ${p.desc.length} car.`)));
console.log(`Guías publicadas: ${posts.en.length} en inglés, ${posts.es.length} en español · URLs en el sitemap: ${urls.length}`);
console.log(warn.length ? 'AVISOS:\n  ' + warn.join('\n  ') : 'Sin avisos.');
