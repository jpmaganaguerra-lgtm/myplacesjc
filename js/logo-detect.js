// Auto-detecta el formato del logo (SVG, PNG o JPG) en assets/logo/ y lo pone en todos los <img data-logo-detect>.
// Avisa con el evento "logo:ready" (o "logo:missing") para que la intro espere al logo.
(function(){
  var imgs=[].slice.call(document.querySelectorAll('[data-logo-detect]'));
  if(!imgs.length)return;
  var formats=['svg','png','jpg'],idx=0;
  function tell(name,state){window.__logoState=state;try{window.dispatchEvent(new Event(name))}catch(e){}}
  function tryLoad(){
    if(idx>=formats.length){console.warn('No logo found in assets/logo/');tell('logo:missing','missing');return}
    var src='assets/logo/logo.'+formats[idx],test=new Image();
    test.onload=function(){imgs.forEach(function(i){i.src=src;i.removeAttribute('data-logo-detect')});tell('logo:ready','ready')};
    test.onerror=function(){idx++;tryLoad()};
    test.src=src;
  }
  tryLoad();
})();
