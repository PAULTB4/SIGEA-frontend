// ✅ src/components/common/Header.jsx
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useScrollSpy } from '../../hooks/useScrollSpy';
import { useAuth } from '../../features/auth/hooks/useAuth';
import styles from './header.module.css';

const SECTIONS = ['programs', 'certifications', 'about'];

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { activeId, isScrolled } = useScrollSpy(SECTIONS);
  const { user, isAuthenticated } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document
          .getElementById(sectionId)
          ?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document
        .getElementById(sectionId)
        ?.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  // ✅ Navegación a Auth con parámetro de vista
  const handleAuthNavigation = (view = 'login') => {
    navigate(`/auth?view=${view}`);
    setMobileMenuOpen(false);
  };

  // ✅ Volver al dashboard según el rol del usuario
  const handleGoToDashboard = () => {
    const role = user?.role;
    const dashboardRoute =
      role === 'organizador' || role === 'admin'
        ? '/organizer/dashboard'
        : '/participant/dashboard';

    navigate(dashboardRoute);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`${styles.header} ${
        isScrolled ? styles.headerScrolled : styles.headerTransparent
      }`}
    >
      <nav className={styles.navContainer}>
        <div className={styles.logoWrapper}>
          <div className={styles.logo} onClick={() => navigate('/')}>
            {['S', 'I', 'G', 'E', 'A'].map((char, index) => (
              <span
                key={index}
                className={styles.logoChar}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {char}
              </span>
            ))}
          </div>

          <div className={styles.desktopNav}>
            {[
              { id: 'programs', label: 'PROGRAMAS' },
              { id: 'certifications', label: 'CERTIFICADOS' },
              { id: 'about', label: 'NOSOTROS' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`${styles.navLink} ${
                  activeId === item.id ? styles.navLinkActive : ''
                }`}
              >
                {item.label}
                <span
                  className={`${styles.underline} ${
                    activeId === item.id ? styles.underlineActive : ''
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Desktop Actions */}
        <div className={styles.desktopActions}>
          {isAuthenticated ? (
            <button
              className={styles.btnRegister}
              onClick={handleGoToDashboard}
            >
              REGRESAR AL DASHBOARD
            </button>
          ) : (
            <>
              <button
                className={styles.btnRegister}
                onClick={() => handleAuthNavigation('register')}
              >
                CREAR CUENTA
              </button>
              <button
                className={styles.btnLogin}
                onClick={() => handleAuthNavigation('login')}
              >
                INICIAR SESIÓN
              </button>
            </>
          )}
        </div>

        <button
          className={styles.mobileToggle}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`${styles.mobileMenu} ${
          mobileMenuOpen ? styles.mobileMenuOpen : styles.mobileMenuClosed
        }`}
      >
        <div className={styles.mobileContent}>
          {SECTIONS.map((section) => (
            <button
              key={section}
              onClick={() => scrollToSection(section)}
              className={`${styles.mobileLink} ${
                activeId === section ? styles.mobileLinkActive : ''
              }`}
            >
              {section.toUpperCase()}
            </button>
          ))}

          <div className={styles.mobileActions}>
            {isAuthenticated ? (
              <button
                className={`${styles.btnRegister} ${styles.btnMobile}`}
                onClick={handleGoToDashboard}
              >
                REGRESAR AL DASHBOARD
              </button>
            ) : (
              <>
                <button
                  className={`${styles.btnRegister} ${styles.btnMobile}`}
                  onClick={() => handleAuthNavigation('register')}
                >
                  CREAR CUENTA
                </button>
                <button
                  className={`${styles.btnLogin} ${styles.btnMobile}`}
                  onClick={() => handleAuthNavigation('login')}
                >
                  INICIAR SESIÓN
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
