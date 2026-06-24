// Spanish (default locale) — all visible text + SEO metadata + Schema.org JSON-LD.
// Edit copy here; components render from this object.
export default {
  lang: 'es',
  htmlLang: 'es',

  meta: {
    title: 'codiva® — Diseño y Desarrollo Web en Chile · Software, Apps y Servicios',
    description:
      'Estudio independiente de diseño y desarrollo web en Santiago de Chile. Creamos sitios, aplicaciones, apps móviles y software a medida con diseño de alto nivel. codiva® es marca registrada en INAPI.',
    keywords:
      'codiva, diseño web chile, desarrollo web chile, diseño páginas web, desarrollo frontend, desarrollo fullstack, software a medida, identidad digital, Ñuñoa Santiago, marca registrada INAPI',
    canonical: 'https://codiva.cl/',
    ogUrl: 'https://codiva.cl/',
    ogTitle: 'codiva® — Diseño y Desarrollo Web en Chile',
    ogDescription:
      'Estudio independiente de diseño y desarrollo web en Santiago de Chile. Sitios, aplicaciones y software a medida con diseño de alto nivel.',
    ogLocale: 'es_CL',
    twitterTitle: 'codiva® — Diseño y Desarrollo Web en Chile',
    twitterDescription:
      'Estudio independiente de diseño y desarrollo web en Santiago de Chile. Sitios, aplicaciones y software a medida.',
  },

  // Rendered verbatim as <script type="application/ld+json"> blocks.
  schema: [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'codiva',
      alternateName: 'codiva®',
      url: 'https://codiva.cl',
      description:
        'codiva® es una marca registrada chilena especializada en diseño y desarrollo de páginas web. Registro INAPI N° 1481622, Clase 42.',
      foundingDate: '2025',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Jose Manuel Infante 1805, 907',
        addressLocality: 'Ñuñoa',
        addressRegion: 'Región Metropolitana',
        addressCountry: 'CL',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'contactos@codiva.cl',
        contactType: 'customer service',
        availableLanguage: ['Spanish', 'English'],
      },
      founder: { '@type': 'Person', name: 'Carlos Andrés Monserrat Rojas Rojas' },
      areaServed: { '@type': 'Country', name: 'Chile' },
      knowsAbout: [
        'Diseño Web',
        'Desarrollo Frontend',
        'Desarrollo Fullstack',
        'Identidad Digital',
        'UX/UI Design',
        'Web Development',
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'codiva®',
      url: 'https://codiva.cl',
      description: 'Diseño y desarrollo de páginas web — Marca registrada en Chile',
      inLanguage: 'es-CL',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: 'codiva®',
      url: 'https://codiva.cl',
      description:
        'Estudio de diseño y desarrollo de páginas web en Ñuñoa, Santiago de Chile. Marca registrada INAPI N° 1481622.',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Jose Manuel Infante 1805, 907',
        addressLocality: 'Ñuñoa',
        addressRegion: 'Santiago',
        postalCode: '',
        addressCountry: 'CL',
      },
      geo: { '@type': 'GeoCoordinates', latitude: -33.4569, longitude: -70.599 },
      email: 'contactos@codiva.cl',
      priceRange: '$$',
      serviceType: [
        'Diseño y Desarrollo Web',
        'Aplicaciones Web y Móviles',
        'Software a Medida',
        'APIs y Microservicios',
      ],
      areaServed: { '@type': 'Country', name: 'Chile' },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Servicios de Diseño y Desarrollo Web',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Diseño y Desarrollo Web', description: 'Sitios web, landing pages y plataformas con diseño de alto nivel y código preciso.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Aplicaciones Web y Móviles', description: 'Apps nativas, PWAs y aplicaciones web complejas con experiencias fluidas en toda plataforma.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Software a Medida', description: 'Sistemas, ERPs, dashboards y soluciones de software personalizadas para tu negocio.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'APIs y Microservicios', description: 'Arquitectura escalable, APIs REST/GraphQL, integraciones y servicios cloud.' } },
        ],
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: '¿Qué es codiva?', acceptedAnswer: { '@type': 'Answer', text: 'codiva® es una marca registrada chilena ante el Instituto Nacional de Propiedad Industrial (INAPI) bajo el registro N° 1481622, Clase 42, dedicada al diseño y desarrollo de páginas web.' } },
        { '@type': 'Question', name: '¿Qué servicios ofrece codiva?', acceptedAnswer: { '@type': 'Answer', text: 'codiva® ofrece servicios de Diseño y Desarrollo Web, Aplicaciones Web y Móviles, Software a Medida, y APIs y Microservicios. Creamos soluciones digitales de alto nivel combinando diseño con desarrollo técnico preciso.' } },
        { '@type': 'Question', name: '¿Es codiva una marca registrada en Chile?', acceptedAnswer: { '@type': 'Answer', text: 'Sí, codiva® es una marca registrada ante INAPI Chile con el N° de registro 1481622, N° de solicitud 1618736, registrada el 27 de noviembre de 2025 bajo la Clase 42 (Diseño y desarrollo de páginas web), con vigencia hasta el 27 de noviembre de 2035.' } },
        { '@type': 'Question', name: '¿Dónde se ubica codiva?', acceptedAnswer: { '@type': 'Answer', text: 'codiva® se ubica en Ñuñoa, Santiago de Chile. Domicilio legal: Jose Manuel Infante 1805, 907, Ñuñoa.' } },
        { '@type': 'Question', name: '¿Cómo contactar a codiva?', acceptedAnswer: { '@type': 'Answer', text: 'Puedes contactar a codiva® enviando un correo electrónico a contactos@codiva.cl para consultas sobre proyectos de diseño y desarrollo web.' } },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://codiva.cl/' }],
    },
  ],

  nav: {
    ariaLabel: 'Navegación principal',
    logoAria: 'codiva - Inicio',
    links: [
      { href: '#about', label: 'Nosotros' },
      { href: '#services', label: 'Servicios' },
      { href: '#plans', label: 'Planes' },
      { href: '#projects', label: 'Proyectos' },
      { href: '#faq', label: 'FAQ' },
      { href: '#contact', label: 'Contacto' },
    ],
    langSwitch: { href: '/en/', label: 'EN', aria: 'Switch to English' },
    burgerOpen: 'Abrir menú de navegación',
    burgerClose: 'Cerrar menú de navegación',
  },

  hero: {
    logoAlt: 'codiva — Símbolo de marca',
    eyebrow: 'Estudio boutique · end-to-end',
    subtitle: 'Construimos tu producto completo: diseño, frontend, backend e IA. Sin intermediarios.',
    ctaPrimary: 'Iniciar proyecto',
    ctaGhost: 'Explorar',
  },

  marquee1: ['codiva', 'software', 'web · apps', 'chile'],
  marquee2: ['diseño', 'desarrollo', 'identidad digital', 'santiago · chile'],

  techLabel: 'Tecnologías que utilizamos',
  tech: ['Hostinger', 'Docker', 'Java', 'Scala', 'JavaScript', 'Python', 'Google Analytics'],

  about: {
    label: 'Nosotros',
    headingHtml: 'Un estudio boutique que construye tu producto <em>de principio a fin</em>',
    paragraphs: [
      'codiva es un estudio boutique de dos ingenieros de software senior con roles complementarios: Carlos en backend, arquitectura e IA —Java, Scala, RAG/LLM y sistemas distribuidos—; Marina en diseño de producto y frontend —fullstack JavaScript, React/Next y BFF—. Entre los dos cubrimos diseño, frontend, backend, IA, móvil y despliegue sin subcontratar a nadie.',
      'Eso significa que hablas directo con quienes construyen tu producto, sin intermediarios. Con más de 14 años de experiencia —incluyendo SaaS de salud con estándar FHIR y sistemas distribuidos— trabajamos con startups y empresas en Chile y el extranjero que buscan productos cuidados en cada detalle, desde Ñuñoa, Santiago de Chile.',
    ],
  },

  trademark: {
    meta: {
      title: 'Marca Registrada — codiva® | INAPI N° 1481622',
      description: 'codiva® es una marca registrada en Chile ante INAPI (N° 1481622, Clase 42), a nombre de Carlos Andrés Monserrat Rojas Rojas.',
      keywords: 'codiva marca registrada, INAPI 1481622, marca registrada Chile, Clase 42',
      canonical: 'https://codiva.cl/marca/',
      ogUrl: 'https://codiva.cl/marca/',
      ogTitle: 'Marca Registrada — codiva®',
      ogDescription: 'Marca registrada en Chile ante INAPI N° 1481622, Clase 42.',
      ogLocale: 'es_CL',
      twitterTitle: 'Marca Registrada — codiva®',
      twitterDescription: 'Marca registrada en Chile ante INAPI N° 1481622, Clase 42.',
    },
    label: 'Marca registrada',
    heading: 'codiva® es una marca registrada',
    note: 'codiva® es una marca registrada en Chile ante el Instituto Nacional de Propiedad Industrial (INAPI), a nombre de <strong>Carlos Andrés Monserrat Rojas Rojas</strong>, bajo la cual prestamos servicios profesionales independientes de diseño y desarrollo. El nombre y su uso comercial están protegidos por ley.',
    rows: [
      { key: 'Denominación', valHtml: 'codiva' },
      { key: 'Titular', valHtml: 'Carlos Andrés Monserrat Rojas Rojas' },
      { key: 'N° de Registro', valHtml: '1481622' },
      { key: 'N° de Solicitud', valHtml: '1618736' },
      { key: 'Fecha de Registro', valHtml: '<time datetime="2025-11-27">27 de noviembre de 2025</time>' },
      { key: 'Vigencia hasta', valHtml: '<time datetime="2035-11-27">27 de noviembre de 2035</time>' },
      { key: 'Tipo de Signo', valHtml: 'Denominativa' },
      { key: 'Clase', valHtml: '42 — Diseño y desarrollo de páginas web' },
      { key: 'Organismo', valHtml: 'INAPI — Instituto Nacional de Propiedad Industrial, Chile' },
    ],
    back: '← Volver al inicio',
  },

  services: {
    label: 'Servicios',
    heading: 'Lo que hacemos',
    cards: [
      { number: '01', title: 'Diseño y Desarrollo Web', desc: 'Sitios web, landing pages y plataformas con diseño de alto nivel y código preciso.' },
      { number: '02', title: 'Aplicaciones Web &amp; Móviles', desc: 'Apps nativas, PWAs y aplicaciones web complejas con experiencias fluidas en toda plataforma.' },
      { number: '03', title: 'Software a Medida', desc: 'Sistemas, ERPs, dashboards y soluciones de software personalizadas para tu negocio.' },
      { number: '04', title: 'APIs &amp; Microservicios', desc: 'Arquitectura escalable, APIs REST/GraphQL, integraciones y servicios cloud.' },
    ],
  },

  plans: {
    label: 'Planes',
    heading: 'Planes claros para tu negocio',
    intro: 'Proyectos pequeños y medianos con precios transparentes. Todos incluyen SEO base y Google Analytics, para que tu sitio se encuentre en Google y puedas medir resultados desde el primer día.',
    tiers: [
      {
        name: 'Landing',
        price: 'desde $190.000',
        tagline: 'Una página, lanzamiento rápido.',
        features: [
          '1 página optimizada para convertir',
          'Diseño responsive (móvil y escritorio)',
          'SEO base + Google Analytics 4',
          'Botón de WhatsApp y formulario',
          'Publicación y puesta en línea',
        ],
        cta: 'Cotizar landing',
        waMessage: 'Hola codiva 👋, me interesa el plan Landing.',
      },
      {
        name: 'Sitio Web',
        price: 'desde $490.000',
        tagline: 'Multipágina para tu empresa o marca.',
        badge: 'Recomendado',
        featured: true,
        features: [
          'Hasta 5–6 secciones o páginas',
          'Diseño a medida y responsive',
          'SEO on-page + Analytics 4 + Search Console',
          'Integración con WhatsApp y redes',
          'Optimización de velocidad y buenas prácticas',
        ],
        cta: 'Cotizar sitio',
        waMessage: 'Hola codiva 👋, me interesa el plan Sitio Web.',
      },
      {
        name: 'Tienda / A medida',
        price: 'Cotización',
        tagline: 'E-commerce, app o plataforma a medida.',
        features: [
          'Tienda online o plataforma/app',
          'Pasarela de pago e integraciones',
          'Funcionalidad y alcance a medida',
          'APIs y conexión con tus sistemas',
          'Alcance y plazos definidos contigo',
        ],
        cta: 'Conversemos',
        waMessage: 'Hola codiva 👋, quiero cotizar un proyecto a medida.',
      },
    ],
    support: {
      label: 'Soporte continuo',
      name: 'SEO & Google Analytics',
      desc: 'Lanzar no basta: te ayudamos a que te encuentren en Google y a entender qué hacen tus visitantes. Configuración, seguimiento de métricas y mejoras mes a mes para que tu sitio crezca.',
      features: [
        'Google Analytics 4 + Search Console',
        'SEO técnico y de contenido',
        'Reportes mensuales claros',
        'Mejoras continuas según resultados',
      ],
      price: 'Plan mensual',
      cta: 'Quiero soporte SEO',
      waMessage: 'Hola codiva 👋, me interesa el soporte de SEO y Google Analytics.',
    },
    note: 'Precios de referencia en CLP; el valor final depende del alcance. Conversemos sin compromiso.',
  },

  projects: {
    label: 'Proyectos',
    heading: 'Proyectos que hemos desarrollado',
    items: [
      {
        name: 'kit-a',
        year: '2025',
        type: 'Aplicación web',
        tags: ['DevTools', 'Editor Visual', 'SaaS'],
        image: '/portfolio/kit-a.webp',
        desc: 'Herramienta web para crear diagramas de arquitectura directamente en el navegador. Incluye una biblioteca de más de 1.800 componentes (AWS, Azure, GCP y genéricos), plantillas, lienzo interactivo con nodos y conexiones, y exportación — sin instalar nada.',
        url: 'https://kit-a.com/',
        linkLabel: 'Visitar sitio',
      },
      {
        name: 'ZooMinder',
        year: '2025',
        type: 'Aplicación móvil',
        tags: ['PetTech', 'App Móvil', 'SaaS'],
        image: '/portfolio/zoominder.webp',
        desc: 'Aplicación móvil de gestión de salud para mascotas. Centraliza recordatorios de medicación, citas veterinarias e historial médico, con notificaciones push, perfiles por mascota, compartición familiar y sincronización offline-first con respaldo en la nube.',
        url: 'https://zoo-minder.com/',
        linkLabel: 'Visitar sitio',
      },
      {
        name: 'Reporte Bolivia',
        year: '2025',
        type: 'Plataforma web',
        tags: ['Inteligencia de Medios', 'Dashboard', 'SaaS'],
        image: '/portfolio/reporte-bolivia.webp',
        desc: 'Plataforma de inteligencia de medios que monitorea la agenda noticiosa de Bolivia. Entrega ediciones analíticas dos veces al día con resúmenes de múltiples fuentes, categorización temática, panel de métricas y archivo histórico.',
        url: 'https://reporte-bolivia.com/',
        linkLabel: 'Visitar sitio',
      },
    ],
  },

  faq: {
    label: 'Preguntas Frecuentes',
    heading: 'Preguntas frecuentes',
    items: [
      { q: '¿Qué es codiva?', aHtml: '<p>codiva® es un estudio independiente de diseño y desarrollo web con base en Ñuñoa, Santiago de Chile. Combinamos diseño de alto nivel con desarrollo técnico preciso para crear sitios, aplicaciones, apps móviles y software a medida. El nombre es una marca registrada ante INAPI (N° 1481622).</p>' },
      { q: '¿Qué servicios ofrece codiva?', aHtml: '<p>codiva® ofrece cuatro servicios principales: Diseño y Desarrollo Web (sitios y plataformas), Aplicaciones Web y Móviles (apps nativas y PWAs), Software a Medida (sistemas y dashboards) y APIs y Microservicios (arquitectura escalable y servicios cloud).</p>' },
      { q: '¿Es codiva una marca registrada en Chile?', aHtml: '<p>Sí, codiva® está oficialmente registrada ante INAPI Chile. N° de registro: 1481622, N° de solicitud: 1618736, registrada el 27 de noviembre de 2025 como marca denominativa bajo la Clase 42 (Diseño y desarrollo de páginas web), con vigencia hasta el 27 de noviembre de 2035.</p>' },
      { q: '¿Dónde se ubica codiva?', aHtml: '<p>codiva® se ubica en Ñuñoa, Santiago de Chile, en la Región Metropolitana. Prestamos servicios de diseño y desarrollo web tanto a nivel local como remoto para clientes en todo Chile y Latinoamérica.</p>' },
      { q: '¿Cómo puedo contactar a codiva para un proyecto?', aHtml: '<p>Puedes contactarnos enviando un correo electrónico a <a href="mailto:contactos@codiva.cl">contactos@codiva.cl</a>. Estaremos encantados de conversar sobre tu proyecto y cómo podemos ayudarte a crear una experiencia digital excepcional.</p>' },
    ],
  },

  contact: {
    label: 'Contacto',
    headingHtml: 'Hagamos algo<br><em>extraordinario</em>',
    text: '¿Tienes un proyecto en mente? Conversemos sobre cómo podemos llevarlo al siguiente nivel.',
    whatsapp: {
      number: '56957173936',
      label: 'Escríbenos por WhatsApp',
      message: 'Hola codiva 👋, me interesa cotizar un proyecto.',
    },
    emailLabel: 'O escríbenos a',
    email: 'contactos@codiva.cl',
    location: 'Ñuñoa, Santiago — Chile',
  },

  team: {
    label: 'Equipo',
    heading: 'Dos personas, un producto completo',
    members: [
      { name: 'Carlos Rojas', role: 'Backend · Arquitectura · IA', desc: 'Ingeniero de software backend y fullstack: Java, Scala y Angular. IA/RAG, sistemas distribuidos y arquitectura. Móvil con Flutter. 14 años de experiencia.', url: 'https://krlz.dev/', image: '/team/carlos.webp', alt: 'Carlos Rojas — Ingeniero de software: backend, arquitectura e IA' },
      { name: 'Marina Alekseeva', role: 'Diseño · Frontend · Fullstack JS', desc: 'Ingeniera de software orientada a frontend. Diseño de producto y UX/UI, fullstack JavaScript y BFF (React/Next). Móvil con Flutter.', url: 'https://maryaleks.dev/', image: '/team/marina.webp', alt: 'Marina Alekseeva — Ingeniera de software: diseño y frontend' },
    ],
  },

  footer: {
    copy: 'Todos los derechos reservados.',
    legal: { href: '/marca/', label: 'codiva® — marca registrada INAPI N° 1481622' },
  },
};
