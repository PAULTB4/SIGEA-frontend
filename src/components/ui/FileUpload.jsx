import React, { useRef, useState } from 'react';
import { Upload, X, FileText, Image, AlertCircle } from 'lucide-react';
import styles from './fileUpload.module.css';

const FileUpload = ({ 
  label, 
  accept = "*", 
  maxSizeMB = 5, 
  onFileSelect, 
  onRemoveFile,
  currentFile, 
  multiple = false 
}) => {
  const inputRef = useRef(null);
  const [error, setError] = useState('');
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  };

  const validateFile = (file) => {
    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`El archivo excede el límite de ${maxSizeMB}MB`);
      return false;
    }
    return true;
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    setError('');
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (validateFile(file)) onFileSelect(file);
    }
  };

  const handleChange = (e) => {
    setError('');
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (validateFile(file)) onFileSelect(file);
    }
  };

  // Clases dinámicas para la zona de drop
  const dropZoneClass = `${styles.dropZone} 
    ${dragActive ? styles.dropZoneActive : ''} 
    ${error ? styles.dropZoneError : ''}`;

  return (
    <div className={styles.container}>
      {label && <label className={styles.label}>{label}</label>}
      
      {!currentFile ? (
        <div
          className={dropZoneClass}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
        >
          <input
            ref={inputRef}
            type="file"
            className="hidden" // Tailwind utility o style={{display:'none'}}
            style={{ display: 'none' }}
            accept={accept}
            multiple={multiple}
            onChange={handleChange}
          />
          
          <Upload className={`${styles.uploadIcon} ${error ? styles.uploadIconError : ''}`} />
          
          <p className={styles.uploadText}>
            <span className={styles.uploadLink}>Haz clic para subir</span> o arrastra y suelta
          </p>
          <p className={styles.uploadSubtext}>
            Máximo {maxSizeMB}MB
          </p>
        </div>
      ) : (
        <div className={styles.fileCard}>
          <div className={styles.fileInfoContainer}>
            <div className={styles.iconWrapper}>
              {currentFile.type.includes('image') ? (
                <Image className={styles.fileIconImage} />
              ) : (
                <FileText className={styles.fileIconDoc} />
              )}
            </div>
            <div className={styles.fileDetails}>
              <p className={styles.fileName}>{currentFile.name}</p>
              <p className={styles.fileSize}>
                {(currentFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
          
          <button
            type="button"
            onClick={() => { onRemoveFile(); setError(''); }}
            className={styles.removeButton}
          >
            <X size={20} />
          </button>
        </div>
      )}

      {error && (
        <div className={styles.errorMessage}>
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default FileUpload;