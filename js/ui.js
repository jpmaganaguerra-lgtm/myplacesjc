'use strict';
/* Menú, carrusel de habitaciones, destino, efectos de scroll. */

var menu=document.getElementById('menu'),mv=document.getElementById('mv');
var MS=['a1','dusk','golf','pool','dawn'];
MS.forEach(function(n,i){var d=document.createElement('div');d.className='sc'+(i===0?' on':'');d.setAttribute('data-scene',n);mv.appendChild(d)});
function openMenu(){mountAll(mv);menu.classList.add('on')}
function closeMenu(){menu.classList.remove('on')}
document.getElementById('mOpen').addEventListener('click',openMenu);
document.getElementById('mClose').addEventListener('click',closeMenu);
menu.querySelectorAll('li a').forEach(function(a){
  a.addEventListener('mouseenter',function(){var k=+a.getAttribute('data-s');mv.querySelectorAll('.sc').forEach(function(s,i){s.classList.toggle('on',i===k)})});
  a.addEventListener('click',function(){
    closeMenu();
    var ac=a.getAttribute('data-acc');if(ac!==null)setAcc(+ac);
  });
});


var rail=document.getElementById('rail');
ROOMS.forEach(function(r,i){
  var c=document.createElement('article');c.className='room';c.tabIndex=0;
  c.innerHTML='<div class="sc" data-scene="'+r.s+'"></div><div class="tx"><span class="lab">0'+(i+1)+'</span><h3>'+r.n+'</h3><p>'+r.d+'</p><span class="cta">Reservar esta</span></div>';
  c.addEventListener('click',function(){openDrawer(S.start&&S.end?2:1,r.id)});
  c.addEventListener('keydown',function(e){if(e.key==='Enter')openDrawer(S.start&&S.end?2:1,r.id)});
  rail.appendChild(c);
});
document.getElementById('rPrev').addEventListener('click',function(){rail.scrollBy({left:-460,behavior:'smooth'})});
document.getElementById('rNext').addEventListener('click',function(){rail.scrollBy({left:460,behavior:'smooth'})});


var acc=document.getElementById('acc'),dvis=document.getElementById('dvis'),dcap=document.getElementById('dcap'),items=[],scs=[];
DEST.forEach(function(d,i){
  var it=document.createElement('div');it.className='it';
  it.innerHTML='<button class="hd">'+d.n+'</button><div class="bd"><div><p>'+d.p+'</p></div></div>';
  it.querySelector('.hd').addEventListener('click',function(){setAcc(i)});
  acc.appendChild(it);items.push(it);
  var s=document.createElement('div');s.className='sc';s.setAttribute('data-scene',d.s);dvis.insertBefore(s,dcap);scs.push(s);
});
function setAcc(i){items.forEach(function(it,k){it.classList.toggle('on',k===i)});scs.forEach(function(s,k){s.classList.toggle('on',k===i)});dcap.textContent=DEST[i].c}
setAcc(0);


document.querySelectorAll('[data-bar]').forEach(buildBar);
refresh();


var hd=document.getElementById('hd'),stick=document.getElementById('stick'),hero=document.querySelector('.hero');
var words=document.getElementById('stmt'),wsp=[];
(function(){var t=words.innerHTML,out='';t.split(/(\s+)/).forEach(function(w){if(/^\s+$/.test(w)||!w){out+=w}else{out+='<span>'+w+'</span>'}});words.innerHTML=out;wsp=[].slice.call(words.querySelectorAll('span'))})();
var parallax=[].slice.call(document.querySelectorAll('[data-sp]'));
var ticking=false;
function onScroll(){
  var y=window.scrollY||0,vh=window.innerHeight;
  hd.classList.toggle('solid',y>vh*0.7);
  stick.classList.toggle('on',y>vh*0.85&&!drw.classList.contains('on'));
  if(y<vh*1.4){parallax.forEach(function(p){if(p.closest('.hero')||p.id==='heroF'){p.style.transform='translate3d(0,'+(y*parseFloat(p.getAttribute('data-sp')))+'px,0)'}})}
  var r=words.getBoundingClientRect(),pr=Math.min(1,Math.max(0,(vh*.82-r.top)/(r.height+vh*.25)));
  var n=Math.floor(pr*wsp.length*1.08);
  wsp.forEach(function(w,i){w.classList.toggle('on',i<n)});
  ticking=false;
}
window.addEventListener('scroll',function(){if(!ticking){ticking=true;requestAnimationFrame(onScroll)}},{passive:true});
window.addEventListener('resize',onScroll);
if('IntersectionObserver' in window){
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12});
  document.querySelectorAll('.rv').forEach(function(el){io.observe(el)});
}else{document.querySelectorAll('.rv').forEach(function(el){el.classList.add('in')})}
mountAll();
mountHero();
onScroll();
