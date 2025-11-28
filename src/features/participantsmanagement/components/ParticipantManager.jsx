import React from 'react';
import { Search, Download, CreditCard } from 'lucide-react';
import { Button } from '../../../components/ui';
import { useParticipantManager } from '../hooks/useParticipantManager';
import ActivitySelector from './ActivitySelector';
import AttendanceStats from './AttendanceStats';
import ParticipantList from './ParticipantList';
import PaymentVerificationModal from './PaymentVerification/PaymentVerificationModal';
import styles from './participantManager.module.css';

const ParticipantManager = () => {
  const {
    activities,
    selectedActivityId,
    participants,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    attendanceMap,
    stats,
    showPaymentModal,
    setShowPaymentModal,
    handleSelectActivity,
    toggleAttendance,
    saveAttendance,
    verifyPaymentManually,
    refreshData,
  } = useParticipantManager();

  if (loading && activities.length === 0) {
    return <div className="p-8">Cargando módulo...</div>;
  }

  return (
    <div className={styles.container}>
      {error && <div className="bg-red-50 text-red-600 p-4 rounded-lg">{error}</div>}

      <ActivitySelector
        activities={activities}
        selectedId={selectedActivityId}
        onSelect={handleSelectActivity}
      />

      {selectedActivityId && (
        <>
          <AttendanceStats stats={stats} />

          <div className={styles.toolbar}>
            <div className={styles.searchBox}>
              <Search className={styles.searchIcon} size={18} />
              <input
                type="text"
                placeholder="Buscar participante..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
            </div>

            <div className={styles.actions}>
              <Button
                variant="outline"
                onClick={() => setShowPaymentModal(true)}
                className="flex items-center gap-2"
              >
                <CreditCard size={18} />
                Verificar Pagos
              </Button>

              <Button
                onClick={saveAttendance}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white"
              >
                <Download size={18} />
                Guardar Asistencia
              </Button>
            </div>
          </div>

          <ParticipantList
            participants={participants}
            attendanceMap={attendanceMap}
            onToggleAttendance={toggleAttendance}
          />

          <PaymentVerificationModal
            isOpen={showPaymentModal}
            onClose={() => setShowPaymentModal(false)}
            activityId={selectedActivityId}
            participants={participants}
            onSuccess={refreshData}
            onVerifyPayment={verifyPaymentManually}
          />
        </>
      )}
    </div>
  );
};

export default ParticipantManager;
