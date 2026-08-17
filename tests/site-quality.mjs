import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'parse5';

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
  esDataCase: 'dist/proyectos/pipeline-datos/index.html',
  enDataCase: 'dist/en/projects/data-pipeline/index.html',
  esFhirCase: 'dist/proyectos/interoperabilidad-fhir/index.html',
  enFhirCase: 'dist/en/projects/fhir-interoperability/index.html',
  esKnowledge: 'dist/conocimiento/index.html',
  enKnowledge: 'dist/en/knowledge/index.html',
  esIot: 'dist/conocimiento/ingesta-iot/index.html',
  enIot: 'dist/en/knowledge/iot-ingestion/index.html',
  esNominatim: 'dist/conocimiento/nominatim-geocodificacion/index.html',
  enNominatim: 'dist/en/knowledge/nominatim-geocoding/index.html',
  esIntegrations: 'dist/conocimiento/integraciones-postgresql/index.html',
  enIntegrations: 'dist/en/knowledge/integrations-postgresql/index.html',
  esAgentic: 'dist/conocimiento/ingenieria-software-agentica/index.html',
  enAgentic: 'dist/en/knowledge/agentic-software-engineering/index.html',
  esMythicalManMonth: 'dist/conocimiento/el-mitico-hombre-mes/index.html',
  enMythicalManMonth: 'dist/en/knowledge/the-mythical-man-month/index.html',
  esB2bService: 'dist/servicios/desarrollo-software-b2b/index.html',
  enB2bService: 'dist/en/services/b2b-software-development/index.html',
  esModernizationService: 'dist/servicios/modernizacion-aplicaciones-legacy/index.html',
  enModernizationService: 'dist/en/services/legacy-application-modernization/index.html',
  esDataService: 'dist/servicios/ingenieria-datos-integraciones/index.html',
  enDataService: 'dist/en/services/data-engineering-integrations/index.html',
};

const html = Object.fromEntries(
  Object.entries(pages).map(([name, file]) => {
    const path = join(root, file);
    return [name, existsSync(path) ? readFileSync(path, 'utf8') : ''];
  })
);
const all = Object.values(html).join('\n');
const css = readdirSync(join(root, 'dist/_astro'))
  .filter((file) => file.endsWith('.css'))
  .map((file) => readFileSync(join(root, 'dist/_astro', file), 'utf8'))
  .join('\n');
const rawCss = readFileSync(join(root, 'src/styles/global.css'), 'utf8');
const layoutSource = readFileSync(join(root, 'src/layouts/Layout.astro'), 'utf8');
const llmsText = readFileSync(join(root, 'public/llms.txt'), 'utf8');
const sitemapText = readFileSync(join(root, 'public/sitemap.xml'), 'utf8');
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
  assert.ok(html.esHome.includes('Conversemos sobre tu sistema'), 'Spanish hero does not invite a system-focused fit call');
  assert.ok(html.enHome.includes('Discuss your system with us'), 'English hero does not invite a system-focused fit call');
  assert.ok(!html.esHome.includes('Agenda un diagnóstico'), 'Spanish free call is still mislabeled as a diagnostic');
  assert.ok(!html.enHome.includes('Book a diagnostic'), 'English free call is still mislabeled as a diagnostic');
  assert.ok(html.esHome.includes('diagnóstico de rescate de 2 semanas'), 'Spanish hero does not distinguish the paid rescue diagnostic');
  assert.ok(html.enHome.includes('two-week rescue diagnostic'), 'English hero does not distinguish the paid rescue diagnostic');
});

check('homepage positions Codiva around building and modernizing critical B2B software', () => {
  assert.ok(
    html.esHome.includes('Construimos y modernizamos el software que mueve tu operación.'),
    'Spanish hero still defines Codiva primarily through rescue'
  );
  assert.ok(
    html.enHome.includes('We build and modernize the software that runs your operations.'),
    'English hero still defines Codiva primarily through rescue'
  );
  assert.ok(html.esHome.includes('Software B2B crítico · datos · integraciones'), 'Spanish positioning eyebrow is missing');
  assert.ok(html.enHome.includes('Business-critical B2B software · data · integrations'), 'English positioning eyebrow is missing');
});

check('homepage presents three focused commercial lines before the rescue entry point', () => {
  for (const [name, source] of Object.entries({ esHome: html.esHome, enHome: html.enHome })) {
    assert.ok(source.includes('class="commercial-lines"'), `${name} has no focused commercial lines`);
    assert.equal(count(source, /class="commercial-line"/g), 3, `${name} must present exactly three commercial lines`);
    assertBefore(source, 'class="commercial-lines"', 'id="plans"', `${name} lets the rescue entry point dominate before the full offer is visible`);
  }
  for (const copy of ['Construir y evolucionar', 'Modernizar y rescatar', 'Datos e integraciones']) {
    assert.ok(html.esHome.includes(copy), `Spanish commercial line is missing: ${copy}`);
  }
  for (const copy of ['Build and evolve', 'Modernize and rescue', 'Data and integrations']) {
    assert.ok(html.enHome.includes(copy), `English commercial line is missing: ${copy}`);
  }
});

check('visible service FAQ matches the three-line offer in both locales', () => {
  const attributes = (node) => Object.fromEntries((node.attrs ?? []).map(({ name, value }) => [name, value]));
  const hasClass = (node, name) => (attributes(node).class ?? '').split(/\s+/).includes(name);
  const isHidden = (node) => {
    const attrs = attributes(node);
    return ['template', 'script', 'style'].includes(node.nodeName)
      || 'hidden' in attrs
      || (node.tagName === 'input' && attrs.type === 'hidden')
      || (attrs['aria-hidden'] ?? '').toLowerCase() === 'true'
      || /(?:display\s*:\s*none|visibility\s*:\s*hidden)/i.test(attrs.style ?? '');
  };
  const visibleChildren = (node) => (node.childNodes ?? []).filter((child) => !isHidden(child));
  const descendants = (node) => visibleChildren(node).flatMap((child) => [child, ...descendants(child)]);
  const visibleText = (node) => {
    if (node.nodeName === '#text') return node.value;
    return visibleChildren(node).map(visibleText).join(' ');
  };
  const normalize = (text) => text.replace(/\s+/g, ' ').trim();

  const serviceAnswer = (source, question) => {
    const document = parse(source);
    const faqSection = descendants(document).find((node) => node.tagName === 'section'
      && attributes(node).id === 'faq'
      && hasClass(node, 'faq'));
    assert.ok(faqSection, 'visible FAQ section is missing');
    const item = descendants(faqSection).find((node) => {
      if (node.tagName !== 'details' || !hasClass(node, 'faq__item')) return false;
      const summary = visibleChildren(node).find((child) => child.tagName === 'summary' && hasClass(child, 'faq__question'));
      return summary && normalize(visibleText(summary)) === question;
    });
    assert.ok(item, `visible service FAQ question is missing: ${question}`);
    const answer = visibleChildren(item).find((child) => child.tagName === 'div' && hasClass(child, 'faq__answer'));
    assert.ok(answer, `visible service FAQ answer is missing: ${question}`);
    const answerElements = visibleChildren(answer).filter((child) => child.tagName);
    assert.equal(answerElements.length, 1, `visible service FAQ answer must contain exactly one paragraph: ${question}`);
    const [paragraph] = answerElements;
    assert.equal(paragraph.tagName, 'p', `visible service FAQ answer must use a paragraph: ${question}`);
    const paragraphContent = visibleChildren(paragraph);
    assert.ok(paragraphContent.length > 0, `visible service FAQ paragraph is empty: ${question}`);
    assert.ok(
      paragraphContent.every((child) => child.nodeName === '#text'),
      `visible service FAQ paragraph must contain direct visible text only: ${question}`,
    );
    return normalize(paragraphContent.map((child) => child.value).join(' '));
  };

  assert.equal(
    serviceAnswer(html.esHome, '¿Qué servicios ofrece codiva?'),
    'Tres líneas: Construir y evolucionar productos B2B, plataformas internas y nuevos módulos; Modernizar y rescatar sistemas heredados o difíciles de cambiar; y Datos e integraciones para pipelines, APIs, interoperabilidad y rendimiento de datos.',
  );
  assert.equal(
    serviceAnswer(html.enHome, 'What services does codiva offer?'),
    'Three lines: Build and evolve B2B products, internal platforms, and new modules; Modernize and rescue inherited or difficult-to-change systems; and Data and integrations for pipelines, APIs, interoperability, and data performance.',
  );
});

check('homepage metadata and structured data match the critical-software position', () => {
  assert.ok(html.esHome.includes('software B2B'), 'Spanish metadata does not mention B2B software');
  assert.ok(html.esHome.includes('integraciones'), 'Spanish metadata does not mention integrations');
  assert.ok(html.enHome.includes('B2B software'), 'English metadata does not mention B2B software');
  assert.ok(html.enHome.includes('integrations'), 'English metadata does not mention integrations');
  assert.ok(!html.esHome.includes('especializada en diseño y desarrollo de páginas web'), 'Spanish organization schema still positions Codiva as a website studio');
  assert.ok(!html.esHome.includes('Estudio de diseño y desarrollo de páginas web'), 'Spanish professional-service schema still positions Codiva as a website studio');
});

check('global acquisition pages do not emit Chile-only targeting signals', () => {
  for (const [name, source] of Object.entries({
    esHome: html.esHome,
    enHome: html.enHome,
    esRescue: html.esRescue,
    enRescue: html.enRescue,
  })) {
    assert.ok(!source.includes('name="geo.region"'), `${name} still emits a Chile geo meta tag`);
    assert.ok(!source.includes('"areaServed":{"@type":"Country","name":"Chile"}'), `${name} still limits areaServed to Chile`);
  }
  assert.ok(!/<title>[^<]*\ben Chile\b/i.test(html.esHome), 'Spanish home title remains Chile-first');
  assert.ok(html.esHome.includes('<link rel="alternate" hreflang="x-default" href="https://codiva.cl/en/">'), 'Spanish home x-default is not English');
  assert.ok(html.enHome.includes('<link rel="alternate" hreflang="x-default" href="https://codiva.cl/en/">'), 'English home x-default is not English');
  assert.ok(html.esHome.includes('Ñuñoa'), 'Spanish home lost the truthful Santiago business address');
  assert.ok(html.enHome.includes('Ñuñoa'), 'English home lost the truthful Santiago business address');
});

check('bilingual service pillars own distinct commercial search intents', () => {
  const pillars = [
    [html.esB2bService, 'Desarrollo de software B2B | codiva®', 'Software B2B construido para operaciones complejas'],
    [html.enB2bService, 'B2B software development services | codiva®', 'Build B2B software that can carry real operations'],
    [html.esModernizationService, 'Modernización de aplicaciones legacy | codiva®', 'Moderniza software heredado sin detener la operación'],
    [html.enModernizationService, 'Legacy application modernization services | codiva®', 'Modernize inherited software without stopping the business'],
    [html.esDataService, 'Ingeniería de datos e integraciones | codiva®', 'Haz que tus datos operativos sean confiables, conectados y recuperables'],
    [html.enDataService, 'Data engineering and integration consulting | codiva®', 'Make operational data reliable, connected, and recoverable'],
  ];
  for (const [source, title, h1] of pillars) {
    assert.ok(source.includes(`<title>${title}</title>`), `service page is missing title: ${title}`);
    assert.ok(source.includes(`<h1>${h1}</h1>`), `service page is missing h1: ${h1}`);
    assert.ok(source.includes('data-service-fit'), `${title} does not define fit`);
    assert.ok(source.includes('data-service-not-fit'), `${title} does not define non-fit`);
    assert.ok(source.includes('data-service-deliverables'), `${title} does not define deliverables`);
    const blocks = [...source.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((match) => JSON.parse(match[1]));
    const service = blocks.find((block) => block['@type'] === 'Service');
    assert.ok(service, `${title} has no Service schema`);
    assert.ok(!('areaServed' in service), `${title} invents geographic service coverage`);
  }
});

check('commercial and technical proof route authority to the service pillars', () => {
  const links = [
    [html.esHome, '/servicios/desarrollo-software-b2b/'],
    [html.esHome, '/servicios/modernizacion-aplicaciones-legacy/'],
    [html.esHome, '/servicios/ingenieria-datos-integraciones/'],
    [html.enHome, '/en/services/b2b-software-development/'],
    [html.enHome, '/en/services/legacy-application-modernization/'],
    [html.enHome, '/en/services/data-engineering-integrations/'],
    [html.esRescue, '/servicios/modernizacion-aplicaciones-legacy/'],
    [html.enRescue, '/en/services/legacy-application-modernization/'],
    [html.esDataCase, '/servicios/ingenieria-datos-integraciones/'],
    [html.enDataCase, '/en/services/data-engineering-integrations/'],
    [html.esIot, '/servicios/ingenieria-datos-integraciones/'],
    [html.enIot, '/en/services/data-engineering-integrations/'],
    [html.esIntegrations, '/servicios/ingenieria-datos-integraciones/'],
    [html.enIntegrations, '/en/services/data-engineering-integrations/'],
  ];
  for (const [source, href] of links) assert.ok(hasHref(source, href), `missing contextual service link: ${href}`);

  const routes = [
    '/servicios/desarrollo-software-b2b/', '/en/services/b2b-software-development/',
    '/servicios/modernizacion-aplicaciones-legacy/', '/en/services/legacy-application-modernization/',
    '/servicios/ingenieria-datos-integraciones/', '/en/services/data-engineering-integrations/',
  ];
  for (const route of routes) {
    assert.ok(sitemapText.includes(`<loc>https://codiva.cl${route}</loc>`), `sitemap.xml omits ${route}`);
    assert.ok(llmsText.includes(`https://codiva.cl${route}`), `llms.txt omits ${route}`);
  }
});

check('agentic engineering content pairs faster execution with stronger controls', () => {
  const pages = [
    [html.esAgentic, 'Ingeniería de software agéntica: velocidad con control | codiva®', 'La programación agéntica cambia la velocidad, no la responsabilidad', '/conocimiento/ingenieria-software-agentica/'],
    [html.enAgentic, 'Agentic software engineering: speed with control | codiva®', 'Agentic programming changes the speed, not the responsibility', '/en/knowledge/agentic-software-engineering/'],
  ];
  for (const [source, title, h1, route] of pages) {
    assert.ok(source.includes(`<title>${title}</title>`), `${route} is missing its search title`);
    assert.ok(source.includes(`<h1>${h1}</h1>`), `${route} is missing its thesis`);
    for (const control of ['data-agentic-control="specification"', 'data-agentic-control="tdd"', 'data-agentic-control="sandbox"', 'data-agentic-control="independent-review"', 'data-agentic-control="fail-closed"']) {
      assert.ok(source.includes(control), `${route} omits ${control}`);
    }
    assert.ok(source.includes('data-human-decision'), `${route} does not preserve human decisions`);
    assert.ok(source.includes('data-executed-evidence'), `${route} does not require executed evidence`);
    assert.ok(source.includes('knowledge-article__sections--agentic'), `${route} does not identify its five-control grid`);
  }
  assert.match(rawCss, /\.knowledge-article__sections--agentic\s*\{[^}]*grid-template-columns:\s*repeat\(6,/s);
  assert.match(rawCss, /\.knowledge-article__sections--agentic\s*>\s*:nth-child\(-n\+3\)\s*\{[^}]*grid-column:\s*span 2/s);
  assert.match(rawCss, /\.knowledge-article__sections--agentic\s*>\s*:nth-child\(n\+4\)\s*\{[^}]*grid-column:\s*span 3/s);
  assert.ok(hasHref(html.esKnowledge, '/conocimiento/ingenieria-software-agentica/'), 'Spanish Knowledge hub omits agentic engineering');
  assert.ok(hasHref(html.enKnowledge, '/en/knowledge/agentic-software-engineering/'), 'English Knowledge hub omits agentic engineering');
  assert.ok(hasHref(html.esB2bService, '/conocimiento/ingenieria-software-agentica/'), 'Spanish B2B service omits agentic engineering proof');
  assert.ok(hasHref(html.enB2bService, '/en/knowledge/agentic-software-engineering/'), 'English B2B service omits agentic engineering proof');
  assert.ok(sitemapText.includes('<loc>https://codiva.cl/conocimiento/ingenieria-software-agentica/</loc>'));
  assert.ok(sitemapText.includes('<loc>https://codiva.cl/en/knowledge/agentic-software-engineering/</loc>'));
  assert.ok(llmsText.includes('https://codiva.cl/conocimiento/ingenieria-software-agentica/'));
  assert.ok(llmsText.includes('https://codiva.cl/en/knowledge/agentic-software-engineering/'));
});

check('Mythical Man-Month reading note connects the book to company decisions', () => {
  const routes = [
    [
      html.esMythicalManMonth,
      'El mítico hombre-mes: resumen para empresas | codiva®',
      'Por qué recomendamos El mítico hombre-mes',
      '/conocimiento/el-mitico-hombre-mes/',
      '/en/knowledge/the-mythical-man-month/',
      'Agregar personas a un proyecto atrasado lo atrasa aún más',
      'Qué significa para una empresa',
    ],
    [
      html.enMythicalManMonth,
      'The Mythical Man-Month: a company reading note | codiva®',
      'Why we recommend The Mythical Man-Month',
      '/en/knowledge/the-mythical-man-month/',
      '/conocimiento/el-mitico-hombre-mes/',
      'Adding people to a late software project makes it later',
      'What it means for a company',
    ],
  ];

  for (const [source, title, h1, route, alternate, brooksLaw, companyMeaning] of routes) {
    assert.ok(source.includes(`<title>${title}</title>`), `${route} is missing its search title`);
    assert.ok(source.includes(`<h1>${h1}</h1>`), `${route} is missing its reading recommendation`);
    assert.ok(source.includes(brooksLaw), `${route} omits Brooks's Law`);
    assert.ok(source.includes(companyMeaning), `${route} omits the company-level interpretation`);
    assert.ok(source.includes('data-provenance="recommended-reading"'), `${route} misclassifies the reading note`);
    assert.ok(source.includes('Frederick P. Brooks Jr.'), `${route} omits the author`);
    assert.ok(source.includes('Anniversary Edition'), `${route} omits the recommended edition`);
    assert.ok(source.includes(`<link rel="canonical" href="https://codiva.cl${route}">`), `${route} has the wrong canonical`);
    assert.ok(source.includes(`href="https://codiva.cl${alternate}"`), `${route} has no reciprocal locale alternate`);
    const blocks = [...source.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((match) => JSON.parse(match[1]));
    assert.ok(blocks.some((block) => block['@type'] === 'Article'), `${route} has no Article schema`);
  }

  assert.ok(hasHref(html.esKnowledge, '/conocimiento/el-mitico-hombre-mes/'), 'Spanish Knowledge hub omits the reading note');
  assert.ok(hasHref(html.enKnowledge, '/en/knowledge/the-mythical-man-month/'), 'English Knowledge hub omits the reading note');
  assert.ok(html.esKnowledge.includes('data-provenance="recommended-reading"'), 'Spanish Knowledge hub misclassifies the reading note');
  assert.ok(html.enKnowledge.includes('data-provenance="recommended-reading"'), 'English Knowledge hub misclassifies the reading note');
  for (const route of ['/conocimiento/el-mitico-hombre-mes/', '/en/knowledge/the-mythical-man-month/']) {
    assert.ok(sitemapText.includes(`<loc>https://codiva.cl${route}</loc>`), `sitemap.xml omits ${route}`);
    assert.ok(llmsText.includes(`https://codiva.cl${route}`), `llms.txt omits ${route}`);
  }
});

check('every commercial subpage exposes full navigation and a locale switch', () => {
  for (const [name, source] of Object.entries({
    esProjects: html.esProjects,
    enProjects: html.enProjects,
    esMethod: html.esMethod,
    enMethod: html.enMethod,
    esContact: html.esContact,
    enContact: html.enContact,
    esRescue: html.esRescue,
    enRescue: html.enRescue,
  })) {
    assert.ok(source.includes('class="nav"'), `${name} has no global navigation`);
    assert.ok(source.includes('class="nav__lang"'), `${name} has no visible locale switch`);
  }
});

check('locale switches preserve the equivalent page instead of returning home', () => {
  const destinations = {
    esHome: '/en/', enHome: '/', esProjects: '/en/projects/', enProjects: '/proyectos/',
    esRescue: '/en/project-rescue/', enRescue: '/rescate-de-proyectos/', esMethod: '/en/how-we-build/', enMethod: '/como-construimos/',
    esContact: '/en/contact/', enContact: '/contacto/', esTrademark: '/en/trademark/', enTrademark: '/marca/',
    esDataCase: '/en/projects/data-pipeline/', enDataCase: '/proyectos/pipeline-datos/', esFhirCase: '/en/projects/fhir-interoperability/', enFhirCase: '/proyectos/interoperabilidad-fhir/',
    esKnowledge: '/en/knowledge/', enKnowledge: '/conocimiento/', esIot: '/en/knowledge/iot-ingestion/', enIot: '/conocimiento/ingesta-iot/',
    esNominatim: '/en/knowledge/nominatim-geocoding/', enNominatim: '/conocimiento/nominatim-geocodificacion/',
    esIntegrations: '/en/knowledge/integrations-postgresql/', enIntegrations: '/conocimiento/integraciones-postgresql/',
    esAgentic: '/en/knowledge/agentic-software-engineering/', enAgentic: '/conocimiento/ingenieria-software-agentica/',
    esMythicalManMonth: '/en/knowledge/the-mythical-man-month/', enMythicalManMonth: '/conocimiento/el-mitico-hombre-mes/',
    esB2bService: '/en/services/b2b-software-development/', enB2bService: '/servicios/desarrollo-software-b2b/',
    esModernizationService: '/en/services/legacy-application-modernization/', enModernizationService: '/servicios/modernizacion-aplicaciones-legacy/',
    esDataService: '/en/services/data-engineering-integrations/', enDataService: '/servicios/ingenieria-datos-integraciones/',
  };
  for (const [name, href] of Object.entries(destinations)) {
    assert.ok(html[name].includes(`<a href="${href}" class="nav__lang"`), `${name} locale switch does not target ${href}`);
  }
});

check('llms.txt reflects the current offer instead of the retired continuous partnership', () => {
  assert.ok(!llmsText.includes('Alianza Continua'), 'Spanish retired offer remains in llms.txt');
  assert.ok(!llmsText.includes('Continuous Partnership'), 'English retired offer remains in llms.txt');
  assert.ok(llmsText.includes('software B2B crítico'), 'llms.txt is missing the Spanish critical-software position');
  assert.ok(llmsText.includes('business-critical B2B software'), 'llms.txt is missing the English critical-software position');
});

check('llms.txt gives English leaf content and provenance full parity', () => {
  const routes = [
    '/en/', '/en/projects/', '/en/projects/data-pipeline/', '/en/projects/fhir-interoperability/',
    '/en/project-rescue/', '/en/how-we-build/', '/en/knowledge/', '/en/knowledge/iot-ingestion/',
    '/en/knowledge/nominatim-geocoding/', '/en/knowledge/integrations-postgresql/', '/en/contact/', '/en/trademark/',
  ];
  for (const route of routes) assert.ok(llmsText.includes(`https://codiva.cl${route}`), `llms.txt omits ${route}`);
  assert.ok(llmsText.includes('## Services'), 'llms.txt has no full English services section');
  assert.ok(llmsText.includes('## Evidence provenance'), 'llms.txt has no full English provenance section');
});

check('discovery files enumerate every new case and knowledge route', () => {
  const newPaths = [
    '/proyectos/pipeline-datos/',
    '/proyectos/interoperabilidad-fhir/',
    '/en/projects/data-pipeline/',
    '/en/projects/fhir-interoperability/',
    '/conocimiento/',
    '/conocimiento/ingesta-iot/',
    '/conocimiento/nominatim-geocodificacion/',
    '/conocimiento/integraciones-postgresql/',
    '/en/knowledge/',
    '/en/knowledge/iot-ingestion/',
    '/en/knowledge/nominatim-geocoding/',
    '/en/knowledge/integrations-postgresql/',
  ];
  for (const path of newPaths) {
    assert.ok(sitemapText.includes(`<loc>https://codiva.cl${path}</loc>`), `sitemap.xml omits ${path}`);
  }
  for (const path of newPaths.filter((path) => path.startsWith('/conocimiento/'))) {
    assert.ok(llmsText.includes(`https://codiva.cl${path}`), `llms.txt omits ${path}`);
  }
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

check('fonts and analytics stay out of the critical rendering path', () => {
  for (const [name, source] of Object.entries(html)) {
    assert.ok(!source.includes('fonts.googleapis.com'), `${name} still connects to Google Fonts CSS`);
    assert.ok(!source.includes('fonts.gstatic.com'), `${name} still connects to Google Fonts assets`);
    assert.ok(!source.includes('<script async src="https://www.googletagmanager.com'), `${name} eagerly loads GA4`);
    assert.ok(source.includes('data-analytics-loader'), `${name} has no deferred analytics loader`);
  }
  assert.ok(html.esHome.includes('/fonts/ibm-plex-sans-latin-wght-normal.woff2'), 'critical sans font is not preloaded locally');
  assert.match(rawCss, /@font-face\s*\{[^}]*font-family:\s*'IBM Plex Sans'[^}]*font-weight:\s*300 700[^}]*font-display:\s*swap/s);
  for (const weight of [400, 500, 600]) {
    assert.match(rawCss, new RegExp(`@font-face\\s*\\{[^}]*font-family:\\s*'IBM Plex Mono'[^}]*font-weight:\\s*${weight}[^}]*font-display:\\s*swap`, 's'));
  }
  assert.match(html.esHome, /window\.gtag\s*=.*dataLayer\.push/s, 'gtag queue is unavailable before the network script');
  assert.ok(html.esHome.includes('8000'), 'analytics fallback delay is not explicit');
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

check('methodology pages make delivery cadence concrete', () => {
  for (const [name, source] of [['Spanish', html.esMethod], ['English', html.enMethod]]) {
    assert.ok(source.includes('class="commercial-method"'), `${name} methodology has no commercial delivery structure`);
    assert.equal(count(source, /<li>\s*<span aria-hidden="true">0[1-4]<\/span>/g), 4, `${name} methodology must expose four clear delivery stages`);
    assert.ok(source.includes('Scrum'), `${name} methodology omits Scrum-compatible cadence`);
    assert.ok(source.includes('Kanban'), `${name} methodology omits variable-priority delivery`);
  }
  for (const copy of ['demos', 'retrospectivas', 'software funcionando', 'una o dos semanas']) {
    assert.ok(html.esMethod.includes(copy), `Spanish delivery proof is missing: ${copy}`);
  }
  for (const copy of ['demos', 'retrospectives', 'working software', '1–2 week']) {
    assert.ok(html.enMethod.includes(copy), `English delivery proof is missing: ${copy}`);
  }
});

check('methodology keeps the client inside the delivery loop', () => {
  for (const [name, source] of Object.entries({ esMethod: html.esMethod, enMethod: html.enMethod })) {
    assert.ok(source.includes('commercial-method__controls'), `${name} has no buyer-control section`);
    assert.ok(source.includes('commercial-method__steps') && source.includes('role="list"'), `${name} delivery stages lose list semantics`);
  }
  for (const copy of ['presupuesto', 'propiedad intelectual', 'Documentación', 'Carlos y Marina']) {
    assert.ok(html.esMethod.includes(copy), `Spanish buyer control is missing: ${copy}`);
  }
  for (const copy of ['budget', 'intellectual property', 'documentation', 'Carlos and Marina']) {
    assert.ok(html.enMethod.includes(copy), `English buyer control is missing: ${copy}`);
  }
});

check('reduced motion disables reveal, marquee, and smooth-anchor movement', () => {
  assert.match(rawCss, /@media \(prefers-reduced-motion: reduce\)[\s\S]*?\[data-animate/, 'reveal transitions remain under reduced motion');
  assert.match(rawCss, /@media \(prefers-reduced-motion: reduce\)[\s\S]*?\.marquee__track/, 'marquee motion remains under reduced motion');
  assert.ok(layoutSource.includes("matchMedia('(prefers-reduced-motion: reduce)')"), 'interaction script does not detect reduced motion');
  assert.ok(layoutSource.includes("behavior: reduceMotion ? 'auto' : 'smooth'"), 'anchor navigation always scrolls smoothly');
  const revealRules = rawCss.lastIndexOf('/* --- SCROLL REVEAL --- */');
  const finalReducedMotion = rawCss.lastIndexOf('@media (prefers-reduced-motion: reduce)');
  assert.ok(finalReducedMotion > revealRules, 'reduced-motion override appears before the reveal transitions and loses the cascade');
  assert.match(
    rawCss.slice(finalReducedMotion),
    /\[data-animate="reveal"\][\s\S]*?transition:\s*none/,
    'the final reduced-motion block does not disable reveal transitions'
  );
});

check('text tokens meet WCAG AA contrast on base and card backgrounds', () => {
  const root = rawCss.match(/:root\s*\{([\s\S]*?)\n\}/)[1];
  const dark = rawCss.match(/\[data-theme='dark'\]\s*\{([\s\S]*?)\n\}/)[1];
  const token = (scope, name) => scope.match(new RegExp(`${name}:\\s*(#[0-9a-f]{6})`, 'i'))[1];
  const luminance = (hex) => {
    const values = hex.match(/[0-9a-f]{2}/gi).map((value) => Number.parseInt(value, 16) / 255);
    const linear = values.map((value) => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4);
    return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
  };
  const contrast = (a, b) => {
    const [high, low] = [luminance(a), luminance(b)].sort((x, y) => y - x);
    return (high + 0.05) / (low + 0.05);
  };
  for (const [name, scope, backgrounds] of [
    ['light', root, ['--color-bg', '--color-bg-card']],
    ['dark', dark, ['--color-bg', '--color-bg-card', '--color-surface']],
  ]) {
    for (const foreground of ['--color-text-muted', '--color-text-dim']) {
      for (const background of backgrounds) {
        assert.ok(contrast(token(scope, foreground), token(scope, background)) >= 4.5, `${name} ${foreground} fails AA on ${background}`);
      }
    }
  }
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

check('service pages have responsive production styling', () => {
  for (const selector of ['.service-page__hero-grid', '.service-page__cards', '.service-page__fit-grid', '.service-page__related-grid', '.service-page__cta-grid', '.case-study__service-link']) {
    assert.ok(rawCss.includes(`${selector} {`), `missing service style: ${selector}`);
  }
  assert.match(rawCss, /@media\s*\(max-width:\s*800px\)[\s\S]*?\.service-page__hero-grid[\s\S]*?grid-template-columns:\s*1fr/);
});

check('English project title reflects the work and architecture hierarchy', () => {
  assert.ok(html.enProjects.includes('<title>Work, products, and software architectures | codiva®</title>'), 'English work title does not match the approved hierarchy');
  assert.ok(!html.enProjects.includes('&amp;amp;'), 'English title contains a double-escaped ampersand');
});

check('Work social metadata preserves the same provenance as visible content', () => {
  assert.ok(html.esProjects.includes('property="og:title" content="Trabajo, productos y arquitecturas de software — codiva®"'), 'Spanish Work OG title is stale');
  assert.ok(html.enProjects.includes('property="og:title" content="Work, products, and software architectures — codiva®"'), 'English Work OG title is stale');
  assert.ok(count(html.esProjects, /procedencia explícita/gi) >= 3, 'Spanish Work description, OG, and Twitter copy are not provenance-safe');
  assert.ok(count(html.enProjects, /explicit provenance/gi) >= 3, 'English Work description, OG, and Twitter copy are not provenance-safe');
  assert.ok(!html.esProjects.toLowerCase().includes('casos de éxito'), 'Spanish Work metadata claims unsupported success cases');
  assert.ok(!html.enProjects.toLowerCase().includes('case studies'), 'English Work metadata ambiguously labels mixed evidence as case studies');
});

check('Work accessibility and schema language are localized', () => {
  assert.ok(html.esProjects.includes('aria-label="Tecnologías y aspectos"'), 'Spanish Work case topics use an English aria-label');
  const blocks = [...html.enProjects.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((match) => JSON.parse(match[1]));
  assert.equal(blocks.find((block) => block['@type'] === 'CollectionPage')?.inLanguage, 'en-US', 'English Work schema uses a bare language code');
});

check('English portfolio image alts are localized', () => {
  const imageAlts = [...html.enProjects.matchAll(/<img\b[^>]*\balt="([^"]*)"/gi)].map((match) => match[1]);
  assert.ok(imageAlts.some((alt) => alt.includes('screenshot')), 'English project image alts do not say screenshot');
  assert.ok(imageAlts.every((alt) => !alt.includes('captura de pantalla')), 'Spanish alt text leaked into English image alts');
});

check('work indexes classify proof and link to detailed engineering cases', () => {
  for (const [name, source] of Object.entries({ esProjects: html.esProjects, enProjects: html.enProjects })) {
    assert.ok(source.includes('data-provenance="codiva-product"'), `${name} does not label Codiva-owned products`);
    assert.ok(source.includes('data-provenance="prior-experience"'), `${name} does not label prior professional experience`);
    assert.ok(source.includes('data-provenance="reference-architecture"'), `${name} does not label reference architectures`);
    assert.ok(!source.includes('Reporte Bolivia'), `${name} publishes Reporte Bolivia before its provenance is confirmed`);
  }
  assert.ok(html.esProjects.includes('href="/proyectos/pipeline-datos/"'), 'Spanish work index does not link the data-pipeline case');
  assert.ok(html.esProjects.includes('href="/proyectos/interoperabilidad-fhir/"'), 'Spanish work index does not link the FHIR case');
  assert.ok(html.enProjects.includes('href="/en/projects/data-pipeline/"'), 'English work index does not link the data-pipeline case');
  assert.ok(html.enProjects.includes('href="/en/projects/fhir-interoperability/"'), 'English work index does not link the FHIR case');
});

check('engineering case pages expose architecture, provenance, and commercial relevance', () => {
  for (const [name, source] of Object.entries({
    esDataCase: html.esDataCase,
    enDataCase: html.enDataCase,
    esFhirCase: html.esFhirCase,
    enFhirCase: html.enFhirCase,
  })) {
    assert.ok(source.includes('class="case-study"'), `${name} has no case-study structure`);
    assert.ok(source.includes('class="case-flow" role="list"'), `${name} has no accessible architecture flow`);
    assert.ok(source.includes('class="case-study__provenance"'), `${name} has no visible provenance disclosure`);
    assert.ok(source.includes('class="case-study__buyer"'), `${name} does not explain buyer relevance`);
  }
  assert.ok(html.esDataCase.includes('aterrizaje crudo y replay'), 'Spanish data case omits recoverable raw landing');
  assert.ok(html.enDataCase.includes('raw landing and replay'), 'English data case omits recoverable raw landing');
  assert.ok(html.esFhirCase.includes('estándar para intercambiar información sanitaria'), 'Spanish FHIR case defines FHIR incorrectly or incompletely');
  assert.ok(html.enFhirCase.includes('standard for exchanging healthcare information'), 'English FHIR case defines FHIR incorrectly or incompletely');
  for (const source of [html.esFhirCase, html.enFhirCase]) {
    assert.ok(source.includes('Portavita'), 'FHIR case omits the prior-employment source of experience');
    assert.ok(source.includes('not a codiva client') || source.includes('no es cliente de codiva'), 'FHIR case can imply that Portavita is a Codiva client');
  }
});

check('knowledge hubs link every approved technical guide in both languages', () => {
  const expected = {
    esKnowledge: [
      '/conocimiento/ingesta-iot/',
      '/conocimiento/nominatim-geocodificacion/',
      '/conocimiento/integraciones-postgresql/',
    ],
    enKnowledge: [
      '/en/knowledge/iot-ingestion/',
      '/en/knowledge/nominatim-geocoding/',
      '/en/knowledge/integrations-postgresql/',
    ],
  };
  for (const [name, routes] of Object.entries(expected)) {
    for (const route of routes) assert.ok(html[name].includes(`href="${route}"`), `${name} does not link ${route}`);
    assert.ok(html[name].includes('data-provenance="reference-architecture"'), `${name} does not disclose reference architecture provenance`);
  }
});

check('commercial methodology is brief but keeps delivery controls', () => {
  for (const [name, source] of Object.entries({ esMethod: html.esMethod, enMethod: html.enMethod })) {
    assert.ok(source.includes('class="commercial-method"'), `${name} does not use the commercial methodology`);
    assert.ok(!source.includes('class="architecture"'), `${name} still embeds the long architecture chapter`);
    assert.ok(!source.includes('class="discovery"'), `${name} still embeds the long discovery chapter`);
    assert.ok(!source.includes('class="agile"'), `${name} still embeds the long Agile chapter`);
    assert.ok(source.includes('Scrum'), `${name} omits Scrum-compatible rituals`);
    assert.ok(source.includes('Kanban'), `${name} omits Kanban for variable-priority work`);
    assert.ok(source.includes('1–2') || source.includes('una o dos'), `${name} omits one- or two-week iterations`);
  }
  assert.ok(html.esMethod.includes('demos') && html.esMethod.includes('retrospectivas'), 'Spanish methodology omits demos or retrospectives');
  assert.ok(html.enMethod.includes('demos') && html.enMethod.includes('retrospectives'), 'English methodology omits demos or retrospectives');
});

check('IoT reference architecture covers failure and event semantics without fabricating protocols', () => {
  for (const [name, source] of Object.entries({ esIot: html.esIot, enIot: html.enIot })) {
    assert.ok(source.includes('data-provenance="reference-architecture"'), `${name} lacks a reference-architecture disclosure`);
    const terms = name === 'esIot'
      ? ['duplicados', 'idempotencia', 'orden', 'dead-letter', 'replay', 'observabilidad']
      : ['duplicates', 'idempotency', 'ordering', 'dead-letter', 'replay', 'observability'];
    for (const term of terms) assert.ok(source.toLowerCase().includes(term), `${name} omits ${term}`);
  }
});

check('Nominatim guide keeps state in PostgreSQL/PostGIS and only the application layer stateless', () => {
  assert.ok(html.esNominatim.includes('capa de aplicación sin estado'), 'Spanish Nominatim guide does not scope statelessness to the application layer');
  assert.ok(html.enNominatim.includes('stateless application layer'), 'English Nominatim guide does not scope statelessness to the application layer');
  for (const source of [html.esNominatim, html.enNominatim]) {
    assert.ok(source.includes('PostgreSQL/PostGIS'), 'Nominatim guide omits persistent PostgreSQL/PostGIS');
    assert.ok(!source.includes('Nominatim es stateless') && !source.includes('Nominatim is stateless'), 'Nominatim is incorrectly described as stateless');
  }
});

check('integration guide distinguishes REST, SOAP, and concrete PostgreSQL maintenance concepts', () => {
  assert.ok(html.esIntegrations.includes('REST es un estilo arquitectónico'), 'Spanish integration guide misdefines REST');
  assert.ok(html.esIntegrations.includes('SOAP es un protocolo'), 'Spanish integration guide misdefines SOAP');
  assert.ok(html.enIntegrations.includes('REST is an architectural style'), 'English integration guide misdefines REST');
  assert.ok(html.enIntegrations.includes('SOAP is a messaging protocol'), 'English integration guide misdefines SOAP');
  const required = ['partition', 'index', 'query plan', 'bloat', 'autovacuum'];
  for (const [name, source] of Object.entries({ esIntegrations: html.esIntegrations, enIntegrations: html.enIntegrations })) {
    for (const term of required) assert.ok(source.toLowerCase().includes(term), `${name} omits ${term}`);
    assert.ok(!source.toLowerCase().includes('fragmentación postgresql'), `${name} uses ambiguous PostgreSQL fragmentation language`);
  }
});

check('meta descriptions remain concise', () => {
  for (const [name, source] of Object.entries(html)) {
    const description = source.match(/<meta name="description" content="([^"]*)"/i)?.[1] ?? '';
    assert.ok(description.length > 50, `${name} meta description is missing or too short`);
    assert.ok(description.length <= 160, `${name} meta description is ${description.length} characters`);
  }
});

check('every public page exposes valid JSON-LD', () => {
  for (const [name, source] of Object.entries(html)) {
    const blocks = [...source.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
    assert.ok(blocks.length > 0, `${name} has no JSON-LD`);
    for (const [, block] of blocks) assert.doesNotThrow(() => JSON.parse(block), `${name} has invalid JSON-LD`);
  }
});

check('metadata does not invent blanket personal authorship', () => {
  for (const [name, source] of Object.entries(html)) {
    assert.ok(!source.includes('<meta name="author"'), `${name} assigns a blanket page author`);
    const blocks = [...source.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((match) => JSON.parse(match[1]));
    for (const block of blocks.filter((item) => item['@type'] === 'TechArticle')) {
      assert.ok(!('author' in block), `${name} assigns an unsupported TechArticle author`);
    }
  }
});

check('homepage structured data has equivalent ES and EN coverage', () => {
  const blocks = (source) => [...source.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((match) => JSON.parse(match[1]));
  const esBlocks = blocks(html.esHome);
  const enBlocks = blocks(html.enHome);
  assert.deepEqual(enBlocks.map((block) => block['@type']).sort(), esBlocks.map((block) => block['@type']).sort(), 'homepage schema types differ by locale');
  for (const type of ['Organization', 'ProfessionalService']) {
    assert.ok(!('areaServed' in esBlocks.find((block) => block['@type'] === type)), `Spanish ${type} invents global service coverage`);
    assert.ok(!('areaServed' in enBlocks.find((block) => block['@type'] === type)), `English ${type} invents global service coverage`);
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

check('internal deep links resolve to an element on the target page', () => {
  const routeFor = (file) => {
    const relative = file.replace(/^dist\//, '').replace(/index\.html$/, '');
    return `/${relative}`.replace(/\/+/g, '/');
  };
  const byRoute = new Map(Object.entries(pages).map(([name, file]) => [routeFor(file), [name, html[name]]]));
  for (const [sourceName, source] of Object.entries(html)) {
    for (const [, href] of source.matchAll(/href="(\/[^"]*#[^"]+)"/g)) {
      const [pathname, encodedFragment] = href.split('#', 2);
      const target = byRoute.get(pathname || '/');
      assert.ok(target, `${sourceName} links to an ungenerated route: ${href}`);
      const [targetName, targetHtml] = target;
      const fragment = decodeURIComponent(encodedFragment);
      const ids = new Set([...targetHtml.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]));
      assert.ok(ids.has(fragment), `${sourceName} links to missing #${fragment} on ${targetName}`);
    }
  }
});

if (failures.length) {
  console.error(`\n${failures.length} quality check(s) failed:`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`\nAll ${Object.keys(pages).length} generated pages passed the site quality checks.`);
