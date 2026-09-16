/**
 * Le mouvement de la planche.
 *
 * Principe : sur un plan, rien n'apparaît en fondu. Un trait se trace, une cote
 * se pose, une ligne se tire. Le mouvement du site suit cette logique plutôt
 * que le fondu générique qui a été rejeté trois fois.
 *
 * Quatre règles tenues partout :
 *
 * 1. Le contenu est lisible sans JavaScript. Les états de départ sont posés par
 *    la feuille de style, mais uniquement sous `html.js`, classe écrite par un
 *    script en ligne avant la peinture. Sans script, rien n'est caché.
 * 2. `prefers-reduced-motion` coupe tout. Aucune branche animée ne se crée, et
 *    les états de départ sont neutralisés par la même règle CSS.
 * 3. Jamais de `width`, `height`, `margin` ni `padding` animés. Uniquement
 *    `transform`, `opacity` et `stroke-dashoffset`, qui passent au compositeur.
 * 4. Un seul rythme. Lenis tourne dans le ticker de GSAP, jamais dans sa propre
 *    boucle : deux boucles concurrentes font dériver les repères et sauter les
 *    sections figées.
 */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, SplitText);

const DOUX = 'power3.out';
const racine = document.documentElement;

/*
  Les cibles se lisent depuis les classes de la planche plutôt que depuis des
  attributs semés page par page. Un titre nouveau est animé sans qu'on ait à y
  penser, et le balisage reste lisible.
*/
const TITRES = '.nom-ouvrage, .titre-planche';
const FILETS = '.ligne-cote, .trait';

/* ------------------------------------------------------------------ *
 * Défilement fluide
 * ------------------------------------------------------------------ */

function defilementFluide() {
  const lenis = new Lenis({ duration: 1.05, smoothWheel: true });

  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((temps) => lenis.raf(temps * 1000));
  gsap.ticker.lagSmoothing(0);

  // Les ancres passent par Lenis, sinon le saut natif se bat avec le lissage.
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (!id || id.length < 2) return;
      const cible = document.querySelector(id);
      if (!cible) return;
      e.preventDefault();
      lenis.scrollTo(cible as HTMLElement, { offset: -96 });
    });
  });
}

/* ------------------------------------------------------------------ *
 * Titres : le mot se pose, il ne se fond pas
 * ------------------------------------------------------------------ */

function titres() {
  document.querySelectorAll<HTMLElement>(TITRES).forEach((titre) => {
    const auChargement = titre.classList.contains('nom-ouvrage');
    const repere = auChargement
      ? undefined
      : ({ trigger: titre, start: 'top 86%', once: true } as const);

    titre.style.opacity = '1';

    /*
      SplitText pose un `aria-label` sur l'élément découpé, pour que le lecteur
      d'écran entende la phrase entière plutôt que ses mots. Cet attribut est
      interdit sur un `<p>`, qui n'a pas de rôle. Les phrases qui ne sont pas
      des titres se lèvent donc d'un bloc, sans découpe.
    */
    if (!/^H[1-6]$/.test(titre.tagName)) {
      gsap.from(titre, {
        y: 26,
        opacity: 0,
        duration: 0.8,
        ease: DOUX,
        scrollTrigger: repere,
        onComplete: () => {
          titre.style.opacity = '1';
        },
      });
      return;
    }

    // `mask` enferme chaque mot dans sa fenêtre : le mot monte depuis sa propre
    // ligne de base au lieu de traverser le titre voisin.
    const coupe = new SplitText(titre, { type: 'words', mask: 'words', wordsClass: 'mot' });

    gsap.from(coupe.words, {
      yPercent: 108,
      duration: 0.82,
      ease: DOUX,
      stagger: 0.045,
      delay: auChargement ? 0.12 : 0,
      scrollTrigger: repere,
      onComplete: () => {
        // Le découpage est rendu au titre, mais l'opacité reste forcée : la
        // feuille de style le cacherait de nouveau dès qu'on la relâche.
        coupe.revert();
        titre.style.opacity = '1';
      },
    });
  });
}

/* ------------------------------------------------------------------ *
 * Filets : ils se tracent depuis leur origine
 * ------------------------------------------------------------------ */

function filets() {
  gsap.utils.toArray<HTMLElement>(FILETS).forEach((trait) => {
    gsap.from(trait, {
      scaleX: 0,
      duration: 0.9,
      ease: 'power2.inOut',
      scrollTrigger: { trigger: trait, start: 'top 92%', once: true },
    });
  });
}

/* ------------------------------------------------------------------ *
 * Pictogrammes : le tracé se dessine, comme au crayon
 * ------------------------------------------------------------------ */

function pictogrammes() {
  gsap.utils.toArray<SVGSVGElement>('[data-picto]').forEach((svg) => {
    const traces = Array.from(
      svg.querySelectorAll<SVGGeometryElement>('path, circle, rect')
    );
    if (!traces.length) return;

    ScrollTrigger.create({
      trigger: svg,
      start: 'top 90%',
      once: true,
      onEnter: () => {
        /*
          `getTotalLength()` force un calcul de mise en page. Mesurer les
          dix-sept pictos au démarrage, c'est une centaine de calculs forcés
          avant la première image : 100 ms de blocage mesurés. La mesure se
          fait donc à l'entrée du picto, un seul à la fois.
        */
        const longueurs = traces.map((t) => {
          try {
            return t.getTotalLength() || 0;
          } catch {
            return 0;
          }
        });
        if (longueurs.every((l) => l === 0)) {
          svg.style.opacity = '1';
          return;
        }
        traces.forEach((t, i) => {
          if (!longueurs[i]) return;
          gsap.set(t, { strokeDasharray: longueurs[i], strokeDashoffset: longueurs[i] });
        });
        svg.style.opacity = '1';

        gsap.to(traces, {
          strokeDashoffset: 0,
          duration: 0.72,
          ease: 'power2.inOut',
          stagger: 0.055,
          // Le dasharray retiré à la fin : sinon un redimensionnement le fige.
          onComplete: () => gsap.set(traces, { clearProps: 'strokeDasharray,strokeDashoffset' }),
        });
      },
    });
  });
}

/* ------------------------------------------------------------------ *
 * Rangées : elles montent par paquets, dans l'ordre de lecture
 * ------------------------------------------------------------------ */

function rangees() {
  ScrollTrigger.batch('[data-rangee]', {
    start: 'top 88%',
    once: true,
    interval: 0.08,
    batchMax: 5,
    onEnter: (lot) =>
      gsap.to(lot, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: DOUX,
        stagger: 0.075,
        overwrite: true,
      }),
  });
}

/* ------------------------------------------------------------------ *
 * Cotes chiffrées : elles s'incrémentent
 * ------------------------------------------------------------------ */

function compteurs() {
  const format = new Intl.NumberFormat('fr-FR');

  gsap.utils.toArray<HTMLElement>('[data-compteur]').forEach((cote) => {
    const brut = cote.textContent ?? '';
    // Un nombre français : chiffres, espaces fines ou insécables entre groupes.
    const trouve = brut.match(/\d[\d\s\u00a0\u202f]*/);
    if (!trouve) return;

    const cible = Number(trouve[0].replace(/[\s\u00a0\u202f]/g, ''));
    if (!Number.isFinite(cible) || cible === 0) return;

    // Le quantificateur avale l'espace qui sépare le nombre de son unité.
    // On le rend au suffixe, sinon « 500 000 € » se compte en « 428 609€ ».
    const nombre = trouve[0].replace(/[\s\u00a0\u202f]+$/, '');
    const avant = brut.slice(0, trouve.index);
    const apres = brut.slice((trouve.index ?? 0) + nombre.length);
    const etat = { v: 0 };

    ScrollTrigger.create({
      trigger: cote,
      start: 'top 92%',
      once: true,
      onEnter: () => {
        gsap.to(etat, {
          v: cible,
          duration: cible > 999 ? 1.5 : 1,
          ease: 'power2.out',
          onUpdate: () => {
            cote.textContent = avant + format.format(Math.round(etat.v)) + apres;
          },
          onComplete: () => {
            cote.textContent = brut;
          },
        });
      },
    });
  });
}

/* ------------------------------------------------------------------ *
 * Photographies : la vue glisse moins vite que la page
 * ------------------------------------------------------------------ */

function parallaxe() {
  gsap.utils.toArray<HTMLElement>('[data-parallaxe]').forEach((image) => {
    const cadre = image.parentElement;
    if (!cadre) return;
    gsap.fromTo(
      image,
      { yPercent: -8 },
      {
        yPercent: 8,
        ease: 'none',
        scrollTrigger: { trigger: cadre, start: 'top bottom', end: 'bottom top', scrub: true },
      }
    );
  });
}

/* ------------------------------------------------------------------ *
 * Bandeau : il s'efface en descendant, il revient en remontant
 * ------------------------------------------------------------------ */

function bandeau() {
  const entete = document.querySelector<HTMLElement>('header');
  if (!entete) return;

  const cacher = gsap.to(entete, {
    yPercent: -100,
    duration: 0.38,
    ease: 'power2.inOut',
    paused: true,
  });

  ScrollTrigger.create({
    start: 'top -180',
    end: 99999,
    onUpdate: (self) => {
      // Un menu ouvert reste visible, quel que soit le sens du défilement.
      if (entete.dataset.ouvert === 'oui') return cacher.reverse();
      self.direction === 1 ? cacher.play() : cacher.reverse();
    },
  });
}

/* ------------------------------------------------------------------ *
 * La bande d'encre se fige, et son propos se pose pendant l'arrêt
 * ------------------------------------------------------------------ */

function bandeFigee(mm: gsap.MatchMedia) {
  mm.add('(min-width: 768px)', () => {
    const bande = document.querySelector<HTMLElement>('[data-fige]');
    if (!bande) return;
    const contenu = bande.querySelector<HTMLElement>('[data-fige-contenu]');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: bande,
        start: 'top top',
        end: '+=62%',
        pin: true,
        pinSpacing: true,
        scrub: 0.6,
        anticipatePin: 1,
      },
    });

    const fond = bande.querySelector<HTMLElement>('[data-fige-fond]');
    if (fond) tl.fromTo(fond, { scale: 1.06 }, { scale: 1, ease: 'none' }, 0);
    if (contenu) tl.fromTo(contenu, { yPercent: 14 }, { yPercent: -6, ease: 'none' }, 0);
  });
}

/* ------------------------------------------------------------------ *
 * Mise en route
 * ------------------------------------------------------------------ */

function demarrer() {
  // Le script a pris la main : la feuille de style peut cacher ce qu'elle doit.
  racine.classList.add('anime');
  const mm = gsap.matchMedia();

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    defilementFluide();
    titres();
    filets();
    pictogrammes();
    rangees();
    compteurs();
    parallaxe();
    bandeau();
  });

  bandeFigee(mm);

  // Les photographies arrivent après le premier calcul : sans ce recalage, les
  // repères d'une page longue se décalent de la hauteur des images.
  const images = Array.from(document.images).filter((i) => !i.complete);
  if (images.length) {
    Promise.all(images.map((i) => i.decode().catch(() => undefined))).then(() =>
      ScrollTrigger.refresh()
    );
  }
  window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
}

// Les polices décident de la hauteur des lignes, donc des repères de scroll.
if (document.fonts?.ready) {
  document.fonts.ready.then(demarrer);
} else {
  demarrer();
}
