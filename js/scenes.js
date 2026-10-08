'use strict';
/* Imágenes provisionales dibujadas con código. Se reemplazan solas al colocar fotos (ver images.js). */

var uid=0;
function R(seed){return function(){seed|=0;seed=seed+0x6D2B79F5|0;var t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function ridge(seed,y,amp,c,op,steps){
  var r=R(seed),n=steps||9,p=[],i;
  for(i=0;i<=n;i++)p.push({x:i*1600/n,y:y+(r()-.5)*2*amp});
  var d='M0 1000 L0 '+p[0].y;
  for(i=1;i<=n;i++){var a=p[i-1],b=p[i];d+=' Q'+a.x+' '+a.y+' '+((a.x+b.x)/2)+' '+((a.y+b.y)/2)}
  d+=' L1600 '+p[n].y+' L1600 1000Z';
  return '<path d="'+d+'" fill="'+c+'" opacity="'+op+'"/>';
}
function cardon(x,y,h,w,c){return '<g stroke="'+c+'" stroke-width="'+w+'" stroke-linecap="round" stroke-linejoin="round" fill="none"><path d="M'+x+' '+y+'V'+(y-h)+'"/><path d="M'+x+' '+(y-h*.42)+'H'+(x-h*.17)+'V'+(y-h*.74)+'"/><path d="M'+x+' '+(y-h*.28)+'H'+(x+h*.19)+'V'+(y-h*.56)+'"/></g>'}
function cirio(x,y,h,c){var w=h*.03;return '<path d="M'+(x-w)+' '+y+'L'+(x+w)+' '+y+'L'+(x+1.5)+' '+(y-h)+'L'+(x-1.5)+' '+(y-h)+'Z" fill="'+c+'"/><path d="M'+x+' '+(y-h*.55)+'q'+(h*.12)+' -'+(h*.04)+' '+(h*.16)+' -'+(h*.2)+' M'+x+' '+(y-h*.4)+'q-'+(h*.1)+' -'+(h*.03)+' -'+(h*.13)+' -'+(h*.16)+'" stroke="'+c+'" stroke-width="'+(w*.7)+'" fill="none" stroke-linecap="round"/>'}
function agave(x,y,len,c){var s='',a;for(a=-70;a<=70;a+=20){var r=a*Math.PI/180,ex=x+Math.sin(r)*len,ey=y-Math.cos(r)*len*.9;s+='<path d="M'+x+' '+y+' Q'+(x+Math.sin(r)*len*.4)+' '+(y-len*.7)+' '+ex+' '+ey+'" stroke="'+c+'" stroke-width="'+(len*.09)+'" stroke-linecap="round" fill="none"/>'}return s}
function fgSet(c,v){
  var g='<path d="M0 1000V870Q260 830 560 880T1180 862T1600 890V1000Z" fill="'+c+'"/>';
  if(v===0)g+=cardon(150,880,430,16,c)+cardon(1420,886,360,13,c)+cirio(300,880,330,c)+agave(60,900,120,c)+agave(1500,905,140,c)+agave(1300,890,90,c);
  else if(v===1)g+=cardon(1320,886,470,17,c)+cirio(1470,890,380,c)+cirio(190,880,260,c)+agave(90,905,130,c)+agave(1180,890,100,c);
  else g+=cirio(260,884,420,c)+cardon(1380,890,340,12,c)+agave(120,905,150,c)+agave(1500,905,110,c);
  return g;
}
function lsInner(o,id){
  var s='<defs><linearGradient id="sk'+id+'" x1="0" y1="0" x2="0" y2="1">';
  o.sky.forEach(function(k){s+='<stop offset="'+k[0]+'" stop-color="'+k[1]+'"/>'});
  s+='</linearGradient><radialGradient id="sn'+id+'"><stop offset="0" stop-color="'+o.sun.c+'" stop-opacity=".9"/><stop offset="1" stop-color="'+o.sun.c+'" stop-opacity="0"/></radialGradient>';
  s+='<linearGradient id="se'+id+'" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="'+o.sea[0]+'"/><stop offset="1" stop-color="'+o.sea[1]+'"/></linearGradient></defs>';
  s+='<rect width="1600" height="1000" fill="url(#sk'+id+')"/>';
  if(o.stars){var r=R(7),i;for(i=0;i<70;i++)s+='<circle cx="'+(r()*1600)+'" cy="'+(r()*430)+'" r="'+(r()*1.6+.4)+'" fill="#fff" opacity="'+(r()*.7+.2)+'"/>'}
  s+='<circle cx="'+o.sun.x+'" cy="'+o.sun.y+'" r="'+(o.sun.r*5)+'" fill="url(#sn'+id+')"/><circle cx="'+o.sun.x+'" cy="'+o.sun.y+'" r="'+o.sun.r+'" fill="'+o.sun.c+'"/>';
  o.ridges.forEach(function(q){s+=ridge(q[0],q[1],q[2],q[3],q[4],q[5])});
  s+='<rect y="'+o.hz+'" width="1600" height="'+(1000-o.hz)+'" fill="url(#se'+id+')"/>';
  if(o.glint){var g=R(3),k;for(k=0;k<46;k++){var gy=o.hz+8+Math.pow(g(),1.7)*300,gw=(30+g()*140)*(1+(gy-o.hz)/260),gx=o.sun.x+(g()-.5)*(60+(gy-o.hz)*1.3);s+='<rect x="'+(gx-gw/2)+'" y="'+gy+'" width="'+gw+'" height="'+(1.2+(gy-o.hz)/90)+'" fill="'+o.glint+'" opacity="'+(.15+g()*.5)+'"/>'}}
  if(o.flag)s+='<path d="M1130 '+(o.hz+190)+'V'+(o.hz+60)+'" stroke="#f3eee2" stroke-width="3"/><path d="M1130 '+(o.hz+60)+'l56 16l-56 16z" fill="#c4553a"/><ellipse cx="1130" cy="'+(o.hz+192)+'" rx="40" ry="7" fill="#1c2a14" opacity=".5"/>';
  if(o.fg!==undefined&&o.fg!==null)s+=fgSet(o.fgc,o.fg);
  return s;
}
function landscape(o){var id=++uid;return '<svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" aria-hidden="true">'+lsInner(o,id)+'</svg>'}
var P={
 gold:{sky:[[0,'#26343a'],[.34,'#78665a'],[.56,'#d9a273'],[.7,'#f2c691']],hz:660,sun:{x:1040,y:626,r:64,c:'#f7d8a8'},ridges:[[11,540,60,'#7a6358',.6,8],[23,605,38,'#52443d',.9,10]],sea:['#c58b68','#34403f'],glint:'#ffe3b8'},
 blue:{sky:[[0,'#0e1522'],[.38,'#2a3450'],[.62,'#7b6a79'],[.74,'#cf8e7c']],hz:660,sun:{x:1040,y:664,r:34,c:'#eebba2'},ridges:[[11,545,60,'#34334a',.7,8],[23,607,36,'#1f2030',.95,10]],sea:['#5a5873','#111522'],glint:'#f1c3b0'},
 dawn:{sky:[[0,'#8c9db0'],[.4,'#d9c3b3'],[.62,'#f1d2b4'],[.72,'#f6e0c2']],hz:660,sun:{x:460,y:640,r:56,c:'#fbe8c8'},ridges:[[31,560,58,'#a6968f',.55,8],[41,612,34,'#7f716c',.8,10]],sea:['#c9ccc7','#6e8080'],glint:'#fff3dc'},
 noon:{sky:[[0,'#5d8fa8'],[.5,'#a9c6c8'],[.72,'#e0d6b6']],hz:640,sun:{x:1200,y:150,r:40,c:'#fffbea'},ridges:[[51,540,58,'#8f8f7e',.55,8],[61,596,34,'#6a6d58',.85,10]],sea:['#5aa0a2','#1f5a60'],glint:'#ffffff'},
 dusk:{sky:[[0,'#434a5c'],[.4,'#b9694a'],[.62,'#eeb272'],[.74,'#f7cd90']],hz:650,sun:{x:760,y:620,r:60,c:'#fbdcae'},ridges:[[71,535,64,'#6e4f45',.65,8],[81,598,38,'#3d322f',.92,10]],sea:['#c77e57','#2d2f33'],glint:'#ffd9a3'},
 night:{sky:[[0,'#080b12'],[.5,'#171d2d'],[.74,'#3a3a44']],hz:680,sun:{x:1180,y:240,r:26,c:'#efe9d8'},ridges:[[91,570,60,'#141622',.9,8],[101,630,36,'#0d0f17',1,10]],sea:['#1d2336','#07090e'],glint:'#cfd6e8',stars:true},
 golf:{sky:[[0,'#8fb3c0'],[.5,'#cfdac8'],[.7,'#ecdfbd']],hz:600,sun:{x:300,y:180,r:34,c:'#fffbea'},ridges:[[121,520,62,'#8d9a82',.6,8],[131,575,32,'#6c7e5a',.9,9]],sea:['#7f9a58','#35502a'],glint:null,flag:true}
};
function mix(base,over){var o={},k;for(k in base)o[k]=base[k];for(k in over)o[k]=over[k];return o}
function arch(o){
  var id=++uid,view=o.view?mix(P[o.view],{fg:o.fg,fgc:'#14110c'}):mix(P.gold,{fg:1,fgc:'#14110c'});
  var ax=o.ax||290,aw=o.aw||420,at=o.at||200,ab=o.ab||930;
  var cx=ax+aw/2,rad=aw/2;
  var shape='M'+ax+' '+ab+'V'+(at+rad)+'A'+rad+' '+rad+' 0 0 1 '+(ax+aw)+' '+(at+rad)+'V'+ab+'Z';
  var s='<svg viewBox="0 0 1000 1300" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs>';
  s+='<linearGradient id="w'+id+'" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="'+o.wall[0]+'"/><stop offset="1" stop-color="'+o.wall[1]+'"/></linearGradient>';
  s+='<linearGradient id="f'+id+'" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="'+o.floor[0]+'"/><stop offset="1" stop-color="'+o.floor[1]+'"/></linearGradient>';
  s+='<linearGradient id="l'+id+'" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="'+o.light+'" stop-opacity=".75"/><stop offset="1" stop-color="'+o.light+'" stop-opacity="0"/></linearGradient>';
  s+='<clipPath id="c'+id+'"><path d="'+shape+'"/></clipPath><filter id="b'+id+'"><feGaussianBlur stdDeviation="14"/></filter></defs>';
  s+='<rect width="1000" height="1300" fill="url(#w'+id+')"/>';
  s+='<svg x="'+ax+'" y="'+at+'" width="'+aw+'" height="'+(ab-at)+'" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" clip-path="url(#c'+id+')">'+lsInner(view,id+1000)+'</svg>';
  s+='<path d="'+shape+'" fill="none" stroke="rgba(0,0,0,.28)" stroke-width="10"/>';
  s+='<rect y="'+ab+'" width="1000" height="'+(1300-ab)+'" fill="url(#f'+id+')"/>';
  s+='<polygon points="'+ax+','+ab+' '+(ax+aw)+','+ab+' '+(ax+aw+(o.spread||260))+',1300 '+(ax-(o.spread||260)*.3)+',1300" fill="url(#l'+id+')" opacity=".85"/>';
  var r=R(o.seed||5),i;
  for(i=0;i<5;i++){s+='<ellipse cx="'+(120+r()*130)+'" cy="'+(300+i*105+r()*30)+'" rx="'+(26+r()*34)+'" ry="'+(10+r()*12)+'" transform="rotate('+(-50+r()*100)+' 180 '+(300+i*105)+')" fill="#000" opacity=".16" filter="url(#b'+id+')"/>'}
  s+='<rect x="'+(o.bx||110)+'" y="1040" width="360" height="62" rx="4" fill="'+o.f1+'"/><rect x="'+(o.bx||110)+'" y="1100" width="360" height="30" fill="#000" opacity=".25"/>';
  s+='<ellipse cx="'+((o.bx||110)+410)+'" cy="1098" rx="38" ry="12" fill="#000" opacity=".25"/><path d="M'+((o.bx||110)+380)+' 1098 q-6 -90 12 -120 q42 24 38 120z" fill="'+o.f2+'"/>';
  s+='<path d="M'+((o.bx||110)+410)+' 980 q-6 -70 -40 -120 M'+((o.bx||110)+410)+' 980 q14 -80 56 -110 M'+((o.bx||110)+410)+' 980 q-2 -90 8 -150" stroke="#2c2a1e" stroke-width="3" fill="none" stroke-linecap="round"/>';
  s+='</svg>';
  return s;
}
function pool(){
  var id=++uid,s='<svg viewBox="0 0 1000 1300" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><linearGradient id="p'+id+'" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7f9a93"/><stop offset=".5" stop-color="#4d6d69"/><stop offset="1" stop-color="#25403e"/></linearGradient><linearGradient id="q'+id+'" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d9cdb4"/><stop offset="1" stop-color="#b9a98a"/></linearGradient></defs>';
  s+='<rect width="1000" height="1300" fill="url(#p'+id+')"/>';
  var r=R(17),i;
  for(i=0;i<130;i++){var y=140+r()*1160,x=r()*1000,w=40+r()*160;s+='<path d="M'+x+' '+y+' q'+(w/4)+' -'+(6+r()*10)+' '+(w/2)+' 0 t'+(w/2)+' 0" stroke="#e8f2ea" stroke-width="'+(.8+r()*1.8)+'" fill="none" opacity="'+(.12+r()*.4)+'"/>'}
  s+='<rect width="1000" height="150" fill="url(#q'+id+')"/><rect y="150" width="1000" height="26" fill="#000" opacity=".22"/>';
  s+='<path d="M780 150 q30 -120 -4 -210" stroke="#14110c" stroke-width="10" fill="none" stroke-linecap="round" opacity=".0"/>';
  s+='<path d="M60 0 q70 90 40 150 M130 0 q40 80 60 150" stroke="#000" stroke-width="30" opacity=".08" fill="none"/></svg>';
  return s;
}
var SC={
 'hero-dorada':function(){return landscape(mix(P.gold,{}))},
 'hero-azul':function(){return landscape(mix(P.blue,{}))},
 'hero-frente':function(){return '<svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMax slice" aria-hidden="true">'+fgSet('#0e0c08',0)+'</svg>'},
 'destino-mar':function(){return landscape(mix(P.dawn,{fg:2,fgc:'#1a1812'}))},
 'destino-playas':function(){return landscape(mix(P.noon,{fg:1,fgc:'#1e2417'}))},
 'destino-centro':function(){return landscape(mix(P.dusk,{fg:0,fgc:'#14110c'}))},
 'reserva-noche':function(){return landscape(mix(P.night,{fg:1,fgc:'#05060a'}))},
 'destino-golf':function(){return landscape(mix(P.golf,{fg:2,fgc:'#18200f'}))},
 'amenidades-alberca':pool,
 'hab-suite1':function(){return arch({wall:['#cdbba0','#a88f72'],floor:['#8f7a62','#5d4d3d'],light:'#f6d9a8',view:'gold',fg:0,f1:'#6b5a46',f2:'#b0714c',seed:3})},
 'hab-residencia2':function(){return arch({wall:['#d9ccb4','#b9a587'],floor:['#a89478','#6f5e49'],light:'#fbe6bf',view:'dusk',fg:1,ax:230,aw:540,at:250,ab:940,f1:'#4c463a',f2:'#7b6d4c',seed:9,bx:160})},
 'hab-estudio':function(){return arch({wall:['#bfae93','#8f7a60'],floor:['#7a6650','#4a3c2e'],light:'#f1cf9a',view:'dawn',fg:2,ax:340,aw:320,at:220,ab:900,f1:'#3f382c',f2:'#a2603f',seed:14,bx:70})},
 'hab-habitacion':function(){return arch({wall:['#cfc3ae','#a79a82'],floor:['#8b7c66','#5a4e3f'],light:'#f7e1b7',view:'noon',fg:0,ax:300,aw:400,at:300,ab:900,f1:'#5c5340',f2:'#7a8260',seed:21,bx:140})}
};

