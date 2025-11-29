/* src/app/AppRouter.jsx */
import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../features/auth/hooks/useAuth';
import LoadingScreen from '../components/common/LoadingScreen';

// Lazy loading de páginas
const LandingPage = lazy(() => import('../pages/LandingPage'));
const AuthPage = lazy(() => import('../pages/Auth'));
const ValidationPage = lazy(() => import('../pages/ValidationPage'));
const OrganizerDashboard = lazy(() => import('../pages/OrganizerActivity'));
const ParticipantDashboard = lazy(() => import('../pages/ParticipantDashboard'));
const AdminDashboard = lazy(() => import('../pages/AdminDashboard')); // ✅ Admin
const DesignSystemTest = lazy(() => import('../pages/DesignSystemTest'));
const EventsPage = lazy(() => import('../pages/EventsPage'));

// --- Helper para determinar la ruta "home" según el rol ---
const getHomeRoute = (role) => {
  switch (role) {
    case 'admin':
    case 'administrador':
      return '/admin/dashboard'; // ✅ Nueva ruta correcta
    case 'organizador':
      return '/organizer/dashboard';
    case 'participante':
    case 'estudiante':
      return '/participant/dashboard';
    default:
      return '/'; // Fallback
  }
};

const PrivateRoute = ({ children, roleRequired }) => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  // Validación de Rol: Si se requiere un rol específico y el usuario no lo tiene
  if (roleRequired && user?.role !== roleRequired) {
    // Redirigir al dashboard que le corresponde al usuario
    const correctHome = getHomeRoute(user?.role);
    return <Navigate to={correctHome} replace />;
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
        {/* Rutas Públicas */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/validation" element={<ValidationPage />} />

        {/* Auth: Redirección inteligente si ya está logueado */}
        <Route
          path="/auth"
          element={
            isAuthenticated ? (
              <Navigate to={getHomeRoute(user?.role)} replace />
            ) : (
              <AuthPage />
            )
          }
        />

        {/* Rutas Privadas */}
        
        {/* ADMINISTRADOR */}
        {/* Nota: Puedes quitar el PrivateRoute temporalmente si necesitas el bypass, 
            pero esta es la implementación correcta final */}
        <Route
          path="/admin/*"
          element={
            <PrivateRoute roleRequired="admin">
              <AdminDashboard />
            </PrivateRoute>
          }
        />

        {/* ORGANIZADOR */}
        <Route
          path="/organizer/*"
          element={
            <PrivateRoute roleRequired="organizador">
              <OrganizerDashboard />
            </PrivateRoute>
          }
        />

        {/* PARTICIPANTE */}
        <Route
          path="/participant/*"
          element={
            <PrivateRoute roleRequired="participante">
              <ParticipantDashboard />
            </PrivateRoute>
          }
        />

        {/* Desarrollo */}
        {import.meta.env.MODE === 'development' && (
          <Route path="/design-system" element={<DesignSystemTest />} />
        )}

        {/* Fallback 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}

export default AppRouter;