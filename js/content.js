'use strict';
/* Textos de habitaciones y destino, en inglés (en) y español (es). Edita aquí el contenido.
   `s` = nombre de la foto SIN extensión; el archivo va en assets/img/habitaciones/ (o destino/). Ver docs/IMAGENES.md.
   Los demás textos del sitio están en js/i18n.js. */
var ROOMS=[
 {id:'suite1',s:'hab-suite1',tr:{
  en:{n:'One-Bedroom Suite',t:'Living room, kitchen and terrace',d:'For two, with room to spare and morning light.'},
  es:{n:'Suite de una recámara',t:'Sala, cocina y terraza',d:'Para dos, con espacio de sobra y luz de mañana.'}}},
 {id:'res2',s:'hab-residencia2',tr:{
  en:{n:'Two-Bedroom Residence',t:'Two bedrooms · full kitchen',d:'For families or friends, with the living room at the heart.'},
  es:{n:'Residencia de dos recámaras',t:'Dos recámaras · cocina completa',d:'Para familias o amigos, con la sala como centro.'}}},
 {id:'studio',s:'hab-estudio',tr:{
  en:{n:'Studio',t:'Open-plan living · kitchen',d:'Everything in one, with the calm of a home of your own.'},
  es:{n:'Estudio',t:'Un solo ambiente · cocina',d:'Todo en uno, con la tranquilidad de una casa propia.'}}},
 {id:'hab',s:'hab-habitacion',tr:{
  en:{n:'Room',t:'Essential rest',d:'No kitchen, with the pools and the golf course at your door.'},
  es:{n:'Habitación',t:'Descanso esencial',d:'Sin cocina, con las albercas y el golf a la puerta.'}}}
];
var DEST=[
 {s:'destino-centro',tr:{
  en:{n:'Historic Downtown',c:'Street, gallery, table',p:'Galleries, plazas and open-air tables. On seasonal Thursdays, the Art Walk fills the streets.'},
  es:{n:'Centro histórico',c:'Calle, galería, mesa',p:'Galerías, plazas y mesas al aire libre. Los jueves de temporada, el Art Walk llena las calles.'}}},
 {s:'destino-playas',tr:{
  en:{n:'Beaches',c:'Palmilla · Costa Azul · Estero',p:'Palmilla and Costa Azul for swimming or surfing; the San José Estuary for watching birds at dawn.'},
  es:{n:'Playas',c:'Palmilla · Costa Azul · Estero',p:'Palmilla y Costa Azul para nadar o surfear; el Estero de San José para ver aves al amanecer.'}}},
 {s:'destino-golf',tr:{
  en:{n:'Golf',c:'Next to the hotel',p:'The golf course is steps away. Head out with the first sun and come back for breakfast on your terrace.'},
  es:{n:'Golf',c:'Junto al hotel',p:'El campo de golf está a un paso. Sal con el primer sol y vuelve a desayunar en tu terraza.'}}},
 {s:'destino-mar',tr:{
  en:{n:'Sea & Sierra',c:'Whales · Todos Santos',p:'Whales from December to April. Todos Santos and the Sierra de la Laguna are an excursion away.'},
  es:{n:'Mar y sierra',c:'Ballenas · Todos Santos',p:'Ballenas de diciembre a abril. Todos Santos y la Sierra de la Laguna, a una excursión de distancia.'}}}
];

/* Copia el idioma activo a r.n / r.t / r.d (habitaciones) y d.n / d.c / d.p (destino). Lo llama i18n.js. */
function localize(lang){
  function pick(o){var x=o.tr[lang]||o.tr.en,k;for(k in x)o[k]=x[k]}
  ROOMS.forEach(pick);DEST.forEach(pick);
}
