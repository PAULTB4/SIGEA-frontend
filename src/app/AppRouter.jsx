// src/app/AppRouter.jsx
import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../features/auth/hooks/useAuth';
import LoadingScreen from '../components/common/LoadingScreen';

const LandingPage = lazy(() => import('../pages/LandingPage'));
const AuthPage = lazy(() => import('../pages/Auth'));
const ValidationPage = lazy(() => import('../pages/ValidationPage'));
const OrganizerDashboard = lazy(() => import('../pages/OrganizerActivity'));
const ParticipantDashboard = lazy(() => import('../pages/ParticipantDashboard'));
const DesignSystemTest = lazy(() => import('../pages/DesignSystemTest'));
const EventsPage = lazy(() => import('../pages/EventsPage')); // 👈 NUEVO

const PrivateRoute = ({ children, roleRequired }) => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  if (roleRequired && user?.role !== roleRequired) {
    const homeRoute =
      user?.role === 'organizador' || user?.role === 'admin'
        ? '/organizer/dashboard'
        : '/participant/dashboard';

    return <Navigate to={homeRoute} replace />;
  }

  return children;
};

function AppRouter() {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        {/* Landing */}
        <Route path="/" element={<LandingPage />} />

        {/* NUEVA PÁGINA DE EVENTOS */}
        <Route path="/events" element={<EventsPage />} />

        {/* Validación */}
        <Route path="/validation" element={<ValidationPage />} />

        {/* Auth */}
        <Route
          path="/auth"
          element={
            isAuthenticated ? (
              <Navigate
                to={
                  user?.role === 'organizador' || user?.role === 'admin'
                    ? '/organizer/dashboard'
                    : '/participant/dashboard'
                }
                replace
              />
            ) : (
              <AuthPage />
            )
          }
        />

        {/* Rutas privadas */}
        <Route
          path="/organizer/*"
          element={
            <PrivateRoute roleRequired="organizador">
              <OrganizerDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/participant/*"
          element={
            <PrivateRoute roleRequired="participante">
              <ParticipantDashboard />
            </PrivateRoute>
          }
        />

        {/* Solo en desarrollo */}
        {process.env.NODE_ENV === 'development' && (
          <Route path="/design-system" element={<DesignSystemTest />} />
        )}

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}

export default AppRouter;
