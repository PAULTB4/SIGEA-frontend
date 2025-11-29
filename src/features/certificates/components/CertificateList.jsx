import React from 'react';
import { Download } from 'lucide-react';
import styles from './certificateManager.module.css';
import { Button } from '../../../components/ui';

const CertificateList = ({ certificates }) => {
  if (!certificates || certificates.length === 0) {
    return <div className={styles.emptyState}>No se han emitido certificados aún.</div>;
  }

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>ID Certificado</th>
            <th className={styles.th}>Participante</th>
            <th className={styles.th}>Email</th>
            <th className={styles.th}>Fecha Emisión</th>
            <th className={styles.th}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {certificates.map((cert) => (
            <tr key={cert.id}>
              <td className={styles.td}><code className="text-xs bg-gray-100 p-1 rounded">{cert.id}</code></td>
              <td className={styles.td}><strong>{cert.participantName}</strong></td>
              <td className={styles.td}>{cert.email}</td>
              <td className={styles.td}>{cert.issuedDate}</td>
              <td className={styles.td}>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                  onClick={() => alert(`Descargando ${cert.id}...`)}
                >
                  <Download size={16} /> PDF
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CertificateList;