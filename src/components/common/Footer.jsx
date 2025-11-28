/* src/components/common/Footer.jsx */
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          
          {/* Brand */}
          <div>
            <h3 className={styles.brandTitle}>SIGEA</h3>
            <p className={styles.description}>
              Sistema de Gestión de Eventos Académicos, UNAS.
            </p>
          </div>
          
          {/* Plataforma */}
          <div>
            <h4 className={styles.columnTitle}>Plataforma</h4>
            <ul className={styles.linkList}>
              <li><a href="#programs" className={styles.link}>Explorar Eventos</a></li>
              <li><Link to="/validation" className={styles.link}>Validar Certificados</Link></li>
              <li><Link to="/auth" className={styles.link}>Acceso Organizador</Link></li>
            </ul>
          </div>
          
          {/* Recursos */}
          <div>
            <h4 className={styles.columnTitle}>Recursos</h4>
            <ul className={styles.linkList}>
              <li><a href="#about" className={styles.link}>Sobre Nosotros</a></li>
              <li><a href="#contact" className={styles.link}>Contáctanos</a></li>
              <li><Link to="/faq" className={styles.link}>Ayuda / FAQ</Link></li>
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h4 className={styles.columnTitle}>Legal</h4>
            <ul className={styles.linkList}>
              <li><Link to="/terms" className={styles.link}>Términos y Condiciones</Link></li>
              <li><Link to="/privacy" className={styles.link}>Política de Privacidad</Link></li>
            </ul>
          </div>
        </div>
        
        <div className={styles.copyright}>
          <p>&copy; {new Date().getFullYear()} SIGEA - UNAS. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;