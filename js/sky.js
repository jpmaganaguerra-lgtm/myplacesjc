'use strict';
/* Sol de líneas: sale desde abajo, sube con el scroll y se esconde arriba.
   Al llegar a la última sección (noche) aparece una luna. */
(function(){
  var sky=document.getElementById('sky'),night=document.getElementById('reservar');
  if(!sky||!night)return;
  var sun=sky.querySelector('.sun'),moon=sky.querySelector('.moon'),rays=sky.querySelector('.rays'),disc=sky.querySelector('.disc'),crescent=sky.querySelector('.crescent');
  var tick=false,tones=[].slice.call(document.querySelectorAll('[data-tone]')),cur='';
  function cl(v){return Math.max(0,Math.min(1,v))}
  function upd(){
    tick=false;
    var vh=window.innerHeight,y=window.scrollY||0,nTop=night.getBoundingClientRect().top+y;
    var maxS=Math.max(1,document.documentElement.scrollHeight-vh);
    /* El sol termina justo al llegar a la sección final: sale por arriba cuando ocupa ~65% de la pantalla. */
    var span=Math.max(1,Math.min(nTop-vh*0.35,maxS*0.97)),t=cl(y/span);
    var py=vh*1.04-t*(vh*1.04+64),px=Math.sin(t*Math.PI)*10;
    sun.style.transform='translate3d('+px+'px,'+py+'px,0)';
    disc.style.strokeDashoffset=1-cl(t*7);
    rays.style.transform='rotate('+(y*0.08)+'deg)';
    rays.style.opacity=cl(t*9);
    var cy=py+22,tone='dark',i;
    if(t>=1)cy=vh*0.3;
    for(i=0;i<tones.length;i++){var r=tones[i].getBoundingClientRect();if(r.top<=cy&&r.bottom>cy){tone=tones[i].getAttribute('data-tone');break}}
    var col=tone==='light'?'#1B1712':'#ffffff';
    if(col!==cur){cur=col;sky.style.color=col}
    var top=night.getBoundingClientRect().top,m=cl((vh*0.4-top)/(vh*0.32)); /* la luna sale cuando el sol ya terminó */
    moon.style.opacity=m>0?1:0;
    moon.style.transform='translate3d(0,'+(vh*0.3+(1-m)*46)+'px,0)';
    crescent.style.strokeDashoffset=1-m;
    [].forEach.call(moon.querySelectorAll('.st'),function(s){s.style.opacity=cl((m-.45)*2)});
  }
  window.addEventListener('scroll',function(){if(!tick){tick=true;requestAnimationFrame(upd)}},{passive:true});
  window.addEventListener('resize',upd);
  upd();
})();
