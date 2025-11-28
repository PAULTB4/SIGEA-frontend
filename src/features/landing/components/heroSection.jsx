
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import styles from './heroSection.module.css';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className={styles.heroSection}>
      <div className={styles.backgroundDecor}>
        <div className={styles.blob1} />
        <div className={styles.blob2} />
      </div>

      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>
            Gestiona tus cursos, talleres y conferencias
            <span className={styles.titleHighlight}> en un solo lugar</span>
          </h1>

          <div className={styles.descriptionBlock}>
            <p className={styles.description}>
              SIGEA digitaliza la gestión de eventos académicos de la UNAS:
              inscripción en línea, pagos, asistencia y certificados digitales
              con validación automática.
            </p>

            <ul className={styles.descriptionList}>
              <li>Inscripción 100% virtual desde cualquier dispositivo.</li>
              <li>Pagos en línea o en caja con estado actualizado.</li>
              <li>Certificados digitales con código QR y verificación inmediata.</li>
            </ul>
          </div>

          <div className={styles.ctaRow}>
            <button
              className={styles.ctaButton}
              onClick={() => navigate('/events')}
            >
              Explorar eventos
              <ArrowRight size={20} />
            </button>

            <button
              className={styles.secondaryCta}
              onClick={() => navigate('/validation')}
            >
              Validar certificado
            </button>
          </div>

          <div className={styles.heroSteps}>
            <p className={styles.stepsTitle}>¿Cómo funciona SIGEA?</p>
            <div className={styles.stepsGrid}>
              <div className={styles.stepItem}>
                <span className={styles.stepNumber}>1</span>
                <h3>Elige un evento</h3>
                <p>Programas, cursos, talleres y conferencias vigentes.</p>
              </div>
              <div className={styles.stepItem}>
                <span className={styles.stepNumber}>2</span>
                <h3>Inscríbete y paga</h3>
                <p>Completa tus datos y paga en línea o en caja.</p>
              </div>
              <div className={styles.stepItem}>
                <span className={styles.stepNumber}>3</span>
                <h3>Participa</h3>
                <p>Tu asistencia queda registrada desde SIGEA.</p>
              </div>
              <div className={styles.stepItem}>
                <span className={styles.stepNumber}>4</span>
                <h3>Recibe tu certificado</h3>
                <p>Descarga tu certificado digital y valídalo con QR.</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.illustration}>
          <img
            src="/images/heroSection-landing-certificacion.svg"
            alt="Vista previa de certificación digital y eventos del sistema SIGEA"
            className={styles.heroImage}
          />
        </div>
      </div>
    </section>

  );
};

export default HeroSection;