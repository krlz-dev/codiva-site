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
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Web Design & Development', description: 'Websites, landing pages, and platforms with high-end design and precise code.' } },
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
      { href: '#services', label: 'Services' },
      { href: '#plans', label: 'Plans' },
      { href: '#projects', label: 'Projects' },
      { href: '#faq', label: 'FAQ' },
      { href: '#contact', label: 'Contact' },
    ],
    langSwitch: { href: '/', label: 'ES', aria: 'Cambiar a Español' },
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
    headingHtml: 'A two-person studio that builds your product <em>end to end</em>',
    paragraphs: [
      'codiva is a boutique studio of two senior software engineers with complementary roles: Carlos on backend, architecture, and AI — Java, Scala, RAG/LLM, and distributed systems; Marina on product design and frontend — fullstack JavaScript, React/Next, and BFF. Between the two of us we cover design, frontend, backend, AI, mobile, and deployment — without outsourcing anything.',
      'That means you talk directly with the people building your product, with no middlemen. With 14+ years of experience — including healthcare SaaS on the FHIR standard and distributed systems — we work with startups and companies in Chile and abroad that want products cared for in every detail, based in Ñuñoa, Santiago, Chile.',
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
    note: 'codiva® is a trademark registered in Chile with the National Institute of Industrial Property (INAPI), under the name of <strong>Carlos Andrés Monserrat Rojas Rojas</strong>, under which I provide independent professional design and development services. The name and its commercial use are protected by law.',
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

  services: {
    label: 'Services',
    heading: 'What we do',
    cards: [
      { number: '01', title: 'Web Design &amp; Development', desc: 'Websites, landing pages, and platforms with high-end design and precise code.' },
      { number: '02', title: 'Web &amp; Mobile Apps', desc: 'Native apps, PWAs, and complex web applications with seamless cross-platform experiences.' },
      { number: '03', title: 'Custom Software', desc: 'Systems, ERPs, dashboards, and tailored software solutions for your business.' },
      { number: '04', title: 'APIs &amp; Microservices', desc: 'Scalable architecture, REST/GraphQL APIs, integrations, and cloud services.' },
    ],
  },

  plans: {
    label: 'Plans',
    heading: 'Clear plans for your business',
    intro: 'Small and medium projects with transparent pricing. Every plan includes baseline SEO and Google Analytics, so your site is found on Google and you can measure results from day one.',
    tiers: [
      {
        name: 'Landing',
        price: 'from $190.000',
        tagline: 'One page, fast launch.',
        features: [
          'One conversion-focused page',
          'Responsive design (mobile & desktop)',
          'Baseline SEO + Google Analytics 4',
          'WhatsApp button and contact form',
          'Publishing and go-live',
        ],
        cta: 'Get a landing quote',
        waMessage: 'Hi codiva 👋, I am interested in the Landing plan.',
      },
      {
        name: 'Website',
        price: 'from $490.000',
        tagline: 'Multi-page site for your company or brand.',
        badge: 'Recommended',
        featured: true,
        features: [
          'Up to 5–6 sections or pages',
          'Custom, responsive design',
          'On-page SEO + Analytics 4 + Search Console',
          'WhatsApp and social integration',
          'Speed and best-practice optimization',
        ],
        cta: 'Get a site quote',
        waMessage: 'Hi codiva 👋, I am interested in the Website plan.',
      },
      {
        name: 'Store / Custom',
        price: 'Custom quote',
        tagline: 'E-commerce, app, or custom platform.',
        features: [
          'Online store or platform/app',
          'Payment gateway and integrations',
          'Custom functionality and scope',
          'APIs and connection to your systems',
          'Scope and timeline defined with you',
        ],
        cta: "Let's talk",
        waMessage: 'Hi codiva 👋, I would like to quote a custom project.',
      },
    ],
    support: {
      label: 'Ongoing support',
      name: 'SEO & Google Analytics',
      desc: 'Launching is not enough: I help people find you on Google and help you understand what your visitors do. Setup, metrics tracking, and month-over-month improvements so your site keeps growing.',
      features: [
        'Google Analytics 4 + Search Console',
        'Technical and content SEO',
        'Clear monthly reports',
        'Continuous improvements based on results',
      ],
      price: 'Monthly plan',
      cta: 'I want SEO support',
      waMessage: 'Hi codiva 👋, I am interested in SEO and Google Analytics support.',
    },
    note: "Reference prices in CLP; the final price depends on scope. Let's talk, no commitment.",
  },

  projects: {
    label: 'Projects',
    heading: 'Projects we have built',
    items: [
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
      label: 'Message me on WhatsApp',
      message: 'Hi codiva 👋, I would like to quote a project.',
    },
    emailLabel: 'Or email me at',
    email: 'contactos@codiva.cl',
    location: 'Ñuñoa, Santiago — Chile',
  },

  team: {
    label: 'Team',
    heading: 'Two people, one complete product',
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
