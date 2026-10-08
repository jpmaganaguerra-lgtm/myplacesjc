'use strict';
/* Manifiesto de imágenes.
   Suelta el archivo con el nombre exacto en la carpeta indicada y aparece solo.
   '' = usar la imagen provisional · 'off' = ocultar el espacio. Detalle en docs/IMAGENES.md */
var IMG_BASE='assets/img/';
var IMAGES={
  'hero-dorada':'hero/hero-dorada.jpg',
  'hero-azul':'hero/hero-azul.jpg',
  'hero-frente':'hero/hero-frente.png',
  'hab-suite1':'habitaciones/hab-suite1.jpg',
  'hab-residencia2':'habitaciones/hab-residencia2.jpg',
  'hab-estudio':'habitaciones/hab-estudio.jpg',
  'hab-habitacion':'habitaciones/hab-habitacion.jpg',
  'destino-centro':'destino/destino-centro.jpg',
  'destino-playas':'destino/destino-playas.jpg',
  'destino-golf':'destino/destino-golf.jpg',
  'destino-mar':'destino/destino-mar.jpg',
  'amenidades-alberca':'amenidades/amenidades-alberca.jpg',
  'reserva-noche':'reserva/reserva-noche.jpg'
};
/* Punto de enfoque al recortar (object-position). */
var IMG_POS={'hero-dorada':'50% 60%','hero-azul':'50% 60%','hero-frente':'50% 100%'};
/* Texto alternativo (SEO y accesibilidad). */
var IMG_ALT={
  'hab-suite1':'Suite de una recámara con terraza en San José del Cabo',
  'hab-residencia2':'Residencia de dos recámaras con cocina completa',
  'hab-estudio':'Estudio con cocina en San José del Cabo',
  'hab-habitacion':'Habitación en San José del Cabo',
  'destino-centro':'Centro histórico de San José del Cabo al atardecer',
  'destino-playas':'Playa en San José del Cabo',
  'destino-golf':'Campo de golf junto al hotel',
  'destino-mar':'Amanecer sobre el mar en Baja California Sur',
  'amenidades-alberca':'Alberca del hotel',
  'reserva-noche':'Noche en San José del Cabo'
};
function preload(src,ok,fail){var i=new Image();i.onload=function(){ok()};i.onerror=function(){fail()};i.src=src}
function putImg(el,n){
  var img=new Image();img.alt=IMG_ALT[n]||'';img.decoding='async';
  if(n.indexOf('hero-')!==0)img.loading='lazy';
  img.src=IMG_BASE+IMAGES[n];img.style.objectPosition=IMG_POS[n]||'50% 50%';
  el.innerHTML='';el.appendChild(img);el.setAttribute('data-real','1');
}
function mount(el){
  var n=el.getAttribute('data-scene');
  if(n.indexOf('hero-')===0||el.getAttribute('data-m'))return;
  el.setAttribute('data-m','1');
  var f=IMAGES[n];
  if(f==='off'){el.style.display='none';return}
  if(SC[n])el.innerHTML=SC[n]();
  if(f)preload(IMG_BASE+f,function(){putImg(el,n)},function(){});
}
function mountAll(root){(root||document).querySelectorAll('[data-scene]').forEach(mount)}
/* Portada: si hay foto principal, las capas azul y primer plano son opcionales; si no, todo provisional. */
function mountHero(){
  function q(n){return document.querySelector('[data-scene="'+n+'"]')}
  var d=q('hero-dorada'),a=q('hero-azul'),f=q('hero-frente');
  function proc(){d.innerHTML=SC['hero-dorada']();a.innerHTML=SC['hero-azul']();f.innerHTML=SC['hero-frente']()}
  function opt(el,n){var x=IMAGES[n];if(!x||x==='off'){el.style.display='none';return}
    preload(IMG_BASE+x,function(){putImg(el,n)},function(){el.style.display='none'})}
  var fd=IMAGES['hero-dorada'];
  if(!fd||fd==='off'){proc();return}
  preload(IMG_BASE+fd,function(){putImg(d,'hero-dorada');opt(a,'hero-azul');opt(f,'hero-frente')},proc);
}
