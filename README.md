# Portfolio de Lara Minaverry

Landing estático en GitHub Pages, pensado para reclutadores humanos y para filtros de IA / ATS.

**Sitio en vivo:** https://gabrielalejandroarroyo.github.io/lara-minaverry-portfolio/

Posicionamiento: **Coordinadora de Operaciones Tech / Team Leader**, con frontend y no-code como ventaja. No se presenta como junior.

- Sitio: [index.html](index.html)
- CV parseable: [cv.html](cv.html)
- Texto para agentes: [llms.txt](llms.txt)
- LinkedIn: [linkedin.com/in/lara-minaverry](https://www.linkedin.com/in/lara-minaverry/)
- Repositorio: https://github.com/GabrielAlejandroArroyo/lara-minaverry-portfolio

## Desplegar / republicar

El sitio se publica desde la rama `main`, carpeta raíz, con GitHub Pages.

1. Hacé cambios en el código.
2. `git add`, `git commit` y `git push origin main`.
3. En uno o dos minutos Pages actualiza https://gabrielalejandroarroyo.github.io/lara-minaverry-portfolio/

## Placeholders (reemplazar si los tenés)

| Dato | Dónde |
| --- | --- |
| Foto | Reemplazá `assets/avatar.svg` por `assets/lara.jpg` y cambiá el `src` de la imagen en `index.html` |
| Email | En `js/main.js`, cambiá `CONTACT_EMAIL` por el email real. También en `cv.html` |
| GitHub | En `js/main.js`, cambiá `CONTACT_GITHUB` por la URL completa |

Mientras el email sea `CONTACT_EMAIL`, el formulario abre LinkedIn. Los botones de email y GitHub permanecen ocultos.

## Qué indexa una IA

El contenido crítico está en HTML (español e inglés). El JavaScript solo cambia idioma, menú y el destino del formulario. También hay JSON-LD `Person`, `llms.txt` y `cv.html` en texto plano.

## Imprimir el CV

Abrí `cv.html` y usá Imprimir → Guardar como PDF.
