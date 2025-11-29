import api from '../../../services/axiosConfig';

const ENDPOINTS = {
  PROGRAMS: '/programs',
  CERTIFICATIONS: '/certifications',
  REVIEWS: '/reviews',
  NEXT_EVENT: '/next-event',
};

const FALLBACK_DATA = {
  programs: [
    {
      id: 1,
      title: 'Gestión ágil de Proyectos TI',
      shortDescription:
        'Aprende metodologías ágiles aplicadas a proyectos de TI.',
      description:
        'Programa orientado a estudiantes y profesionales que necesitan planificar, ejecutar y controlar proyectos de TI usando marcos ágiles como Scrum y Kanban. Incluye casos prácticos adaptados a la realidad de la UNAS.',
      duration: '120 horas',
      date: 'Abril – Junio 2025',
      modality: 'Virtual síncrono',
      location: 'Plataforma SIGEA – Aula Virtual FIIS',
      event: 'Ponencias/Talleres',
      imageUrl: '/images/flyer-prueba.png',
      ponencias: [
        'Introducción a la gestión ágil de proyectos.',
        'Scrum aplicado a proyectos de desarrollo de software.',
        'Kanban y mejora continua en equipos de TI.',
      ],
      talleres: [
        'Taller práctico: planificación de sprint con casos reales.',
        'Taller práctico: tableros Kanban y métricas de flujo.',
      ],
      ponenciasPrice: 'Ponencias: Estudiantes S/. 60 – General S/. 90',
      talleresPrice: 'Talleres: Estudiantes S/. 80 – General S/. 110',
      includesCertificate: true,
    },
    {
      id: 2,
      title: 'Diplomado en Inteligencia de Negocios',
      shortDescription:
        'Domina el análisis de datos y Business Intelligence.',
      description:
        'Desarrolla competencias para diseñar, construir e interpretar soluciones de Inteligencia de Negocios: modelado analítico, dashboards, indicadores y toma de decisiones basada en datos.',
      duration: '180 horas',
      date: 'Agosto 2025 – Enero 2026',
      modality: 'Semipresencial',
      location: 'FIIS – UNAS / Plataforma virtual',
      event: 'Ponencias/Talleres',
      imageUrl: '/images/flyer-prueba.png',
      ponencias: [
        'Fundamentos de Data Warehousing y modelado dimensional.',
        'Visualización de datos para la toma de decisiones.',
        'Gobernanza y calidad de datos en organizaciones.',
      ],
      talleres: [
        'Taller: construcción de dashboards ejecutivos.',
        'Taller: casos prácticos con herramientas de BI.',
      ],
      ponenciasPrice:
        'Ponencias: Estudiantes S/. 80 – General S/. 120',
      talleresPrice:
        'Talleres: Estudiantes S/. 100 – General S/. 150',
      includesCertificate: true,
    },
    {
      id: 3,
      title: 'Conferencia de Seguridad en la Nube',
      shortDescription:
        'Protege tus aplicaciones y servicios en entornos cloud.',
      description:
        'Evento especializado en ciberseguridad en la nube con enfoque en buenas prácticas, cumplimiento y experiencias de implementación en instituciones educativas.',
      duration: '8 horas',
      date: '8 y 9 de septiembre de 2025',
      modality: 'Presencial',
      location: 'Auditorio de la FIIS – UNAS',
      event: 'Ponencias/Talleres',
      imageUrl: '/images/flyer-prueba.png',
      ponencias: [
        'Amenazas y vulnerabilidades comunes en entornos cloud.',
        'Buenas prácticas de seguridad para servicios en la nube.',
        'Casos de estudio en universidades latinoamericanas.',
      ],
      talleres: [
        'Taller: configuración segura de servicios en la nube.',
        'Taller: simulación de incidentes y respuesta ante ataques.',
      ],
      ponenciasPrice:
        'Ponencias: Estudiantes S/. 25 – General S/. 35',
      talleresPrice:
        'Talleres: Estudiantes S/. 35 – General S/. 45',
      includesCertificate: true,
    },
  ],
  certifications: [
    {
      id: 1,
      title: 'Certificación en Data Science 2025',
      description: 'Valida tu conocimiento en análisis avanzado de datos.',
    },
    {
      id: 2,
      title: 'Taller de Blockchain Aplicado',
      description: 'Obtén el certificado de participación inmediata.',
    },
    {
      id: 3,
      title: 'Webinars de Emprendimiento Digital',
      description: 'Recursos y material exclusivo para egresados.',
    },
  ],
  reviews: [
    {
      id: 1,
      name: 'Juan A.',
      role: 'Estudiante',
      text: 'El proceso de inscripción es ágil y sin errores. La mejor plataforma que he usado.',
    },
    {
      id: 2,
      name: 'Helen M.',
      role: 'Docente',
      text: 'Excelente soporte para la organización y emisión de certificados a tiempo.',
    },
    {
      id: 3,
      name: 'Paul T.',
      role: 'Egresado',
      text: 'Pude validar mi certificado digital de forma instantánea. Muy profesional.',
    },
  ],
  nextEvent: {
    id: 1,
    title: 'Ciclo de Conferencias y Talleres VII 2025',
    subtitle: 'Tecnología al servicio de la innovación y emprendimiento',
    dateText: '8 y 9 de Septiembre 2025 – 8:00 a.m.',
    location: 'Auditorio de la Facultad de Contabilidad',
    flyerImage: '/images/flyer-prueba.png',
    ponencias: [
      'Ponencia 1: Inteligencia Artificial aplicada al Agro',
      'Ponencia 2: Cloud Computing y seguridad de datos',
      'Ponencia 3: Internet de las Cosas para la industria sostenible',
      'Ponencia 4: Ciberseguridad y privacidad en entornos educativos',
      'Ponencia 5: Innovación tecnológica en universidades peruanas',
      'Ponencia 6: Transformación digital y sociedad 5.0',
    ],
    ponenciasPrice: 'Estudiantes: S/. 20.00 – General: S/. 30.00',
    talleres: [
      'Taller 1: Google Workspace para empresas – 9 de Septiembre – 2:00 p.m.',
      'Taller 2: Microservicios con Java Spring Boot – 9 de Septiembre – 4:00 p.m.',
      'Taller 3: IA aplicada a la productividad – 10 de Septiembre – 9:00 a.m.',
    ],
    talleresPrice: 'Estudiantes: S/. 30.00 – General: S/. 40.00',
    includesCertificate: true,
    payments: [
      {
        method: 'Yape',
        phone: '923 427 714',
        owner: 'Jose Cárdenas Vega',
        icon: '📱',
      },
      {
        method: 'Plin',
        phone: '987 456 759',
        owner: 'Jose Castillo Cornelio',
        icon: '📱',
      },
    ],
    contacts: [
      {
        icon: '📞',
        text: '986 772 854 / 987 456 478 / 968 547 123',
      },
    ],
    website: 'https://www.sistemasunas.edu.pe',
    email: 'fiis.extension@unas.edu.pe',
    recommendations: [
      'Llegar 20 minutos antes del inicio del evento.',
      'Llevar DNI para el registro de asistencia.',
      'Verificar tus datos antes de generar el certificado.',
      'Revisar tu correo institucional para recibir materiales.',
    ],
    registerUrl: '/auth?view=register',
  },
};

// 🔹 Cambia esto a false cuando ya tengas backend real
const USE_MOCK = true;

export const landingService = {
  getPrograms: async () => {
    if (USE_MOCK) {
      return { data: FALLBACK_DATA.programs, error: null };
    }
    try {
      const { data } = await api.get(ENDPOINTS.PROGRAMS);
      return { data: data || FALLBACK_DATA.programs, error: null };
    } catch (err) {
      console.warn('API no disponible, usando datos de respaldo para programas');
      return { data: FALLBACK_DATA.programs, error: err.message };
    }
  },

  getCertifications: async () => {
    if (USE_MOCK) {
      return { data: FALLBACK_DATA.certifications, error: null };
    }
    try {
      const { data } = await api.get(ENDPOINTS.CERTIFICATIONS);
      return { data: data || FALLBACK_DATA.certifications, error: null };
    } catch (err) {
      console.warn('API no disponible, usando datos de respaldo para certificaciones');
      return { data: FALLBACK_DATA.certifications, error: err.message };
    }
  },

  getReviews: async () => {
    if (USE_MOCK) {
      return { data: FALLBACK_DATA.reviews, error: null };
    }
    try {
      const { data } = await api.get(ENDPOINTS.REVIEWS);
      return { data: data || FALLBACK_DATA.reviews, error: null };
    } catch (err) {
      console.warn('API no disponible, usando datos de respaldo para reseñas');
      return { data: FALLBACK_DATA.reviews, error: err.message };
    }
  },

  getNextEvent: async () => {
    if (USE_MOCK) {
      return { data: FALLBACK_DATA.nextEvent, error: null };
    }
    try {
      const { data } = await api.get(ENDPOINTS.NEXT_EVENT);
      return { data: data || FALLBACK_DATA.nextEvent, error: null };
    } catch (err) {
      console.warn('API no disponible, usando datos de respaldo para próximo evento');
      return { data: FALLBACK_DATA.nextEvent, error: err.message };
    }
  },
};
