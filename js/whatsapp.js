/* Footer · WhatsApp: el botón "Contactar" abre un chat con el número del hotel y el texto del cuadro.
   Si el cuadro está vacío manda el saludo de js/i18n.js (clave wa.default), en el idioma activo. */
(function(){
  var NUM='525518214245'; /* +52 55 1821 4245 */
  var ta=document.getElementById('waMsg'),btn=document.getElementById('waBtn'),f=document.getElementById('waForm');
  if(!ta||!btn)return;
  function upd(){btn.href='https://wa.me/'+NUM+'?text='+encodeURIComponent(ta.value.trim()||T('wa.default'))}
  ta.addEventListener('input',upd);upd();
  onLang(upd);
  f.addEventListener('submit',function(e){e.preventDefault();window.open(btn.href,'_blank','noopener')});
})();
