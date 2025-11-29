import React from 'react';
import styles from './participantManager.module.css';

const AttendanceStats = ({ stats }) => {
  return (
    <div className={styles.statsGrid}>
      <div className={`${styles.statCard} ${styles.statTotal}`}>
        <span className={styles.statLabel}>Total Inscritos</span>
        <span className={styles.statValue}>{stats.total}</span>
      </div>
      <div className={`${styles.statCard} ${styles.statPresent}`}>
        <span className={styles.statLabel}>Asistentes</span>
        <span className={styles.statValue}>{stats.present}</span>
      </div>
      <div className={`${styles.statCard} ${styles.statRate}`}>
        <span className={styles.statLabel}>Tasa de Asistencia</span>
        <span className={styles.statValue}>{stats.rate}%</span>
      </div>
    </div>
  );
};

export default AttendanceStats;