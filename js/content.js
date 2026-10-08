'use strict';
/* Textos y datos de habitaciones y destino. Edita aquí el contenido. `s` = nombre del espacio de imagen (ver docs/IMAGENES.md). */
var ROOMS=[
 {id:'suite1',n:'Suite de una recámara',t:'Sala, cocina y terraza',d:'Para dos, con espacio de sobra y luz de mañana.',s:'hab-suite1'},
 {id:'res2',n:'Residencia de dos recámaras',t:'Dos recámaras · cocina completa',d:'Para familias o amigos, con la sala como centro.',s:'hab-residencia2'},
 {id:'studio',n:'Estudio',t:'Un solo ambiente · cocina',d:'Todo en uno, con la tranquilidad de una casa propia.',s:'hab-estudio'},
 {id:'hab',n:'Habitación',t:'Descanso esencial',d:'Sin cocina, con las albercas y el golf a la puerta.',s:'hab-habitacion'}
];
var DEST=[
 {n:'Centro histórico',s:'destino-centro',c:'Calle, galería, mesa',p:'Galerías, plazas y mesas al aire libre. Los jueves de temporada, el Art Walk llena las calles.'},
 {n:'Playas',s:'destino-playas',c:'Palmilla · Costa Azul · Estero',p:'Palmilla y Costa Azul para nadar o surfear; el Estero de San José para ver aves al amanecer.'},
 {n:'Golf',s:'destino-golf',c:'Junto al hotel',p:'El campo de golf está a un paso. Sal con el primer sol y vuelve a desayunar en tu terraza.'},
 {n:'Mar y sierra',s:'destino-mar',c:'Ballenas · Todos Santos',p:'Ballenas de diciembre a abril. Todos Santos y la Sierra de la Laguna, a una excursión de distancia.'}
];
