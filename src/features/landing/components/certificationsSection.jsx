import React from 'react';
import { ChevronRight, CheckCircle } from 'lucide-react';
import styles from './certificationsSection.module.css';

const LoadingCard = () => (
  <div className={styles.loadingCard}>
    <div className={styles.loadingBadge}></div>
    <div className={styles.loadingLine}></div>
    <div className={styles.loadingLineShort}></div>
  </div>
);

const CertCard = ({ title, description }) => (
  <div className={styles.certCard}>
    <div className={styles.badge}>
      <CheckCircle size={14} /> CERTIFICADO
    </div>
    <h3 className={styles.certTitle}>{title}</h3>
    <p className={styles.certDescription}>{description}</p>
    <a href="/validation" className={styles.certLink}>
      Verificar Validez
      <ChevronRight size={16} />
    </a>
  </div>
);

const CertificationsSection = ({ certifications = [], loading = false }) => {
  return (
    <section id="certifications" className={styles.certificationsSection}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>
          <span className={styles.titleUnderline}>
            VALIDACIÓN Y EMISIÓN DE CERTIFICADOS
          </span>
        </h2>
        
        {loading ? (
          <div className={styles.grid}>
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
          </div>
        ) : (
          <>
            <div className={styles.grid}>
              {certifications.map(cert => (
                <CertCard 
                  key={cert.id} 
                  title={cert.title} 
                  description={cert.description} 
                />
              ))}
            </div>
            
            <div className={styles.viewMore}>
              <a href="/validation" className={styles.viewMoreLink}>
                Portal de Verificación Único
                <ChevronRight size={18} />
              </a>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default CertificationsSection;