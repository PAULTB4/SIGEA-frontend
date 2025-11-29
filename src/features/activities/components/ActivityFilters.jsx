import React from 'react';
import styles from './activityFilters.module.css';

const ActivityFilters = ({ filters = {}, onFilterChange }) => {

  const safeFilters = {
    status: filters?.status || '',
    startDate: filters?.startDate || '',
    endDate: filters?.endDate || ''
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.filterGroup}>
        <label className={styles.label}>Estado</label>
        <select
          name="status"
          value={safeFilters.status}
          onChange={handleChange}
          className={styles.select}
        >
          <option value="">Todos</option>
          <option value="activa">Activa</option>
          <option value="en_curso">En Curso</option>
          <option value="finalizada">Finalizada</option>
        </select>
      </div>

      <div className={styles.filterGroup}>
        <label className={styles.label}>Desde</label>
        <input
          type="date"
          name="startDate"
          value={safeFilters.startDate}
          onChange={handleChange}
          className={styles.input}
        />
      </div>

      <div className={styles.filterGroup}>
        <label className={styles.label}>Hasta</label>
        <input
          type="date"
          name="endDate"
          value={safeFilters.endDate}
          onChange={handleChange}
          className={styles.input}
        />
      </div>
    </div>
  );
};

export default ActivityFilters;