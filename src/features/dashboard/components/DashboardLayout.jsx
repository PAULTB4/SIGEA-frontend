/* src/features/dashboard/components/DashboardLayout.jsx */
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import styles from './dashboardLayout.module.css';

/**
 * Layout genérico de dashboard.
 * 
 * Props:
 * - userEmail: string
 * - navItems: array de { id, label, icon }
 * - viewConfig: objeto { [id]: { title, subtitle, component } }
 * - defaultView: string (id por defecto)
 * - onLogout: función
 */
const DashboardLayout = ({
  userEmail,
  navItems,
  viewConfig,
  defaultView = 'home',
  onLogout,
}) => {
  const [currentView, setCurrentView] = useState(defaultView);

  const current = viewConfig[currentView] || viewConfig[defaultView];
  const CurrentComponent = current?.component || null;

  return (
    <div className={styles.layoutContainer}>
      <Sidebar
        navItems={navItems}
        currentView={currentView}
        setCurrentView={setCurrentView}
        userEmail={userEmail}
        onLogout={onLogout}
      />

      <main className={styles.mainContent}>
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.headerContent}>
            <div>
              <h1 className={styles.title}>{current?.title || ''}</h1>
              <p className={styles.subtitle}>{current?.subtitle || ''}</p>
            </div>
          </div>
        </header>

        {/* Contenido scrollable */}
        <div className={styles.scrollableArea}>
          <div className={styles.pageContainer}>
            {CurrentComponent && <CurrentComponent userEmail={userEmail} />}
          </div>

          <footer className={styles.footer}>
            <p>© 2025 SIGEA - Gestión Académica y Certificación Digital</p>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
