const SITE = {
  // PLACEHOLDER: pegá el email real, por ejemplo "lara@dominio.com"
  email: "CONTACT_EMAIL",
  // PLACEHOLDER: URL de GitHub si existe, por ejemplo "https://github.com/usuario"
  github: "CONTACT_GITHUB",
  linkedin: "https://www.linkedin.com/in/lara-minaverry/",
};

const html = document.documentElement;
const langBtn = document.getElementById("lang-toggle");
const menuBtn = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const yearEl = document.getElementById("year");
const form = document.getElementById("contact-form");
const emailLinks = document.querySelectorAll("[data-email-link]");
const githubLinks = document.querySelectorAll("[data-github-link]");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const hasEmail = SITE.email && SITE.email !== "CONTACT_EMAIL" && SITE.email.includes("@");
const hasGithub = SITE.github && SITE.github !== "CONTACT_GITHUB" && SITE.github.startsWith("http");

if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

function setLang(lang) {
  html.lang = lang;
  localStorage.setItem("lm-lang", lang);
  if (langBtn) {
    langBtn.textContent = lang === "es" ? "EN" : "ES";
    langBtn.setAttribute("aria-label", lang === "es" ? "Switch to English" : "Cambiar a español");
  }
}

const savedLang = localStorage.getItem("lm-lang");
if (savedLang === "en" || savedLang === "es") {
  setLang(savedLang);
}

langBtn?.addEventListener("click", () => {
  setLang(html.lang === "es" ? "en" : "es");
});

menuBtn?.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(isOpen));
});

navLinks?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

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

function animateCount(el) {
  const target = Number(el.dataset.count || 0);
  if (prefersReducedMotion) {
    setCountValue(el, target);
    return;
  }

  const duration = 1100;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    setCountValue(el, Math.round(target * eased));
    if (progress < 1) {
      requestAnimationFrame(tick);
    }
  }

  requestAnimationFrame(tick);
}

const impacto = document.getElementById("impacto");
if (impacto) {
  const counters = impacto.querySelectorAll("[data-count]");

  if (prefersReducedMotion) {
    impacto.classList.add("is-in");
    counters.forEach((el) => setCountValue(el, Number(el.dataset.count || 0)));
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          impacto.classList.add("is-in");
          counters.forEach((el) => animateCount(el));
          observer.disconnect();
        });
      },
      { threshold: 0.28 }
    );
    observer.observe(impacto);
  }
}
