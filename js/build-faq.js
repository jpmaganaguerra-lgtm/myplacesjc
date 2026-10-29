#!/usr/bin/env node
'use strict';
/* Genera faq.html (página de Preguntas frecuentes) con el mismo header, logo, menú y footer de la portada.

   Uso:   node tools/build-faq.js
          SITE=https://www.tudominio.com node tools/build-faq.js     (cambia el dominio de canonical, OG y datos estructurados)

   De dónde sale cada cosa (así nada se desincroniza):
     - header, menú y footer  → se copian de index.html (con los enlaces ajustados para que apunten a la portada)
     - preguntas y respuestas → js/i18n.js (claves faq.N.q / faq.N.a, en inglés; el JS las pasa a español)
     - dominio                → tools/blog-config.json ("site"), o la variable SITE
   Después de cambiar el menú de index.html o los textos de FAQ en i18n.js, vuelve a correr este script. */

const fs = require('fs'), path = require('path'), vm = require('vm');
const ROOT = path.resolve(__dirname, '..');
const read = f => fs.readFileSync(path.join(ROOT, f), 'utf8');
const SITE = (process.env.SITE || JSON.parse(read('tools/blog-config.json')).site).replace(/\/+$/, '');

/* --- textos: se ejecuta i18n.js en un entorno vacío solo para leer el diccionario I18N --- */
const stub = { getAttribute() { return null; }, setAttribute() {}, querySelectorAll() { return []; }, querySelector() { return null; }, getElementById() { return null; }, addEventListener() {} };
const ctx = { document: Object.assign({ documentElement: stub }, stub), localStorage: { getItem() { return null; }, setItem() {} }, navigator: { language: 'en' }, window: {}, console, matchMedia() { return { matches: false }; } };
vm.createContext(ctx);
vm.runInContext(read('js/i18n.js'), ctx);
const EN = ctx.I18N.en, ES = ctx.I18N.es;
const plain = h => h.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const ld = o => '<script type="application/ld+json" id="' + o.id + '">\n' + JSON.stringify(o.data, null, 1).replace(/</g, '\\u003c') + '\n</script>';

const qa = [];
for (let i = 1; ('faq.' + i + '.q') in EN; i++) {
  if (!(('faq.' + i + '.q') in ES) || !(('faq.' + i + '.a') in ES)) throw new Error('Falta la traducción de faq.' + i);
  qa.push({ n: i, q: EN['faq.' + i + '.q'], a: EN['faq.' + i + '.a'] });
}
if (!qa.length) throw new Error('No hay preguntas en i18n.js');

/* --- bloques que se copian de la portada --- */
const idx = read('index.html');
function slice(open, close, name) {
  const a = idx.indexOf(open); if (a < 0) throw new Error('No encuentro ' + name + ' en index.html');
  const b = idx.indexOf(close, a); if (b < 0) throw new Error('No cierra ' + name + ' en index.html');
  return idx.slice(a, b + close.length);
}
let header = slice('<header id="hd"', '</header>', 'header').replace(/^<header id="hd"[^>]*>/, '<header id="hd">');   /* sin la clase nologo de la portada */
let nav = slice('<nav class="menu"', '</nav>', 'menú');
let footer = slice('<footer>', '</footer>', 'footer');

const mark = '<a class="mark" href="#top"';
const resBtn = /<button class="res-btn lab" data-reserve data-i18n="nav.book">Book<\/button>/;
if (!header.includes(mark) || !resBtn.test(header)) throw new Error('El header de index.html cambió: revisa build-faq.js');
header = header.replace(mark, '<a class="mark" href="index.html"').replace(resBtn, '<a class="res-btn lab" href="index.html#reservar" data-reserve data-i18n="nav.book">Book</a>');

nav = nav.replace(/href="#/g, 'href="index.html#').replace(/ data-acc="\d+"/g, '');
if (!nav.includes('href="faq.html"')) throw new Error('El menú de index.html no tiene el enlace a faq.html');
nav = nav.replace('href="faq.html"', 'href="faq.html" aria-current="page"');

const url = SITE + '/faq.html', og = SITE + '/assets/img/og/og-1200x630.jpg';
const T = k => EN[k];
const items = qa.map(x => `    <div class="it${x.n === 1 ? ' on' : ''}"><button class="hd" type="button" aria-expanded="${x.n === 1}" data-i18n="faq.${x.n}.q">${x.q}</button><div class="bd"><div><p data-i18n="faq.${x.n}.a">${x.a}</p></div></div></div>`).join('\n');

const html = `<!DOCTYPE html>
<html lang="en-US" data-meta="metaFaq">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(T('metaFaq.title'))}</title>
<meta name="description" content="${esc(T('metaFaq.desc'))}">
<meta name="robots" content="index, follow, max-image-preview:large">
<meta name="theme-color" content="#16130F">
<link rel="canonical" href="${url}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="MyPlace San José del Cabo">
<meta property="og:title" content="${esc(T('metaFaq.ogTitle'))}">
<meta property="og:description" content="${esc(T('metaFaq.ogDesc'))}">
<meta property="og:url" content="${url}">
<meta property="og:locale" content="en_US">
<meta property="og:locale:alternate" content="es_MX">
<meta property="og:image" content="${og}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="MyPlace San José del Cabo, suites and residences by the golf course">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(T('metaFaq.ogTitle'))}">
<meta name="twitter:description" content="${esc(T('metaFaq.ogDesc'))}">
<meta name="twitter:image" content="${og}">
<link rel="preload" as="image" href="assets/video/hero/hero-poster.jpg" fetchpriority="high">
<link rel="icon" href="assets/icons/favicon.svg" type="image/svg+xml">
${ld({ id: 'ld-faq', data: { '@context': 'https://schema.org', '@type': 'FAQPage', inLanguage: 'en-US', mainEntity: qa.map(x => ({ '@type': 'Question', name: plain(x.q), acceptedAnswer: { '@type': 'Answer', text: plain(x.a) } })) } })}
${ld({ id: 'ld-crumbs', data: { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: SITE + '/' }, { '@type': 'ListItem', position: 2, name: 'FAQ', item: url }] } })}
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/tokens.css">
<link rel="stylesheet" href="css/base.css">
<link rel="stylesheet" href="css/header.css">
<link rel="stylesheet" href="css/menu.css">
<link rel="stylesheet" href="css/sections.css">
<link rel="stylesheet" href="css/footer.css">
<link rel="stylesheet" href="css/hover.css">
<link rel="stylesheet" href="css/motion.css">
<link rel="stylesheet" href="css/page.css">
</head>
<body class="pg">
<div class="grain" aria-hidden="true"></div>

${header}

${nav}

<main id="top">
<!-- BANNER -->
<section class="pg-hero" aria-labelledby="pgH" data-tone="dark">
  <div class="bg" aria-hidden="true"></div>
  <div class="in">
    <span class="lab" data-i18n="faq.label">${T('faq.label')}</span>
    <h1 id="pgH" data-i18n="faq.h">${T('faq.h')}</h1>
  </div>
</section>

<!-- PREGUNTAS FRECUENTES (el mismo texto alimenta los datos estructurados FAQPage) -->
<section class="faq" id="faq" data-tone="dark" aria-label="${esc(T('faq.label'))}">
  <div class="faq-l">
    <p class="faq-intro rv" data-i18n="faq.intro">${T('faq.intro')}</p>
  </div>
  <div class="acc faq-r">
${items}
  </div>
</section>
</main>

${footer}

<script src="js/config.js"></script>
<script src="js/analytics.js"></script>
<script src="js/i18n.js"></script>
<script src="js/scenes.js"></script>
<script src="js/images.js"></script>
<script src="js/page.js"></script>
<script src="js/logo-detect.js"></script>
<script src="js/whatsapp.js"></script>
</body>
</html>
`;
fs.writeFileSync(path.join(ROOT, 'faq.html'), html);
console.log('faq.html generado · sitio:', SITE, '· preguntas:', qa.length, '· título:', T('metaFaq.title').length, 'car. · descripción:', T('metaFaq.desc').length, 'car.');
