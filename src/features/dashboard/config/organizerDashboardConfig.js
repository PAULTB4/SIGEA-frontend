// src/features/dashboard/config/organizerDashboardConfig.js
import { BarChart3, FileText, Users, Award } from 'lucide-react';

import DashboardHome from '../components/DashboardHome';
import ActivityManager from '../../activities/components/ActivityManager';
import ParticipantManager from '../../participantsmanagement/components/ParticipantManager';
import CertificateManager from '../../certificates/components/CertificateManager';

export const organizerNavItems = [
  { id: 'home', label: 'Inicio', icon: BarChart3 },
  { id: 'activities', label: 'Gestión de Actividades', icon: FileText },
  { id: 'participants', label: 'Participantes y Asistencia', icon: Users },
  { id: 'certificates', label: 'Certificación', icon: Award },
];

export const organizerViewConfig = {
  home: {
    title: 'Panel de Control',
    subtitle: 'Bienvenido a tu panel de control',
    component: DashboardHome,
  },
  activities: {
    title: 'Gestión de Actividades',
    subtitle: 'Crea y gestiona tus actividades académicas',
    component: ActivityManager,
  },
  participants: {
    title: 'Participantes y Asistencia',
    subtitle: 'Gestiona inscritos y registro de asistencia',
    component: ParticipantManager,
  },
  certificates: {
    title: 'Certificación',
    subtitle: 'Emite y gestiona certificados',
    component: CertificateManager,
  },
};
