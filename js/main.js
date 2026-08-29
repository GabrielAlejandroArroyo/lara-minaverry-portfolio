const SITE = {
  // PLACEHOLDER: pegá el email real, por ejemplo "lara@dominio.com"
  email: "CONTACT_EMAIL",
  // PLACEHOLDER: URL de GitHub si existe, por ejemplo "https://github.com/usuario"
  github: "CONTACT_GITHUB",
  linkedin: "https://www.linkedin.com/in/lara-minaverry/",
};

const html = document.documentElement;
const themeBtn = document.getElementById("theme-toggle");
const langBtns = document.querySelectorAll("[data-lang]");
const menuBtn = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const navBackdrop = document.getElementById("nav-backdrop");
const yearEl = document.getElementById("year");
const form = document.getElementById("contact-form");
const emailLinks = document.querySelectorAll("[data-email-link]");
const githubLinks = document.querySelectorAll("[data-github-link]");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const LANGS = ["es", "en", "pt"];
const THEME_LABELS = {
  es: { toLight: "Cambiar a modo claro", toDark: "Cambiar a modo oscuro" },
  en: { toLight: "Switch to light mode", toDark: "Switch to dark mode" },
  pt: { toLight: "Mudar para o modo claro", toDark: "Mudar para o modo escuro" },
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

function currentLang() {
  return LANGS.includes(html.lang) ? html.lang : "es";
}

function syncChrome() {
  const lang = currentLang();
  langBtns.forEach((btn) => {
    btn.setAttribute("aria-pressed", String(btn.dataset.lang === lang));
  });
  if (themeBtn) {
    const toLight = html.getAttribute("data-theme") === "dark";
    const labels = THEME_LABELS[lang];
    themeBtn.setAttribute("aria-label", toLight ? labels.toLight : labels.toDark);
  }
  if (menuBtn) {
    const isOpen = Boolean(navLinks?.classList.contains("open"));
    const labels = MENU_LABELS[lang];
    menuBtn.setAttribute("aria-label", isOpen ? labels.close : labels.open);
  }
}

function setLang(lang) {
  if (!LANGS.includes(lang)) return;
  html.lang = lang;
  writeStore("lm-lang", lang);
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
  syncChrome();
}

function syncMenuMode() {
  setMenuOpen(isDesktopNav());
}

langBtns.forEach((btn) => {
  btn.addEventListener("click", () => setLang(btn.dataset.lang));
});

themeBtn?.addEventListener("click", () => {
  const isDark = html.getAttribute("data-theme") === "dark";
  setTheme(isDark ? "light" : "dark");
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

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !isDesktopNav()) setMenuOpen(false);
});

if (typeof desktopNav.addEventListener === "function") {
  desktopNav.addEventListener("change", syncMenuMode);
} else if (typeof desktopNav.addListener === "function") {
  desktopNav.addListener(syncMenuMode);
}

syncMenuMode();

const savedLang = readStore("lm-lang");
if (LANGS.includes(savedLang)) {
  setLang(savedLang);
} else {
  syncChrome();
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
