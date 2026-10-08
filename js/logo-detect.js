// Auto-detecta el formato del logo disponible (SVG, PNG o JPG)
(function(){
  var img=document.querySelector('[data-logo-detect]');
  if(!img)return;
  var formats=['svg','png','jpg'],idx=0;
  function tryLoad(){
    if(idx>=formats.length){
      console.warn('No logo found in assets/logo/');
      return;
    }
    var fmt=formats[idx],src='assets/logo/logo.'+fmt;
    var test=new Image();
    test.onload=function(){
      img.src=src;
      img.removeAttribute('data-logo-detect');
    };
    test.onerror=function(){
      idx++;
      tryLoad();
    };
    test.src=src;
  }
  tryLoad();
})();
