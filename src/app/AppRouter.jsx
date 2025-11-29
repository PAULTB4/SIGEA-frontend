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
const AdminDashboard = lazy(() => import('../pages/AdminDashboard')); 
const DesignSystemTest = lazy(() => import('../pages/DesignSystemTest'));
const EventsPage = lazy(() => import('../pages/EventsPage'));

// --- Helper para determinar la ruta "home" según el rol ---
const getHomeRoute = (role) => {
  const normalizedRole = role?.toLowerCase();
  
  switch (normalizedRole) {
    case 'admin':
    case 'administrador':
      return '/admin/dashboard';
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

  // Normalizar ambos roles para comparación case-insensitive
  const userRole = user?.role?.toLowerCase();
  const requiredRole = roleRequired?.toLowerCase();

  // Validación de Rol: Si se requiere un rol específico y el usuario no lo tiene
  if (requiredRole && userRole !== requiredRole) {
    // Permitir 'admin' y 'administrador' como equivalentes
    const isAdminRole = (userRole === 'admin' || userRole === 'administrador') &&
                        (requiredRole === 'admin' || requiredRole === 'administrador');
    
    if (!isAdminRole) {
      // Redirigir al dashboard que le corresponde al usuario
      const correctHome = getHomeRoute(user?.role);
      return <Navigate to={correctHome} replace />;
    }
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
        <Route
          path="/admin/*"
          element={
            <PrivateRoute roleRequired="administrador">
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