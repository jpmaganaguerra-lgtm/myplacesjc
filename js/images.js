'use strict';
/* Imágenes del sitio: carga automática, sin lista que mantener.

   CÓMO FUNCIONA
   El nombre que pones en `s` (js/content.js) ES el nombre del archivo, sin extensión.
   El sitio sabe en qué carpeta buscar según la sección donde aparece:

     Habitaciones (tarjetas y panel de reserva)  →  assets/img/habitaciones/
     Destino                                     →  assets/img/destino/
     Amenidades                                  →  assets/img/amenidades/
     Reserva (fondo final)                       →  assets/img/reserva/
     Portada                                     →  assets/img/hero/   (hero-dorada, hero-azul, hero-frente)

   Ejemplo:  {id:'king', n:'Habitación king', ... s:'habitacion-king-plano'}
             → busca assets/img/habitaciones/habitacion-king-plano.jpg
   Acepta .jpg .jpeg .png .webp (y .JPG .JPEG .PNG). Tampoco importa si escribes la extensión en `s`.
   Mientras el archivo no exista se ve una imagen provisional dibujada con código. */

var IMG_BASE='assets/img/';
var IMG_EXT=['jpg','jpeg','png','webp','JPG','JPEG','PNG'];

/* OPCIONAL · casos especiales. Normalmente se deja vacío.
   'nombre':'off'            → oculta ese espacio
   'nombre':'otra/ruta.jpg'  → usa esa ruta (relativa a assets/img/) en lugar de buscar */
var IMAGES={};

/* OPCIONAL · punto de enfoque al recortar (object-position). Por nombre de imagen. */
var IMG_POS={'hero-dorada':'50% 60%','hero-azul':'50% 60%','hero-frente':'50% 100%'};

/* OPCIONAL · texto alternativo. Si falta, se usa el nombre de la habitación o del destino de content.js. */
var IMG_ALT={
  'amenidades-alberca':'alt.pool',     /* claves de js/i18n.js: se traducen solas */
  'reserva-noche':'alt.night'
};

/* Imagen provisional cuando aún no hay foto: la ilustración del propio nombre, o una genérica de su sección. */
var IMG_DEFAULT={habitaciones:'hab-suite1',destino:'destino-centro',amenidades:'amenidades-alberca',reserva:'reserva-noche'};

/* ---------- búsqueda del archivo ---------- */
var FOUND={};   /* clave → url encontrada, o null si no existe */
var WAIT={};    /* clave → callbacks esperando el resultado (evita repetir pruebas) */
function probe(list,i,done){
  if(i>=list.length){done(null);return}
  var im=new Image();
  im.onload=function(){done(list[i])};
  im.onerror=function(){probe(list,i+1,done)};
  im.src=list[i];
}
function find(folder,name,cb){
  var key=folder+'/'+name;
  if(key in FOUND){cb(FOUND[key]);return}
  if(WAIT[key]){WAIT[key].push(cb);return}
  WAIT[key]=[cb];
  var forced=IMAGES[name],list=[];
  if(forced&&forced!=='off')list=[IMG_BASE+forced];
  else if(/\.(jpe?g|png|webp)$/i.test(name))list=[IMG_BASE+folder+'/'+name];
  else{
    var ext=IMG_EXT.slice();
    if(name==='hero-frente')ext=['png','webp'].concat(ext);   /* el primer plano suele ser PNG transparente */
    list=ext.map(function(e){return IMG_BASE+folder+'/'+name+'.'+e});
  }
  probe(list,0,function(url){FOUND[key]=url;var w=WAIT[key];delete WAIT[key];w.forEach(function(f){f(url)})});
}

/* ---------- ubicar la carpeta según dónde está el elemento ---------- */
function folderOf(el){
  var f=el.getAttribute('data-folder');if(f)return f;
  if(el.closest('.room,.opt'))return 'habitaciones';
  if(el.closest('.dest'))return 'destino';
  if(el.closest('.amen'))return 'amenidades';
  if(el.closest('.final'))return 'reserva';
  return null;
}
function altOf(n){
  if(IMG_ALT[n])return T(IMG_ALT[n]);
  var i,L=(typeof ROOMS!=='undefined'?ROOMS:[]),D=(typeof DEST!=='undefined'?DEST:[]);
  for(i=0;i<L.length;i++)if(L[i].s===n)return L[i].n;
  for(i=0;i<D.length;i++)if(D[i].s===n)return D[i].n;
  return '';
}
function putImg(el,n,url){
  var img=new Image();img.alt=altOf(n);img.decoding='async';
  if(n.indexOf('hero-')!==0)img.loading='lazy';
  img.src=url;img.style.objectPosition=IMG_POS[n]||'50% 50%';
  el.innerHTML='';el.appendChild(img);el.setAttribute('data-real','1');
}
function mount(el){
  var n=el.getAttribute('data-scene');
  if(n.indexOf('hero-')===0||el.getAttribute('data-m'))return;
  el.setAttribute('data-m','1');
  if(IMAGES[n]==='off'){el.style.display='none';return}
  var folder=folderOf(el);
  /* Provisional: ilustración propia si existe; si no, la genérica de la sección. */
  var draw=(typeof SC!=='undefined')&&(SC[n]||(folder&&SC[IMG_DEFAULT[folder]]));
  if(draw)el.innerHTML=draw();
  if(!folder)return;                                   /* p. ej. el menú: solo ilustraciones */
  find(folder,n,function(url){if(url)putImg(el,n,url)});
}
function mountAll(root){(root||document).querySelectorAll('[data-scene]').forEach(mount)}

/* Portada: si hay foto principal, las capas azul y primer plano son opcionales; si no, todo provisional. */
function mountHero(){
  function q(n){return document.querySelector('[data-scene="'+n+'"]')}
  var d=q('hero-dorada'),a=q('hero-azul'),f=q('hero-frente');
  function proc(){d.innerHTML=SC['hero-dorada']();a.innerHTML=SC['hero-azul']();f.innerHTML=SC['hero-frente']()}
  function opt(el,n){
    if(IMAGES[n]==='off'){el.style.display='none';return}
    find('hero',n,function(url){if(url)putImg(el,n,url);else el.style.display='none'});
  }
  if(IMAGES['hero-dorada']==='off'){proc();return}
  find('hero','hero-dorada',function(url){
    if(!url){proc();return}
    putImg(d,'hero-dorada',url);opt(a,'hero-azul');opt(f,'hero-frente');
  });
}
