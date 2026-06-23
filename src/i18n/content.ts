/* ============================================
   codiva® — Localized content
   Single source of truth for both locales.
   Spanish (es) renders at /, English (en) at /en/.
   ============================================ */

export const languages = {
  es: 'Español',
  en: 'English',
} as const;

export type Locale = keyof typeof languages;

export interface NavLink {
  href: string;
  label: string;
}

export interface Stat {
  number: string;
  label: string;
}

export interface ServiceCard {
  number: string;
  title: string;
  desc: string;
}

export interface TrademarkRow {
  /** Field label */
  key: string;
  /** Value — may contain inline HTML (e.g. <time>) */
  val: string;
}

export interface FaqItem {
  q: string;
  /** Answer — may contain inline HTML (e.g. <a>) */
  a: string;
}

export interface Content {
  /** <html lang> value */
  lang: string;
  /** og:locale value */
  ogLocale: string;
  seo: {
    title: string;
    description: string;
    keywords: string;
    /** Absolute canonical URL */
    canonical: string;
    ogUrl: string;
    ogTitle: string;
    ogDescription: string;
    twitterTitle: string;
    twitterDescription: string;
  };
  /** JSON-LD blocks rendered into <head> */
  schemas: Record<string, unknown>[];
  nav: {
    ariaLabel: string;
    brandAria: string;
    links: NavLink[];
    lang: { href: string; label: string; aria: string };
    burgerOpen: string;
    burgerClose: string;
  };
  hero: {
    logoAlt: string;
    eyebrow: string;
    /** Inline HTML allowed */
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  /** Base words for the first marquee (repeated + dot-separated in component) */
  marquee1: string[];
  about: {
    label: string;
    /** Inline HTML allowed (<em>) */
    heading: string;
    texts: string[];
    stats: Stat[];
  };
  services: {
    label: string;
    heading: string;
    cards: ServiceCard[];
  };
  /** Base words for the second marquee */
  marquee2: string[];
  trademark: {
    label: string;
    logoAlt: string;
    heading: string;
    rows: TrademarkRow[];
  };
  faq: {
    label: string;
    heading: string;
    items: FaqItem[];
  };
  contact: {
    label: string;
    /** Inline HTML allowed (<br>, <em>) */
    heading: string;
    text: string;
    email: string;
    location: string;
  };
  footer: {
    /** Inline HTML allowed */
    copy: string;
    meta: string[];
  };
}

const es: Content = {
  lang: 'es',
  ogLocale: 'es_CL',
  seo: {
    title: 'codiva® — Diseño y Desarrollo de Páginas Web en Chile | Marca Registrada INAPI',
    description:
      'codiva® es una marca registrada chilena (INAPI N° 1481622, Clase 42) especializada en diseño y desarrollo de páginas web. Creamos experiencias digitales de alto nivel desde Ñuñoa, Santiago de Chile.',
    keywords:
      'codiva, diseño web chile, desarrollo web chile, marca registrada INAPI, diseño páginas web, desarrollo frontend, desarrollo fullstack, identidad digital, Ñuñoa Santiago',
    canonical: 'https://codiva.cl/',
    ogUrl: 'https://codiva.cl/',
    ogTitle: 'codiva® — Diseño y Desarrollo de Páginas Web en Chile',
    ogDescription:
      'Marca registrada chilena (INAPI N° 1481622) especializada en diseño y desarrollo de páginas web. Experiencias digitales de alto nivel.',
    twitterTitle: 'codiva® — Diseño y Desarrollo Web en Chile',
    twitterDescription:
      'Marca registrada chilena (INAPI N° 1481622) especializada en diseño y desarrollo de páginas web.',
  },
  schemas: [
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
        email: 'hola@codiva.cl',
        contactType: 'customer service',
        availableLanguage: ['Spanish', 'English'],
      },
      founder: {
        '@type': 'Person',
        name: 'Carlos Andrés Monserrat Rojas Rojas',
      },
      areaServed: {
        '@type': 'Country',
        name: 'Chile',
      },
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
      geo: {
        '@type': 'GeoCoordinates',
        latitude: -33.4569,
        longitude: -70.599,
      },
      email: 'hola@codiva.cl',
      priceRange: '$$',
      serviceType: [
        'Diseño y Desarrollo Web',
        'Aplicaciones Web y Móviles',
        'Software a Medida',
        'APIs y Microservicios',
      ],
      areaServed: {
        '@type': 'Country',
        name: 'Chile',
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Servicios de Diseño y Desarrollo Web',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Diseño y Desarrollo Web',
              description:
                'Sitios web, landing pages y plataformas con diseño de alto nivel y código preciso.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Aplicaciones Web y Móviles',
              description:
                'Apps nativas, PWAs y aplicaciones web complejas con experiencias fluidas en toda plataforma.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Software a Medida',
              description:
                'Sistemas, ERPs, dashboards y soluciones de software personalizadas para tu negocio.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'APIs y Microservicios',
              description:
                'Arquitectura escalable, APIs REST/GraphQL, integraciones y servicios cloud.',
            },
          },
        ],
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: '¿Qué es codiva?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'codiva® es una marca registrada chilena ante el Instituto Nacional de Propiedad Industrial (INAPI) bajo el registro N° 1481622, Clase 42, dedicada al diseño y desarrollo de páginas web.',
          },
        },
        {
          '@type': 'Question',
          name: '¿Qué servicios ofrece codiva?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'codiva® ofrece servicios de Diseño y Desarrollo Web, Aplicaciones Web y Móviles, Software a Medida, y APIs y Microservicios. Creamos soluciones digitales de alto nivel combinando diseño con desarrollo técnico preciso.',
          },
        },
        {
          '@type': 'Question',
          name: '¿Es codiva una marca registrada en Chile?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sí, codiva® es una marca registrada ante INAPI Chile con el N° de registro 1481622, N° de solicitud 1618736, registrada el 27 de noviembre de 2025 bajo la Clase 42 (Diseño y desarrollo de páginas web), con vigencia hasta el 27 de noviembre de 2035.',
          },
        },
        {
          '@type': 'Question',
          name: '¿Dónde se ubica codiva?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'codiva® se ubica en Ñuñoa, Santiago de Chile. Domicilio legal: Jose Manuel Infante 1805, 907, Ñuñoa.',
          },
        },
        {
          '@type': 'Question',
          name: '¿Cómo contactar a codiva?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Puedes contactar a codiva® enviando un correo electrónico a hola@codiva.cl para consultas sobre proyectos de diseño y desarrollo web.',
          },
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Inicio',
          item: 'https://codiva.cl/',
        },
      ],
    },
  ],
  nav: {
    ariaLabel: 'Navegación principal',
    brandAria: 'codiva - Inicio',
    links: [
      { href: '#about', label: 'Nosotros' },
      { href: '#services', label: 'Servicios' },
      { href: '#trademark', label: 'Marca' },
      { href: '#faq', label: 'FAQ' },
      { href: '#contact', label: 'Contacto' },
    ],
    lang: { href: '/en/', label: 'EN', aria: 'Switch to English' },
    burgerOpen: 'Abrir menú de navegación',
    burgerClose: 'Cerrar menú de navegación',
  },
  hero: {
    logoAlt: 'codiva — Símbolo de marca',
    eyebrow: 'Marca Registrada en Chile — INAPI N° 1481622',
    subtitle: 'Software · Web · Apps · Servicios',
    ctaPrimary: 'Iniciar proyecto',
    ctaSecondary: 'Explorar',
  },
  marquee1: ['codiva', 'software', 'web · apps', 'chile'],
  about: {
    label: 'Nosotros',
    heading: 'Creamos experiencias digitales que <em>trascienden</em>',
    texts: [
      'codiva® es una marca chilena registrada ante el Instituto Nacional de Propiedad Industrial (INAPI), dedicada al diseño y desarrollo de páginas web bajo la Clase 42 del Clasificador Internacional de Niza.',
      'Combinamos diseño de alto nivel con desarrollo técnico preciso para crear software, aplicaciones web, apps móviles y servicios digitales que funcionan impecablemente.',
    ],
    stats: [
      { number: '42', label: 'Clase INAPI' },
      { number: '2025', label: 'Registro' },
      { number: '2035', label: 'Vigencia' },
    ],
  },
  services: {
    label: 'Servicios',
    heading: 'Lo que hacemos',
    cards: [
      {
        number: '01',
        title: 'Diseño y Desarrollo Web',
        desc: 'Sitios web, landing pages y plataformas con diseño de alto nivel y código preciso.',
      },
      {
        number: '02',
        title: 'Aplicaciones Web & Móviles',
        desc: 'Apps nativas, PWAs y aplicaciones web complejas con experiencias fluidas en toda plataforma.',
      },
      {
        number: '03',
        title: 'Software a Medida',
        desc: 'Sistemas, ERPs, dashboards y soluciones de software personalizadas para tu negocio.',
      },
      {
        number: '04',
        title: 'APIs & Microservicios',
        desc: 'Arquitectura escalable, APIs REST/GraphQL, integraciones y servicios cloud.',
      },
    ],
  },
  marquee2: ['registro 1481622', 'marca registrada', 'clase 42', 'INAPI chile'],
  trademark: {
    label: 'Marca Registrada',
    logoAlt: 'codiva — Símbolo de marca registrada',
    heading: 'Protegida por ley',
    rows: [
      { key: 'Denominación', val: 'codiva' },
      { key: 'N° de Registro', val: '1481622' },
      { key: 'N° de Solicitud', val: '1618736' },
      { key: 'Fecha de Registro', val: '<time datetime="2025-11-27">27 de noviembre de 2025</time>' },
      { key: 'Vigencia hasta', val: '<time datetime="2035-11-27">27 de noviembre de 2035</time>' },
      { key: 'Tipo de Signo', val: 'Denominativa' },
      { key: 'Clase', val: '42 — Diseño y desarrollo de páginas web' },
      { key: 'Organismo', val: 'INAPI — Instituto Nacional de Propiedad Industrial, Chile' },
    ],
  },
  faq: {
    label: 'Preguntas Frecuentes',
    heading: 'Preguntas frecuentes',
    items: [
      {
        q: '¿Qué es codiva?',
        a: 'codiva® es una marca registrada chilena ante el Instituto Nacional de Propiedad Industrial (INAPI) bajo el registro N° 1481622, Clase 42, dedicada al diseño y desarrollo de páginas web. Fundada en Santiago de Chile, combina diseño de alto nivel con desarrollo técnico preciso.',
      },
      {
        q: '¿Qué servicios ofrece codiva?',
        a: 'codiva® ofrece cuatro servicios principales: Diseño y Desarrollo Web (sitios y plataformas), Aplicaciones Web y Móviles (apps nativas y PWAs), Software a Medida (sistemas y dashboards) y APIs y Microservicios (arquitectura escalable y servicios cloud).',
      },
      {
        q: '¿Es codiva una marca registrada en Chile?',
        a: 'Sí, codiva® está oficialmente registrada ante INAPI Chile. N° de registro: 1481622, N° de solicitud: 1618736, registrada el 27 de noviembre de 2025 como marca denominativa bajo la Clase 42 (Diseño y desarrollo de páginas web), con vigencia hasta el 27 de noviembre de 2035.',
      },
      {
        q: '¿Dónde se ubica codiva?',
        a: 'codiva® se ubica en Ñuñoa, Santiago de Chile, en la Región Metropolitana. Prestamos servicios de diseño y desarrollo web tanto a nivel local como remoto para clientes en todo Chile y Latinoamérica.',
      },
      {
        q: '¿Cómo puedo contactar a codiva para un proyecto?',
        a: 'Puedes contactarnos enviando un correo electrónico a <a href="mailto:hola@codiva.cl">hola@codiva.cl</a>. Estaremos encantados de conversar sobre tu proyecto y cómo podemos ayudarte a crear una experiencia digital excepcional.',
      },
    ],
  },
  contact: {
    label: 'Contacto',
    heading: 'Hagamos algo<br><em>extraordinario</em>',
    text: '¿Tienes un proyecto en mente? Conversemos sobre cómo podemos llevarlo al siguiente nivel.',
    email: 'hola@codiva.cl',
    location: 'Ñuñoa, Santiago — Chile',
  },
  footer: {
    copy: '&copy; 2025 codiva. Todos los derechos reservados.',
    meta: [
      'Marca registrada INAPI N° 1481622',
      'Clase 42 — Diseño y desarrollo de páginas web',
    ],
  },
};

const en: Content = {
  lang: 'en',
  ogLocale: 'en_US',
  seo: {
    title: 'codiva® — Software, Web & App Development in Chile | Registered Trademark INAPI',
    description:
      'codiva® is a Chilean registered trademark (INAPI #1481622, Class 42) specialized in web design, software development, mobile apps, and microservices. Based in Santiago, Chile.',
    keywords:
      'codiva, web development chile, software development, mobile apps, microservices, APIs, registered trademark INAPI, Santiago Chile',
    canonical: 'https://codiva.cl/en/',
    ogUrl: 'https://codiva.cl/en/',
    ogTitle: 'codiva® — Software, Web & App Development in Chile',
    ogDescription:
      'Chilean registered trademark (INAPI #1481622) specialized in software development, web apps, mobile apps, and microservices.',
    twitterTitle: 'codiva® — Software & Web Development in Chile',
    twitterDescription:
      'Chilean registered trademark (INAPI #1481622) specialized in software development, web & mobile apps.',
  },
  schemas: [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'codiva',
      alternateName: 'codiva®',
      url: 'https://codiva.cl',
      description:
        'codiva® is a Chilean registered trademark specialized in software development, web & mobile apps, and microservices. INAPI Registration #1481622, Class 42.',
      foundingDate: '2025',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Jose Manuel Infante 1805, 907',
        addressLocality: 'Ñuñoa',
        addressRegion: 'Santiago',
        addressCountry: 'CL',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'hola@codiva.cl',
        contactType: 'customer service',
        availableLanguage: ['Spanish', 'English'],
      },
      founder: {
        '@type': 'Person',
        name: 'Carlos Andrés Monserrat Rojas Rojas',
      },
      knowsAbout: [
        'Web Development',
        'Software Development',
        'Mobile Apps',
        'APIs',
        'Microservices',
        'UX/UI Design',
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: 'codiva®',
      url: 'https://codiva.cl/en/',
      description:
        'Software development studio in Santiago, Chile. Web apps, mobile apps, custom software, and microservices. INAPI Trademark #1481622.',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Jose Manuel Infante 1805, 907',
        addressLocality: 'Ñuñoa',
        addressRegion: 'Santiago',
        addressCountry: 'CL',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: -33.4569,
        longitude: -70.599,
      },
      email: 'hola@codiva.cl',
      priceRange: '$$',
      serviceType: [
        'Web Design & Development',
        'Web & Mobile Apps',
        'Custom Software',
        'APIs & Microservices',
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Software Development Services',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Web Design & Development',
              description:
                'Websites, landing pages, and platforms with high-end design and precise code.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Web & Mobile Apps',
              description:
                'Native apps, PWAs, and complex web applications with seamless cross-platform experiences.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Custom Software',
              description:
                'Systems, ERPs, dashboards, and tailored software solutions for your business.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'APIs & Microservices',
              description:
                'Scalable architecture, REST/GraphQL APIs, integrations, and cloud services.',
            },
          },
        ],
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is codiva?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'codiva® is a Chilean registered trademark at the National Institute of Industrial Property (INAPI) under registration #1481622, Class 42, dedicated to web design and software development.',
          },
        },
        {
          '@type': 'Question',
          name: 'What services does codiva offer?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'codiva® offers Web Design & Development, Web & Mobile Apps, Custom Software, and APIs & Microservices. We create high-end digital solutions combining design with precise technical development.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is codiva a registered trademark in Chile?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, codiva® is officially registered at INAPI Chile with registration #1481622, application #1618736, registered on November 27, 2025, under Class 42 (Web design and development), valid until November 27, 2035.',
          },
        },
        {
          '@type': 'Question',
          name: 'Where is codiva located?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'codiva® is located in Ñuñoa, Santiago, Chile. We provide software development services locally and remotely for clients across Chile and Latin America.',
          },
        },
        {
          '@type': 'Question',
          name: 'How can I contact codiva?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'You can contact codiva® by sending an email to hola@codiva.cl for inquiries about software development and web projects.',
          },
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://codiva.cl/en/',
        },
      ],
    },
  ],
  nav: {
    ariaLabel: 'Main navigation',
    brandAria: 'codiva - Home',
    links: [
      { href: '#about', label: 'About' },
      { href: '#services', label: 'Services' },
      { href: '#trademark', label: 'Trademark' },
      { href: '#faq', label: 'FAQ' },
      { href: '#contact', label: 'Contact' },
    ],
    lang: { href: '/', label: 'ES', aria: 'Cambiar a Español' },
    burgerOpen: 'Open navigation menu',
    burgerClose: 'Close navigation menu',
  },
  hero: {
    logoAlt: 'codiva — Brand symbol',
    eyebrow: 'Registered Trademark in Chile — INAPI #1481622',
    subtitle: 'Software · Web · Apps · Services',
    ctaPrimary: 'Start a project',
    ctaSecondary: 'Explore',
  },
  marquee1: ['codiva', 'software', 'web · apps', 'chile'],
  about: {
    label: 'About',
    heading: 'We create digital experiences that <em>transcend</em>',
    texts: [
      'codiva® is a Chilean trademark registered at the National Institute of Industrial Property (INAPI), dedicated to web design and software development under Class 42 of the Nice Classification.',
      'We combine high-end design with precise technical development to create software, web applications, mobile apps, and digital services that work flawlessly.',
    ],
    stats: [
      { number: '42', label: 'INAPI Class' },
      { number: '2025', label: 'Registered' },
      { number: '2035', label: 'Valid until' },
    ],
  },
  services: {
    label: 'Services',
    heading: 'What we do',
    cards: [
      {
        number: '01',
        title: 'Web Design & Development',
        desc: 'Websites, landing pages, and platforms with high-end design and precise code.',
      },
      {
        number: '02',
        title: 'Web & Mobile Apps',
        desc: 'Native apps, PWAs, and complex web applications with seamless cross-platform experiences.',
      },
      {
        number: '03',
        title: 'Custom Software',
        desc: 'Systems, ERPs, dashboards, and tailored software solutions for your business.',
      },
      {
        number: '04',
        title: 'APIs & Microservices',
        desc: 'Scalable architecture, REST/GraphQL APIs, integrations, and cloud services.',
      },
    ],
  },
  marquee2: ['registration 1481622', 'registered trademark', 'class 42', 'INAPI chile'],
  trademark: {
    label: 'Registered Trademark',
    logoAlt: 'codiva — Registered trademark symbol',
    heading: 'Protected by law',
    rows: [
      { key: 'Name', val: 'codiva' },
      { key: 'Registration #', val: '1481622' },
      { key: 'Application #', val: '1618736' },
      { key: 'Registration Date', val: '<time datetime="2025-11-27">November 27, 2025</time>' },
      { key: 'Valid until', val: '<time datetime="2035-11-27">November 27, 2035</time>' },
      { key: 'Sign Type', val: 'Denominative' },
      { key: 'Class', val: '42 — Web design and development' },
      { key: 'Authority', val: 'INAPI — National Institute of Industrial Property, Chile' },
    ],
  },
  faq: {
    label: 'FAQ',
    heading: 'Frequently asked questions',
    items: [
      {
        q: 'What is codiva?',
        a: 'codiva® is a Chilean registered trademark at the National Institute of Industrial Property (INAPI) under registration #1481622, Class 42, dedicated to web design and software development. Based in Santiago, Chile, we combine high-end design with precise technical development.',
      },
      {
        q: 'What services does codiva offer?',
        a: 'codiva® offers four main services: Web Design & Development (sites and platforms), Web & Mobile Apps (native apps and PWAs), Custom Software (systems and dashboards), and APIs & Microservices (scalable architecture and cloud services).',
      },
      {
        q: 'Is codiva a registered trademark in Chile?',
        a: 'Yes, codiva® is officially registered at INAPI Chile. Registration #1481622, application #1618736, registered on November 27, 2025, as a denominative trademark under Class 42 (Web design and development), valid until November 27, 2035.',
      },
      {
        q: 'Where is codiva located?',
        a: 'codiva® is located in Ñuñoa, Santiago, Chile. We provide software development services both locally and remotely for clients across Chile and Latin America.',
      },
      {
        q: 'How can I contact codiva for a project?',
        a: 'You can reach us by sending an email to <a href="mailto:hola@codiva.cl">hola@codiva.cl</a>. We\'d love to discuss your project and how we can help you build an exceptional digital experience.',
      },
    ],
  },
  contact: {
    label: 'Contact',
    heading: "Let's build something<br><em>extraordinary</em>",
    text: "Have a project in mind? Let's talk about how we can take it to the next level.",
    email: 'hola@codiva.cl',
    location: 'Ñuñoa, Santiago — Chile',
  },
  footer: {
    copy: '&copy; 2025 codiva. All rights reserved.',
    meta: ['Registered trademark INAPI #1481622', 'Class 42 — Web design and development'],
  },
};

export const content: Record<Locale, Content> = { es, en };

export function getContent(locale: Locale): Content {
  return content[locale];
}
