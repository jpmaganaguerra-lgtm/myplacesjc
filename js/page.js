'use strict';
/* Páginas interiores (FAQ): menú, header que se vuelve sólido al bajar, acordeón y animación de entrada.
   Es la versión corta de ui.js: scenes.js e images.js dibujan el panel del menú, i18n.js cambia el idioma. */
(function(){
  var menu=document.getElementById('menu'),mv=document.getElementById('mv'),hd=document.getElementById('hd');

  /* Menú */
  if(menu&&mv){
    ['a1','dusk','golf','pool','dawn'].forEach(function(n,i){var d=document.createElement('div');d.className='sc'+(i===0?' on':'');d.setAttribute('data-scene',n);mv.appendChild(d)});
    var open=function(){if(typeof mountAll==='function')mountAll(mv);menu.classList.add('on')};
    var close=function(){menu.classList.remove('on')};
    var o=document.getElementById('mOpen'),c=document.getElementById('mClose');
    if(o)o.addEventListener('click',open);
    if(c)c.addEventListener('click',close);
    menu.querySelectorAll('li a').forEach(function(a){
      a.addEventListener('mouseenter',function(){var k=+a.getAttribute('data-s');mv.querySelectorAll('.sc').forEach(function(s,i){s.classList.toggle('on',i===k)})});
      a.addEventListener('click',function(e){
        if(a.getAttribute('aria-current')==='page'){e.preventDefault()}   /* ya estás en esta página: solo cierra el menú */
        close();
      });
    });
  }

  /* Header: sólido al dejar atrás el banner */
  var hero=document.querySelector('.pg-hero');
  function onScroll(){var y=window.scrollY||0,h=hero?hero.offsetHeight:window.innerHeight;if(hd)hd.classList.toggle('solid',y>h*0.6)}
  window.addEventListener('scroll',onScroll,{passive:true});
  window.addEventListener('resize',onScroll);
  onScroll();

  /* Preguntas frecuentes: abrir y cerrar cada respuesta (el texto ya está en el HTML para los buscadores) */
  document.querySelectorAll('.faq .it').forEach(function(it){
    var b=it.querySelector('.hd');
    b.addEventListener('click',function(){var on=!it.classList.contains('on');it.classList.toggle('on',on);b.setAttribute('aria-expanded',on?'true':'false')});
  });

  /* Aparición suave al hacer scroll */
  var rv=document.querySelectorAll('.rv');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12});
    rv.forEach(function(el){io.observe(el)});
  }else{rv.forEach(function(el){el.classList.add('in')})}
})();
