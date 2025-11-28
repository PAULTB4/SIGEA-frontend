import React from 'react';
import styles from './participantManager.module.css';

const ActivitySelector = ({ activities, selectedId, onSelect }) => {
  return (
    <div className={styles.selectorContainer}>
      <label className={styles.label}>Seleccionar Actividad</label>
      <select
        value={selectedId || ''}
        onChange={(e) => onSelect(e.target.value)}
        className={styles.select}
        disabled={activities.length === 0}
      >
        {activities.length === 0 && <option>No hay actividades disponibles</option>}
        {activities.map((activity) => (
          <option key={activity.id} value={activity.id}>
            {activity.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ActivitySelector;