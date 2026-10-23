'use strict';
/* Idiomas del sitio · inglés (EE. UU.) por defecto, español con el botón EN / ES del header.
   TODOS los textos fijos viven aquí: clave → { en, es }. Los textos de habitaciones y destino están en js/content.js.
   En el HTML, un texto se enlaza con  data-i18n="clave"  (el valor puede llevar <em>) o con
   data-i18n-attr="atributo:clave;otro:clave"  para aria-label, placeholder, alt. */

var I18N={
 en:{
  "meta.title":"MyPlace San José del Cabo · Suites by the Golf Course",
  "meta.desc":"55 suites and residences with a kitchen and terrace in San José del Cabo, by the golf course and close to the historic center and beaches. Book direct.",
  "meta.ogTitle":"MyPlace San José del Cabo",
  "meta.ogDesc":"It's not just a place. It's a state of mind. Suites and residences by the golf course.",
  "ld.desc":"Suites and residences with a kitchen and terrace next to the golf course in San José del Cabo.",
  "logo.alt":"My Place Los Cabos",
  "lang.label":"Language",

  "nav.menu":"Menu","nav.open":"Open menu","nav.close":"Close","nav.book":"Book","nav.main":"Main menu",
  "menu.rooms":"Rooms","menu.sjc":"San José del Cabo","menu.golf":"Golf &amp; beaches","menu.amen":"Amenities","menu.book":"Book",
  "menu.foot":"San José del Cabo · Baja California Sur",

  "hero.aria":"Cover","hero.label":"55 suites and residences",
  "hero.h1sr":"MyPlace San José del Cabo: suites and residences by the golf course, Baja California Sur, Mexico.",
  "hero.l1":"It's not just a place.","hero.l2":"<em>It's a state of mind.</em>",
  "hero.coord":"23.04622° N · 109.70324° W","hero.coord.aria":"View location on Google Maps: 23.04622 degrees north, 109.70324 degrees west",
  "hero.cue":"Discover",

  "st.label":"San José del Cabo",
  "st.p":"Between the dunes, the sea and a beautiful golf course. Stay in our spacious homes with a kitchen, a terrace and time to spare, steps from the historic center, the beaches and the golf course.",
  "facts.1":"Suites and residences",
  "facts.2":"Concierge at <em>your service.</em>",
  "facts.3":"You're just a few clicks from your next adventure",

  "rooms.h":"Where you'll <em>stay.</em>","rooms.p":"Spaces with a kitchen and terrace. Some units connect to add bedrooms.",
  "arr.prev":"Previous","arr.next":"Next","room.cta":"Book this one",

  "dest.label":"The destination","dest.h":"Everything fits in <em>one day.</em>",

  "amen.label":"Amenities","amen.h":"The essentials, <em>done right.</em>",
  "am.1.t":"Pools","am.1.d":"Water and shade for the whole day",
  "am.2.t":"Palapa","am.2.d":"A place to unwind in the open air",
  "am.3.t":"24/7 Front Desk","am.3.d":"Arrivals and departures at any hour",
  "am.4.t":"Security","am.4.d":"Plus parking on the property",
  "am.5.t":"Your own kitchen","am.5.d":"In most units",

  "res.h":"Choose your <em>dates.</em>","res.p":"Two more steps and your room is confirmed.",

  "faq.label":"Frequently asked questions","faq.h":"Before you <em>book.</em>",
  "faq.1.q":"Where is MyPlace San José del Cabo?",
  "faq.1.a":"MyPlace is in San José del Cabo, Baja California Sur, Mexico, next to the golf course and close to the historic center and the beaches. The coordinates are 23.04622° N, 109.70324° W, and you can open the exact spot in Google Maps from the cover of this page.",
  "faq.2.q":"How many suites and residences are there, and what types?",
  "faq.2.a":"There are 55 suites and residences. Choose from king hotel rooms, a queen studio, and one- and two-bedroom suites with king and queen beds. Most have a full kitchen, and some units connect to add bedrooms.",
  "faq.3.q":"Do the accommodations have a kitchen?",
  "faq.3.a":"Most units do. The suites and the studio have a full kitchen and a living area. The king hotel room has a coffee station and no kitchen.",
  "faq.4.q":"What amenities does the property offer?",
  "faq.4.a":"Pools, a palapa for unwinding in the open air, a 24/7 front desk for arrivals and departures at any hour, security, and parking on the property. A concierge is available to help you plan your stay.",
  "faq.5.q":"How do I book?",
  "faq.5.a":"Choose your check-in and check-out dates in the booking bar on this page, pick a room and continue to payment in our secure booking engine. If you have questions first, message us on WhatsApp and we'll reply directly.",
  "faq.6.q":"What is there to do near MyPlace?",
  "faq.6.a":"The historic center of San José del Cabo, with galleries, plazas and open-air tables, is close, and on seasonal Thursdays the Art Walk fills the streets. Palmilla and Costa Azul are the nearby beaches, the San José Estuary is good for birdwatching at dawn, and the golf course is steps from the property. Whale season runs from December to April.",

  "bar.in":"Check-in","bar.out":"Check-out","bar.g":"Guests","bar.go":"View rates","addDate":"Add date",

  "drw.aria":"Booking","drw.title":"Your stay","drw.close":"Close",
  "steps.1":"1 · Dates","steps.2":"2 · Room","steps.3":"3 · Payment",
  "cal.in":"Choose your check-in","cal.out":"Choose your check-out","cal.clear":"Clear","cal.prev":"Previous month","cal.next":"Next month",
  "night":"night","nights":"nights","adult":"adult","adults":"adults","child":"child","children":"children",
  "g.adults":"Adults","g.adultsSub":"Ages 13+","g.kids":"Children","g.kidsSub":"Ages 0–12",
  "btn.continue":"Continue","btn.change":"Change","btn.back":"Back","btn.pay":"Continue to payment",
  "sum.in":"Check-in","sum.out":"Check-out","sum.nights":"Nights","sum.guests":"Guests","sum.room":"Room",
  "pay.msg":"Your total rate and payment are completed securely in the booking engine.",
  "pay.pending":"The booking engine connects here with these dates and this room. (Provider still to be defined.)",

  "foot.label":"Contact","foot.h":"Your questions and needs are our priority. <em>Message us.</em>",
  "foot.p":"Tell us what you need and we'll reply directly.","foot.lb":"Your message",
  "foot.ph":"Hi, I'd like information about…","foot.btn":"Contact us","foot.blog":"Travel guides",
  "foot.l2":"Baja California Sur, Mexico",
  "wa.default":"Hi, I'd like information about MyPlace San José del Cabo.",

  "alt.pool":"Hotel pool","alt.night":"Night in San José del Cabo"
 },
 es:{
  "meta.title":"MyPlace San José del Cabo · Suites junto al campo de golf",
  "meta.desc":"55 suites y residencias con cocina y terraza en San José del Cabo, junto al campo de golf y cerca del centro histórico y las playas. Reserva directa.",
  "meta.ogTitle":"MyPlace San José del Cabo",
  "meta.ogDesc":"No es solo un lugar. Es un estado mental. Suites y residencias junto al campo de golf.",
  "ld.desc":"Suites y residencias con cocina y terraza junto al campo de golf en San José del Cabo.",
  "logo.alt":"My Place Los Cabos",
  "lang.label":"Idioma",

  "nav.menu":"Menú","nav.open":"Abrir menú","nav.close":"Cerrar","nav.book":"Reservar","nav.main":"Menú principal",
  "menu.rooms":"Habitaciones","menu.sjc":"San José del Cabo","menu.golf":"Golf y playas","menu.amen":"Amenidades","menu.book":"Reservar",
  "menu.foot":"San José del Cabo · Baja California Sur",

  "hero.aria":"Portada","hero.label":"55 suites y residencias",
  "hero.h1sr":"MyPlace San José del Cabo: suites y residencias junto al campo de golf, Baja California Sur, México.",
  "hero.l1":"No es solo un lugar.","hero.l2":"<em>Es un estado mental.</em>",
  "hero.coord":"23.04622° N · 109.70324° O","hero.coord.aria":"Ver ubicación en Google Maps: 23.04622 grados norte, 109.70324 grados oeste",
  "hero.cue":"Descubrir",

  "st.label":"San José del Cabo",
  "st.p":"Entre dunas, el mar y un hermoso campo de golf. Quédate en nuestras amplias Una casa con cocina, terraza y tiempo, a un paso del centro histórico, las playas y el campo de golf.",
  "facts.1":"Suites y residencias",
  "facts.2":"Concierge a <em>tu disposición.</em>",
  "facts.3":"Estás a unos clics de tu siguiente aventura",

  "rooms.h":"Dónde <em>quedarte.</em>","rooms.p":"Espacios con cocina y terraza. Algunas unidades se conectan para sumar recámaras.",
  "arr.prev":"Anterior","arr.next":"Siguiente","room.cta":"Reservar esta",

  "dest.label":"El destino","dest.h":"Todo cabe en <em>un día.</em>",

  "amen.label":"Amenidades","amen.h":"Lo necesario, <em>bien hecho.</em>",
  "am.1.t":"Albercas","am.1.d":"Agua y sombra para el día entero",
  "am.2.t":"Palapa","am.2.d":"Un lugar para quedarse al aire libre",
  "am.3.t":"Recepción 24/7","am.3.d":"Llegadas y salidas a cualquier hora",
  "am.4.t":"Seguridad","am.4.d":"Y estacionamiento dentro de la propiedad",
  "am.5.t":"Cocina propia","am.5.d":"En la mayoría de las unidades",

  "res.h":"Elige tus <em>fechas.</em>","res.p":"Dos pasos más y tu habitación queda confirmada.",

  "faq.label":"Preguntas frecuentes","faq.h":"Antes de <em>reservar.</em>",
  "faq.1.q":"¿Dónde está MyPlace San José del Cabo?",
  "faq.1.a":"MyPlace está en San José del Cabo, Baja California Sur, México, junto al campo de golf y cerca del centro histórico y las playas. Las coordenadas son 23.04622° N, 109.70324° O y puedes abrir el punto exacto en Google Maps desde la portada de esta página.",
  "faq.2.q":"¿Cuántas suites y residencias hay, y de qué tipo?",
  "faq.2.a":"Son 55 suites y residencias. Hay habitaciones hoteleras king, un estudio queen y suites de una y dos recámaras con camas king y queen. La mayoría tiene cocina completa y algunas unidades se conectan para sumar recámaras.",
  "faq.3.q":"¿Los alojamientos tienen cocina?",
  "faq.3.a":"En la mayoría, sí. Las suites y el estudio tienen cocina completa y sala. La habitación hotelera king tiene coffee station y no tiene cocina.",
  "faq.4.q":"¿Qué amenidades ofrece la propiedad?",
  "faq.4.a":"Albercas, una palapa para quedarse al aire libre, recepción 24/7 para llegadas y salidas a cualquier hora, seguridad y estacionamiento dentro de la propiedad. Un concierge te ayuda a planear tu estancia.",
  "faq.5.q":"¿Cómo reservo?",
  "faq.5.a":"Elige tus fechas de llegada y salida en la barra de reservas de esta página, escoge una habitación y continúa al pago en nuestro motor de reservas seguro. Si antes tienes dudas, escríbenos por WhatsApp y te respondemos directamente.",
  "faq.6.q":"¿Qué hay para hacer cerca de MyPlace?",
  "faq.6.a":"El centro histórico de San José del Cabo, con galerías, plazas y mesas al aire libre, está cerca, y los jueves de temporada el Art Walk llena las calles. Palmilla y Costa Azul son las playas cercanas, el Estero de San José es ideal para ver aves al amanecer y el campo de golf está a un paso de la propiedad. La temporada de ballenas va de diciembre a abril.",

  "bar.in":"Llegada","bar.out":"Salida","bar.g":"Huéspedes","bar.go":"Ver tarifas","addDate":"Añadir fecha",

  "drw.aria":"Reserva","drw.title":"Tu estancia","drw.close":"Cerrar",
  "steps.1":"1 · Fechas","steps.2":"2 · Habitación","steps.3":"3 · Pago",
  "cal.in":"Elige la llegada","cal.out":"Elige la salida","cal.clear":"Borrar","cal.prev":"Mes anterior","cal.next":"Mes siguiente",
  "night":"noche","nights":"noches","adult":"adulto","adults":"adultos","child":"niño","children":"niños",
  "g.adults":"Adultos","g.adultsSub":"13 años o más","g.kids":"Niños","g.kidsSub":"0 a 12 años",
  "btn.continue":"Continuar","btn.change":"Cambiar","btn.back":"Volver","btn.pay":"Continuar al pago",
  "sum.in":"Llegada","sum.out":"Salida","sum.nights":"Noches","sum.guests":"Huéspedes","sum.room":"Habitación",
  "pay.msg":"La tarifa total y el pago se completan de forma segura en el motor de reservas.",
  "pay.pending":"Aquí se conecta el motor de reservas con estas fechas y esta habitación. (Pendiente de definir el proveedor.)",

  "foot.label":"Contacto","foot.h":"Tus inquietudes y/o necesidades son nuestra prioridad. <em>Escríbenos.</em>",
  "foot.p":"Cuéntanos qué necesitas y te respondemos directamente.","foot.lb":"Tu mensaje",
  "foot.ph":"Hola, quisiera información sobre…","foot.btn":"Contactar","foot.blog":"Guías de viaje (EN)",
  "foot.l2":"Baja California Sur, México",
  "wa.default":"Hola, me gustaría información sobre MyPlace San José del Cabo.",

  "alt.pool":"Alberca del hotel","alt.night":"Noche en San José del Cabo"
 }
};

var LANG='en';          /* idioma activo: 'en' | 'es' */
var LANG_CBS=[];        /* funciones que se avisan al cambiar de idioma */

/* Idioma inicial: ?lang=es en la dirección, o el último que eligió el visitante; si no, inglés. */
(function(){
  try{
    var q=new URLSearchParams(location.search).get('lang'),s=localStorage.getItem('myplace-lang');
    if(q==='es'||q==='en')LANG=q;else if(s==='es'||s==='en')LANG=s;
  }catch(e){}
})();

function T(k){var d=I18N[LANG]||I18N.en;return (k in d)?d[k]:((k in I18N.en)?I18N.en[k]:k)}
function onLang(fn){LANG_CBS.push(fn)}

function applyStatic(root){
  var r=root||document;
  [].forEach.call(r.querySelectorAll('[data-i18n]'),function(el){el.innerHTML=T(el.getAttribute('data-i18n'))});
  [].forEach.call(r.querySelectorAll('[data-i18n-attr]'),function(el){
    el.getAttribute('data-i18n-attr').split(';').forEach(function(p){var a=p.split(':');if(a.length===2)el.setAttribute(a[0],T(a[1]))});
  });
}
function setMeta(sel,attr,val){var el=document.querySelector(sel);if(el)el.setAttribute(attr,val)}

/* Datos estructurados FAQPage: se arman con las mismas claves faq.N.q / faq.N.a que la sección visible. */
function paintFaqLd(){
  var el=document.getElementById('ld-faq');if(!el)return;
  var q=[],i=1;
  function txt(k){var d=document.createElement('div');d.innerHTML=T(k);return d.textContent}
  while(('faq.'+i+'.q') in I18N.en){
    q.push({'@type':'Question',name:txt('faq.'+i+'.q'),acceptedAnswer:{'@type':'Answer',text:txt('faq.'+i+'.a')}});i++;
  }
  el.textContent=JSON.stringify({'@context':'https://schema.org','@type':'FAQPage',inLanguage:LANG==='es'?'es-MX':'en-US',mainEntity:q});
}

function paintLang(){
  document.documentElement.lang=LANG==='es'?'es-MX':'en-US';
  if(typeof localize==='function')localize(LANG);         /* content.js: habitaciones y destino */
  applyStatic();
  document.title=T('meta.title');
  setMeta('meta[name="description"]','content',T('meta.desc'));
  setMeta('meta[property="og:title"]','content',T('meta.ogTitle'));
  setMeta('meta[property="og:description"]','content',T('meta.ogDesc'));
  setMeta('meta[name="twitter:title"]','content',T('meta.ogTitle'));
  setMeta('meta[name="twitter:description"]','content',T('meta.ogDesc'));
  setMeta('meta[property="og:locale"]','content',LANG==='es'?'es_MX':'en_US');
  var ld=document.getElementById('ld-hotel');
  if(ld){try{var o=JSON.parse(ld.textContent);o.description=T('ld.desc');ld.textContent=JSON.stringify(o)}catch(e){}}
  paintFaqLd();
  [].forEach.call(document.querySelectorAll('[data-lang]'),function(b){b.setAttribute('aria-pressed',b.getAttribute('data-lang')===LANG?'true':'false')});
}

function setLang(l){
  if(l!=='en'&&l!=='es')return;
  if(l===LANG)return;
  LANG=l;
  try{localStorage.setItem('myplace-lang',l)}catch(e){}
  paintLang();
  LANG_CBS.forEach(function(fn){try{fn(l)}catch(e){console.error(e)}});
}

document.addEventListener('click',function(e){
  var b=e.target.closest&&e.target.closest('[data-lang]');
  if(b)setLang(b.getAttribute('data-lang'));
});

paintLang();
