/**
 * Catálogo de piezas públicas de Lara Minaverry.
 * Fuente: posts de LinkedIn verificables. Sin canal de YouTube propio.
 * Las explicaciones describen contexto y rol visible; no transcriben el video.
 * Los previews de 20s usan el material visual público del post (fotos o slides).
 */
const PREVIEW_MS = 20000;

const VIDEO_LIBRARY = [
  {
    id: "cierre-latam",
    featured: true,
    title: "Cierre · Hackathon Latam",
    href: "https://www.linkedin.com/posts/leandrobuzeta_hackathonone-simulacionlaboral-activity-7423051481609789440-6c-J",
    author: "Leandro Buzeta · CEO No Country",
    signal: { es: "72 reacciones", en: "72 reactions", pt: "72 reações" },
    previews: [
      "./assets/previews/cierre-latam/01.jpg",
      "./assets/previews/cierre-latam/02.jpg",
      "./assets/previews/cierre-latam/03.jpg",
      "./assets/previews/cierre-latam/04.jpg",
    ],
    es: "Cierre del Hackathon ONE, la simulación laboral que No Country presentó como el hackathon más grande de Latam. Después de semanas de operación, el CEO agradece al equipo que sostuvo el evento y nombra a Lara Minaverry en operaciones. No es un video personal: es la pieza donde el liderazgo de la compañía la sitúa en el backoffice que hace que los equipos entreguen.",
    en: "Closing of Hackathon ONE, the job simulation No Country framed as Latam’s largest hackathon. After weeks of operations, the CEO thanks the team that held the event and names Lara Minaverry in ops. It is not a personal vlog: it is the piece where company leadership places her in the back office that gets teams to ship.",
    pt: "Encerramento do Hackathon ONE, a simulação laboral que a No Country apresentou como o maior hackathon da Latam. Depois de semanas de operação, o CEO agradece à equipe que sustentou o evento e nomeia Lara Minaverry em operações. Não é um vídeo pessoal: é a peça em que a liderança da empresa a situa no backoffice que faz as equipes entregarem.",
  },
  {
    id: "kickoff-g9",
    featured: true,
    title: "Kickoff · ONE G9 Brasil",
    href: "https://www.linkedin.com/posts/leticiabohrer_o-hackathon-brasil-one-g9-come%C3%A7ou-activity-7477884859479322624-IS2M",
    author: "Letícia Bohrer",
    signal: { es: "69 reacciones · 2 veces compartida", en: "69 reactions · 2 shares", pt: "69 reações · 2 vezes compartilhada" },
    previews: ["./assets/previews/kickoff-g9/01.jpg"],
    es: "Arranque del Hackathon Brasil ONE G9, con Oracle, Alura y No Country. Letícia Bohrer publica el kickoff y nombra a Lara entre quienes hacen posible la edición. Muestra alcance regional: misma operación, otro país, otro idioma.",
    en: "Kickoff of Hackathon Brasil ONE G9, with Oracle, Alura, and No Country. Letícia Bohrer posts the start and names Lara among the people who make the edition possible. It shows regional reach: same operation, another country, another language.",
    pt: "Início do Hackathon Brasil ONE G9, com Oracle, Alura e No Country. Letícia Bohrer publica o kickoff e nomeia Lara entre quem torna a edição possível. Mostra alcance regional: mesma operação, outro país, outro idioma.",
  },
  {
    id: "demo-day-one",
    featured: true,
    title: "Demo Day · Hackathon ONE",
    href: "https://www.linkedin.com/posts/leandrobuzeta_demo-day-del-hackathon-one-lo-vivido-activity-7376243141173055488-gp12",
    author: "Leandro Buzeta · LinkedIn",
    signal: { es: "Video y relato de la operación", en: "Operations video and recap", pt: "Vídeo e relato da operação" },
    previews: [
      "./assets/previews/demo-day-one/01.jpg",
      "./assets/previews/demo-day-one/02.jpg",
    ],
    es: "Relato y video del Demo Day: el viernes en que los equipos muestran producto. Leandro describe lo vivido y el rol del equipo operativo. Lara aparece como parte de quienes sostienen la sala, los tiempos y el cierre — no como speaker del pitch, sino como quien hace que el día corra.",
    en: "Recap and video of Demo Day: the Friday teams show product. Leandro describes what happened and the ops team’s role. Lara shows up as part of the people who hold the room, the clock, and the close — not as a pitch speaker, but as someone who makes the day run.",
    pt: "Relato e vídeo do Demo Day: a sexta em que as equipes mostram produto. Leandro descreve o que se viveu e o papel da equipe operacional. Lara aparece como parte de quem sustenta a sala, os tempos e o encerramento — não como speaker do pitch, mas como quem faz o dia andar.",
  },
  {
    id: "nutrimarket",
    featured: false,
    fit: "contain",
    title: "Pitch · Nutrimarket",
    href: "https://es.linkedin.com/posts/leonardo-manuel-tolaba_nutrimarket-activity-7171969338957139968-Vj6v",
    author: "Leonardo Tolaba · LinkedIn",
    signal: { es: "Video de presentación del equipo", en: "Team presentation video", pt: "Vídeo de apresentação da equipe" },
    previews: [
      "./assets/previews/nutrimarket/01.jpg",
      "./assets/previews/nutrimarket/02.jpg",
      "./assets/previews/nutrimarket/03.jpg",
    ],
    es: "Presentación del ecommerce saludable Nutrimarket, publicada por un compañero de simulación. El post cita a Lara como Team Leader: el equipo desplegó y presentó. Es evidencia de liderazgo de producto en una práctica, no de un canal propio.",
    en: "Presentation of the healthy ecommerce Nutrimarket, posted by a simulation teammate. The post cites Lara as Team Leader: the team shipped and pitched. It is evidence of product leadership in a simulation, not of a personal channel.",
    pt: "Apresentação do ecommerce saudável Nutrimarket, publicada por um colega de simulação. O post cita Lara como Team Leader: a equipe fez o deploy e apresentou. É evidência de liderança de produto em uma prática, não de um canal próprio.",
  },
  {
    id: "testimonios-one",
    featured: false,
    fit: "contain",
    title: "Testimonios · Hackathon One",
    href: "https://www.linkedin.com/posts/nocountrytalent_testimonios-hackathon-one-activity-7388972037945344000-w9BM",
    author: "No Country",
    signal: { es: "36 reacciones", en: "36 reactions", pt: "36 reações" },
    previews: [
      "./assets/previews/testimonios-one/01.jpg",
      "./assets/previews/testimonios-one/02.jpg",
      "./assets/previews/testimonios-one/03.jpg",
    ],
    es: "Compilado oficial de No Country con testimonios de la primera Hackathon One, junto a Alura y Oracle. No es un clip de Lara hablando: es prueba social del programa que ella opera. Talento en acción, en la pieza institucional del ciclo.",
    en: "Official No Country compilation of testimonials from the first Hackathon One, with Alura and Oracle. It is not a clip of Lara speaking: it is social proof of the program she operates. Talent in action, in the institutional piece of the cycle.",
    pt: "Compilado oficial da No Country com depoimentos da primeira Hackathon One, junto com Alura e Oracle. Não é um clipe da Lara falando: é prova social do programa que ela opera. Talento em ação, na peça institucional do ciclo.",
  },
  {
    id: "demo-day-jurado",
    featured: false,
    title: "Demo Day · jurado ONE",
    href: "https://es.linkedin.com/posts/julia-daniela-rodriguez_nocountry-activity-7421876830359408641-1PIu",
    author: "Julia Daniela Rodríguez",
    signal: { es: "33 reacciones", en: "33 reactions", pt: "33 reações" },
    quote: {
      es: "Agradecimiento por el acompañamiento en Discord durante el Demo Day.",
      en: "Thanks for Discord support during Demo Day.",
      pt: "Agradecimento pelo acompanhamento no Discord durante o Demo Day.",
    },
    es: "Julia Daniela Rodríguez, en rol de jurado, cuenta el Demo Day y agradece a Lara el acompañamiento en Discord. Muestra el lado humano de la operación: facilitar, responder y sostener a quienes presentan, no solo el proceso.",
    en: "Julia Daniela Rodríguez, as a juror, recaps Demo Day and thanks Lara for Discord support. It shows the human side of operations: facilitate, answer, and hold the people who present — not only the process.",
    pt: "Julia Daniela Rodríguez, no papel de jurada, conta o Demo Day e agradece a Lara o acompanhamento no Discord. Mostra o lado humano da operação: facilitar, responder e sustentar quem apresenta, não só o processo.",
  },
];

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function previewSlidesHTML(item) {
  if (item.quote) {
    return `
      <div class="preview-slide is-on quote-slide">
        <p class="es">${escapeHtml(item.quote.es)}</p>
        <p class="en">${escapeHtml(item.quote.en)}</p>
        <p class="pt">${escapeHtml(item.quote.pt || item.quote.es)}</p>
        <span>${escapeHtml(item.author)}</span>
      </div>
    `;
  }

  return (item.previews || [])
    .map(
      (src, index) =>
        `<img class="preview-slide${index === 0 ? " is-on" : ""}" src="${escapeHtml(src)}" alt="" width="1280" height="720" decoding="async"${index === 0 ? "" : " loading=\"lazy\""}>`
    )
    .join("");
}

function hydratePreviewFrame(frame) {
  const item = VIDEO_LIBRARY.find((entry) => entry.id === frame.dataset.preview);
  if (!item || frame.querySelector(".preview-slide")) return;

  if (item.fit === "contain") frame.classList.add("is-contain");
  frame.insertAdjacentHTML("afterbegin", previewSlidesHTML(item));
}

function playPreview(frame) {
  const slides = [...frame.querySelectorAll(".preview-slide")];
  const bar = frame.querySelector(".preview-bar i");
  if (!slides.length) return;
  if (frame._previewRaf) return;
  frame.classList.add("is-playing");

  if (prefersReducedMotion) {
    slides.forEach((slide, index) => slide.classList.toggle("is-on", index === 0));
    if (bar) bar.style.transform = "scaleX(1)";
    return;
  }

  const started = performance.now();

  function tick(now) {
    const elapsed = (now - started) % PREVIEW_MS;
    const index =
      slides.length === 1
        ? 0
        : Math.min(slides.length - 1, Math.floor((elapsed / PREVIEW_MS) * slides.length));
    slides.forEach((slide, slideIndex) => slide.classList.toggle("is-on", slideIndex === index));
    if (bar) bar.style.transform = `scaleX(${elapsed / PREVIEW_MS})`;
    frame._previewRaf = requestAnimationFrame(tick);
  }

  frame._previewRaf = requestAnimationFrame(tick);
}

function stopPreview(frame) {
  if (frame._previewRaf) {
    cancelAnimationFrame(frame._previewRaf);
    frame._previewRaf = null;
  }
  frame.classList.remove("is-playing");
}

function initPreviews() {
  const frames = document.querySelectorAll("[data-preview]");
  frames.forEach(hydratePreviewFrame);

  if (!("IntersectionObserver" in window)) {
    frames.forEach(playPreview);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) playPreview(entry.target);
        else stopPreview(entry.target);
      });
    },
    { threshold: 0.45 }
  );

  frames.forEach((frame) => observer.observe(frame));
}

function renderVideoLibrary(root) {
  if (!root) return;

  root.innerHTML = VIDEO_LIBRARY.map((item) => {
    const title = escapeHtml(item.title);
    const href = escapeHtml(item.href);
    const author = escapeHtml(item.author);
    const featuredLabel = item.featured
      ? `<span class="lib-badge"><span class="es">Destacado</span><span class="en">Featured</span><span class="pt">Destaque</span></span>`
      : "";
    const containClass = item.fit === "contain" ? " is-contain" : "";

    return `
      <article class="lib-item" id="lib-${escapeHtml(item.id)}">
        <a class="media-card" href="${href}" rel="noopener noreferrer" target="_blank">
          <div class="media-frame${containClass}" data-preview="${escapeHtml(item.id)}">
            ${previewSlidesHTML(item)}
            <span class="play"></span>
            <span class="preview-bar" aria-hidden="true"><i></i></span>
          </div>
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
          <p class="pt">${escapeHtml(item.pt || item.es)}</p>
          <p class="lib-meta">
            <span class="es">${escapeHtml(item.signal.es)}</span>
            <span class="en">${escapeHtml(item.signal.en)}</span>
            <span class="pt">${escapeHtml(item.signal.pt || item.signal.es)}</span>
            · <a href="${href}" rel="noopener noreferrer" target="_blank"><span class="es">Abrir en LinkedIn</span><span class="en">Open on LinkedIn</span><span class="pt">Abrir no LinkedIn</span></a>
          </p>
        </div>
      </article>
    `;
  }).join("");
}

function initVideoLibrary() {
  renderVideoLibrary(document.getElementById("video-library"));
  initPreviews();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initVideoLibrary);
} else {
  initVideoLibrary();
}
