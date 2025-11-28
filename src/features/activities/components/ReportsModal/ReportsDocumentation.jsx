import React, { useState } from 'react';
import { Upload, AlertCircle, CheckCircle } from 'lucide-react';
import activityService from '../../../../services/activityService';
import FileUpload from '../../../../components/ui/FileUpload'; 
import styles from './reportsDocumentation.module.css';

const ReportsDocumentation = ({ selectedActivityId }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Estado para los archivos (array de archivos por tipo)
  const [uploadedReports, setUploadedReports] = useState({
    proposal: [],
    final: [],
    evidence: []
  });

  // Manejador unificado que usa FileUpload
  const handleFileUpload = (reportType, file) => {
    setError('');
    setSuccess('');
    // FileUpload nos devuelve un archivo único, lo metemos en un array
    // Si fuera múltiple (evidencia), habría que concatenar, pero simplifiquemos por ahora a reemplazo
    setUploadedReports((prev) => ({
      ...prev,
      [reportType]: file ? [file] : []
    }));
  };
  

  const handleSubmitAll = async () => {
    const hasFiles = Object.values(uploadedReports).some((files) => files.length > 0);

    if (!hasFiles) {
      setError('Por favor, carga al menos un documento');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const uploads = [];

      // Proposal
      if (uploadedReports.proposal.length > 0) {
        uploads.push(
          activityService.uploadReport(selectedActivityId, 'proposal', uploadedReports.proposal[0])
        );
      }

      // Final Report
      if (uploadedReports.final.length > 0) {
        uploads.push(
          activityService.uploadReport(selectedActivityId, 'final', uploadedReports.final[0])
        );
      }

      // Evidence (Asumiendo que la API acepta array o un solo archivo de evidencia por llamada)
      // Si es array:
      if (uploadedReports.evidence.length > 0) {
        uploads.push(
            // Aquí ajustas si tu servicio soporta array o solo un archivo
            activityService.uploadReport(selectedActivityId, 'evidence', uploadedReports.evidence[0])
        );
      }

      const results = await Promise.all(uploads);
      const allSuccessful = results.every((result) => result.success);

      if (allSuccessful) {
        setSuccess('¡Todos los documentos han sido cargados exitosamente!');
        setTimeout(() => {
          setUploadedReports({ proposal: [], final: [], evidence: [] });
          setSuccess('');
        }, 2500);
      } else {
        setError('Algunos documentos no se pudieron cargar.');
      }
    } catch (err) {
      setError(err.message || 'Error al cargar los documentos.');
    } finally {
      setLoading(false);
    }
  };

  // Estados para el resumen visual
  const proposalFilled = uploadedReports.proposal.length > 0;
  const finalFilled = uploadedReports.final.length > 0;
  const evidenceFilled = uploadedReports.evidence.length > 0;

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h3 className={styles.title}>Informes y Documentación</h3>
        <p className={styles.subtitle}>Carga los documentos asociados a esta actividad</p>
      </div>

      {/* Alerts */}
      <div className={styles.alertsContainer}>
        {error && (
          <div className={`${styles.alert} ${styles.alertError}`}>
            <AlertCircle size={20} /> <span>{error}</span>
          </div>
        )}
        {success && (
          <div className={`${styles.alert} ${styles.alertSuccess}`}>
            <CheckCircle size={20} /> <span>{success}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className={styles.content}>
        {/* Section 1: Proposal */}
        <FileUpload
          label="Informe de Propuesta"
          accept=".pdf,.doc,.docx"
          maxSizeMB={20}
          currentFile={uploadedReports.proposal[0]}
          onFileSelect={(file) => handleFileUpload('proposal', file)}
          onRemoveFile={() => handleFileUpload('proposal', null)}
        />

        {/* Section 2: Final Report */}
        <FileUpload
          label="Informe Final y Temas"
          accept=".pdf,.doc,.docx"
          maxSizeMB={20}
          currentFile={uploadedReports.final[0]}
          onFileSelect={(file) => handleFileUpload('final', file)}
          onRemoveFile={() => handleFileUpload('final', null)}
        />

        {/* Section 3: Evidence */}
        {/* Nota: Usamos el mismo FileUpload. Si necesitas múltiple real, FileUpload debe soportarlo */}
        <FileUpload
          label="Evidencia Fotográfica"
          accept=".jpg,.jpeg,.png,.webp"
          maxSizeMB={20}
          currentFile={uploadedReports.evidence[0]}
          onFileSelect={(file) => handleFileUpload('evidence', file)}
          onRemoveFile={() => handleFileUpload('evidence', null)}
        />
      </div>

      {/* Footer */}
      <div className={styles.footerSection}>
        {/* Resumen de Pasos */}
        <div className={styles.summaryCard}>
          <p className={styles.summaryLabel}>Estado de Documentos:</p>
          <div className={styles.stepsGrid}>
            <div className={styles.stepItem}>
              <div className={`${styles.stepCircle} ${proposalFilled ? styles.stepCompleted : styles.stepPending}`}>
                {proposalFilled ? <CheckCircle size={20} /> : '1'}
              </div>
              <span className={styles.stepLabel}>Propuesta</span>
            </div>
            <div className={styles.stepItem}>
              <div className={`${styles.stepCircle} ${finalFilled ? styles.stepCompleted : styles.stepPending}`}>
                {finalFilled ? <CheckCircle size={20} /> : '2'}
              </div>
              <span className={styles.stepLabel}>Informe Final</span>
            </div>
            <div className={styles.stepItem}>
              <div className={`${styles.stepCircle} ${evidenceFilled ? styles.stepCompleted : styles.stepPending}`}>
                {evidenceFilled ? <CheckCircle size={20} /> : '3'}
              </div>
              <span className={styles.stepLabel}>Evidencia</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className={styles.actions}>
          <button
            type="button"
            className={`${styles.btn} ${styles.btnClear}`}
            onClick={() => {
              setUploadedReports({ proposal: [], final: [], evidence: [] });
              setError('');
              setSuccess('');
            }}
            disabled={loading}
          >
            Limpiar Todo
          </button>
          <button
            type="button"
            className={`${styles.btn} ${styles.btnSubmit}`}
            onClick={handleSubmitAll}
            disabled={loading || (!proposalFilled && !finalFilled && !evidenceFilled)}
          >
            <Upload size={18} />
            {loading ? 'Cargando...' : 'Cargar Documentos'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportsDocumentation;