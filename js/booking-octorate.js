/* ============================================================
   BOOKING — conecta con el motor de reservas de Octorate.
   No se incrusta su widget oficial (renderiza su propio UI dentro
   de un iframe que Octorate controla, imposible de restylear con
   nuestro CSS). En su lugar, el formulario es 100% nuestro y al
   enviarlo redirige al motor de Octorate con fechas y huéspedes
   ya pre-cargados en la URL — mismo patrón que Octorate documenta
   para integraciones con diseño propio.
   ============================================================ */
(function () {
  var OCTORATE_SITE_KEY = 'octosite362352'; // REEMPLAZAR CON LA CLAVE REAL
  var OCTORATE_LANG = 'es';

  var form = document.getElementById('bookForm');
  var note = document.getElementById('bookNote');
  var checkinEl = document.getElementById('checkin');
  var checkoutEl = document.getElementById('checkout');
  var guestsEl = document.getElementById('guests');
  if (!form || !checkinEl || !checkoutEl) return;

  // Solo fechas futuras, y checkout siempre después de checkin
  var today = new Date();
  var todayIso = today.toISOString().split('T')[0];
  checkinEl.setAttribute('min', todayIso);
  checkoutEl.setAttribute('min', todayIso);

  checkinEl.addEventListener('change', function () {
    if (!checkinEl.value) return;
    var minCheckout = new Date(checkinEl.value);
    minCheckout.setDate(minCheckout.getDate() + 1);
    var minIso = minCheckout.toISOString().split('T')[0];
    checkoutEl.setAttribute('min', minIso);
    if (checkoutEl.value && checkoutEl.value <= checkinEl.value) checkoutEl.value = '';
  });

  function showNote(msg, isError) {
    note.textContent = msg;
    note.classList.toggle('error', !!isError);
  }

  // YYYY-MM-DD -> DD%2FMM%2FYYYY (formato que espera la URL de Octorate)
  function toOctorateDate(iso) {
    return iso.split('-').reverse().join('%2F');
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var checkin = checkinEl.value;
    var checkout = checkoutEl.value;
    var guests = guestsEl ? guestsEl.value : '2';

    if (!checkin || !checkout) {
      showNote('Selecciona fecha de llegada y de salida.', true);
      return;
    }
    if (checkout <= checkin) {
      showNote('La salida debe ser después de la llegada.', true);
      return;
    }

    showNote('Abriendo disponibilidad en Octorate…', false);

    var url = 'https://book.octorate.com/octobook/site/reservation/result.xhtml'
      + '?siteKey=' + encodeURIComponent(OCTORATE_SITE_KEY)
      + '&lang=' + OCTORATE_LANG
      + '&ota=false'
      + '&checkin=' + toOctorateDate(checkin)
      + '&checkout=' + toOctorateDate(checkout)
      + '&pax=' + encodeURIComponent(guests);

    window.location.href = url;
  });
})();
