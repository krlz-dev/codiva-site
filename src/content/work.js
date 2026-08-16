const sharedSources = {
  fhirOverview: {
    label: 'FHIR Overview — HL7',
    href: 'https://hl7.org/fhir/overview.html',
  },
  fhirExchange: {
    label: 'Approaches to Exchanging FHIR Data — HL7',
    href: 'https://hl7.org/fhir/exchanging.html',
  },
};

export const workContent = {
  es: {
    index: {
      label: 'Casos de ingeniería',
      heading: 'Problemas complejos, explicados con arquitectura y procedencia',
      intro:
        'Estos casos separan experiencia profesional previa y arquitecturas de referencia. No se presentan como clientes de Codiva ni como resultados comerciales sin evidencia.',
      readCase: 'Leer el caso',
      topicsLabel: 'Tecnologías y aspectos',
      provenance: {
        product: 'Producto propio de Codiva',
        prior: 'Experiencia profesional previa',
        reference: 'Arquitectura de referencia',
      },
      cases: [
        {
          href: '/proyectos/pipeline-datos/',
          title: 'De fuentes dispersas a datos confiables',
          summary:
            'Una arquitectura recuperable para extraer, validar, transformar, enriquecer y servir datos sin convertir cada fallo en una pérdida silenciosa.',
          provenances: ['prior', 'reference'],
          topics: ['ETL', 'eventos', 'Kafka', 'PostgreSQL', 'Redis'],
        },
        {
          href: '/proyectos/interoperabilidad-fhir/',
          title: 'Interoperabilidad clínica con FHIR',
          summary:
            'Cómo llevar datos clínicos desde modelos internos hasta recursos validables, con identidad, terminología, errores y auditoría visibles.',
          provenances: ['prior', 'reference'],
          topics: ['FHIR', 'HAPI FHIR', 'Kafka Streams', 'REST'],
        },
      ],
    },
    dataPipeline: {
      key: 'data-pipeline',
      meta: {
        title: 'Pipeline de datos y enriquecimiento | codiva®',
        description:
          'Arquitectura de referencia para ETL, procesamiento por eventos, validación, enriquecimiento, replay y entrega confiable de datos.',
        keywords: 'pipeline de datos, ETL, Kafka, enriquecimiento, PostgreSQL, Redis, replay',
        canonical: 'https://codiva.cl/proyectos/pipeline-datos/',
        ogUrl: 'https://codiva.cl/proyectos/pipeline-datos/',
        ogTitle: 'De fuentes dispersas a datos confiables — codiva®',
        ogDescription: 'Caso de ingeniería y arquitectura de referencia para procesamiento y enriquecimiento de datos.',
        ogLocale: 'es_CL',
        twitterTitle: 'Pipeline de datos y enriquecimiento — codiva®',
        twitterDescription: 'Validación, transformación, enriquecimiento, replay y entrega confiable.',
      },
      breadcrumb: 'Pipeline de datos',
      label: 'Caso de ingeniería · Datos e integraciones',
      title: 'De fuentes dispersas a datos confiables',
      lede:
        'Un pipeline serio no termina cuando los datos llegan. Debe poder explicar qué recibió, qué rechazó, qué transformó y cómo recuperarse después de un fallo.',
      provenanceTitle: 'Procedencia',
      provenance:
        'Experiencia profesional previa + arquitectura de referencia. Está informada por trabajo anterior de Carlos en servicios de procesamiento, enriquecimiento y entrega, Kafka Streams, reportes asíncronos, Redis y PostgreSQL. No es un caso de cliente de Codiva.',
      problemTitle: 'El problema operativo',
      problem:
        'Archivos, APIs, bases heredadas y eventos suelen llegar con ritmos, esquemas y fallos distintos. Si la canalización no conserva el dato original ni separa errores, una corrección obliga a reprocesar a ciegas o aceptar información incompleta.',
      flowTitle: 'Arquitectura recuperable',
      flowLabel: 'Fuentes, aterrizaje, validación, transformación, carga y consumo',
      flow: [
        { name: 'Fuentes', detail: 'archivos · APIs · bases · eventos' },
        { name: 'Aterrizaje', detail: 'aterrizaje crudo y replay' },
        { name: 'Validación', detail: 'esquema · calidad · cuarentena' },
        { name: 'Transformación', detail: 'normalización · enriquecimiento' },
        { name: 'Carga', detail: 'PostgreSQL · objetos · índices' },
        { name: 'Consumo', detail: 'APIs · reportes · analítica' },
      ],
      crossCutting: 'Orquestación · idempotencia · linaje · métricas · alertas · control de acceso',
      decisionsTitle: 'Decisiones que hacen confiable el flujo',
      decisions: [
        {
          title: 'Conservar el dato original',
          text: 'El aterrizaje inmutable permite corregir transformaciones y ejecutar replay sin pedir nuevamente cada fuente.',
        },
        {
          title: 'Separar datos inválidos',
          text: 'La cuarentena conserva contexto y motivo del rechazo; un lote defectuoso no bloquea silenciosamente todo el flujo.',
        },
        {
          title: 'Diseñar para repetición',
          text: 'Idempotencia, checkpoints y claves estables evitan duplicados cuando un proceso se reintenta.',
        },
        {
          title: 'Usar cada almacenamiento para una responsabilidad',
          text: 'PostgreSQL guarda datos consultables; objetos conservan archivos y resultados grandes; Redis acelera lecturas o estado operativo breve.',
        },
      ],
      buyerTitle: 'Qué demuestra para un comprador',
      buyerIntro:
        'Esta arquitectura es útil cuando el negocio necesita convertir fuentes incompatibles en un flujo auditable y recuperable.',
      buyerItems: [
        'Los errores quedan visibles y pueden corregirse.',
        'El procesamiento puede repetirse sin duplicar resultados.',
        'Cada transformación conserva su relación con el dato de origen.',
        'La operación puede medir retrasos, rechazos y throughput.',
      ],
      limitsTitle: 'Límite de la afirmación',
      limits:
        'La arquitectura muestra una capacidad y decisiones respaldadas por experiencia profesional previa. Los protocolos, volúmenes, tiempos y resultados dependen del sistema concreto y no se atribuyen aquí a un cliente de Codiva.',
      sourcesTitle: 'Fuentes técnicas',
      sources: [],
      ctaTitle: '¿Tus datos llegan, pero nadie confía en ellos?',
      ctaText: 'Podemos revisar el flujo actual, los puntos de pérdida y una ruta incremental para hacerlo recuperable.',
      ctaLabel: 'Conversemos sobre el pipeline',
      backLabel: 'Volver a Trabajo',
      backHref: '/proyectos/',
    },
    fhir: {
      key: 'fhir',
      meta: {
        title: 'Interoperabilidad clínica con FHIR | codiva®',
        description:
          'Caso de ingeniería sobre recursos FHIR, HAPI FHIR, mapeo clínico, validación, identidad, terminología, auditoría e interoperabilidad.',
        keywords: 'FHIR, HAPI FHIR, interoperabilidad clínica, recursos FHIR, REST FHIR, salud digital',
        canonical: 'https://codiva.cl/proyectos/interoperabilidad-fhir/',
        ogUrl: 'https://codiva.cl/proyectos/interoperabilidad-fhir/',
        ogTitle: 'Interoperabilidad clínica con FHIR — codiva®',
        ogDescription: 'Del modelo interno a recursos FHIR validables, con procedencia y límites explícitos.',
        ogLocale: 'es_CL',
        twitterTitle: 'Interoperabilidad clínica con FHIR — codiva®',
        twitterDescription: 'Recursos, validación, terminología, identidad y auditoría.',
      },
      breadcrumb: 'Interoperabilidad FHIR',
      label: 'Caso de ingeniería · Salud digital',
      title: 'Interoperabilidad clínica con FHIR',
      lede:
        'FHIR es un estándar para intercambiar información sanitaria electrónicamente. Publicar JSON no basta: los sistemas también deben acordar significado, identidad, terminología y reglas de uso.',
      provenanceTitle: 'Procedencia',
      provenance:
        'Experiencia profesional previa + arquitectura de referencia. Carlos trabajó en Portavita con procesamiento, enriquecimiento y entrega REST/FHIR, Kafka Streams, HAPI FHIR y generación de recursos. Portavita no es cliente de codiva y no implica respaldo.',
      problemTitle: 'Por qué importa la interoperabilidad',
      problem:
        'Un registro médico pierde valor cuando cada sistema representa personas, observaciones y episodios de forma incompatible. La interoperabilidad permite mover información con contexto y trazabilidad; no elimina por sí sola las decisiones de seguridad, consentimiento o gobierno.',
      flowTitle: 'Del modelo interno a recursos validables',
      flowLabel: 'Sistemas clínicos, mapeo, validación, servicio FHIR y consumidores',
      flow: [
        { name: 'Sistemas clínicos', detail: 'registros · eventos · documentos' },
        { name: 'Mapeo', detail: 'identidad · terminología · procedencia' },
        { name: 'Validación', detail: 'perfiles · reglas · errores' },
        { name: 'HAPI FHIR', detail: 'recursos · bundles · persistencia' },
        { name: 'Intercambio', detail: 'REST · documentos · mensajería si aplica' },
        { name: 'Consumidores', detail: 'equipos clínicos · apps · analítica' },
      ],
      crossCutting: 'Autorización · consentimiento · auditoría · observabilidad · manejo de errores',
      decisionsTitle: 'La parte difícil no es el endpoint',
      decisions: [
        {
          title: 'Identidad',
          text: 'Antes de combinar datos hay que definir cómo se reconcilian pacientes, profesionales y organizaciones entre sistemas.',
        },
        {
          title: 'Terminología',
          text: 'Códigos locales y vocabularios clínicos requieren mapeo explícito; la equivalencia no debe inferirse en silencio.',
        },
        {
          title: 'Validación y errores',
          text: 'Los recursos inválidos deben conservar diagnóstico y procedencia para corregirlos sin perder el registro original.',
        },
        {
          title: 'Mecanismo de intercambio',
          text: 'FHIR permite varios enfoques. REST, documentos y mensajería no son sinónimos y se eligen según el flujo real.',
        },
      ],
      buyerTitle: 'Qué demuestra para un comprador',
      buyerIntro:
        'La integración clínica requiere trabajo de dominio, arquitectura y operación; no consiste en cambiar nombres de campos.',
      buyerItems: [
        'Los recursos conservan contexto y procedencia.',
        'Los errores de mapeo pueden investigarse y corregirse.',
        'El mecanismo de intercambio se adapta al flujo clínico.',
        'Seguridad, consentimiento y auditoría se diseñan como responsabilidades explícitas.',
      ],
      limitsTitle: 'Límite de la afirmación',
      limits:
        'Esta página no afirma certificación FHIR, cumplimiento regulatorio ni interoperabilidad clínica garantizada. Describe experiencia profesional previa y una arquitectura de referencia que debe adaptarse a perfiles, normativa y acuerdos concretos.',
      sourcesTitle: 'Fuentes técnicas',
      sources: [sharedSources.fhirOverview, sharedSources.fhirExchange],
      ctaTitle: '¿Necesitas conectar datos clínicos sin perder su significado?',
      ctaText: 'Podemos revisar modelos, límites de integración, riesgos y una estrategia incremental de interoperabilidad.',
      ctaLabel: 'Conversemos sobre la integración',
      backLabel: 'Volver a Trabajo',
      backHref: '/proyectos/',
    },
  },
  en: {
    index: {
      label: 'Engineering cases',
      heading: 'Complex problems, explained with architecture and provenance',
      intro:
        'These cases separate prior professional experience from reference architectures. They are not presented as Codiva clients or commercial outcomes without evidence.',
      readCase: 'Read the case',
      topicsLabel: 'Technologies and concerns',
      provenance: {
        product: 'Codiva-owned product',
        prior: 'Prior professional experience',
        reference: 'Reference architecture',
      },
      cases: [
        {
          href: '/en/projects/data-pipeline/',
          title: 'From scattered sources to trusted data',
          summary:
            'A recoverable architecture to extract, validate, transform, enrich, and serve data without turning every failure into silent loss.',
          provenances: ['prior', 'reference'],
          topics: ['ETL', 'events', 'Kafka', 'PostgreSQL', 'Redis'],
        },
        {
          href: '/en/projects/fhir-interoperability/',
          title: 'Clinical interoperability with FHIR',
          summary:
            'How to move clinical data from internal models to validatable resources with explicit identity, terminology, errors, and auditability.',
          provenances: ['prior', 'reference'],
          topics: ['FHIR', 'HAPI FHIR', 'Kafka Streams', 'REST'],
        },
      ],
    },
    dataPipeline: {
      key: 'data-pipeline',
      meta: {
        title: 'Data processing and enrichment pipeline | codiva®',
        description:
          'Reference architecture for ETL, event processing, validation, enrichment, replay, and reliable delivery of operational data.',
        keywords: 'data pipeline, ETL, Kafka, enrichment, PostgreSQL, Redis, replay',
        canonical: 'https://codiva.cl/en/projects/data-pipeline/',
        ogUrl: 'https://codiva.cl/en/projects/data-pipeline/',
        ogTitle: 'From scattered sources to trusted data — codiva®',
        ogDescription: 'Engineering case and reference architecture for data processing and enrichment.',
        ogLocale: 'en_US',
        twitterTitle: 'Data processing and enrichment pipeline — codiva®',
        twitterDescription: 'Validation, transformation, enrichment, replay, and reliable delivery.',
      },
      breadcrumb: 'Data pipeline',
      label: 'Engineering case · Data and integrations',
      title: 'From scattered sources to trusted data',
      lede:
        'A serious pipeline does not end when data arrives. It must explain what it received, rejected, transformed, and how it recovers after failure.',
      provenanceTitle: 'Provenance',
      provenance:
        'Prior professional experience + reference architecture. It is informed by Carlos’s earlier work with processing, enrichment and delivery services, Kafka Streams, asynchronous reporting, Redis, and PostgreSQL. This is not a codiva client case.',
      problemTitle: 'The operational problem',
      problem:
        'Files, APIs, legacy databases, and events arrive with different rhythms, schemas, and failure modes. Without an original landing zone and explicit error paths, corrections require blind reprocessing or accepting incomplete information.',
      flowTitle: 'A recoverable architecture',
      flowLabel: 'Sources, landing, validation, transformation, load, and consumption',
      flow: [
        { name: 'Sources', detail: 'files · APIs · databases · events' },
        { name: 'Landing', detail: 'raw landing and replay' },
        { name: 'Validation', detail: 'schema · quality · quarantine' },
        { name: 'Transform', detail: 'normalization · enrichment' },
        { name: 'Load', detail: 'PostgreSQL · objects · indexes' },
        { name: 'Consume', detail: 'APIs · reports · analytics' },
      ],
      crossCutting: 'Orchestration · idempotency · lineage · metrics · alerts · access control',
      decisionsTitle: 'Decisions that make the flow reliable',
      decisions: [
        { title: 'Keep the original data', text: 'An immutable landing zone allows transformation fixes and replay without asking every source to send data again.' },
        { title: 'Separate invalid data', text: 'Quarantine preserves context and rejection reason; one bad batch does not silently block the whole flow.' },
        { title: 'Design for repetition', text: 'Idempotency, checkpoints, and stable keys avoid duplicate results when processing retries.' },
        { title: 'Give each store one responsibility', text: 'PostgreSQL serves queryable data; object storage keeps files and large results; Redis accelerates reads or short-lived operational state.' },
      ],
      buyerTitle: 'What this demonstrates to a buyer',
      buyerIntro: 'This architecture helps when a business must turn incompatible sources into an auditable, recoverable data flow.',
      buyerItems: [
        'Errors remain visible and correctable.',
        'Processing can repeat without duplicating results.',
        'Every transformation retains a path back to its source.',
        'Operations can measure delay, rejection, and throughput.',
      ],
      limitsTitle: 'Claim boundary',
      limits:
        'The architecture shows capability and decisions informed by prior professional experience. Protocols, volumes, timings, and outcomes depend on the actual system and are not attributed here to a Codiva client.',
      sourcesTitle: 'Technical sources',
      sources: [],
      ctaTitle: 'Does your data arrive while nobody fully trusts it?',
      ctaText: 'We can review the current flow, loss points, and an incremental path to make it recoverable.',
      ctaLabel: 'Discuss the pipeline with us',
      backLabel: 'Back to Work',
      backHref: '/en/projects/',
    },
    fhir: {
      key: 'fhir',
      meta: {
        title: 'Clinical interoperability with FHIR | codiva®',
        description:
          'Engineering case covering FHIR resources, HAPI FHIR, clinical mapping, validation, identity, terminology, auditability, and exchange.',
        keywords: 'FHIR, HAPI FHIR, clinical interoperability, FHIR resources, FHIR REST, digital health',
        canonical: 'https://codiva.cl/en/projects/fhir-interoperability/',
        ogUrl: 'https://codiva.cl/en/projects/fhir-interoperability/',
        ogTitle: 'Clinical interoperability with FHIR — codiva®',
        ogDescription: 'From internal models to validatable FHIR resources, with explicit provenance and boundaries.',
        ogLocale: 'en_US',
        twitterTitle: 'Clinical interoperability with FHIR — codiva®',
        twitterDescription: 'Resources, validation, terminology, identity, and auditability.',
      },
      breadcrumb: 'FHIR interoperability',
      label: 'Engineering case · Digital health',
      title: 'Clinical interoperability with FHIR',
      lede:
        'FHIR is a standard for exchanging healthcare information electronically. Publishing JSON is not enough: systems must also agree on meaning, identity, terminology, and usage rules.',
      provenanceTitle: 'Provenance',
      provenance:
        'Prior professional experience + reference architecture. Carlos worked at Portavita with REST/FHIR processing, enrichment and delivery, Kafka Streams, HAPI FHIR, and resource generation. Portavita is not a codiva client and does not imply endorsement.',
      problemTitle: 'Why interoperability matters',
      problem:
        'A medical record loses value when each system represents people, observations, and encounters differently. Interoperability moves information with context and traceability; it does not remove security, consent, or governance decisions.',
      flowTitle: 'From internal models to validatable resources',
      flowLabel: 'Clinical systems, mapping, validation, FHIR service, and consumers',
      flow: [
        { name: 'Clinical systems', detail: 'records · events · documents' },
        { name: 'Mapping', detail: 'identity · terminology · provenance' },
        { name: 'Validation', detail: 'profiles · rules · errors' },
        { name: 'HAPI FHIR', detail: 'resources · bundles · persistence' },
        { name: 'Exchange', detail: 'REST · documents · messaging if needed' },
        { name: 'Consumers', detail: 'clinical teams · apps · analytics' },
      ],
      crossCutting: 'Authorization · consent · audit · observability · error handling',
      decisionsTitle: 'The difficult part is not the endpoint',
      decisions: [
        { title: 'Identity', text: 'Before combining data, teams must define how patients, practitioners, and organizations reconcile across systems.' },
        { title: 'Terminology', text: 'Local codes and clinical vocabularies require explicit mapping; equivalence must not be inferred silently.' },
        { title: 'Validation and errors', text: 'Invalid resources must retain diagnostics and provenance so they can be corrected without losing the original record.' },
        { title: 'Exchange mechanism', text: 'FHIR supports several approaches. REST, documents, and messaging are not synonyms and must match the actual workflow.' },
      ],
      buyerTitle: 'What this demonstrates to a buyer',
      buyerIntro: 'Clinical integration requires domain, architecture, and operational work; it is not a field-renaming exercise.',
      buyerItems: [
        'Resources retain context and provenance.',
        'Mapping errors can be investigated and corrected.',
        'The exchange mechanism fits the clinical workflow.',
        'Security, consent, and auditability remain explicit responsibilities.',
      ],
      limitsTitle: 'Claim boundary',
      limits:
        'This page does not claim FHIR certification, regulatory compliance, or guaranteed clinical interoperability. It describes prior professional experience and a reference architecture that must adapt to specific profiles, regulation, and agreements.',
      sourcesTitle: 'Technical sources',
      sources: [sharedSources.fhirOverview, sharedSources.fhirExchange],
      ctaTitle: 'Do you need to connect clinical data without losing its meaning?',
      ctaText: 'We can review models, integration boundaries, risks, and an incremental interoperability strategy.',
      ctaLabel: 'Discuss the integration with us',
      backLabel: 'Back to Work',
      backHref: '/en/projects/',
    },
  },
};
