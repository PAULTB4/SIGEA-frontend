import React from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';
import styles from './participantManager.module.css';

const PaymentBadge = ({ status }) => {
  const getStyle = (s) => {
    switch (s?.toUpperCase()) {
      case 'PAGADO': return styles.badgePagado;
      case 'PENDIENTE': return styles.badgePendiente;
      case 'EXONERADO': return styles.badgeExonerado;
      default: return styles.badgePendiente;
    }
  };

  return (
    <span className={`${styles.badge} ${getStyle(status)}`}>
      {status || 'PENDIENTE'}
    </span>
  );
};

const ParticipantList = ({ participants, attendanceMap, onToggleAttendance }) => {
  if (participants.length === 0) {
    return <div className="p-8 text-center text-gray-500">No hay participantes encontrados.</div>;
  }

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>Nombre</th>
            <th className={styles.th}>Email</th>
            <th className={styles.th}>Registro</th>
            <th className={styles.th}>Estado Pago</th>
            <th className={`${styles.th} text-center`}>Asistencia</th>
          </tr>
        </thead>
        <tbody>
          {participants.map((p) => (
            <tr key={p.id} className={styles.row}>
              <td className={styles.td}>
                <div className="font-medium">{p.name}</div>
              </td>
              <td className={styles.td}>{p.email}</td>
              <td className={styles.td}>{p.registrationDate}</td>
              <td className={styles.td}>
                <PaymentBadge status={p.paymentStatus} />
              </td>
              <td className={`${styles.td} text-center`}>
                <button 
                  onClick={() => onToggleAttendance(p.id)} 
                  className={styles.toggleBtn}
                  title="Marcar/Desmarcar Asistencia"
                >
                  {attendanceMap[p.id] ? (
                    <CheckCircle size={22} className={styles.iconCheck} />
                  ) : (
                    <AlertCircle size={22} className={styles.iconAlert} />
                  )}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ParticipantList;