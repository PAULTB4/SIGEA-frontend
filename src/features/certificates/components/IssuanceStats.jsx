import React from 'react';
import { Award } from 'lucide-react';
import styles from './certificateManager.module.css';

const IssuanceStats = ({ issuedCount, eligibleCount, onIssue, processing }) => {
  return (
    <div className={styles.statsContainer}>
      {/* Elegibles (Pendientes de emitir) */}
      <div className={styles.statCard}>
        <span className={styles.statLabel}>Listos para Emitir (Pagados)</span>
        <span className={`${styles.statValue} ${styles.eligibleValue}`}>
          {eligibleCount}
        </span>
      </div>

      {/* Ya Emitidos */}
      <div className={styles.statCard}>
        <span className={styles.statLabel}>Certificados Emitidos</span>
        <span className={`${styles.statValue} ${styles.issuedValue}`}>
          {issuedCount}
        </span>
      </div>

      {/* Botón de Acción */}
      <button 
        className={styles.issueButton}
        onClick={onIssue}
        disabled={eligibleCount === 0 || processing}
      >
        <Award size={20} />
        {processing ? 'Emitiendo...' : 'Emitir Masivamente'}
      </button>
    </div>
  );
};

export default IssuanceStats;