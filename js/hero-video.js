'use strict';
/* Video de portada: el póster se ve al instante; el video se descarga al terminar la carga de la página.
   Sin video (datos reducidos, conexión lenta o "reducir movimiento") se queda el póster. */
(function(){
  var hero=document.querySelector('.hero'),media=document.getElementById('heroMedia'),v=document.getElementById('heroVid');
  if(!hero||!media||!v)return;
  var BASE='assets/video/hero/';
  var VIDEO={
    desktop:[
      {src:BASE+'hero-1080-av1.mp4',type:'video/mp4; codecs="av01.0.08M.10"'},
      {src:BASE+'hero-1080-h264.mp4',type:'video/mp4; codecs="avc1.640029"'}
    ],
    mobile:[
      {src:BASE+'hero-720-av1.mp4',type:'video/mp4; codecs="av01.0.05M.10"'},
      {src:BASE+'hero-720-h264.mp4',type:'video/mp4; codecs="avc1.4d401f"'}
    ]
  };
  v.muted=true;v.defaultMuted=true;
  function state(x){hero.setAttribute('data-video',x)}
  v.addEventListener('playing',function(){state('playing')});
  v.addEventListener('error',function(){state('error')},true);
  function play(){var p=v.play();if(p&&p.catch)p.catch(function(){})}
  function start(){
    var c=navigator.connection||{};
    var slow=c.saveData||/(^|-)2g|3g/.test(c.effectiveType||'');
    var still=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(slow||still){state('poster-only');return}
    var list=window.matchMedia('(max-width:820px)').matches?VIDEO.mobile:VIDEO.desktop;
    function attach(){
      list.forEach(function(s){var el=document.createElement('source');el.src=s.src;el.type=s.type;v.appendChild(el)});
      v.load();play();
    }
    function go(){if('requestIdleCallback' in window)requestIdleCallback(attach,{timeout:1500});else setTimeout(attach,400)}
    if(document.readyState==='complete')go();else window.addEventListener('load',go,{once:true});
  }
  var img=new Image();
  img.onload=function(){media.style.display='block';hero.classList.add('has-video');state('loading');start()};
  img.onerror=function(){state('no-poster')};
  img.src=v.getAttribute('poster');
  /* Ahorra batería: pausa si la portada no se ve o la pestaña está oculta. */
  function live(){return !!v.querySelector('source')}
  if('IntersectionObserver' in window){
    new IntersectionObserver(function(es){es.forEach(function(e){if(!live())return;if(e.isIntersecting&&!document.hidden)play();else v.pause()})},{threshold:.05}).observe(hero);
  }
  document.addEventListener('visibilitychange',function(){if(!live())return;if(document.hidden)v.pause();else play()});
})();
