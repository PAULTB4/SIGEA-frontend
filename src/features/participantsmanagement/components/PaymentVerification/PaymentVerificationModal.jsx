import React, { useState } from 'react';
import { X, Upload, AlertCircle, CheckCircle, Search } from 'lucide-react';
import styles from './paymentVerification.module.css';

const PaymentVerificationModal = ({
  isOpen,
  onClose,
  activityId,           // lo dejamos por si luego quieres mostrarlo en UI
  participants = [],
  onSuccess,
  onVerifyPayment,       // 🔴 NUEVO: viene desde el hook
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [dragActive, setDragActive] = useState(false);

  // Filtrar participantes
  const filteredParticipants = participants.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file) => {
    setError('');

    const validTypes = [
      'application/pdf',
      'image/jpeg',
      'image/png',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!validTypes.includes(file.type)) {
      setError('Formato no válido. Usa PDF, JPEG, PNG, DOC o DOCX.');
      return;
    }

    if (file.size > maxSize) {
      setError('El archivo excede el límite de 10MB.');
      return;
    }

    setUploadedFile({
      name: file.name,
      size: (file.size / 1024 / 1024).toFixed(2),
      file,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedParticipant || !uploadedFile || !onVerifyPayment) return;

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const result = await onVerifyPayment(
        selectedParticipant.id,
        uploadedFile.file
      );

      if (result?.success) {
        setSuccess('¡Pago verificado! Estado actualizado a PAGADO.');
        if (onSuccess) onSuccess();

        setTimeout(() => {
          handleClose();
        }, 2000);
      } else {
        setError(result?.message || 'Error al verificar el pago.');
      }
    } catch (err) {
      setError(err?.message || 'Error de conexión.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSelectedParticipant(null);
    setUploadedFile(null);
    setSearchTerm('');
    setSuccess('');
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>Verificación Manual de Pagos</h2>
          <button onClick={handleClose} className={styles.closeButton}>
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className={styles.content}>
          {/* Alerts */}
          {error && (
            <div className={`${styles.alert} ${styles.alertError}`}>
              <AlertCircle size={20} />
              <span>{error}</span>
            </div>
          )}
          {success && (
            <div className={`${styles.alert} ${styles.alertSuccess}`}>
              <CheckCircle size={20} />
              <span>{success}</span>
            </div>
          )}

          {/* 1. Selección de Participante */}
          <div>
            <label className={styles.label}>Seleccionar Participante</label>
            {!selectedParticipant ? (
              <div className={styles.searchWrapper}>
                <Search className={styles.searchIcon} size={18} />
                <input
                  type="text"
                  placeholder="Buscar por nombre, email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={styles.searchInput}
                  autoFocus
                />

                {searchTerm && (
                  <div className={styles.resultsDropdown}>
                    {filteredParticipants.length > 0 ? (
                      filteredParticipants.map((p) => (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => {
                            setSelectedParticipant(p);
                            setSearchTerm('');
                          }}
                          className={styles.resultItem}
                        >
                          <div className={styles.participantName}>{p.name}</div>
                          <div className={styles.participantEmail}>{p.email}</div>
                          <div className={styles.participantStatus}>
                            Estado: {p.paymentStatus}
                          </div>
                        </button>
                      ))
                    ) : (
                      <div className="p-4 text-center text-sm text-gray-500">
                        No se encontraron resultados
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className={styles.selectedCard}>
                <div>
                  <div className={styles.participantName}>
                    {selectedParticipant.name}
                  </div>
                  <div className={styles.participantEmail}>
                    {selectedParticipant.email}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedParticipant(null)}
                  className={styles.changeButton}
                >
                  Cambiar
                </button>
              </div>
            )}
          </div>

          {/* 2. Subida de Archivo */}
          {selectedParticipant && (
            <div>
              <label className={styles.label}>Comprobante de Pago</label>
              {!uploadedFile ? (
                <div
                  className={`${styles.uploadZone} ${
                    dragActive ? styles.uploadZoneActive : ''
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() =>
                    document.getElementById('file-proof')?.click()
                  }
                >
                  <Upload className={styles.uploadIcon} size={32} />
                  <p className={styles.uploadText}>
                    Arrastra el archivo o haz clic
                  </p>
                  <p className={styles.uploadSubtext}>
                    PDF, JPG, PNG (Máx 10MB)
                  </p>
                  <input
                    id="file-proof"
                    type="file"
                    className="hidden"
                    onChange={handleFileInputChange}
                  />
                </div>
              ) : (
                <div className={styles.fileCard}>
                  <div className={styles.fileInfo}>
                    <CheckCircle size={20} className="text-green-500" />
                    <div>
                      <div className={styles.participantName}>
                        {uploadedFile.name}
                      </div>
                      <div className={styles.participantEmail}>
                        {uploadedFile.size} MB
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setUploadedFile(null)}
                    className={styles.removeFileBtn}
                  >
                    <X size={18} />
                  </button>
                </div>
              )}
            </div>
          )}
        </form>

        {/* Footer Actions */}
        <div className={styles.footer}>
          <button
            type="button"
            onClick={handleClose}
            className={`${styles.btn} ${styles.btnCancel}`}
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading || !selectedParticipant || !uploadedFile}
            className={`${styles.btn} ${styles.btnSubmit}`}
          >
            {loading ? 'Verificando...' : 'Verificar Pago'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentVerificationModal;
