import React from 'react';
import { Plus, Search } from 'lucide-react';
import { useActivityManager } from '../hooks/useActivityManager';
import ActivityList from './ActivityList';
import ActivityForm from './ActivityForm/ActivityForm';
import FilterBar from '../../activities/components/ActivityFilters';
import ReportsDocumentation from '../../activities/components/ReportsModal/ReportsDocumentation';
import styles from './activityManager.module.css';

const ActivityManager = ({ userEmail }) => {
  const {
    activities,
    loading,
    showForm,
    showReports,
    editingActivity,
    selectedActivityForReports,
    searchTerm,
    filters,
    setSearchTerm,
    setFilters,
    handleCreate,
    handleEdit,
    handleCancelEdit,
    handleSuccess,
    handleDelete,
    handleOpenReports,
    handleCloseReports
  } = useActivityManager();

  return (
    <div className={styles.container}>
      {/* Header & Search */}
      <div className={styles.header}>
        <div className={styles.searchContainer}>
          <Search size={18} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Buscar actividades..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>
        <button onClick={showForm ? handleCancelEdit : handleCreate} className={styles.createButton}>
          <Plus size={18} />
          {showForm ? 'Cancelar' : 'Nueva Actividad'}
        </button>
      </div>

      {/* Filters Pasar filters como prop */}
      <FilterBar filters={filters} onFilterChange={setFilters} />

      {/* Form Section (Conditional) */}
      {showForm && (
        <div className={styles.formWrapper}>
          <ActivityForm
            userEmail={userEmail}
            onSuccess={handleSuccess}
            editingActivityId={editingActivity?.id}
            editingActivityData={editingActivity}
          />
        </div>
      )}

      {/* List Section */}
      <div>
        <h3 className={styles.listTitle}>
          Mis Actividades ({activities.length})
        </h3>
        <ActivityList
          activities={activities}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onOpenReports={handleOpenReports}
        />
      </div>

      {/* Reports Modal */}
      {showReports && selectedActivityForReports && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <div>
                <h2 className={styles.modalTitle}>Informes y Documentación</h2>
                <p className={styles.modalSubtitle}>{selectedActivityForReports.title}</p>
              </div>
              <button onClick={handleCloseReports} className={styles.modalCloseBtn}>
                Cerrar
              </button>
            </div>
            <div style={{ padding: '1.5rem' }}>
              <ReportsDocumentation selectedActivityId={selectedActivityForReports.id} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityManager;