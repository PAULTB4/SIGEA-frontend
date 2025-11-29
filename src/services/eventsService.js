// src/services/eventsService.js
import api from './axiosConfig';

const ENDPOINTS = {
  ALL_EVENTS: '/events',
};

// Cambia a false cuando tengas el backend real
const USE_MOCK = true;

// Mock de todos los eventos disponibles (por ahora usamos los mismos del fallback)
const FALLBACK_EVENTS = [
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
  {
    id: 4,
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
    id: 5,
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
];

const eventsService = {
  // Obtiene TODOS los eventos (para /events)
  async getAllEvents() {
    if (USE_MOCK) {
      return { data: FALLBACK_EVENTS, error: null };
    }

    try {
      const { data } = await api.get(ENDPOINTS.ALL_EVENTS);
      return { data: data || FALLBACK_EVENTS, error: null };
    } catch (err) {
      console.warn(
        'API de eventos no disponible, usando datos de respaldo',
        err
      );
      return { data: FALLBACK_EVENTS, error: err.message };
    }
  },
};

export default eventsService;
