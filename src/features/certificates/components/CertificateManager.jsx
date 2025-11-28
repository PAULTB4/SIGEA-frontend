import React from 'react';
import { useCertificates } from '../hooks/useCertificates';
import IssuanceStats from './IssuanceStats';
import CertificateList from './CertificateList';
import styles from './certificateManager.module.css';
import { Alert } from '../../../components/ui';

const CertificateManager = () => {
  const {
    activities,
    selectedActivityId,
    issuedCertificates,
    issuableParticipants,
    loading,
    processing,
    error,
    success,
    handleSelectActivity,
    handleBulkIssue,
    clearMessages
  } = useCertificates();

  if (loading && activities.length === 0) return <div className="p-8">Cargando módulo...</div>;

  return (
    <div className={styles.container}>
      {/* Feedback Alerts */}
      {(error || success) && (
        <div className="mb-4" onClick={clearMessages}>
          {error && <Alert type="error" message={error} />}
          {success && <Alert type="success" message={success} />}
        </div>
      )}

      {/* 1. Selector de Actividad */}
      <div className={styles.selectorContainer}>
        <label className={styles.label}>Seleccionar Actividad para Gestionar Certificados</label>
        <select
          className={styles.select}
          value={selectedActivityId || ''}
          onChange={(e) => handleSelectActivity(e.target.value)}
          disabled={processing}
        >
          {activities.map((act) => (
            <option key={act.id} value={act.id}>{act.title}</option>
          ))}
        </select>
      </div>

      {selectedActivityId && (
        <>
          {/* 2. Panel de Emisión Masiva */}
          <IssuanceStats 
            issuedCount={issuedCertificates.length}
            eligibleCount={issuableParticipants.length}
            onIssue={handleBulkIssue}
            processing={processing}
          />

          {/* 3. Lista de Certificados Emitidos */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4">Historial de Emisiones</h3>
            <CertificateList certificates={issuedCertificates} />
          </div>
        </>
      )}
    </div>
  );
};

export default CertificateManager;