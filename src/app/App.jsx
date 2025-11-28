/* src/app/App.jsx */
import React from 'react';
import AppRouter from './AppRouter';
import { AuthProvider } from '../features/auth/hooks/useAuth';

/**
 * Componente Raíz de la Aplicación
 */
function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}

export default App;