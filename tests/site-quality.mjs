import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const pages = {
  esHome: 'dist/index.html',
  enHome: 'dist/en/index.html',
  esProjects: 'dist/proyectos/index.html',
  enProjects: 'dist/en/projects/index.html',
  esMethod: 'dist/como-construimos/index.html',
  enMethod: 'dist/en/how-we-build/index.html',
  esContact: 'dist/contacto/index.html',
  enContact: 'dist/en/contact/index.html',
  esRescue: 'dist/rescate-de-proyectos/index.html',
  enRescue: 'dist/en/project-rescue/index.html',
  esTrademark: 'dist/marca/index.html',
  enTrademark: 'dist/en/trademark/index.html',
};

const html = Object.fromEntries(
  Object.entries(pages).map(([name, file]) => [name, readFileSync(join(root, file), 'utf8')])
);
const all = Object.values(html).join('\n');
const css = readdirSync(join(root, 'dist/_astro'))
  .filter((file) => file.endsWith('.css'))
  .map((file) => readFileSync(join(root, 'dist/_astro', file), 'utf8'))
  .join('\n');
const rawCss = readFileSync(join(root, 'src/styles/global.css'), 'utf8');
const layoutSource = readFileSync(join(root, 'src/layouts/Layout.astro'), 'utf8');
const failures = [];

function check(name, fn) {
  try {
    fn();
    console.log(`✓ ${name}`);
  } catch (error) {
    failures.push(`${name}: ${error.message}`);
    console.error(`✗ ${name}`);
  }
}

function count(source, pattern) {
  return [...source.matchAll(pattern)].length;
}

function assertBefore(source, first, second, message) {
  const firstIndex = source.indexOf(first);
  const secondIndex = source.indexOf(second);
  assert.ok(firstIndex >= 0, `missing first marker: ${first}`);
  assert.ok(secondIndex >= 0, `missing second marker: ${second}`);
  assert.ok(firstIndex < secondIndex, message);
}

function hasHref(source, href) {
  const serialized = href.replaceAll('&', '&amp;');
  return source.includes(`href="${href}"`) || source.includes(`href="${serialized}"`);
}

check('every public page has exactly one h1', () => {
  for (const [name, source] of Object.entries(html)) {
    assert.equal(count(source, /<h1\b/gi), 1, `${name} has ${count(source, /<h1\b/gi)} h1 elements`);
  }
});

check('booking CTAs use the direct Cal.com event URL', () => {
  const expected = 'https://cal.com/krlz.dev/30min?user=krlz.dev&layout=mobile&overlayCalendar=true';
  assert.ok(hasHref(html.esHome, expected), 'Spanish home does not link a CTA to the direct booking URL');
  assert.ok(hasHref(html.enHome, expected), 'English home does not link a CTA to the direct booking URL');
});

check('homepage separates the free fit call from the paid rescue review', () => {
  assert.ok(html.esHome.includes('Agenda una conversación inicial de 30 min'), 'Spanish hero does not name the free introductory call');
  assert.ok(html.enHome.includes('Book a 30-minute introductory call'), 'English hero does not name the free introductory call');
  assert.ok(!html.esHome.includes('Agenda un diagnóstico'), 'Spanish free call is still mislabeled as a diagnostic');
  assert.ok(!html.enHome.includes('Book a diagnostic'), 'English free call is still mislabeled as a diagnostic');
  assert.ok(html.esHome.includes('diagnóstico de rescate de 2 semanas'), 'Spanish hero does not distinguish the paid rescue diagnostic');
  assert.ok(html.enHome.includes('two-week rescue diagnostic'), 'English hero does not distinguish the paid rescue diagnostic');
});

check('commercial decision path precedes technical due diligence', () => {
  for (const [name, source] of Object.entries({ esHome: html.esHome, enHome: html.enHome })) {
    assertBefore(source, 'id="plans"', 'id="proof"', `${name} shows technical proof before the offer`);
    assertBefore(source, 'class="buyer-control"', 'id="proof"', `${name} hides buyer-control terms after technical proof`);
  }
});

check('offer ladder starts with rescue and exposes bounded risk', () => {
  assert.ok(html.esHome.includes('Diagnóstico de Rescate'), 'Spanish first offer is not the rescue diagnostic');
  assert.ok(html.enHome.includes('Rescue Diagnostic'), 'English first offer is not the rescue diagnostic');
  assert.ok(html.esHome.includes('el precio del diagnóstico se descuenta'), 'Spanish rescue fee credit is missing');
  assert.ok(html.enHome.includes('the diagnostic fee is credited'), 'English rescue fee credit is missing');
  for (const [name, source] of Object.entries({ esHome: html.esHome, enHome: html.enHome })) {
    assert.ok(source.includes('class="buyer-control"'), `${name} has no visible procurement trust summary`);
    assert.ok(source.includes('class="proof__cta"'), `${name} diagrams do not return technical interest to a founder conversation`);
  }
});

check('GA4 tracks calendar, WhatsApp, and email CTA channels', () => {
  for (const token of ['cal.com', 'calendar', 'whatsapp_click', 'email_click', 'book_call_click']) {
    assert.ok(all.includes(token), `missing analytics token: ${token}`);
  }
});

check('contact pages are linked internally from each homepage', () => {
  assert.ok(html.esHome.includes('href="/contacto/"'), 'Spanish contact route has no home inlink');
  assert.ok(html.enHome.includes('href="/en/contact/"'), 'English contact route has no home inlink');
});

check('founder proof is specific, bilingual, and cannot imply client endorsement', () => {
  for (const [name, source] of Object.entries({ esHome: html.esHome, enHome: html.enHome })) {
    assert.ok(source.includes('class="proof"'), `${name} has no founder-proof section`);
    for (const claim of ['14+', '4+', 'Tracktec', 'Portavita', 'Acronis', 'Previsible', 'kit-a', 'ZooMinder', 'eConstitucional']) {
      assert.ok(source.includes(claim), `${name} is missing verified proof: ${claim}`);
    }
  }
  assert.ok(html.esHome.includes('no son clientes de codiva'), 'Spanish proof does not distinguish employment from clients');
  assert.ok(html.enHome.includes('not codiva clients'), 'English proof does not distinguish employment from clients');
  assert.ok(html.esHome.includes('No son trabajos para clientes'), 'Spanish founder products are not distinguished from client work');
  assert.ok(html.enHome.includes('They are not client engagements'), 'English founder products are not distinguished from client work');
  for (const claim of ['Millions', 'Millones', 'app stores reached', 'tiendas con lanzamientos']) {
    assert.ok(!html.esHome.includes(claim) && !html.enHome.includes(claim), `unsupported quantified proof remains: ${claim}`);
  }
});

check('both founders have direct portfolio and LinkedIn references', () => {
  for (const source of [html.esHome, html.enHome]) {
    assert.ok(source.includes('href="https://krlz.dev/"'), 'Carlos portfolio link is missing');
    assert.ok(source.includes('href="https://www.linkedin.com/in/devcarlos/"'), 'Carlos LinkedIn link is missing');
    assert.ok(source.includes('href="https://maryaleks.dev/"'), 'Marina portfolio link is missing');
    assert.ok(source.includes('href="https://www.linkedin.com/in/marina-alekseeva-a190591b5/"'), 'Marina LinkedIn link is missing');
  }
});

check('engineering proof uses accessible architecture diagrams instead of decorative graphics', () => {
  for (const [name, source] of Object.entries({ esHome: html.esHome, enHome: html.enHome })) {
    for (const diagram of ['cloud-event-system', 'clean-architecture', 'production-path']) {
      assert.ok(source.includes(`data-diagram="${diagram}"`), `${name} is missing ${diagram}`);
    }
    assert.ok(count(source, /class="proof-diagram__title"/g) >= 3, `${name} diagrams have no accessible titles`);
    assert.ok(source.includes('class="proof-diagram__scrollhint"'), `${name} mobile diagrams have no horizontal-scroll cue`);
    assert.ok(source.includes('class="proof__diagrams" role="group"'), `${name} diagram collection is not a named group`);
    assert.equal(count(source, /<article\b[^>]*data-diagram="[^"]+"[^>]*tabindex="0"/g), 3, `${name} diagram scroll regions are not keyboard focusable`);
  }
  assert.ok(css.includes('.proof-diagram__flow'), 'generated CSS has no animated architecture flow');
  assert.ok(css.includes('.proof-diagram:focus-visible'), 'keyboard-focusable diagrams have no visible focus treatment');
  assert.match(css, /@media\s*\(prefers-reduced-motion:\s*reduce\)/, 'diagram motion ignores reduced-motion preferences');
});

check('technical diagram labels are localized', () => {
  for (const leaked of ['bounded jobs', 'events · replay', '>source<', '>archive<']) {
    assert.ok(!html.esHome.includes(leaked), `English diagram label leaked into Spanish: ${leaked}`);
  }
  for (const localized of ['trabajos acotados', 'eventos · replay', '>origen<', '>archivo<']) {
    assert.ok(html.esHome.includes(localized), `Spanish diagram label is missing: ${localized}`);
  }
});

check('methodology pages make Agile delivery and Scrum rituals concrete', () => {
  for (const [name, source] of [['Spanish', html.esMethod], ['English', html.enMethod]]) {
    assert.ok(source.includes('id="agile-delivery"'), `${name} methodology has no Agile delivery section`);
    assert.ok(source.includes('data-agile-diagram="sprint-loop"'), `${name} methodology has no sprint loop`);
    assert.ok(source.includes('class="agile-rituals"'), `${name} methodology has no ritual cadence`);
    assertBefore(source, 'id="discovery"', 'id="agile-delivery"', `${name} Agile delivery must follow discovery`);
    assertBefore(source, 'id="agile-delivery"', 'id="spec"', `${name} Agile delivery must precede specification`);
  }

  for (const copy of ['Planificación del sprint', 'Refinamiento', 'Revisión con el cliente', 'Retrospectiva', 'Scrum cuando ayuda', 'Amor por el cliente', 'Sin sorpresas']) {
    assert.ok(html.esMethod.includes(copy), `Spanish Agile proof is missing: ${copy}`);
  }
  for (const copy of ['Sprint planning', 'Refinement', 'Client review', 'Retrospective', 'Scrum when it helps', 'Client love', 'No surprises']) {
    assert.ok(html.enMethod.includes(copy), `English Agile proof is missing: ${copy}`);
  }
});

check('Agile methodology keeps the client inside the delivery loop', () => {
  assert.ok(html.esMethod.includes('software funcionando'), 'Spanish methodology does not promise working-software reviews');
  assert.ok(html.enMethod.includes('working software'), 'English methodology does not promise working-software reviews');
  for (const source of [html.esMethod, html.enMethod]) {
    assert.ok(source.includes('aria-labelledby="agile-heading"'), 'Agile section has no accessible heading relationship');
    assert.equal(count(source, /class="agile-loop__step"/g), 5, 'Sprint loop must expose five understandable steps');
    assert.ok(source.includes('class="agile-loop" role="list"'), 'Sprint loop loses explicit list semantics');
    assert.ok(source.includes('class="agile-rituals" role="list"'), 'Ritual cadence loses explicit list semantics');
    assert.ok(source.includes('class="agile-care__grid" role="list"'), 'Client-care commitments lose explicit list semantics');
  }
  assert.ok(rawCss.includes('@keyframes agile-pulse'), 'Sprint loop has no visual heartbeat');
  assert.match(rawCss, /@media \(prefers-reduced-motion: reduce\)[\s\S]*?\.agile-loop__arrow/, 'Agile heartbeat ignores reduced motion');
  assert.ok(
    rawCss.lastIndexOf('@media (prefers-reduced-motion: reduce)') > rawCss.lastIndexOf('@keyframes agile-pulse'),
    'Agile reduced-motion override loses the CSS cascade'
  );
});

check('reduced motion disables reveal, marquee, and smooth-anchor movement', () => {
  assert.match(rawCss, /@media \(prefers-reduced-motion: reduce\)[\s\S]*?\[data-animate/, 'reveal transitions remain under reduced motion');
  assert.match(rawCss, /@media \(prefers-reduced-motion: reduce\)[\s\S]*?\.marquee__track/, 'marquee motion remains under reduced motion');
  assert.ok(layoutSource.includes("matchMedia('(prefers-reduced-motion: reduce)')"), 'interaction script does not detect reduced motion');
  assert.ok(layoutSource.includes("behavior: reduceMotion ? 'auto' : 'smooth'"), 'anchor navigation always scrolls smoothly');
});

check('English contact routes offer WhatsApp as promised', () => {
  assert.ok(html.enHome.includes('wa.me/56957173936'), 'English home has no WhatsApp CTA');
  assert.ok(html.enContact.includes('wa.me/56957173936'), 'English contact page has no WhatsApp CTA');
});

check('navigation uses native semantics instead of incomplete ARIA menus', () => {
  assert.ok(!all.includes('role="menubar"'), 'role=menubar remains');
  assert.ok(!all.includes('role="menuitem"'), 'role=menuitem remains');
});

check('every page includes a keyboard skip link and main target', () => {
  for (const [name, source] of Object.entries(html)) {
    assert.ok(source.includes('class="skip-link"'), `${name} has no skip link`);
    assert.ok(source.includes('id="main-content"'), `${name} has no main-content target`);
  }
});

check('skip links and method introductions have production styling', () => {
  assert.ok(css.includes('.skip-link'), 'generated CSS has no skip-link styles');
  assert.ok(css.includes('.skip-link:focus'), 'skip link has no visible focus state');
  assert.ok(css.includes('.method-hero'), 'generated CSS has no method-hero styles');
  assert.match(rawCss, /\.hero__cta-note\s*\{[^}]*color:\s*var\(--color-text-muted\)/s, 'hero fit-call explanation is too faint');
});

check('English project title is not double escaped', () => {
  assert.ok(!html.enProjects.includes('&amp;amp;'), 'English title contains &amp;amp;');
  assert.ok(html.enProjects.includes('Apps &amp; Platforms'), 'English title does not render a normal ampersand');
});

check('English portfolio image alts are localized', () => {
  const imageAlts = [...html.enProjects.matchAll(/<img\b[^>]*\balt="([^"]*)"/gi)].map((match) => match[1]);
  assert.ok(imageAlts.some((alt) => alt.includes('screenshot')), 'English project image alts do not say screenshot');
  assert.ok(imageAlts.every((alt) => !alt.includes('captura de pantalla')), 'Spanish alt text leaked into English image alts');
});

check('meta descriptions remain concise', () => {
  for (const [name, source] of Object.entries(html)) {
    const description = source.match(/<meta name="description" content="([^"]*)"/i)?.[1] ?? '';
    assert.ok(description.length > 50, `${name} meta description is missing or too short`);
    assert.ok(description.length <= 160, `${name} meta description is ${description.length} characters`);
  }
});

check('internal route links use canonical trailing slashes', () => {
  for (const [name, source] of Object.entries(html)) {
    for (const [, href] of source.matchAll(/href="(\/[^"]*)"/g)) {
      if (href === '/' || href.startsWith('/#') || /\.[a-z0-9]+(?:\?|$)/i.test(href)) continue;
      const pathname = href.split('#', 1)[0];
      assert.ok(pathname.endsWith('/'), `${name} has slashless route: ${href}`);
    }
  }
});

if (failures.length) {
  console.error(`\n${failures.length} quality check(s) failed:`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`\nAll ${Object.keys(pages).length} generated pages passed the site quality checks.`);
