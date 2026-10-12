'use strict';
/* Intro de ~7 s sobre la portada: el video corre de fondo, el logo aparece al centro y se va,
   y entonces entra el hero completo (menú, logo pequeño, texto, coordenadas), todo encadenado.
   Tiempos en milisegundos, contados desde que el logo está listo. Cambia solo estos números. */
(function(){
  var h=document.documentElement;
  if(!h.classList.contains('intro'))return;           /* sin intro: reducir movimiento, #ancla o sin JS */
  var T={lead:400,logoOut:4300,reveal:5100,end:7000,wait:1800};
  var timers=[],started=false,revealed=false,skipped=false,ended=false;
  function at(ms,fn){timers.push(setTimeout(fn,ms))}
  function stop(){timers.forEach(clearTimeout);timers=[]}
  function end(){
    if(ended)return;ended=true;stop();
    ['pointerdown','keydown','wheel','touchstart'].forEach(function(e){window.removeEventListener(e,skip)});
    window.removeEventListener('scroll',onScroll);
    window.removeEventListener('logo:ready',begin);window.removeEventListener('logo:missing',end);
    h.classList.remove('intro','intro-in','intro-out','intro-reveal');
  }
  function reveal(){if(revealed)return;revealed=true;h.classList.add('intro-reveal')}
  function begin(){
    if(started||ended)return;started=true;stop();
    at(T.lead,function(){h.classList.add('intro-in')});
    at(T.logoOut,function(){h.classList.remove('intro-in');h.classList.add('intro-out')});
    at(T.reveal,reveal);
    at(T.end,end);
  }
  /* Cualquier gesto salta directo al hero: la intro nunca estorba. */
  function skip(){
    if(skipped||ended)return;skipped=true;
    if(!started){end();return}
    stop();h.classList.remove('intro-in');h.classList.add('intro-out');reveal();at(1900,end);
  }
  function onScroll(){if((window.scrollY||0)>8)skip()}
  ['pointerdown','keydown','wheel','touchstart'].forEach(function(e){window.addEventListener(e,skip,{passive:true})});
  window.addEventListener('scroll',onScroll,{passive:true});
  window.addEventListener('logo:ready',begin);
  window.addEventListener('logo:missing',end);        /* sin logo no hay intro */
  if(window.__logoState==='ready')begin();
  else if(window.__logoState==='missing')end();
  else at(T.wait,begin);                              /* por si el logo tarda: arranca igual */
})();
