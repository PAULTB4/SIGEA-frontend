

import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';

// (PascalCase porque son componentes que se importarán)
const LandingPage = lazy(() => import('../pages/LandingPage'));
const AuthPage = lazy(() => import('../pages/Auth'));
const ValidationPage = lazy(() => import('../pages/ValidationPage'));
const OrganizerDashboard = lazy(() => import('../pages/OrganizerActivity')); 
const ParticipantDashboard = lazy(() => import('../pages/ParticipantDashboard'));
const DesignSystemTest = lazy(() => import('../pages/DesignSystemTest'));
const EventsPage = lazy(() => import('../pages/EventsPage'));

// const NotFoundPage = lazy(() => import('@/pages/NotFoundPage')); 

/**
 * Rutas Públicas
 * Accesibles por todos.
 */
export const publicRoutes = [
  { 
    path: '/', 
    element: <LandingPage /> 
  },
  { 
    path: '/validation', 
    element: <ValidationPage /> 
  },
  { 
    path: '/design-system', 
    element: <DesignSystemTest />, 
    devOnly: true // El router solo la renderizará en desarrollo
  },
  { 
    path: '/events',
    element: <EventsPage /> 
  },
];

/**
 * Rutas de Autenticación
 * Para usuarios NO autenticados.
 * Si un usuario autenticado intenta ir aquí, será redirigido.
 */
export const authRoutes = [
  { 
    path: '/auth', 
    element: <AuthPage /> 
  },
];

/**
 * Rutas Privadas
 * Requieren autenticación y roles específicos.
 */
export const privateRoutes = [
  {
    path: '/organizer/*',
    element: <OrganizerDashboard />,
    roleRequired: 'organizador',
  },
  {
    path: '/participant/*',
    element: <ParticipantDashboard />,
    roleRequired: 'participante',
  },
];

/**
 * Ruta de Redirección por Defecto
 * (Para 404 o rutas no encontradas)
 */
export const fallbackRoute = {
  path: '*',
  element: <Navigate to="/" replace />
};

/**
 * Rutas por Defecto Post-Login
 * (Usado por el AppRouter para redirigir si se accede a /auth estando logueado)
 */
export const defaultRoutesByRole = {
  organizador: '/organizer/dashboard',
  participante: '/participant/dashboard',
  default: '/',
};