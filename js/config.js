'use strict';
/* Configuración editable. */
var CONFIG={
  octorateSiteKey:'', // PENDIENTE: pega aquí la site key de Octorate (data-sitekey="octosite..."). Se usa en el formulario de reserva y en el panel del botón Reservar.
  octorateLang:'', // vacío = Octorate se abre en el idioma que el visitante eligió en el sitio (en / es). Pon 'en' o 'es' para fijarlo.
  bookingUrl:'', // URL del motor de reservas. Recibe ?checkin=AAAA-MM-DD&checkout=...&adults=&children=&room=
  gtmId:'' // PENDIENTE: ID del contenedor de Google Tag Manager, formato 'GTM-XXXXXXX'. Vacío = no se carga nada.
};
