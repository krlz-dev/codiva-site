// Spanish (default locale) — all visible text + SEO metadata + Schema.org JSON-LD.
// Edit copy here; components render from this object.
export default {
  lang: 'es',
  htmlLang: 'es',

  // Cal.com booking link — primary CTA for scheduling a 30-min intro call.
  bookingUrl: 'https://cal.com/krlz.dev',

  meta: {
    title: 'Desarrollo de software a medida en Santiago | codiva®',
    description:
      'Estudio de dos ingenieros senior. Diseño, frontend, backend e IA de principio a fin — sin juniors ni subcontratar. También tomamos proyectos ya empezados.',
    keywords:
      'desarrollo de software a medida Santiago, estudio de software Chile, ingenieros senior, backend, frontend, IA, rescate de proyectos de software, retomar desarrollo, Ñuñoa',
    canonical: 'https://codiva.cl/',
    ogUrl: 'https://codiva.cl/',
    ogTitle: 'Desarrollo de software a medida en Santiago — codiva®',
    ogDescription:
      'Estudio de dos ingenieros senior. Diseño, frontend, backend e IA de principio a fin — sin juniors ni subcontratar. También tomamos proyectos ya empezados.',
    ogLocale: 'es_CL',
    twitterTitle: 'Desarrollo de software a medida — codiva®',
    twitterDescription:
      'Dos ingenieros senior. Diseño, frontend, backend e IA de principio a fin. También retomamos proyectos ya empezados.',
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
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Diseño y Desarrollo Web', description: 'Sitios y plataformas web con diseño de alto nivel y código preciso, construidos para durar.' } },
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
        { '@type': 'Question', name: '¿Qué es codiva?', acceptedAnswer: { '@type': 'Answer', text: 'codiva® es un estudio independiente de dos ingenieros de software senior con base en Ñuñoa, Santiago de Chile. Construimos producto completo —diseño, frontend, backend e IA— de principio a fin, sin juniors ni subcontratar.' } },
        { '@type': 'Question', name: '¿Qué servicios ofrece codiva?', acceptedAnswer: { '@type': 'Answer', text: 'Cinco frentes, en orden de foco: software a medida (sistemas, plataformas internas y dashboards); desarrollo de producto de principio a fin (diseño, frontend, backend e IA); aplicaciones web y móviles; APIs y microservicios; y estabilización y continuación de productos que ya existen.' } },
        { '@type': 'Question', name: '¿Quién es dueño del código?', acceptedAnswer: { '@type': 'Answer', text: 'Tú, desde el primer commit. El repositorio queda a tu nombre y te entregamos todo: código, infraestructura y documentación, sin dependencias ocultas.' } },
        { '@type': 'Question', name: '¿Pueden tomar un proyecto que ya empezó otra persona?', acceptedAnswer: { '@type': 'Answer', text: 'Sí. Tomamos bases de código heredadas —de un freelancer, una agencia anterior o un equipo previo—, las estabilizamos y seguimos construyendo sobre ellas.' } },
        { '@type': 'Question', name: 'Son solo dos personas, ¿qué pasa si se enferman o se llenan de trabajo?', acceptedAnswer: { '@type': 'Answer', text: 'Tomamos pocos proyectos a la vez para no sobrecomprometernos. Ambos conocemos cada proyecto, así que nada depende de una sola persona, y tu código y documentación siempre viven en tu repositorio.' } },
        { '@type': 'Question', name: '¿Trabajan con equipos internos o reemplazan al equipo?', acceptedAnswer: { '@type': 'Answer', text: 'Ambos. Nos integramos a tu equipo interno cuando lo hay, o funcionamos como tu equipo de producto completo cuando no.' } },
        { '@type': 'Question', name: '¿Cuánto cuesta un proyecto?', acceptedAnswer: { '@type': 'Answer', text: 'Un Sprint de Producto parte desde CLP $2.500.000 y un proyecto completo suele estar entre CLP $15.000.000 y $60.000.000, según alcance. En la primera llamada de 30 minutos te damos un rango real.' } },
        { '@type': 'Question', name: '¿Cuánto se demora un proyecto?', acceptedAnswer: { '@type': 'Answer', text: 'Un Sprint de Producto son 1–2 semanas. Un producto completo, entre 6 y 16 semanas según alcance. Te damos una fecha en la propuesta y te avisamos apenas algo la ponga en riesgo.' } },
        { '@type': 'Question', name: '¿Qué pasa si el proyecto no resulta?', acceptedAnswer: { '@type': 'Answer', text: 'Por eso existe el Sprint de Producto: 1–2 semanas pagadas con entregables concretos, al final de las cuales cualquiera puede decidir no seguir, y te quedas con el prototipo, las decisiones de arquitectura y el plan técnico.' } },
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
      { href: '#plans', label: 'Cómo trabajamos' },
      {
        label: 'Trabajo',
        href: '/proyectos',
        children: [
          { href: '/proyectos', label: 'Proyectos' },
          { href: '/rescate-de-proyectos', label: 'Rescate de proyectos' },
        ],
      },
      { href: '#faq', label: 'FAQ' },
      { href: '#contact', label: 'Contacto' },
    ],
    langSwitch: { href: '/en/', label: 'EN', aria: 'Switch to English' },
    themeToggle: { toDark: 'Activar modo oscuro', toLight: 'Activar modo claro', viewDark: 'Ver en oscuro', viewLight: 'Ver en claro' },
    burgerOpen: 'Abrir menú de navegación',
    burgerClose: 'Cerrar menú de navegación',
  },

  hero: {
    logoAlt: 'codiva — Símbolo de marca',
    eyebrow: 'Dos ingenieros senior · end-to-end',
    h1: 'Los que te venden el proyecto son los que lo construyen.',
    subtitle: 'Diseño, frontend, backend e IA, de principio a fin. Sin juniors, sin subcontratar, sin intermediarios.',
    ctaPrimary: 'Agenda 30 minutos',
    ctaGhost: 'Ver cómo trabajamos',
  },

  marquee1: ['codiva', 'software', 'web · apps', 'chile'],
  marquee2: ['diseño', 'desarrollo', 'identidad digital', 'santiago · chile'],

  techLabel: 'Tecnologías que utilizamos',
  tech: ['TypeScript', 'React', 'Java', 'Scala', 'Python', 'PostgreSQL', 'Contenedores'],

  about: {
    label: 'Nosotros',
    headingHtml: 'Un estudio boutique que construye tu producto <em>de principio a fin</em>',
    paragraphs: [
      'Codiva es un estudio de dos ingenieros de software senior que construye producto de punta a punta: Carlos —14 años en arquitectura backend, sistemas distribuidos e IA— y Marina en diseño de producto y frontend. Diseño, frontend, backend, IA, móvil y despliegue, sin subcontratar.',
      'Tomamos pocos proyectos a la vez. Eso significa que hablas siempre con quienes escriben el código: sin intermediarios, sin traspasos de contexto, sin explicar dos veces lo mismo.',
      'Y cuidamos lo que se nota tarde: que el sistema aguante cuando crezca, que otro equipo pueda mantenerlo, que no se caiga un viernes a las seis. Escalabilidad, rendimiento, disponibilidad, seguridad y mantenibilidad no son extras: son lo que decide si tu producto sigue en pie en tres años.',
    ],
    cta: {
      label: 'Agenda 30 minutos',
      waMessage: 'Hola codiva 👋, ¿conversamos 30 minutos sobre mi proyecto?',
    },
    capabilitiesLabel: 'Qué construimos',
    capabilities: [
      'Software a medida',
      'Aplicaciones web y móviles',
      'Plataformas y SaaS',
      'APIs y microservicios',
      'Inteligencia artificial',
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

  plans: {
    label: 'Cómo trabajamos',
    heading: 'Una forma de trabajar, no una lista de precios',
    intro: 'No vendemos sitios por página. Nos asociamos con un número acotado de empresas al año para diseñar y construir el software en el que apoyan su negocio. Cada proyecto lo llevan las mismas dos personas de principio a fin, sin intermediarios ni traspasos.',
    models: [
      {
        step: '01',
        phase: 'Validar',
        name: 'Sprint de Producto',
        meta: '1–2 semanas',
        tagline: 'Antes de comprometerte con un desarrollo completo, convertimos tu idea en un prototipo real y probado, con un plan claro. Sales con algo tangible en las manos.',
        features: [
          'Sesiones de definición y alcance',
          'Prototipo funcional y navegable',
          'Decisiones de arquitectura y stack',
          'Plan técnico y hoja de ruta',
        ],
        cta: 'Partamos por aquí',
        waMessage: 'Hola codiva 👋, me interesa un Sprint de Producto.',
      },
      {
        step: '02',
        phase: 'Construir',
        name: 'Desarrollo de Producto',
        meta: 'Proyecto completo · a medida',
        badge: 'Recomendado para empezar',
        featured: true,
        tagline: 'Nos integramos a tu equipo y respondemos por el resultado: llevamos tu producto de cero a producción. Diseño, frontend, backend e IA —construido para durar.',
        features: [
          'Diseño de producto y frontend',
          'Backend, APIs e integraciones',
          'IA cuando aporta valor',
          'Código production-grade y despliegue',
        ],
        cta: 'Cuéntanos tu proyecto',
        waMessage: 'Hola codiva 👋, quiero construir un producto con ustedes.',
      },
      {
        step: '03',
        phase: 'Escalar',
        name: 'Alianza Continua',
        meta: 'Colaboración mensual',
        tagline: 'Para productos ya en marcha: seguimos entregando mes a mes y cuidamos tu código como propio. Incluye SEO técnico y analítica para que crezcas con datos.',
        features: [
          'Evolución y nuevas funcionalidades',
          'SEO técnico + Google Analytics 4',
          'Mejoras basadas en datos',
          'Mantenimiento y soporte',
        ],
        cta: 'Conversemos',
        waMessage: 'Hola codiva 👋, me interesa una alianza continua o soporte.',
      },
    ],
    note: 'Tomamos pocos proyectos a la vez para dedicarle a cada uno atención real, con las mismas manos de principio a fin.',
    priceAnchor: 'Un Sprint de Producto parte desde CLP $2.500.000. Los proyectos completos suelen estar entre CLP $15.000.000 y $60.000.000, según alcance. Si tu presupuesto está por debajo de eso, te lo decimos en la primera llamada en vez de hacerte perder tiempo.',
    more: {
      text: 'Detrás de cada fase hay un método. El detalle de cómo diseñamos y construimos —descubrimiento, specs, componentes y arquitectura— vive en una página aparte.',
      label: 'Ver cómo construimos',
      href: '/como-construimos',
    },
  },

  projects: {
    label: 'Proyectos',
    heading: 'Trabajos seleccionados',
    teaserHeading: 'Algunos de nuestros trabajos',
    intro: 'Una muestra del software que diseñamos y construimos: plataformas, aplicaciones y productos a medida para startups y empresas en Chile y el extranjero.',
    viewAll: 'Ver todos los proyectos',
    viewAllHref: '/proyectos',
    back: '← Volver al inicio',
    cta: {
      text: '¿Tienes un proyecto parecido en mente?',
      label: 'Cuéntanos tu proyecto',
      waMessage: 'Hola codiva 👋, vi sus proyectos y quiero conversar sobre uno parecido.',
    },
    meta: {
      title: 'Proyectos — Software, Apps y Plataformas a Medida | codiva®',
      description:
        'Trabajos seleccionados de codiva®: plataformas web, aplicaciones móviles, SaaS y sistemas con IA/RAG diseñados y construidos de principio a fin en Santiago de Chile.',
      keywords:
        'proyectos codiva, portafolio desarrollo software chile, plataformas web, aplicaciones móviles, SaaS, RAG IA, casos de éxito, Santiago Chile',
      canonical: 'https://codiva.cl/proyectos/',
      ogUrl: 'https://codiva.cl/proyectos/',
      ogTitle: 'Proyectos — codiva®',
      ogDescription:
        'Plataformas web, aplicaciones móviles, SaaS y sistemas con IA construidos de principio a fin en Santiago de Chile.',
      ogLocale: 'es_CL',
      twitterTitle: 'Proyectos — codiva®',
      twitterDescription:
        'Trabajos seleccionados: plataformas, apps y software a medida por codiva®.',
    },
    items: [
      {
        name: 'eConstitucional',
        year: '2025',
        type: 'Plataforma web',
        tags: ['LegalTech', 'RAG', 'IA'],
        image: '/portfolio/econstitucional.webp',
        desc: 'Plataforma de consulta de la Constitución Política del Estado de Bolivia (2009) con un asistente de IA basado en RAG. Permite explorar los 411 artículos por categorías y hacer preguntas en lenguaje natural, con respuestas fundamentadas directamente en el texto constitucional.',
        url: 'https://www.econstitucional.com.bo/',
        linkLabel: 'Visitar sitio',
      },
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

  discovery: {
    label: 'Descubrimiento',
    heading: 'Primero entender, luego construir',
    intro: 'Antes de escribir código alineamos qué problema resolvemos y para quién. Traducimos tus ideas a un lenguaje compartido —personas, historias de usuario y criterios de aceptación— para que sepas exactamente qué vas a recibir y cómo comunicamos el avance en cada paso.',
    flow: {
      title: 'Cómo comunicamos durante el proceso',
      lead: 'Un flujo simple y transparente, de la idea a algo funcionando, con puntos claros de revisión contigo.',
      nodes: [
        { name: 'Descubrimiento', sub: 'objetivos · alcance' },
        { name: 'Personas', sub: 'para quién' },
        { name: 'Historias', sub: 'qué necesita' },
        { name: 'Criterios', sub: 'cuándo está listo' },
        { name: 'Demos e iteración', sub: 'validamos contigo' },
      ],
      note: 'En cada etapa compartimos entregables concretos y revisamos contigo — sin sorpresas al final.',
    },
    personas: {
      title: 'Personas',
      lead: 'Una persona es un usuario tipo con nombre, objetivos y frustraciones. Nos mantiene enfocados en gente real, no en “el usuario” abstracto.',
      goalLabel: 'Quiere',
      painLabel: 'Le frustra',
      items: [
        { initial: 'V', name: 'Valentina', role: 'Gerenta de operaciones', goal: 'ver las métricas clave de un vistazo para decidir rápido.', pain: 'exportar planillas y armar reportes a mano cada semana.' },
        { initial: 'M', name: 'Matías', role: 'Analista', goal: 'filtrar y cruzar datos sin depender de TI.', pain: 'esperar días por un reporte que además cambia seguido.' },
      ],
    },
    story: {
      title: 'Historias de usuario',
      lead: 'Cada necesidad se escribe como una historia corta, en el idioma del usuario y no en jerga técnica. El formato mantiene el foco en el valor:',
      templateLabel: 'Formato',
      exampleLabel: 'Ejemplo',
      template: [
        { k: 'Como', v: 'una persona' },
        { k: 'quiero', v: 'una acción' },
        { k: 'para', v: 'un beneficio' },
      ],
      example: [
        { k: 'Como', v: 'gerenta de operaciones,' },
        { k: 'quiero', v: 'filtrar las ventas por región y período,' },
        { k: 'para', v: 'detectar caídas a tiempo y reaccionar.' },
      ],
    },
    acceptance: {
      title: 'Criterios de aceptación',
      lead: 'Definen cuándo una historia está “lista”, sin ambigüedad. Usamos el formato Dado / Cuando / Entonces para describir el comportamiento esperado:',
      exampleLabel: 'Ejemplo',
      example: [
        { k: 'Dado', v: 'que tengo ventas de varias regiones,' },
        { k: 'Cuando', v: 'filtro por una región y un período,' },
        { k: 'Entonces', v: 'la tabla y los gráficos muestran solo esos datos y el total se recalcula.' },
      ],
      dodTitle: 'Definición de “listo”',
      dod: [
        'Cumple todos los criterios de aceptación',
        'Funciona en móvil y escritorio',
        'Probado y revisado contigo',
        'Accesible y con buen rendimiento',
      ],
      creditPre: 'Lectura recomendada',
      creditLabel: 'User story & acceptance criteria',
      creditHref: 'https://thestory.is/en/journal/user-story-acceptance-criteria/',
    },
  },

  spec: {
    label: 'Spec-Driven Development',
    heading: 'El spec como fuente de verdad',
    intro: 'En vez de programar “a ojo” y esperar lo mejor, escribimos primero una especificación precisa de qué debe hacer el sistema. Esa spec es la fuente de verdad; el código es un artefacto que la realiza y se verifica contra ella. Conecta directo con las historias y los criterios de aceptación de la etapa anterior.',
    quote: 'El spec declara la intención; el código la realiza.',
    flowTitle: 'El flujo, paso a paso',
    flowLead: 'Un pipeline claro que lleva de la intención a código verificado — y en cada etapa queda un artefacto revisable.',
    stages: [
      { name: 'Constitución', desc: 'Las reglas del proyecto que todos —personas y agentes— respetan.' },
      { name: 'Especificar', desc: 'La intención y los criterios de aceptación, aún sin decisiones técnicas.' },
      { name: 'Clarificar', desc: 'Sacar a la luz las ambigüedades antes de planificar.' },
      { name: 'Planificar', desc: 'La arquitectura y las decisiones técnicas.' },
      { name: 'Tareas', desc: 'Dividir en ítems pequeños y entregables.' },
      { name: 'Implementar', desc: 'Construir con verificación en cada paso.' },
      { name: 'Analizar', desc: 'Cruzar spec ↔ plan ↔ tareas para que todo siga alineado.' },
    ],
    whyTitle: 'Por qué te conviene',
    why: [
      'El esfuerzo se concentra en definir bien la intención, no en tipear a ciegas.',
      'Documentación viva: trazabilidad entre lo pedido y lo construido.',
      'Con requisitos claros, los asistentes de IA aciertan más a la primera.',
      'La spec perdura y explica el porqué, más allá del código generado.',
    ],
    practiceTitle: 'En la práctica',
    practiceLead: 'El punto medio que adoptan los equipos es “spec-anchored”: la spec y el código evolucionan juntos, con tests automáticos que fuerzan que sigan alineados. Los criterios se escriben sin ambigüedad y cada cambio cita su spec — trazabilidad de punta a punta.',
    chips: ['Spec como fuente de verdad', 'Criterios sin ambigüedad', 'Tests de alineación', 'Trazabilidad en commits', 'Asistentes de IA guiados'],
    caveat: 'Y algo honesto: la herramienta impone disciplina, pero no reemplaza el criterio — la spec es justamente donde ahora ocurre el pensar.',
    creditPre: 'Lectura recomendada',
    creditLabel: 'Spec-Driven Development in 2026',
    creditHref: 'https://dev.to/krlz/spec-driven-development-in-2026-what-it-is-the-tooling-and-how-teams-actually-use-it-2fk2',
  },

  methodology: {
    label: 'Cómo lo construimos',
    heading: 'Sistemas, no pantallas',
    intro: 'Ninguno de los paneles de arriba es una maqueta suelta: cada uno se compone con Atomic Design y una arquitectura de micro frontends. Es el mismo enfoque que aplicamos a tu producto para que crezca sin volverse inmanejable — y creemos que entenderlo te ayuda a tomar mejores decisiones.',
    atomic: {
      title: 'Atomic Design',
      lead: 'Metodología de Brad Frost: la interfaz se construye desde piezas mínimas y reutilizables que se combinan en componentes cada vez más complejos. El resultado es consistencia por diseño, no por disciplina, y un sistema que documenta y escala solo.',
      specimenLabel: 'En estos paneles',
      levels: [
        { name: 'Átomos', desc: 'Los ladrillos indivisibles de la interfaz.', ex: 'Insignias, botones, chips de filtro, campos, etiquetas.' },
        { name: 'Moléculas', desc: 'Grupos pequeños de átomos que funcionan como una unidad.', ex: 'La tarjeta de KPI (etiqueta + valor + variación) o la barra de búsqueda.' },
        { name: 'Organismos', desc: 'Secciones completas y autónomas de la interfaz.', ex: 'La tabla de clientes con filtros y paginación, o una tarjeta de gráfico.' },
        { name: 'Plantillas', desc: 'La estructura y disposición, todavía sin datos reales.', ex: 'La grilla del dashboard: dónde viven los KPIs, los gráficos y la tabla.' },
        { name: 'Páginas', desc: 'La plantilla con contenido real — lo que finalmente ve tu usuario.', ex: 'Los paneles de arriba, ya con métricas, estados y datos.' },
      ],
      creditPre: 'Metodología de',
      creditName: 'Brad Frost',
      creditLabel: 'atomicdesign.bradfrost.com',
      creditHref: 'https://atomicdesign.bradfrost.com',
    },
    micro: {
      title: 'Micro Frontends',
      lead: 'Cada panel puede ser una aplicación independiente —con su propio equipo, su ciclo de despliegue y hasta su propia tecnología— que se compone dentro de un mismo shell. Escalas por partes, sin reescribir todo de una vez.',
      shell: 'Shell / contenedor',
      panels: ['Analítica', 'Ventas', 'Finanzas'],
      panelNote: 'deploy independiente',
      benefits: [
        { title: 'Despliegues independientes', desc: 'Cada equipo publica su panel sin bloquear a los demás.' },
        { title: 'Propiedad por dominio', desc: 'Un equipo es dueño de su vertical de principio a fin.' },
        { title: 'Adopción incremental', desc: 'Agregas o migras módulos sin reescribir la aplicación.' },
        { title: 'Aislamiento de fallos', desc: 'Si un panel falla, el resto sigue funcionando.' },
      ],
    },
    tokens: {
      title: 'Design Tokens',
      lead: 'La fuente única de verdad del lenguaje visual: color, tipografía y bordes viven como variables, no como valores sueltos. Se definen una vez y se propagan a todo — por eso el mismo sistema soporta modo claro y oscuro sin duplicar el diseño.',
      hint: 'Prueba el interruptor de tema arriba y observa estos tokens cambiar en vivo.',
      colorLabel: 'Color',
      typeLabel: 'Tipografía',
      radiusLabel: 'Bordes y radios',
      swatches: [
        { name: 'Acento', ref: '--color-accent' },
        { name: 'Texto', ref: '--color-heading' },
        { name: 'Superficie', ref: '--color-surface' },
        { name: 'Éxito', ref: '--good' },
        { name: 'Alerta', ref: '--warn' },
        { name: 'Error', ref: '--bad' },
      ],
      fonts: [
        { name: 'IBM Plex Sans', role: 'Display · Texto', sample: 'Ag', cls: 'sans' },
        { name: 'IBM Plex Mono', role: 'Datos · Código', sample: '012', cls: 'mono' },
      ],
    },
  },

  architecture: {
    label: 'Detrás de escena',
    heading: 'La ingeniería que no se ve',
    intro: 'Un dashboard bonito es la punta del iceberg. Debajo hay servicios que procesan datos, escalan bajo demanda y protegen la información. Así pensamos esa parte — la que casi nadie ve, pero que decide si tu producto aguanta cuando de verdad importa.',
    pipeline: {
      title: 'Procesamiento de datos a escala',
      lead: 'Los datos entran, se transforman y se sirven a través de una cadena de servicios sin estado (stateless). Como ningún paso guarda información en sí mismo, podemos multiplicar los que estén saturados sin que nada se rompa.',
      nodes: [
        { name: 'Fuentes', sub: 'apps · IoT · APIs' },
        { name: 'Ingesta', sub: 'API / eventos' },
        { name: 'Cola / stream', sub: 'colas · eventos' },
        { name: 'Workers', sub: 'stateless ×N', scale: true },
        { name: 'Almacén', sub: 'objetos · base de datos' },
        { name: 'API / panel', sub: 'lo que ves' },
      ],
      note: 'Sin estado = cualquier copia atiende cualquier petición. Esa es la base para escalar horizontalmente.',
    },
    scaling: {
      title: 'Escalar bien: vertical vs. horizontal',
      lead: 'Hay dos formas de aguantar más carga. Elegir la correcta —o combinarlas— ahorra dinero y evita caídas.',
      vertical: { tag: 'Vertical', title: 'Una máquina más potente', desc: 'Más CPU y memoria en el mismo servidor. Simple, pero tiene un techo y un punto único de falla.' },
      horizontal: { tag: 'Horizontal', title: 'Más máquinas iguales', desc: 'Varias instancias detrás de un balanceador. Escala casi sin límite y tolera fallos — requiere servicios sin estado.' },
      lbLabel: 'Balanceador',
      nodeLabel: 'instancia',
      creditPre: 'Lectura recomendada',
      creditLabel: 'Vertical vs. horizontal scaling',
      creditHref: 'https://medium.com/@mrprince123/scaling-systems-the-right-way-understanding-vertical-and-horizontal-scaling-in-depth-40863534dec4',
    },
    quality: {
      title: 'Atributos de calidad que cuidamos',
      lead: 'Los "requisitos no funcionales" no aparecen en una demo, pero son los que hacen que un sistema sea confiable en producción. Estos son los que más miramos:',
      items: [
        { name: 'Escalabilidad', desc: 'Crece con la demanda sin rediseñar todo.' },
        { name: 'Rendimiento', desc: 'Respuestas rápidas, incluso con carga alta.' },
        { name: 'Disponibilidad', desc: 'Sigue en pie aunque falle una pieza.' },
        { name: 'Seguridad', desc: 'Datos protegidos y accesos controlados.' },
        { name: 'Mantenibilidad', desc: 'Fácil de entender, cambiar y probar.' },
        { name: 'Observabilidad', desc: 'Métricas y logs para ver qué ocurre.' },
      ],
      techTitle: 'Elegir la tecnología correcta para el problema',
      techLead: 'No existe una herramienta que sirva para todo. Emparejamos cada problema con la categoría de tecnología adecuada — y dentro de ella elegimos la mejor opción para tu caso, sin atarnos a una marca:',
      tech: [
        { problem: 'Datos relacionales y transacciones', tool: 'Base de datos relacional' },
        { problem: 'Caché y baja latencia', tool: 'Caché en memoria' },
        { problem: 'Búsqueda de texto', tool: 'Motor de búsqueda' },
        { problem: 'Eventos y streaming', tool: 'Cola de mensajes / streaming' },
        { problem: 'Archivos y objetos', tool: 'Almacenamiento de objetos' },
      ],
      creditPre: 'Lectura recomendada',
      creditLabel: 'Quality attributes (non-functional requirements)',
      creditHref: 'https://medium.com/@enivek/quality-attributes-building-software-through-non-functional-requirements-772c8ae7f3ae',
    },
    stack: {
      title: 'Un stack en la nube, agnóstico',
      lead: 'Así se ve una arquitectura típica que operamos: contenedores sin estado que escalan solos en la nube, con base de datos y caché gestionadas. Es agnóstica al proveedor — la misma arquitectura corre en cualquier nube, sin atarte a un vendor.',
      compute: {
        replica: 'Réplica',
        more: '+ N',
        moreHint: 'autoescala',
        caption: 'Cada contenedor es una copia idéntica y sin estado: cualquiera atiende cualquier petición. Cuando sube el tráfico, el orquestador agrega más réplicas solo; cuando baja, las quita.',
      },
      tiers: [
        { name: 'Balanceador / CDN', sub: 'entrada + TLS' },
        { name: 'Cómputo · contenedores', sub: 'stateless · autoescala', scale: true },
        { name: 'Datos', sub: 'base de datos + caché gestionadas', split: ['Base de datos gestionada', 'Caché en memoria'] },
      ],
      chips: ['Contenedores', 'Orquestación', 'Autoescalado', 'Base de datos gestionada', 'Caché en memoria', 'Multinube'],
      note: 'Las réplicas suben y bajan solas según el tráfico (autoescalado horizontal). Pagas por lo que usas y absorbes los picos sin intervención manual, en la nube que prefieras.',
    },
    security: {
      title: 'Seguridad basada en tokens',
      lead: 'La autenticación moderna evita guardar sesiones en el servidor: el usuario se identifica una vez y recibe un token firmado que viaja en cada petición. Encaja perfecto con servicios sin estado.',
      flow: [
        { name: 'Usuario', sub: 'inicia sesión' },
        { name: 'Identity Provider', sub: 'OpenID Connect' },
        { name: 'Token JWT', sub: 'firmado · corta vida' },
        { name: 'API', sub: 'valida y responde' },
      ],
      techniques: [
        { name: 'JWT', desc: 'Token firmado que prueba quién eres sin consultar una sesión.' },
        { name: 'OpenID Connect / OAuth2', desc: 'Identidad delegada y SSO: inicias sesión con un proveedor de confianza.' },
        { name: 'Tokens de corta vida + refresh', desc: 'Se renuevan seguido; si se filtran, expiran rápido.' },
        { name: 'TLS y menor privilegio', desc: 'Todo cifrado en tránsito y cada servicio con el mínimo acceso.' },
      ],
    },
  },

  faq: {
    label: 'Preguntas Frecuentes',
    heading: 'Preguntas frecuentes',
    items: [
      { q: '¿Qué es codiva?', aHtml: '<p>codiva® es un estudio independiente de dos ingenieros de software senior, con base en Ñuñoa, Santiago de Chile. Construimos producto completo —diseño, frontend, backend e IA— de principio a fin, sin juniors ni subcontratar. Los mismos que te venden el proyecto son los que lo construyen.</p>' },
      { q: '¿Qué servicios ofrece codiva?', aHtml: '<p>Cinco frentes, en orden de foco: Software a medida (sistemas, plataformas internas y dashboards); desarrollo de producto de principio a fin (diseño, frontend, backend e IA); aplicaciones web y móviles; APIs y microservicios; y estabilización y continuación de productos que ya existen.</p>' },
      { q: '¿Quién es dueño del código?', aHtml: '<p>Tú, desde el primer commit. El repositorio queda a tu nombre y te entregamos todo —código, infraestructura y documentación—, sin dependencias ocultas ni candados. Si algún día quieres continuar con otro equipo, puedes.</p>' },
      { q: '¿Pueden tomar un proyecto que ya empezó otra persona?', aHtml: '<p>Sí. Tomamos bases de código heredadas —de un freelancer que se fue, una agencia que cambió de rumbo o un equipo anterior—, las estabilizamos y seguimos construyendo. Es justo donde 14 años de arquitectura backend y sistemas distribuidos hacen la diferencia.</p>' },
      { q: 'Son solo dos personas. ¿Qué pasa si se enferman o se llenan de trabajo?', aHtml: '<p>Tomamos pocos proyectos a la vez, justamente para no sobrecomprometernos y darle atención real a cada uno. Ambos conocemos cada proyecto, así que nada depende de una sola persona, y tu código, tu infraestructura y tu documentación siempre viven en tu repositorio. Si necesitamos coordinar tiempos, te lo decimos antes de empezar, no después.</p>' },
      { q: '¿Trabajan con equipos internos o reemplazan al equipo?', aHtml: '<p>Ambos. Nos integramos a tu equipo interno cuando lo hay, o funcionamos como tu equipo de producto completo cuando no. Nos adaptamos a cómo ya trabajas.</p>' },
      { q: '¿Cuánto cuesta un proyecto?', aHtml: '<p>Depende del alcance, pero no te vamos a hacer adivinar. Un Sprint de Producto parte desde CLP $2.500.000 y un proyecto completo suele estar entre CLP $15.000.000 y $60.000.000. En la primera llamada de 30 minutos te damos un rango real, no una propuesta de 20 páginas tres semanas después.</p>' },
      { q: '¿Cuánto se demora?', aHtml: '<p>Un Sprint de Producto son 1–2 semanas. Un producto completo, entre 6 y 16 semanas según alcance. Te damos una fecha en la propuesta y te avisamos apenas algo la ponga en riesgo — preferimos una conversación incómoda temprano que una sorpresa al final.</p>' },
      { q: '¿Qué pasa si no funciona o no quedamos conformes?', aHtml: '<p>Por eso existe el Sprint de Producto: 1–2 semanas pagadas, con entregables concretos, al final de las cuales cualquiera de los dos puede decidir no seguir — y te quedas igual con el prototipo, las decisiones de arquitectura y el plan técnico. Es la forma más barata que conocemos de averiguar si trabajamos bien juntos.</p>' },
    ],
  },

  contact: {
    label: 'Contacto',
    headingHtml: 'Hagamos algo<br><em>extraordinario</em>',
    text: '¿Tienes un proyecto en mente? Conversemos sobre cómo podemos llevarlo al siguiente nivel.',
    bookingLabel: 'Agenda 30 minutos',
    whatsapp: {
      number: '56957173936',
      label: 'Escríbenos por WhatsApp',
      message: 'Hola codiva 👋, me interesa cotizar un proyecto.',
    },
    emailLabel: 'O escríbenos a',
    email: 'contactos@codiva.cl',
    location: 'Ñuñoa, Santiago — Chile',
  },

  contactPage: {
    meta: {
      title: 'Contacto — Cuéntanos tu proyecto | codiva®',
      description:
        'Hablemos de tu producto. Te responde directamente quien lo construye —dos ingenieros senior, sin intermediarios—. Escríbenos por WhatsApp o correo, sin compromiso.',
      keywords:
        'contacto codiva, cotizar software, desarrollo a medida chile, hablar con desarrollador, cotización desarrollo web',
      canonical: 'https://codiva.cl/contacto/',
      ogUrl: 'https://codiva.cl/contacto/',
      ogTitle: 'Cuéntanos tu proyecto — codiva®',
      ogDescription:
        'Te responde directamente quien construye tu producto. WhatsApp o correo, sin compromiso.',
      ogLocale: 'es_CL',
      twitterTitle: 'Cuéntanos tu proyecto — codiva®',
      twitterDescription: 'Hablemos de tu producto — sin intermediarios, sin compromiso.',
    },
    eyebrow: 'Contacto',
    heading: 'Cuéntanos tu proyecto',
    sub: 'Te responde directamente quien va a construir tu producto —dos ingenieros senior, sin intermediarios—. Te decimos si podemos ayudarte y cómo, sin compromiso.',
    emailLabel: 'O por correo',
    points: [
      { title: 'Hablas con quien construye', desc: 'Sin intermediarios ni traspasos de contexto: respondemos nosotros mismos.' },
      { title: 'Respuesta rápida', desc: 'Normalmente el mismo día hábil.' },
      { title: 'Sin compromiso', desc: 'Una conversación de 30 minutos para ver si encajamos.' },
    ],
    stepsLabel: 'Qué pasa después',
    steps: [
      'Nos escribes con una idea de lo que necesitas.',
      'Conversamos 30 minutos por video o llamada.',
      'Te enviamos un plan y una propuesta claros.',
    ],
    trust: ['14 años en backend y arquitectura', 'Dos ingenieros senior', 'Ñuñoa, Santiago de Chile'],
    seeWork: { label: 'Ver proyectos', href: '/proyectos' },
    back: '← Volver al inicio',
    waMessage: 'Hola codiva 👋, quiero contarte mi proyecto.',
  },

  team: {
    label: 'Equipo',
    heading: 'Las personas detrás',
    members: [
      { name: 'Carlos Rojas', role: 'Backend · Arquitectura · IA', desc: 'Ingeniero de software backend y fullstack, enfocado en arquitectura, sistemas distribuidos e IA. Diseña pensando en escalabilidad, rendimiento y seguridad, y también trabaja en móvil. 14 años de experiencia.', url: 'https://krlz.dev/', image: '/team/carlos.webp', alt: 'Carlos Rojas — Ingeniero de software: backend, arquitectura e IA' },
      { name: 'Marina Alekseeva', role: 'Diseño · Frontend · Producto', desc: 'Ingeniera de software orientada a frontend y diseño de producto (UX/UI), con base fullstack. Construye interfaces accesibles, rápidas y mantenibles, y también trabaja en móvil.', url: 'https://maryaleks.dev/', image: '/team/marina.webp', alt: 'Marina Alekseeva — Ingeniera de software: diseño y frontend' },
    ],
  },

  // Homepage section (rendered after "Cómo trabajamos") — the takeover/rescue wedge.
  takeover: {
    eyebrow: 'Proyectos heredados',
    heading: '¿Tienes un producto que ya nadie quiere tocar?',
    body: [
      'Lo construyó un freelance que ya no está. O una agencia que rotó tres veces de equipo. Funciona, más o menos, pero cada cambio toma semanas y nadie sabe qué se va a romper.',
      'Lo tomamos, lo estabilizamos y seguimos construyendo. Empezamos con una revisión de dos semanas: entendemos el código, te decimos con honestidad qué se salva y qué no, y te entregamos un plan con costos reales — aunque la conclusión sea que te conviene reescribirlo.',
    ],
    cta: 'Revisemos tu código',
    ctaHref: '/rescate-de-proyectos',
  },

  // Dedicated page /rescate-de-proyectos — the takeover offer expanded.
  rescate: {
    meta: {
      title: 'Rescate de proyectos de software — retomamos tu desarrollo | codiva®',
      description:
        'Heredaste un sistema que ya nadie quiere tocar. Lo tomamos, lo estabilizamos y seguimos construyendo. Empezamos con una revisión de dos semanas, con un plan y costos reales.',
      keywords:
        'rescate de proyectos de software, retomar desarrollo abandonado, auditoría de código Chile, estabilizar sistema heredado, mantener software existente, retomar proyecto de software',
      canonical: 'https://codiva.cl/rescate-de-proyectos/',
      ogUrl: 'https://codiva.cl/rescate-de-proyectos/',
      ogTitle: 'Rescate de proyectos de software — codiva®',
      ogDescription:
        'Tomamos software heredado, lo estabilizamos y seguimos construyendo. Revisión de dos semanas con un plan y costos reales.',
      ogLocale: 'es_CL',
      twitterTitle: 'Rescate de proyectos de software — codiva®',
      twitterDescription:
        'Retomamos desarrollos heredados: los estabilizamos y seguimos construyendo, con un plan y costos reales.',
    },
    eyebrow: 'Proyectos heredados',
    heading: '¿Tienes un producto que ya nadie quiere tocar?',
    intro: [
      'Lo construyó un freelance que ya no está. O una agencia que rotó tres veces de equipo. Funciona, más o menos, pero cada cambio toma semanas y nadie sabe qué se va a romper.',
      'Lo tomamos, lo estabilizamos y seguimos construyendo. Empezamos con una revisión de dos semanas: entendemos el código, te decimos con honestidad qué se salva y qué no, y te entregamos un plan con costos reales — aunque la conclusión sea que te conviene reescribirlo.',
    ],
    includes: {
      title: 'Qué incluye la revisión',
      items: [
        'Auditoría de arquitectura: cómo está armado y dónde están los cuellos de botella.',
        'Deuda técnica priorizada por riesgo real, no por gusto estético.',
        'Estado de seguridad y dependencias: qué está desactualizado y qué te expone.',
        'Plan de estabilización con costos y plazos reales.',
      ],
    },
    notDo: {
      title: 'Qué no hacemos',
      text: 'No te vamos a recomendar reescribir todo por defecto: es lo más caro y casi nunca lo correcto. Si algo se salva, se salva — y te lo decimos con honestidad.',
    },
    why: {
      title: 'Por qué nosotros',
      text: '14 años de arquitectura backend y sistemas distribuidos. Entrar en el código de otro y volverlo mantenible es un trabajo distinto a empezar de cero — y es el que mejor sabemos hacer.',
    },
    price: {
      title: 'Precio de entrada',
      text: 'La revisión es un producto de precio fijo: desde CLP $2.500.000, dos semanas, con entregables concretos. Si después seguimos con la estabilización, ese monto se descuenta del proyecto.',
    },
    ctaLabel: 'Agenda 30 minutos',
    ctaNote: 'Una conversación de 30 minutos, sin compromiso.',
    back: '← Volver al inicio',
  },

  footer: {
    copy: 'Todos los derechos reservados.',
    legal: { href: '/marca/', label: 'codiva® — marca registrada' },
  },
};
