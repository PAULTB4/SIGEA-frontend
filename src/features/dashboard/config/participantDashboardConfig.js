// src/features/dashboard/config/participantDashboardConfig.js
import {
  BarChart3,
  CalendarDays,
  ClipboardList,
  Award,
} from 'lucide-react';

import ParticipantInicio from '../../participantsDashboard/components/ParticipantInicio';
import EventosDisponibles from '../../participantsDashboard/components/EventosDisponibles';
import MisInscripciones from '../../participantsDashboard/components/MisInscripciones';
import MisCertificados from '../../participantsDashboard/components/MisCertificados';

export const participantNavItems = [
  { id: 'home', label: 'Inicio', icon: BarChart3 },
  { id: 'events', label: 'Eventos Disponibles', icon: CalendarDays },
  { id: 'enrollments', label: 'Mis Inscripciones', icon: ClipboardList },
  { id: 'certificates', label: 'Mis Certificados', icon: Award },
];

export const participantViewConfig = {
  home: {
    title: 'Panel de Control',
    subtitle: 'Bienvenido a tu panel de control académico',
    component: ParticipantInicio,
  },
  events: {
    title: 'Eventos Disponibles',
    subtitle: 'Descubre y únete a nuevos eventos y cursos',
    component: EventosDisponibles,
  },
  enrollments: {
    title: 'Mis Inscripciones',
    subtitle: 'Gestiona tus inscripciones activas y pagos',
    component: MisInscripciones,
  },
  certificates: {
    title: 'Mis Certificados',
    subtitle: 'Descarga y verifica tus certificados',
    component: MisCertificados,
  },
};
