/**
 * Catálogo de piezas públicas de Lara Minaverry.
 * Fuente: posts de LinkedIn verificables. Sin canal de YouTube propio.
 * Las explicaciones describen contexto y rol visible; no transcriben el video.
 */
const VIDEO_LIBRARY = [
  {
    id: "cierre-latam",
    featured: true,
    title: "Cierre · Hackathon Latam",
    href: "https://www.linkedin.com/posts/leandrobuzeta_hackathonone-simulacionlaboral-activity-7423051481609789440-6c-J",
    author: "Leandro Buzeta · CEO No Country",
    signal: { es: "72 reacciones", en: "72 reactions" },
    es: "Cierre del Hackathon ONE, la simulación laboral que No Country presentó como el hackathon más grande de Latam. Después de semanas de operación, el CEO agradece al equipo que sostuvo el evento y nombra a Lara Minaverry en operaciones. No es un video personal: es la pieza donde el liderazgo de la compañía la sitúa en el backoffice que hace que los equipos entreguen.",
    en: "Closing of Hackathon ONE, the job simulation No Country framed as Latam’s largest hackathon. After weeks of operations, the CEO thanks the team that held the event and names Lara Minaverry in ops. It is not a personal vlog: it is the piece where company leadership places her in the back office that gets teams to ship.",
  },
  {
    id: "kickoff-g9",
    featured: true,
    title: "Kickoff · ONE G9 Brasil",
    href: "https://www.linkedin.com/posts/leticiabohrer_o-hackathon-brasil-one-g9-come%C3%A7ou-activity-7477884859479322624-IS2M",
    author: "Letícia Bohrer",
    signal: { es: "69 reacciones · 2 veces compartida", en: "69 reactions · 2 shares" },
    es: "Arranque del Hackathon Brasil ONE G9, con Oracle, Alura y No Country. Letícia Bohrer publica el kickoff y nombra a Lara entre quienes hacen posible la edición. Muestra alcance regional: misma operación, otro país, otro idioma.",
    en: "Kickoff of Hackathon Brasil ONE G9, with Oracle, Alura, and No Country. Letícia Bohrer posts the start and names Lara among the people who make the edition possible. It shows regional reach: same operation, another country, another language.",
  },
  {
    id: "demo-day-one",
    featured: true,
    title: "Demo Day · Hackathon ONE",
    href: "https://www.linkedin.com/posts/leandrobuzeta_demo-day-del-hackathon-one-lo-vivido-activity-7376243141173055488-gp12",
    author: "Leandro Buzeta · LinkedIn",
    signal: { es: "Video y relato de la operación", en: "Operations video and recap" },
    es: "Relato y video del Demo Day: el viernes en que los equipos muestran producto. Leandro describe lo vivido y el rol del equipo operativo. Lara aparece como parte de quienes sostienen la sala, los tiempos y el cierre — no como speaker del pitch, sino como quien hace que el día corra.",
    en: "Recap and video of Demo Day: the Friday teams show product. Leandro describes what happened and the ops team’s role. Lara shows up as part of the people who hold the room, the clock, and the close — not as a pitch speaker, but as someone who makes the day run.",
  },
  {
    id: "nutrimarket",
    featured: false,
    title: "Pitch · Nutrimarket",
    href: "https://es.linkedin.com/posts/leonardo-manuel-tolaba_nutrimarket-activity-7171969338957139968-Vj6v",
    author: "Leonardo Tolaba · LinkedIn",
    signal: { es: "Video de presentación del equipo", en: "Team presentation video" },
    es: "Presentación del ecommerce saludable Nutrimarket, publicada por un compañero de simulación. El post cita a Lara como Team Leader: el equipo desplegó y presentó. Es evidencia de liderazgo de producto en una práctica, no de un canal propio.",
    en: "Presentation of the healthy ecommerce Nutrimarket, posted by a simulation teammate. The post cites Lara as Team Leader: the team shipped and pitched. It is evidence of product leadership in a simulation, not of a personal channel.",
  },
  {
    id: "testimonios-one",
    featured: false,
    title: "Testimonios · Hackathon One",
    href: "https://www.linkedin.com/posts/nocountrytalent_testimonios-hackathon-one-activity-7388972037945344000-w9BM",
    author: "No Country",
    signal: { es: "36 reacciones", en: "36 reactions" },
    es: "Compilado oficial de No Country con testimonios de la primera Hackathon One, junto a Alura y Oracle. No es un clip de Lara hablando: es prueba social del programa que ella opera. Talento en acción, en la pieza institucional del ciclo.",
    en: "Official No Country compilation of testimonials from the first Hackathon One, with Alura and Oracle. It is not a clip of Lara speaking: it is social proof of the program she operates. Talent in action, in the institutional piece of the cycle.",
  },
  {
    id: "demo-day-jurado",
    featured: false,
    title: "Demo Day · jurado ONE",
    href: "https://es.linkedin.com/posts/julia-daniela-rodriguez_nocountry-activity-7421876830359408641-1PIu",
    author: "Julia Daniela Rodríguez",
    signal: { es: "33 reacciones", en: "33 reactions" },
    es: "Julia Daniela Rodríguez, en rol de jurado, cuenta el Demo Day y agradece a Lara el acompañamiento en Discord. Muestra el lado humano de la operación: facilitar, responder y sostener a quienes presentan, no solo el proceso.",
    en: "Julia Daniela Rodríguez, as a juror, recaps Demo Day and thanks Lara for Discord support. It shows the human side of operations: facilitate, answer, and hold the people who present — not only the process.",
  },
];

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function renderVideoLibrary(root) {
  if (!root) return;

  root.innerHTML = VIDEO_LIBRARY.map((item) => {
    const title = escapeHtml(item.title);
    const href = escapeHtml(item.href);
    const author = escapeHtml(item.author);
    const featuredLabel = item.featured
      ? `<span class="lib-badge"><span class="es">Destacado</span><span class="en">Featured</span></span>`
      : "";

    return `
      <article class="lib-item" id="lib-${escapeHtml(item.id)}">
        <a class="media-card" href="${href}" rel="noopener noreferrer" target="_blank">
          <div class="media-frame" aria-hidden="true"><span class="play"></span></div>
          <div class="body">
            <strong>${title}</strong>
            <span class="rx">${author}</span>
          </div>
        </a>
        <div class="lib-copy">
          ${featuredLabel}
          <h4>${title}</h4>
          <p class="es">${escapeHtml(item.es)}</p>
          <p class="en">${escapeHtml(item.en)}</p>
          <p class="lib-meta">
            <span class="es">${escapeHtml(item.signal.es)}</span>
            <span class="en">${escapeHtml(item.signal.en)}</span>
            · <a href="${href}" rel="noopener noreferrer" target="_blank"><span class="es">Abrir en LinkedIn</span><span class="en">Open on LinkedIn</span></a>
          </p>
        </div>
      </article>
    `;
  }).join("");
}

function initVideoLibrary() {
  renderVideoLibrary(document.getElementById("video-library"));
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initVideoLibrary);
} else {
  initVideoLibrary();
}
