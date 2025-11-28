import React from 'react';
import styles from './aboutSection.module.css';

const AboutSection = () => {
  return (
    <section id="about" className={styles.aboutSection}>
      <div className={styles.container}>
        <h2 className={styles.title}>Nuestra Misión</h2>
        <p className={styles.description}>
          El <strong className={styles.highlight}>Sistema Integral de Gestión de Eventos Académicos (SIGEA)</strong> es la plataforma que moderniza la extensión universitaria de la <strong className={styles.highlightSecondary}>Universidad Nacional Agraria de la Selva (UNAS)</strong>. Nos enfocamos en automatizar el ciclo completo de actividades: desde la inscripción y el pago, hasta la generación y validación automática de certificados digitales, garantizando transparencia, trazabilidad y una experiencia de usuario superior.
        </p>
      </div>
    </section>
  );
};

export default AboutSection;