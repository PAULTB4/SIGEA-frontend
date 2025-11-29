/* src/features/dashboard/components/DashboardHome.jsx */
import React from 'react';
import { Activity, Users, Award, Calendar } from 'lucide-react';
import styles from './dashboardHome.module.css';

const DashboardHome = ({ userEmail }) => {
  // Mocks de datos (en el futuro vendrán de un hook useDashboardStats)
  const stats = [
    { id: 1, label: 'Actividades Activas', value: '12', icon: Activity, colorClass: styles.iconBlue },
    { id: 2, label: 'Inscritos Totales', value: '1,234', icon: Users, colorClass: styles.iconGreen },
    { id: 3, label: 'Certificados', value: '856', icon: Award, colorClass: styles.iconTeal },
    { id: 4, label: 'Eventos este Mes', value: '4', icon: Calendar, colorClass: styles.iconPurple },
  ];

  return (
    <div className={styles.container}>
      {/* Welcome Card */}
      <div className={styles.welcomeCard}>
        <h2 className={styles.welcomeTitle}>¡Hola de nuevo!</h2>
        <p className={styles.welcomeText}>
          Estás conectado como <strong>{userEmail}</strong>. Aquí tienes un resumen de la actividad reciente en la plataforma SIGEA.
        </p>
      </div>

      {/* Stats Grid */}
      <div>
        <h3 className={styles.sectionTitle}>Resumen General</h3>
        <div className={styles.statsGrid}>
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.id} className={styles.statCard}>
                <div className={styles.statHeader}>
                  <div className={`${styles.statIconWrapper} ${stat.colorClass}`}>
                    <Icon size={24} />
                  </div>
                </div>
                <div>
                  <div className={styles.statValue}>{stat.value}</div>
                  <div className={styles.statLabel}>{stat.label}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;