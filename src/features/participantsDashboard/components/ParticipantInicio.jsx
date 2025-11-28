// src/features/participantDashboard/components/ParticipantInicio.jsx
import React, { useState, useEffect } from 'react';
import { BookOpen, Award, CreditCard, CheckCircle } from 'lucide-react';
import participantService from '../../../services/participantService';
import { handleApiError, logError } from '../../../utils/errorHandler';

const COLORS = {
  PRIMARY: '#598AEB',
  SECONDARY: '#59C87B',
  LIGHT_ACCENT: '#A7D3EB',
  BRAND_ACCENT: '#59EBBF',
  CARD_BG: '#0F172A',
  TEXT_LIGHT: '#FFFFFF',
  TEXT_DARK: '#0F172A',
  BG_BASE: '#FFFFFF',
};

const StatCard = ({ icon: Icon, label, value, color }) => (
  <div
    className="p-6 rounded-lg border shadow-sm"
    style={{
      backgroundColor: COLORS.BG_BASE,
      borderColor: color,
      borderWidth: '2px',
    }}
  >
    <div className="flex items-center justify-between">
      <div>
        <p style={{ color: COLORS.TEXT_DARK }} className="text-sm font-medium">
          {label}
        </p>
        <p style={{ color }} className="text-3xl font-bold mt-2">
          {value}
        </p>
      </div>
      <Icon size={32} style={{ color }} />
    </div>
  </div>
);

const ParticipantInicio = ({ userEmail }) => {
  const [error, setError] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await participantService.getDashboardStats();
        setStats(response.data || response);
      } catch (err) {
        logError(err, 'ParticipantInicio.loadStats');
        const errorInfo = handleApiError(err);
        setError(errorInfo.message);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-32 rounded-lg animate-pulse"
              style={{ backgroundColor: COLORS.LIGHT_ACCENT + '33' }}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div
        className="p-8 rounded-lg border-2"
        style={{
          backgroundColor: COLORS.BG_BASE,
          borderColor: COLORS.PRIMARY,
        }}
      >
        <h2 className="text-2xl font-bold mb-4" style={{ color: COLORS.TEXT_DARK }}>
          Bienvenido, Estudiante
        </h2>
        <p
          style={{ color: COLORS.TEXT_DARK }}
          className="mb-6 leading-relaxed"
        >
          Desde este panel puedes explorar nuevos eventos académicos, gestionar
          tus inscripciones, realizar pagos y acceder a tus certificados de
          formación digital.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div
            className="p-4 rounded-lg"
            style={{
              backgroundColor: COLORS.LIGHT_ACCENT + '15',
              borderLeft: `4px solid ${COLORS.PRIMARY}`,
            }}
          >
            <p className="font-semibold mb-2" style={{ color: COLORS.PRIMARY }}>
              Explorar Eventos
            </p>
            <p style={{ color: COLORS.TEXT_DARK }}>
              Descubre nuevos cursos y eventos académicos disponibles para tu
              aprendizaje
            </p>
          </div>
          <div
            className="p-4 rounded-lg"
            style={{
              backgroundColor: COLORS.SECONDARY + '15',
              borderLeft: `4px solid ${COLORS.SECONDARY}`,
            }}
          >
            <p
              className="font-semibold mb-2"
              style={{ color: COLORS.SECONDARY }}
            >
              Gestionar Inscripciones
            </p>
            <p style={{ color: COLORS.TEXT_DARK }}>
              Visualiza y gestiona todas tus inscripciones activas y pagos
              pendientes
            </p>
          </div>
          <div
            className="p-4 rounded-lg"
            style={{
              backgroundColor: COLORS.BRAND_ACCENT + '15',
              borderLeft: `4px solid ${COLORS.BRAND_ACCENT}`,
            }}
          >
            <p
              className="font-semibold mb-2"
              style={{ color: COLORS.BRAND_ACCENT }}
            >
              Mis Certificados
            </p>
            <p style={{ color: COLORS.TEXT_DARK }}>
              Accede a tus certificados emitidos y verifica su autenticidad
              online
            </p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={BookOpen}
          label="Cursos Activos"
          value={stats?.activeCourses || 0}
          color={COLORS.PRIMARY}
        />
        <StatCard
          icon={Award}
          label="Certificados Obtenidos"
          value={stats?.certificatesObtained || 0}
          color={COLORS.SECONDARY}
        />
        <StatCard
          icon={CreditCard}
          label="Pagos Pendientes"
          value={stats?.pendingPayments || 0}
          color={COLORS.BRAND_ACCENT}
        />
        <StatCard
          icon={CheckCircle}
          label="Actividades Completadas"
          value={stats?.completedActivities || 0}
          color={COLORS.LIGHT_ACCENT}
        />
      </div>

      {/* Quick Actions Section */}
      <div
        className="p-8 rounded-lg border"
        style={{
          backgroundColor: COLORS.BG_BASE,
          borderColor: COLORS.LIGHT_ACCENT,
        }}
      >
        <h3
          className="text-xl font-bold mb-6"
          style={{ color: COLORS.TEXT_DARK }}
        >
          Acciones Rápidas
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            className="p-6 rounded-lg border-2 transition-all hover:shadow-md text-left"
            style={{
              backgroundColor: COLORS.BG_BASE,
              borderColor: COLORS.PRIMARY,
            }}
          >
            <BookOpen
              size={24}
              style={{ color: COLORS.PRIMARY }}
              className="mb-2"
            />
            <p className="font-bold" style={{ color: COLORS.TEXT_DARK }}>
              Explorar Eventos
            </p>
            <p
              style={{ color: COLORS.LIGHT_ACCENT }}
              className="text-sm mt-1"
            >
              Busca nuevos cursos y eventos disponibles
            </p>
          </button>
          <button
            className="p-6 rounded-lg border-2 transition-all hover:shadow-md text-left"
            style={{
              backgroundColor: COLORS.BG_BASE,
              borderColor: COLORS.SECONDARY,
            }}
          >
            <CreditCard
              size={24}
              style={{ color: COLORS.SECONDARY }}
              className="mb-2"
            />
            <p className="font-bold" style={{ color: COLORS.TEXT_DARK }}>
              Ver Pagos Pendientes
            </p>
            <p
              style={{ color: COLORS.LIGHT_ACCENT }}
              className="text-sm mt-1"
            >
              Completa los pagos de tus inscripciones
            </p>
          </button>
          <button
            className="p-6 rounded-lg border-2 transition-all hover:shadow-md text-left"
            style={{
              backgroundColor: COLORS.BG_BASE,
              borderColor: COLORS.BRAND_ACCENT,
            }}
          >
            <Award
              size={24}
              style={{ color: COLORS.BRAND_ACCENT }}
              className="mb-2"
            />
            <p className="font-bold" style={{ color: COLORS.TEXT_DARK }}>
              Descargar Certificados
            </p>
            <p
              style={{ color: COLORS.LIGHT_ACCENT }}
              className="text-sm mt-1"
            >
              Accede a tus certificados emitidos
            </p>
          </button>
          <button
            className="p-6 rounded-lg border-2 transition-all hover:shadow-md text-left"
            style={{
              backgroundColor: COLORS.BG_BASE,
              borderColor: COLORS.LIGHT_ACCENT,
            }}
          >
            <CheckCircle
              size={24}
              style={{ color: COLORS.LIGHT_ACCENT }}
              className="mb-2"
            />
            <p className="font-bold" style={{ color: COLORS.TEXT_DARK }}>
              Ver Mis Inscripciones
            </p>
            <p
              style={{ color: COLORS.LIGHT_ACCENT }}
              className="text-sm mt-1"
            >
              Gestiona tus inscripciones activas
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ParticipantInicio;
