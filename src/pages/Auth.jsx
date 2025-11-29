import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AuthLayout } from '../features/auth/components/AuthLayout';
import { LoginForm } from '../features/auth/components/LoginForm';
import { RegisterForm } from '../features/auth/components/RegisterForm';
import PasswordRecovery from '../features/auth/components/PasswordRecovery';
import styles from '../features/auth/components/authLayout.module.css';

const Auth = () => {
  const [searchParams] = useSearchParams();
  const [view, setView] = useState('login');

  useEffect(() => {
    const viewParam = searchParams.get('view');
    if (viewParam && ['login', 'register', 'recovery'].includes(viewParam)) {
      setView(viewParam);
    }
  }, [searchParams]);

  const handleViewChange = (newView) => {
    setView(newView);
    const url = new URL(window.location);
    url.searchParams.set('view', newView);
    window.history.pushState({}, '', url);
  };

  return (
    <AuthLayout view={view}>
      {/* Header + Tabs solo para login / register */}
      {(view === 'login' || view === 'register') && (
        <>
          <div className={styles.header}>
            <h2 className={styles.headerTitle}>
              Bienvenido a <span className={styles.headerBrand}>S.I.G.E.A</span>
            </h2>
            <p className={styles.headerSubtitle}>
              Inicia sesión o regístrate para gestionar tus eventos y certificados.
            </p>
          </div>

          <div className={styles.toggleTabs}>
            <button
              onClick={() => handleViewChange('login')}
              className={`${styles.toggleTab} ${
                view === 'login' ? styles.active : ''
              }`}
            >
              Iniciar Sesión
            </button>
            <button
              onClick={() => handleViewChange('register')}
              className={`${styles.toggleTab} ${
                view === 'register' ? styles.active : ''
              }`}
            >
              Regístrate
            </button>
          </div>
        </>
      )}

      {/* Render Forms */}
      {view === 'login' && <LoginForm />}
      {view === 'register' && <RegisterForm />}
      {view === 'recovery' && (
        <PasswordRecovery onBack={() => handleViewChange('login')} />
      )}
    </AuthLayout>
  );
};

export default Auth;
