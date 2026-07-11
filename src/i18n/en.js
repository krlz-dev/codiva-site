// English locale (/en/) — all visible text + SEO metadata + Schema.org JSON-LD.
export default {
  lang: 'en',
  htmlLang: 'en',

  meta: {
    title: 'codiva® — Web & Software Development in Chile · Sites, Apps & Services',
    description:
      'Independent web design and software development studio in Santiago, Chile. We build websites, web & mobile apps, and custom software with high-end design. codiva® is a registered trademark with INAPI.',
    keywords:
      'codiva, web development chile, software development, mobile apps, custom software, microservices, APIs, digital identity, Santiago Chile, registered trademark INAPI',
    canonical: 'https://codiva.cl/en/',
    ogUrl: 'https://codiva.cl/en/',
    ogTitle: 'codiva® — Web & Software Development in Chile',
    ogDescription:
      'Independent web design and software development studio in Santiago, Chile. Websites, web & mobile apps, and custom software with high-end design.',
    ogLocale: 'en_US',
    twitterTitle: 'codiva® — Web & Software Development in Chile',
    twitterDescription:
      'Independent web design and software development studio in Santiago, Chile. Websites, apps, and custom software.',
  },

  schema: [
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
        email: 'contactos@codiva.cl',
        contactType: 'customer service',
        availableLanguage: ['Spanish', 'English'],
      },
      founder: { '@type': 'Person', name: 'Carlos Andrés Monserrat Rojas Rojas' },
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
      geo: { '@type': 'GeoCoordinates', latitude: -33.4569, longitude: -70.599 },
      email: 'contactos@codiva.cl',
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
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Web Design & Development', description: 'Websites and web platforms with high-end design and precise code, built to last.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Web & Mobile Apps', description: 'Native apps, PWAs, and complex web applications with seamless cross-platform experiences.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Custom Software', description: 'Systems, ERPs, dashboards, and tailored software solutions for your business.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'APIs & Microservices', description: 'Scalable architecture, REST/GraphQL APIs, integrations, and cloud services.' } },
        ],
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'What is codiva?', acceptedAnswer: { '@type': 'Answer', text: 'codiva® is a Chilean registered trademark at the National Institute of Industrial Property (INAPI) under registration #1481622, Class 42, dedicated to web design and software development.' } },
        { '@type': 'Question', name: 'What services does codiva offer?', acceptedAnswer: { '@type': 'Answer', text: 'codiva® offers Web Design & Development, Web & Mobile Apps, Custom Software, and APIs & Microservices. We create high-end digital solutions combining design with precise technical development.' } },
        { '@type': 'Question', name: 'Is codiva a registered trademark in Chile?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, codiva® is officially registered at INAPI Chile with registration #1481622, application #1618736, registered on November 27, 2025, under Class 42 (Web design and development), valid until November 27, 2035.' } },
        { '@type': 'Question', name: 'Where is codiva located?', acceptedAnswer: { '@type': 'Answer', text: 'codiva® is located in Ñuñoa, Santiago, Chile. We provide software development services locally and remotely for clients across Chile and Latin America.' } },
        { '@type': 'Question', name: 'How can I contact codiva?', acceptedAnswer: { '@type': 'Answer', text: 'You can contact codiva® by sending an email to contactos@codiva.cl for inquiries about software development and web projects.' } },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://codiva.cl/en/' }],
    },
  ],

  nav: {
    ariaLabel: 'Main navigation',
    logoAria: 'codiva - Home',
    links: [
      { href: '#about', label: 'About' },
      { href: '#plans', label: 'How we work' },
      { href: '/en/projects', label: 'Projects' },
      { href: '#faq', label: 'FAQ' },
      { href: '#contact', label: 'Contact' },
    ],
    langSwitch: { href: '/', label: 'ES', aria: 'Cambiar a Español' },
    themeToggle: { toDark: 'Switch to dark mode', toLight: 'Switch to light mode' },
    burgerOpen: 'Open navigation menu',
    burgerClose: 'Close navigation menu',
  },

  hero: {
    logoAlt: 'codiva — Brand symbol',
    eyebrow: 'Boutique studio · end-to-end',
    subtitle: 'We build your complete product: design, frontend, backend, and AI. No middlemen.',
    ctaPrimary: 'Start a project',
    ctaGhost: 'Explore',
  },

  marquee1: ['codiva', 'software', 'web · apps', 'chile'],
  marquee2: ['design', 'development', 'digital identity', 'santiago · chile'],

  techLabel: 'Technologies we use',
  tech: ['Hostinger', 'Docker', 'Java', 'Scala', 'JavaScript', 'Python', 'Google Analytics'],

  about: {
    label: 'About',
    headingHtml: 'A boutique studio that builds your product <em>end to end</em>',
    paragraphs: [
      'codiva is a boutique studio of two senior software engineers with complementary roles: Carlos on backend, architecture, and AI — Java, Scala, RAG/LLM, and distributed systems; Marina on product design and frontend — fullstack JavaScript, React/Next, and BFF. Between the two of us we cover design, frontend, backend, AI, mobile, and deployment — without outsourcing anything.',
      'That means you talk directly with the people building your product, with no middlemen. With 14+ years of experience — including healthcare SaaS on the FHIR standard and distributed systems — we work with startups and companies in Chile and abroad that want products cared for in every detail, based in Ñuñoa, Santiago, Chile.',
    ],
    capabilitiesLabel: 'What we build',
    capabilities: [
      'Custom software',
      'Web & mobile apps',
      'Platforms & SaaS',
      'APIs & microservices',
      'AI / RAG',
    ],
  },

  trademark: {
    meta: {
      title: 'Registered Trademark — codiva® | INAPI #1481622',
      description: 'codiva® is a trademark registered in Chile with INAPI (#1481622, Class 42) under the name of Carlos Andrés Monserrat Rojas Rojas.',
      keywords: 'codiva registered trademark, INAPI 1481622, trademark Chile, Class 42',
      canonical: 'https://codiva.cl/en/trademark/',
      ogUrl: 'https://codiva.cl/en/trademark/',
      ogTitle: 'Registered Trademark — codiva®',
      ogDescription: 'Trademark registered in Chile with INAPI #1481622, Class 42.',
      ogLocale: 'en_US',
      twitterTitle: 'Registered Trademark — codiva®',
      twitterDescription: 'Trademark registered in Chile with INAPI #1481622, Class 42.',
    },
    label: 'Registered trademark',
    heading: 'codiva® is a registered trademark',
    note: 'codiva® is a trademark registered in Chile with the National Institute of Industrial Property (INAPI), under the name of <strong>Carlos Andrés Monserrat Rojas Rojas</strong>, under which we provide independent professional design and development services. The name and its commercial use are protected by law.',
    rows: [
      { key: 'Name', valHtml: 'codiva' },
      { key: 'Holder', valHtml: 'Carlos Andrés Monserrat Rojas Rojas' },
      { key: 'Registration #', valHtml: '1481622' },
      { key: 'Application #', valHtml: '1618736' },
      { key: 'Registration Date', valHtml: '<time datetime="2025-11-27">November 27, 2025</time>' },
      { key: 'Valid until', valHtml: '<time datetime="2035-11-27">November 27, 2035</time>' },
      { key: 'Sign Type', valHtml: 'Denominative' },
      { key: 'Class', valHtml: '42 — Web design and development' },
      { key: 'Authority', valHtml: 'INAPI — National Institute of Industrial Property, Chile' },
    ],
    back: '← Back to home',
  },

  plans: {
    label: 'How we work',
    heading: 'A way of working, not a price list',
    intro: "We don't sell websites by the page. We partner with a small number of companies each year to design and build the software they run their business on. Every project is led by the same two people from start to finish — no middlemen, no handoffs, no rotating team.",
    models: [
      {
        step: '01',
        phase: 'Validate',
        name: 'Product Sprint',
        meta: '1–2 weeks',
        tagline: 'Before you commit to a full build, we turn your idea into a real, tested prototype with a clear plan. You leave with something tangible in your hands.',
        features: [
          'Scoping and definition sessions',
          'A working, navigable prototype',
          'Architecture and stack decisions',
          'Technical plan and roadmap',
        ],
        cta: "Let's start here",
        waMessage: 'Hi codiva 👋, I am interested in a Product Sprint.',
      },
      {
        step: '02',
        phase: 'Build',
        name: 'Product Build',
        meta: 'Full project · custom',
        badge: 'Most requested',
        featured: true,
        tagline: 'We embed with your team and own the outcome, taking your product from zero to production. Design, frontend, backend and AI — built to last.',
        features: [
          'Product design and frontend',
          'Backend, APIs and integrations',
          'AI / RAG where it adds value',
          'Production-grade code and deployment',
        ],
        cta: 'Tell us about your project',
        waMessage: 'Hi codiva 👋, I want to build a product with you.',
      },
      {
        step: '03',
        phase: 'Scale',
        name: 'Ongoing Partnership',
        meta: 'Monthly collaboration',
        tagline: 'For products already live: we keep shipping, month after month, treating your codebase like our own. Includes technical SEO and analytics so you grow with data.',
        features: [
          'Evolution and new features',
          'Technical SEO + Google Analytics 4',
          'Data-driven improvements',
          'Maintenance and support',
        ],
        cta: "Let's talk",
        waMessage: 'Hi codiva 👋, I am interested in an ongoing partnership or support.',
      },
    ],
    note: "We take on a small number of projects at a time so each one gets real focus and the same hands from start to finish, not a rotating team. Investment is defined by scope — let's talk, no commitment.",
  },

  projects: {
    label: 'Projects',
    heading: 'Selected work',
    teaserHeading: 'Some of our work',
    intro: 'A sample of the software we design and build: web platforms, mobile apps, SaaS, and AI/RAG systems for startups and companies in Chile and abroad.',
    viewAll: 'View all projects',
    viewAllHref: '/en/projects',
    back: '← Back to home',
    cta: {
      text: 'Have something like this in mind?',
      label: 'Tell us about your project',
      waMessage: 'Hi codiva 👋, I saw your projects and would like to talk about a similar one.',
    },
    meta: {
      title: 'Projects — Custom Software, Apps &amp; Platforms | codiva®',
      description:
        'Selected work by codiva®: web platforms, mobile apps, SaaS, and AI/RAG systems designed and built end to end in Santiago, Chile.',
      keywords:
        'codiva projects, software development portfolio chile, web platforms, mobile apps, SaaS, RAG AI, case studies, Santiago Chile',
      canonical: 'https://codiva.cl/en/projects/',
      ogUrl: 'https://codiva.cl/en/projects/',
      ogTitle: 'Projects — codiva®',
      ogDescription:
        'Web platforms, mobile apps, SaaS, and AI systems built end to end in Santiago, Chile.',
      ogLocale: 'en_US',
      twitterTitle: 'Projects — codiva®',
      twitterDescription:
        'Selected work: platforms, apps, and custom software by codiva®.',
    },
    items: [
      {
        name: 'eConstitucional',
        year: '2025',
        type: 'Web platform',
        tags: ['LegalTech', 'RAG', 'AI'],
        image: '/portfolio/econstitucional.webp',
        desc: "Query platform for Bolivia's 2009 Political Constitution with a RAG-based AI assistant. Users browse all 411 articles by category and ask questions in natural language, getting answers grounded directly in the constitutional text.",
        url: 'https://www.econstitucional.com.bo/',
        linkLabel: 'Visit site',
      },
      {
        name: 'kit-a',
        year: '2025',
        type: 'Web app',
        tags: ['DevTools', 'Visual Editor', 'SaaS'],
        image: '/portfolio/kit-a.webp',
        desc: 'Browser-based tool for building architecture diagrams. It includes a library of 1,800+ components (AWS, Azure, GCP, and generic), templates, an interactive canvas with nodes and links, and export — with nothing to install.',
        url: 'https://kit-a.com/',
        linkLabel: 'Visit site',
      },
      {
        name: 'ZooMinder',
        year: '2025',
        type: 'Mobile app',
        tags: ['PetTech', 'Mobile App', 'SaaS'],
        image: '/portfolio/zoominder.webp',
        desc: 'Pet health management mobile app. It centralizes medication reminders, vet appointments, and medical records, with push notifications, per-pet profiles, family sharing, and offline-first sync with cloud backup.',
        url: 'https://zoo-minder.com/',
        linkLabel: 'Visit site',
      },
      {
        name: 'Reporte Bolivia',
        year: '2025',
        type: 'Web platform',
        tags: ['Media Intelligence', 'Dashboard', 'SaaS'],
        image: '/portfolio/reporte-bolivia.webp',
        desc: "Media intelligence platform that monitors Bolivia's news agenda. It delivers analytical editions twice a day with summaries from multiple sources, thematic categorization, a metrics dashboard, and a searchable archive.",
        url: 'https://reporte-bolivia.com/',
        linkLabel: 'Visit site',
      },
    ],
  },

  faq: {
    label: 'FAQ',
    heading: 'Frequently asked questions',
    items: [
      { q: 'What is codiva?', aHtml: '<p>codiva® is an independent web design and development studio based in Ñuñoa, Santiago, Chile. We combine high-end design with precise technical development to build sites, applications, mobile apps, and custom software. The name is a registered trademark with INAPI (#1481622).</p>' },
      { q: 'What services does codiva offer?', aHtml: '<p>codiva® offers four main services: Web Design & Development (sites and platforms), Web & Mobile Apps (native apps and PWAs), Custom Software (systems and dashboards), and APIs & Microservices (scalable architecture and cloud services).</p>' },
      { q: 'Is codiva a registered trademark in Chile?', aHtml: '<p>Yes, codiva® is officially registered at INAPI Chile. Registration #1481622, application #1618736, registered on November 27, 2025, as a denominative trademark under Class 42 (Web design and development), valid until November 27, 2035.</p>' },
      { q: 'Where is codiva located?', aHtml: '<p>codiva® is located in Ñuñoa, Santiago, Chile. We provide software development services both locally and remotely for clients across Chile and Latin America.</p>' },
      { q: 'How can I contact codiva for a project?', aHtml: '<p>You can reach us by sending an email to <a href="mailto:contactos@codiva.cl">contactos@codiva.cl</a>. We\'d love to discuss your project and how we can help you build an exceptional digital experience.</p>' },
    ],
  },

  contact: {
    label: 'Contact',
    headingHtml: "Let's build something<br><em>extraordinary</em>",
    text: "Have a project in mind? Let's talk about how we can take it to the next level.",
    whatsapp: {
      number: '56957173936',
      label: 'Message us on WhatsApp',
      message: 'Hi codiva 👋, I would like to quote a project.',
    },
    emailLabel: 'Or email us at',
    email: 'contactos@codiva.cl',
    location: 'Ñuñoa, Santiago — Chile',
  },

  team: {
    label: 'Team',
    heading: 'The people behind',
    members: [
      { name: 'Carlos Rojas', role: 'Backend · Architecture · AI', desc: 'Backend and fullstack engineer: Java, Scala, and Angular. AI/RAG, distributed systems, and architecture. Mobile with Flutter. 14 years of experience.', url: 'https://krlz.dev/', image: '/team/carlos.webp', alt: 'Carlos Rojas — Software engineer: backend, architecture, and AI' },
      { name: 'Marina Alekseeva', role: 'Design · Frontend · Fullstack JS', desc: 'Frontend-focused software engineer. Product design and UX/UI, fullstack JavaScript and BFF (React/Next). Mobile with Flutter.', url: 'https://maryaleks.dev/', image: '/team/marina.webp', alt: 'Marina Alekseeva — Software engineer: design and frontend' },
    ],
  },

  footer: {
    copy: 'All rights reserved.',
    legal: { href: '/en/trademark/', label: 'codiva® — registered trademark INAPI #1481622' },
  },
};
