'use strict';
/* Google Tag Manager y eventos de conversión.
   - Pon el ID en CONFIG.gtmId (js/config.js). Vacío = no se carga nada y el sitio funciona igual.
   - track(nombre, datos) empuja un evento al dataLayer; en GTM se usa como activador (Custom Event).
   Eventos: book_click (botón Reservar), begin_checkout (paso al motor de reservas, desde booking.js),
            whatsapp_click, language_change, blog_cta (botones de las guías). */
var dataLayer=window.dataLayer=window.dataLayer||[];
function track(name,params){
  try{var o={event:name},k;for(k in (params||{}))o[k]=params[k];dataLayer.push(o)}catch(e){}
}
(function(){
  var id=(typeof CONFIG!=='undefined'&&CONFIG.gtmId)||'';
  if(/^GTM-[A-Z0-9]{4,}$/.test(id)){
    dataLayer.push({'gtm.start':new Date().getTime(),event:'gtm.js'});
    var s=document.createElement('script');s.async=true;
    s.src='https://www.googletagmanager.com/gtm.js?id='+id;
    (document.head||document.documentElement).appendChild(s);
  }
  document.addEventListener('click',function(e){
    var t=e.target,el;
    if(!t||!t.closest)return;
    if((el=t.closest('[data-track]'))){track(el.getAttribute('data-track'),{location:el.getAttribute('data-loc')||''});return}
    if((el=t.closest('[data-reserve]'))){track('book_click',{location:el.closest('header')?'header':(el.closest('nav')?'menu':'page')});return}
    if(t.closest('#waBtn')){track('whatsapp_click',{location:'footer'});return}
    if((el=t.closest('[data-lang]'))){track('language_change',{language:el.getAttribute('data-lang')})}
  });
})();
