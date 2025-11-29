/* src/features/dashboard/components/Sidebar.jsx */
import React from 'react';
import { BookOpen, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styles from './sidebar.module.css';

const COLORS = {
  PRIMARY: '#598AEB',
  SECONDARY: '#59C87B',
  LIGHT_ACCENT: '#A7D3EB',
  BRAND_ACCENT: '#59EBBF',
  CARD_BG: '#0F172A',
  TEXT_LIGHT: '#FFFFFF',
  TEXT_DARK: '#0F172A',
  BG_BASE: '#FFFFFF',
};

const Sidebar = ({
  navItems = [],
  currentView,
  setCurrentView,
  userEmail,
  onLogout,
}) => {
  const navigate = useNavigate();

  return (
    <aside className={styles.aside}>
      {/* Logo Section */}
      <div className={styles.logoContainer}>
        <h1 className={styles.logoTitle}>
          <span style={{ color: '#598AEB' }}>S</span>
          <span style={{ color: '#59C87B' }}>I</span>
          <span style={{ color: '#59EBBF' }}>G</span>
          <span style={{ color: '#FFFFFF' }}>E</span>
          <span style={{ color: '#A7D3EB' }}>A</span>
        </h1>
      </div>

      {/* Navigation Links */}
      <nav className={styles.nav}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`${styles.navButton} ${
                isActive ? styles.navButtonActive : ''
              }`}
            >
              {Icon && <Icon size={18} />}
              <span className={styles.navLabel}>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer: botón "ver sitio público" + usuario + logout */}
      <div className={styles.footer}>
        <button
          onClick={() => navigate('/')}
          className="w-full flex items-center gap-2 px-4 py-2 mb-4 rounded-lg font-semibold text-sm transition-colors"
          style={{
            backgroundColor: COLORS.PRIMARY + '20',
            color: COLORS.LIGHT_ACCENT,
          }}
        >
          <BookOpen size={16} />
          <span>Ver sitio público</span>
        </button>

        <div className={styles.userInfo}>
          <p className={styles.userLabel}>Conectado como</p>
          <p className={styles.userEmail}>{userEmail || 'Usuario'}</p>
        </div>

        <button onClick={onLogout} className={styles.logoutButton}>
          <LogOut size={16} />
          Cerrar Sesión
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
