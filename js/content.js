'use strict';
/* Habitaciones y destino, en inglés (en) y español (es). Edita aquí el contenido.
   `s` = nombre de la foto SIN extensión; el archivo va en assets/img/habitaciones/ (o destino/). Ver docs/IMAGENES.md.
   Los demás textos del sitio están en js/i18n.js. */
var ROOMS=[
 {id:'hk',s:'habitacion-king-plano',tr:{
  en:{n:'King Hotel Room',t:'King-size bed, coffee station and bathroom',d:'For two, with room to spare and morning light.'},
  es:{n:'Habitación hotelera king',t:'Cama king size, coffee station y baño',d:'Para dos, con espacio de sobra y luz de mañana.'}}},
 {id:'d1rq',s:'suite-una-recamara-doble-queen',tr:{
  en:{n:'One-Bedroom Suite with Two Queen Beds',t:'One bedroom · full kitchen',d:'For families or friends, with the living room at the heart.'},
  es:{n:'Suite de una recamara con dos camas queen',t:'Una recámara · cocina completa',d:'Para familias o amigos, con la sala como centro.'}}},
 {id:'d2rkq',s:'suite-dos-recamaras-king-double-queen',tr:{
  en:{n:'Two-Bedroom Suite with King and Two Queen Beds',t:'Two bedrooms · full kitchen',d:'Everything in one, with the calm of a home of your own.'},
  es:{n:'Suite de dos recamaras con king y dos queen',t:'Dos recámaras · cocina completa',d:'Todo en uno, con la tranquilidad de una casa propia.'}}},
 {id:'sq',s:'Estudio-doble-queen',tr:{
  en:{n:'Queen Studio',t:'Studio with two queen beds',d:'Full kitchen · living area'},
  es:{n:'Estudio queen',t:'Estudio con dos camas queen',d:'Cocina completa · sala'}}},
 {id:'d2rq',s:'suite-dos-recamaras-queen',tr:{
  en:{n:'Two-Bedroom Suite with Two Queen Beds',t:'Two bedrooms · full kitchen',d:'Spacious suite · Full kitchen · living area'},
  es:{n:'Suite de dos recamaras con dos queen',t:'Dos recámaras · cocina completa',d:'Amplia suite · Cocina completa · sala'}}}
];
var DEST=[
 {s:'destino-centro',tr:{
  en:{n:'Historic Downtown',c:'Street, gallery, table',p:'Galleries, plazas and open-air tables. On seasonal Thursdays, the Art Walk fills the streets.'},
  es:{n:'Centro histórico',c:'Calle, galería, mesa',p:'Galerías, plazas y mesas al aire libre. Los jueves de temporada, el Art Walk llena las calles.'}}},
 {s:'destino-playas',tr:{
  en:{n:'Beaches',c:'Palmilla · Costa Azul · Estuary',p:'Palmilla and Costa Azul for swimming or surfing; the San José Estuary for watching birds at dawn.'},
  es:{n:'Playas',c:'Palmilla · Costa Azul · Estero',p:'Palmilla y Costa Azul para nadar o surfear; el Estero de San José para ver aves al amanecer.'}}},
 {s:'destino-golf',tr:{
  en:{n:'Golf',c:'Next to the hotel',p:'The golf course is steps away. Head out with the first sun and come back for breakfast on your terrace.'},
  es:{n:'Golf',c:'Junto al hotel',p:'El campo de golf está a un paso. Sal con el primer sol y vuelve a desayunar en tu terraza.'}}},
 {s:'destino-mar-dunas',tr:{
  en:{n:'Sea & Sierra',c:'Sandboarding in the dunes',p:'Whales from December to April, and dunes for sandboarding, all just an excursion away.'},
  es:{n:'Mar y sierra',c:'Sandboarding en las dunas',p:'Ballenas de diciembre a abril. Desde ballenas hasta dunas para hacer sandsurfing, a una excursión de distancia.'}}}
];

/* Copia el idioma activo a r.n / r.t / r.d (habitaciones) y d.n / d.c / d.p (destino). Lo llama i18n.js. */
function localize(lang){
  function pick(o){var x=o.tr[lang]||o.tr.en,k;for(k in x)o[k]=x[k]}
  ROOMS.forEach(pick);DEST.forEach(pick);
}
