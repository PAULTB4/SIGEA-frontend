import React from 'react';
import { Edit2, Trash2, FileText, Activity } from 'lucide-react';
import styles from './activityManager.module.css';

// Helper para badges
const getStatusClass = (status) => {
  switch (status) {
    case 'activa':
    case 'en_curso': return styles.statusActive;
    case 'proxima':
    case 'pendiente': return styles.statusPending;
    case 'finalizada': return styles.statusFinished;
    default: return styles.statusPending;
  }
};

const ActivityList = ({ activities, loading, onEdit, onDelete, onOpenReports }) => {
  if (loading) {
    return (
      <div className={styles.grid}>
        {[1, 2, 3].map((i) => (
          <div key={i} className={styles.skeleton} />
        ))}
      </div>
    );
  }

  if (activities.length === 0) {
    return (
      <div className={styles.emptyState}>
        <Activity size={48} color="#598AEB" style={{ margin: '0 auto 1rem' }} />
        <p>No hay actividades registradas. ¡Crea una nueva!</p>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {activities.map((activity) => (
        <div key={activity.id} className={styles.card}>
          {/* Cover Image */}
          <div className={styles.coverImage}>
            {activity.coverImage ? (
              <img src={activity.coverImage} alt={activity.title} className={styles.image} />
            ) : (
              <Activity size={32} color="#598AEB" />
            )}
          </div>

          {/* Details */}
          <div className={styles.info}>
            <div className={styles.titleRow}>
              <h4 className={styles.title}>{activity.title}</h4>
              <span className={`${styles.badge} ${getStatusClass(activity.status)}`}>
                {activity.status}
              </span>
            </div>
            <p className={styles.meta}>
              <strong>Tipo:</strong> {activity.type} | <strong>Duración:</strong> {activity.duration}
            </p>
            <p className={styles.dates}>
              <strong>Periodo:</strong> {activity.startDate} a {activity.endDate}
            </p>
            <p className={styles.stats}>
              <strong>Participantes:</strong> {activity.participantCount || 0}
            </p>
          </div>

          {/* Actions */}
          <div className={styles.actions}>
            <button onClick={() => onOpenReports(activity)} className={`${styles.actionBtn} ${styles.btnReports}`} title="Informes">
              <FileText size={18} />
            </button>
            <button onClick={() => onEdit(activity)} className={`${styles.actionBtn} ${styles.btnEdit}`} title="Editar">
              <Edit2 size={18} />
            </button>
            <button onClick={() => onDelete(activity.id)} className={`${styles.actionBtn} ${styles.btnDelete}`} title="Eliminar">
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActivityList;