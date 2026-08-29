const SITE = {
  // PLACEHOLDER: pegá el email real, por ejemplo "lara@dominio.com"
  email: "CONTACT_EMAIL",
  // PLACEHOLDER: URL de GitHub si existe, por ejemplo "https://github.com/usuario"
  github: "CONTACT_GITHUB",
  linkedin: "https://www.linkedin.com/in/lara-minaverry/",
};

const html = document.documentElement;
const themeOpts = document.querySelectorAll("[data-theme-set]");
const langOptions = document.querySelectorAll("[data-lang]");
const langDropdown = document.getElementById("lang-dropdown");
const langTrigger = document.getElementById("lang-trigger");
const langMenu = document.getElementById("lang-menu");
const langCurrent = document.getElementById("lang-current");
const menuBtn = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const navBackdrop = document.getElementById("nav-backdrop");
const yearEl = document.getElementById("year");
const form = document.getElementById("contact-form");
const emailLinks = document.querySelectorAll("[data-email-link]");
const githubLinks = document.querySelectorAll("[data-github-link]");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const LANGS = ["es", "en", "pt"];
const LANG_META = {
  es: { name: "Español", iso: "ES" },
  en: { name: "English", iso: "EN" },
  pt: { name: "Português", iso: "PT" },
};
const THEME_LABELS = {
  es: { light: "Modo claro", dark: "Modo oscuro" },
  en: { light: "Light mode", dark: "Dark mode" },
  pt: { light: "Modo claro", dark: "Modo escuro" },
};
const LANG_TRIGGER_LABELS = {
  es: (name) => `Idioma: ${name}`,
  en: (name) => `Language: ${name}`,
  pt: (name) => `Idioma: ${name}`,
};
const MENU_LABELS = {
  es: { open: "Abrir menú", close: "Cerrar menú" },
  en: { open: "Open menu", close: "Close menu" },
  pt: { open: "Abrir menu", close: "Fechar menu" },
};

const hasEmail = SITE.email && SITE.email !== "CONTACT_EMAIL" && SITE.email.includes("@");
const hasGithub = SITE.github && SITE.github !== "CONTACT_GITHUB" && SITE.github.startsWith("http");

if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

function readStore(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeStore(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* ignore quota / private mode */
  }
}

function readSession(key) {
  try {
    return sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeSession(key, value) {
  try {
    sessionStorage.setItem(key, value);
  } catch {
    /* ignore quota / private mode */
  }
}

function currentLang() {
  return LANGS.includes(html.lang) ? html.lang : "es";
}

function currentTheme() {
  return html.getAttribute("data-theme") === "dark" ? "dark" : "light";
}

function isLangMenuOpen() {
  return langTrigger?.getAttribute("aria-expanded") === "true";
}

function setLangMenuOpen(open) {
  if (!langTrigger || !langMenu) return;
  langTrigger.setAttribute("aria-expanded", String(open));
  langMenu.hidden = !open;
}

function syncChrome() {
  const lang = currentLang();
  const theme = currentTheme();
  const meta = LANG_META[lang];
  const themeLabels = THEME_LABELS[lang];

  langOptions.forEach((btn) => {
    btn.setAttribute("aria-selected", String(btn.dataset.lang === lang));
  });
  if (langCurrent) langCurrent.textContent = meta.name;
  if (langTrigger) langTrigger.setAttribute("aria-label", LANG_TRIGGER_LABELS[lang](meta.name));

  themeOpts.forEach((btn) => {
    const value = btn.dataset.themeSet;
    btn.setAttribute("aria-pressed", String(value === theme));
    btn.setAttribute("aria-label", themeLabels[value] || themeLabels.light);
  });

  if (menuBtn) {
    const isOpen = Boolean(navLinks?.classList.contains("open"));
    const labels = MENU_LABELS[lang];
    menuBtn.setAttribute("aria-label", isOpen ? labels.close : labels.open);
  }
}

function setLang(lang, persist = true) {
  if (!LANGS.includes(lang)) return;
  html.lang = lang;
  if (persist) writeStore("lm-lang", lang);
  syncChrome();
}

function setTheme(theme) {
  const next = theme === "dark" ? "dark" : "light";
  html.setAttribute("data-theme", next);
  writeStore("lm-theme", next);
  syncChrome();
}

const desktopNav = window.matchMedia("(min-width: 720px)");

function isDesktopNav() {
  return desktopNav.matches;
}

function setMenuOpen(isOpen) {
  const desktop = isDesktopNav();
  const open = desktop ? true : isOpen;
  navLinks?.classList.toggle("open", open);
  document.body.classList.toggle("nav-open", !desktop && open);
  menuBtn?.setAttribute("aria-expanded", String(!desktop && open));
  if (navLinks) {
    navLinks.setAttribute("aria-hidden", String(!open));
    navLinks.inert = !open;
  }
  if (navBackdrop) {
    if (!desktop && open) {
      window.setTimeout(() => {
        if (document.body.classList.contains("nav-open")) navBackdrop.hidden = false;
      }, 20);
    } else {
      navBackdrop.hidden = true;
    }
  }
  if (!desktop && !open) setLangMenuOpen(false);
  syncChrome();
}

function syncMenuMode() {
  setMenuOpen(isDesktopNav());
}

langOptions.forEach((btn) => {
  btn.addEventListener("click", () => {
    setLang(btn.dataset.lang);
    setLangMenuOpen(false);
    langTrigger?.focus();
  });
});

langTrigger?.addEventListener("click", (event) => {
  event.stopPropagation();
  setLangMenuOpen(!isLangMenuOpen());
});

themeOpts.forEach((btn) => {
  btn.addEventListener("click", () => setTheme(btn.dataset.themeSet));
});

menuBtn?.addEventListener("click", (event) => {
  event.stopPropagation();
  setMenuOpen(!document.body.classList.contains("nav-open"));
});

navBackdrop?.addEventListener("click", () => setMenuOpen(false));

navLinks?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    if (!isDesktopNav()) setMenuOpen(false);
  });
});

document.addEventListener("click", (event) => {
  if (langDropdown && !langDropdown.contains(event.target)) {
    setLangMenuOpen(false);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  if (isLangMenuOpen()) {
    setLangMenuOpen(false);
    langTrigger?.focus();
    return;
  }
  if (!isDesktopNav()) setMenuOpen(false);
});

if (typeof desktopNav.addEventListener === "function") {
  desktopNav.addEventListener("change", syncMenuMode);
} else if (typeof desktopNav.addListener === "function") {
  desktopNav.addListener(syncMenuMode);
}

syncMenuMode();

const SPANISH_COUNTRIES = new Set([
  "AR", "BO", "CL", "CO", "CR", "CU", "DO", "EC", "ES", "GQ", "GT", "HN",
  "MX", "NI", "PA", "PE", "PR", "PY", "SV", "UY", "VE",
]);
const PORTUGUESE_COUNTRIES = new Set(["AO", "BR", "CV", "GW", "MZ", "PT", "ST", "TL"]);

function langFromCountry(code) {
  const country = String(code || "").toUpperCase();
  if (SPANISH_COUNTRIES.has(country)) return "es";
  if (PORTUGUESE_COUNTRIES.has(country)) return "pt";
  return "en";
}

function langFromBrowser() {
  const tags = [...(navigator.languages || []), navigator.language].filter(Boolean);
  for (const tag of tags) {
    const base = String(tag).slice(0, 2).toLowerCase();
    if (LANGS.includes(base)) return base;
  }
  return "es";
}

async function fetchJson(url, timeoutMs = 2500) {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  } finally {
    window.clearTimeout(timer);
  }
}

async function fetchCountryCode() {
  const geo = await fetchJson("https://get.geojs.io/v1/ip/country.json");
  if (geo?.country) return geo.country;
  const who = await fetchJson("https://ipwho.is/");
  if (who?.success !== false && who?.country_code) return who.country_code;
  return null;
}

async function detectVisitorLang() {
  const cached = readSession("lm-lang-auto");
  if (LANGS.includes(cached)) return cached;
  const country = await fetchCountryCode();
  const lang = country ? langFromCountry(country) : langFromBrowser();
  writeSession("lm-lang-auto", lang);
  return lang;
}

const savedLang = readStore("lm-lang");
if (LANGS.includes(savedLang)) {
  setLang(savedLang);
} else {
  setLang(langFromBrowser(), false);
  detectVisitorLang().then((lang) => {
    if (readStore("lm-lang")) return;
    setLang(lang, false);
  });
}

const savedTheme = readStore("lm-theme");
if (savedTheme === "dark" || savedTheme === "light") {
  setTheme(savedTheme);
} else {
  syncChrome();
}

emailLinks.forEach((el) => {
  if (hasEmail) {
    el.href = `mailto:${SITE.email}`;
    el.hidden = false;
  } else {
    el.hidden = true;
  }
});

githubLinks.forEach((el) => {
  if (hasGithub) {
    el.href = SITE.github;
    el.hidden = false;
  } else {
    el.hidden = true;
  }
});

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const name = String(data.get("name") || "").trim();
  const company = String(data.get("company") || "").trim();
  const message = String(data.get("message") || "").trim();
  const subject = encodeURIComponent(`Oportunidad para Lara Minaverry${company ? " — " + company : ""}`);
  const body = encodeURIComponent(`Hola Lara,\n\n${message}\n\n${name}${company ? " · " + company : ""}`);

  if (hasEmail) {
    window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
    return;
  }

  window.open(SITE.linkedin, "_blank", "noopener");
});

function setCountValue(el, value) {
  const suffix = el.dataset.suffix || "";
  el.textContent = `${value}${suffix}`;
}

function yearsFrom(isoDate) {
  const start = new Date(`${isoDate}T00:00:00`);
  const now = new Date();
  let years = now.getFullYear() - start.getFullYear();
  const beforeAnniversary =
    now.getMonth() < start.getMonth() ||
    (now.getMonth() === start.getMonth() && now.getDate() < start.getDate());
  if (beforeAnniversary) years -= 1;
  return Math.max(0, years);
}

function monthsFrom(isoDate) {
  const start = new Date(`${isoDate}T00:00:00`);
  const now = new Date();
  return (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
}

const IMPACT = {
  careerYears: 25,
  noCountryStart: "2023-04-01",
  languages: 3,
  linkedinFollowers: 414,
  linkedinContacts: 298,
};

function applyImpactStats() {
  const noCountryYears = yearsFrom(IMPACT.noCountryStart);
  const noCountryEl = document.querySelector('[data-stat="nocountry"]');
  if (noCountryEl) {
    noCountryEl.dataset.count = String(noCountryYears);
    noCountryEl.dataset.suffix = monthsFrom(IMPACT.noCountryStart) % 12 === 0 ? "" : "+";
  }

  const careerEl = document.querySelector('[data-stat="career"]');
  if (careerEl) careerEl.dataset.count = String(IMPACT.careerYears);

  const languagesEl = document.querySelector('[data-stat="languages"]');
  if (languagesEl) languagesEl.dataset.count = String(IMPACT.languages);

  const followersEl = document.querySelector('[data-stat="followers"]');
  if (followersEl) followersEl.dataset.count = String(IMPACT.linkedinFollowers);

  const contactsEl = document.querySelector('[data-stat="contacts"]');
  if (contactsEl) contactsEl.dataset.count = String(IMPACT.linkedinContacts);

  const referencesEl = document.querySelector('[data-stat="references"]');
  if (referencesEl) {
    const published = document.querySelectorAll("#referencias blockquote").length;
    referencesEl.dataset.count = String(published);
  }
}

function isInViewport(el) {
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight * 0.92 && rect.bottom > 80;
}

const sections = ["inicio", "sobre", "impacto", "contratar", "trabajo", "videos", "referencias", "redes", "experiencia", "formacion", "contacto"];
const navAnchors = [...(navLinks?.querySelectorAll('a[href^="#"]') || [])].filter(
  (link) => !link.classList.contains("nav-sidebar-logo")
);

function syncNav() {
  let current = "inicio";
  sections.forEach((id) => {
    const el = document.getElementById(id);
    if (el && el.getBoundingClientRect().top < 120) {
      current = id;
    }
  });
  navAnchors.forEach((link) => {
    link.classList.toggle("is-active", link.getAttribute("href") === `#${current}`);
  });
}

window.addEventListener("scroll", syncNav, { passive: true });
syncNav();

const filterBar = document.querySelector(".filters");
if (filterBar) {
  const rows = document.querySelectorAll(".work-row[data-kind]");
  filterBar.addEventListener("click", (event) => {
    const btn = event.target.closest("button[data-filter]");
    if (!btn) return;
    const kind = btn.dataset.filter;
    filterBar.querySelectorAll("button").forEach((item) => {
      item.setAttribute("aria-pressed", String(item === btn));
      item.classList.toggle("is-on", item === btn);
    });
    rows.forEach((row) => {
      row.hidden = kind !== "all" && row.dataset.kind !== kind;
    });
  });
}

const impacto = document.getElementById("impacto");
if (impacto) {
  applyImpactStats();
  const counters = impacto.querySelectorAll("[data-count]");
  counters.forEach((el) => setCountValue(el, Number(el.dataset.count || 0)));

  const revealImpact = () => {
    impacto.classList.add("is-in");
  };

  if (reduceMotion || isInViewport(impacto)) {
    revealImpact();
  } else if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          revealImpact();
          observer.disconnect();
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(impacto);
    window.setTimeout(revealImpact, 1800);
  } else {
    revealImpact();
  }
}

function initVideoGallery() {
  const gallery = document.querySelector("[data-gallery]");
  const track = gallery?.querySelector(".video-gallery-track");
  const prev = gallery?.querySelector(".gallery-prev");
  const next = gallery?.querySelector(".gallery-next");
  if (!gallery || !track || !prev || !next) return;

  function cardStep() {
    const card = track.querySelector(".media-card");
    if (!card) return track.clientWidth;
    const styles = getComputedStyle(track);
    const gap = Number.parseFloat(styles.columnGap || styles.gap) || 14;
    return card.getBoundingClientRect().width + gap;
  }

  function syncGalleryNav() {
    const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth - 2);
    prev.disabled = track.scrollLeft <= 2;
    next.disabled = track.scrollLeft >= maxScroll;
  }

  prev.addEventListener("click", () => {
    track.scrollBy({ left: -cardStep(), behavior: reduceMotion ? "auto" : "smooth" });
  });
  next.addEventListener("click", () => {
    track.scrollBy({ left: cardStep(), behavior: reduceMotion ? "auto" : "smooth" });
  });
  track.addEventListener("scroll", syncGalleryNav, { passive: true });
  window.addEventListener("resize", syncGalleryNav);
  syncGalleryNav();
}

initVideoGallery();
