/* src/app/App.jsx */
import React from 'react';
import AppRouter from './AppRouter'; // (PascalCase)
import { AuthProvider } from '../features/auth/hooks/useAuth'; // (Contiene useAuth.js)

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