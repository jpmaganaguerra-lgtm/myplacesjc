'use strict';
/* Estado de la reserva, calendario, barra de reserva y panel lateral. */

var S={start:null,end:null,adults:2,kids:0,room:null,view:new Date(),step:1};
S.view.setDate(1);S.view.setHours(0,0,0,0);
var TODAY=new Date();TODAY.setHours(0,0,0,0);


var MONTHS=['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
var DAYS=['L','M','M','J','V','S','D'];
function iso(d){return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')}
function fmt(d){return d.getDate()+' '+MONTHS[d.getMonth()].slice(0,3)}
function nights(){return S.start&&S.end?Math.round((S.end-S.start)/864e5):0}
function guestTx(){var t=S.adults+(S.adults===1?' adulto':' adultos');if(S.kids)t+=' · '+S.kids+(S.kids===1?' niño':' niños');return t}
function roomById(id){return ROOMS.filter(function(r){return r.id===id})[0]}


function monthHTML(base,first,last){
  var y=base.getFullYear(),m=base.getMonth(),h='<div class="m"><div class="mh">';
  h+=first?'<button data-nav="-1" aria-label="Mes anterior"'+(y===TODAY.getFullYear()&&m===TODAY.getMonth()?' disabled':'')+'>←</button>':'<span></span>';
  h+='<span>'+MONTHS[m]+' '+y+'</span>';
  h+=last?'<button data-nav="1" aria-label="Mes siguiente">→</button>':'<span></span>';
  h+='</div><div class="g">';
  DAYS.forEach(function(d){h+='<span>'+d+'</span>'});
  var off=(new Date(y,m,1).getDay()+6)%7,i;
  for(i=0;i<off;i++)h+='<span></span>';
  var dim=new Date(y,m+1,0).getDate();
  for(i=1;i<=dim;i++){
    var d=new Date(y,m,i),c='d',dis=d<TODAY;
    if(S.start&&d.getTime()===S.start.getTime())c+=' s';
    if(S.end&&d.getTime()===S.end.getTime())c+=' s';
    if(S.start&&S.end&&d>S.start&&d<S.end)c+=' r';
    h+='<button class="'+c+'" data-d="'+iso(d)+'"'+(dis?' disabled':'')+'>'+i+'</button>';
  }
  return h+'</div></div>';
}
function calHTML(){
  var n=new Date(S.view.getFullYear(),S.view.getMonth()+1,1);
  var info=S.start?(S.end?nights()+(nights()===1?' noche':' noches'):'Elige la salida'):'Elige la llegada';
  return '<div class="cal">'+monthHTML(S.view,true,false)+monthHTML(n,false,true)+'</div><div class="pop-f"><span>'+info+'</span><button data-clear>Borrar</button></div>';
}


var bars=[];
function guestHTML(){
  return '<div class="gst"><div class="row"><div><b>Adultos</b><small>13 años o más</small></div><div class="st"><button data-g="a-1"'+(S.adults<=1?' disabled':'')+'>−</button><span>'+S.adults+'</span><button data-g="a1"'+(S.adults>=8?' disabled':'')+'>+</button></div></div>'+
  '<div class="row"><div><b>Niños</b><small>0 a 12 años</small></div><div class="st"><button data-g="k-1"'+(S.kids<=0?' disabled':'')+'>−</button><span>'+S.kids+'</span><button data-g="k1"'+(S.kids>=6?' disabled':'')+'>+</button></div></div></div>';
}
function buildBar(el){
  el.innerHTML='<button class="fld" data-f="in"><small>Llegada</small><b data-v="in"></b></button><button class="fld" data-f="out"><small>Salida</small><b data-v="out"></b></button><button class="fld" data-f="g"><small>Huéspedes</small><b data-v="g"></b></button><button class="go" data-go>Ver tarifas</button><div class="pop" data-pop></div>';
  bars.push(el);
}
function closePops(except){bars.forEach(function(b){var p=b.querySelector('[data-pop]');if(p!==except)p.classList.remove('on')})}
function refresh(){
  bars.forEach(function(b){
    var a=b.querySelector('[data-v="in"]'),o=b.querySelector('[data-v="out"]'),g=b.querySelector('[data-v="g"]');
    a.textContent=S.start?fmt(S.start):'Añadir fecha';a.className=S.start?'':'ph';
    o.textContent=S.end?fmt(S.end):'Añadir fecha';o.className=S.end?'':'ph';
    g.textContent=guestTx();
    var p=b.querySelector('[data-pop]');
    if(p.classList.contains('on')){p.innerHTML=p.getAttribute('data-k')==='g'?guestHTML():calHTML()}
  });
  var tx=S.start&&S.end?fmt(S.start)+' – '+fmt(S.end):(S.start?fmt(S.start)+' – ?':'Elige fechas');
  document.getElementById('stickTx').textContent=tx+' · '+S.adults+(S.kids?'+'+S.kids:'')+' pax';
  if(drw.classList.contains('on'))renderDrawer();
}
document.addEventListener('click',function(e){
  var t=e.target;
  var pop=t.closest&&t.closest('[data-pop]');
  var bar=t.closest&&t.closest('[data-bar]');
  if(!bar)closePops();
  if(!bar)return;
  var p=bar.querySelector('[data-pop]');
  var f=t.closest('[data-f]');
  if(f){
    var k=f.getAttribute('data-f')==='g'?'g':'c';
    var same=p.classList.contains('on')&&p.getAttribute('data-k')===k;
    closePops(p);
    if(same){p.classList.remove('on')}else{p.setAttribute('data-k',k);p.classList.add('on');p.innerHTML=k==='g'?guestHTML():calHTML();
      if(!bar.closest('.hero')&&bar.getBoundingClientRect().top<420)p.classList.add('below');else p.classList.remove('below')}
    return;
  }
  if(t.closest('[data-go]')){
    if(!(S.start&&S.end)){closePops(p);p.setAttribute('data-k','c');p.classList.add('on');p.innerHTML=calHTML();return}
    closePops();openDrawer(2);return;
  }
  if(pop)popClick(t,p);
});
function popClick(t,p){
  var nav=t.closest('[data-nav]'),d=t.closest('[data-d]'),g=t.closest('[data-g]'),c=t.closest('[data-clear]');
  if(nav){S.view=new Date(S.view.getFullYear(),S.view.getMonth()+(+nav.getAttribute('data-nav')),1);refresh();return}
  if(c){S.start=null;S.end=null;refresh();return}
  if(g){var v=g.getAttribute('data-g');if(v==='a-1')S.adults--;if(v==='a1')S.adults++;if(v==='k-1')S.kids--;if(v==='k1')S.kids++;refresh();return}
  if(d){pickDay(d.getAttribute('data-d'));if(S.start&&S.end&&p.hasAttribute&&p.hasAttribute('data-pop')){p.classList.remove('on');refresh()}}
}
function pickDay(s){
  var d=new Date(s+'T00:00:00');
  if(!S.start||(S.start&&S.end)){S.start=d;S.end=null}
  else if(d<=S.start){S.start=d}
  else{S.end=d}
  refresh();
}


var drw=document.getElementById('drw'),scrim=document.getElementById('scrim'),db=document.getElementById('db'),df=document.getElementById('df'),stepsEl=document.getElementById('steps');
function openDrawer(step,room){
  if(room)S.room=room;
  S.step=(S.start&&S.end)?(step||2):1;
  if(step===1)S.step=1;
  drw.classList.add('on');scrim.classList.add('on');drw.setAttribute('aria-hidden','false');renderDrawer();
  document.body.style.overflow='hidden';
}
function closeDrawer(){drw.classList.remove('on');scrim.classList.remove('on');drw.setAttribute('aria-hidden','true');document.body.style.overflow=''}
function renderDrawer(){
  var sp=stepsEl.children,i;
  for(i=0;i<3;i++){sp[i].className=(i+1===S.step?'on':(i+1<S.step?'ok':''))}
  if(S.step===1){
    db.innerHTML='<div class="cal" data-dcal style="display:block">'+'</div>';
    var host=db.firstChild;
    host.innerHTML=calHTML().replace('class="cal"','class="cal" style="flex-direction:column;gap:22px"');
    df.innerHTML='<button class="btn" data-next'+(S.start&&S.end?'':' disabled')+'>Continuar</button>';
  }else if(S.step===2){
    var h='<p class="msg" style="margin:0 0 18px">'+fmt(S.start)+' – '+fmt(S.end)+' · '+nights()+(nights()===1?' noche':' noches')+' · '+guestTx()+' <button class="back" data-edit style="margin:0 0 0 8px">Cambiar</button></p>';
    ROOMS.forEach(function(r){h+='<button class="opt'+(S.room===r.id?' sel':'')+'" data-room="'+r.id+'"><div class="th"><div class="sc" data-scene="'+r.s+'"></div></div><div><b>'+r.n+'</b><small>'+r.t+'</small><small>'+r.d+'</small></div></button>'});
    db.innerHTML=h;mountAll(db);
    df.innerHTML='<button class="btn" data-next'+(S.room?'':' disabled')+'>Continuar</button>';
  }else{
    var rm=roomById(S.room);
    db.innerHTML='<button class="back" data-prev>Volver</button><div class="sum"><div><span>Llegada</span><span>'+fmt(S.start)+'</span></div><div><span>Salida</span><span>'+fmt(S.end)+'</span></div><div><span>Noches</span><span>'+nights()+'</span></div><div><span>Huéspedes</span><span>'+guestTx()+'</span></div><div><span>Habitación</span><span>'+rm.n+'</span></div></div><p class="msg">La tarifa total y el pago se completan de forma segura en el motor de reservas.</p><p class="msg" id="bmsg"></p>';
    df.innerHTML='<button class="btn" data-pay>Continuar al pago</button>';
  }
}
drw.addEventListener('click',function(e){
  var t=e.target,r=t.closest('[data-room]');
  if(t.closest('[data-nav]')||t.closest('[data-d]')||t.closest('[data-clear]')){popClick(t,drw);if(S.start&&S.end&&t.closest('[data-d]')){S.step=2;renderDrawer()}return}
  if(r){S.room=r.getAttribute('data-room');renderDrawer();return}
  if(t.closest('[data-edit]')){S.step=1;renderDrawer();return}
  if(t.closest('[data-prev]')){S.step=2;renderDrawer();return}
  if(t.closest('[data-next]')){S.step=Math.min(3,S.step+1);renderDrawer();return}
  if(t.closest('[data-pay]')){
    if(CONFIG.bookingUrl){
      var q='?checkin='+iso(S.start)+'&checkout='+iso(S.end)+'&adults='+S.adults+'&children='+S.kids+'&room='+S.room;
      window.open(CONFIG.bookingUrl+q,'_blank','noopener');
    }else{document.getElementById('bmsg').textContent='Aquí se conecta el motor de reservas con estas fechas y esta habitación. (Pendiente de definir el proveedor.)'}
  }
});
document.getElementById('dClose').addEventListener('click',closeDrawer);
scrim.addEventListener('click',closeDrawer);
document.addEventListener('click',function(e){
  var r=e.target.closest('[data-reserve]');
  if(r){e.preventDefault();closeMenu();openDrawer(S.start&&S.end?2:1)}
});
document.addEventListener('keydown',function(e){if(e.key==='Escape'){closeDrawer();closeMenu();closePops()}});

