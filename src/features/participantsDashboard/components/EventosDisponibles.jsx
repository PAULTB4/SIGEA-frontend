// src/features/participantsDashboard/components/EventosDisponibles.jsx
import React, { useState, useEffect } from 'react';
import { Search, ArrowUpDown } from 'lucide-react';
import activityService from '../../../services/activityService';
import EnrollmentForm from './EnrollmentForm';
import { handleApiError, logError } from '../../../utils/errorHandler';
import {
  EventCard,
  EventModal,
  EventLoadingCard,
} from '../../../components/common/EventsCards';

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

// Helper para decidir si se puede inscribir o no
const getEnrollmentState = (activity) => {
  if (!activity) {
    return { label: 'Sin estado', canEnroll: false };
  }

  const status = activity.status || '';
  const isActive =
    activity.activa ?? ['activa', 'en_curso'].includes(status);
  const isPending =
    activity.pendiente ?? ['pendiente', 'proxima'].includes(status);
  const isFinished =
    activity.finalizada ?? status === 'finalizada';

  let label = 'Sin estado';

  if (isFinished) label = 'Finalizada';
  else if (isActive) label = 'En curso';
  else if (isPending) label = 'Próxima';

  // Regla: se puede inscribir mientras NO esté finalizada
  const canEnroll = !isFinished;

  return { label, canEnroll };
};

const EventosDisponibles = () => {
  const [error, setError] = useState(null);
  const [activities, setActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('title'); // title | startDate
  const [sortDir, setSortDir] = useState('asc'); // asc | desc
  const [pageSize, setPageSize] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);

  // 🔹 NUEVO: filtro por estado (all | en_curso | cerrado)
  const [statusFilter, setStatusFilter] = useState('all');

  // Modal de detalles
  const [selectedActivity, setSelectedActivity] = useState(null);

  // Modal de inscripción (EnrollmentForm)
  const [selectedActivityForEnrollment, setSelectedActivityForEnrollment] =
    useState(null);
  const [showEnrollmentForm, setShowEnrollmentForm] = useState(false);

  useEffect(() => {
    loadAvailableActivities();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [activities, searchTerm, sortBy, sortDir, statusFilter]);

  const loadAvailableActivities = async () => {
    setLoading(true);
    setError(null);

    try {
      const response =
        await activityService.getAvailableActivitiesForEnrollment();

      const activitiesArray = (response.data || [])
        .map(activityService.normalizeActivityForEvent)
        .filter(Boolean);

      setActivities(activitiesArray);
    } catch (err) {
      logError(err, 'EventosDisponibles.loadAvailableActivities');
      const errorInfo = handleApiError(err);
      setError(errorInfo.message);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = activities;

    // Búsqueda
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (activity) =>
          activity.title.toLowerCase().includes(term) ||
          (activity.description || '').toLowerCase().includes(term)
      );
    }

    // 🔹 Filtro por estado (en curso / cerrado)
    if (statusFilter !== 'all') {
      filtered = filtered.filter((activity) => {
        const { canEnroll } = getEnrollmentState(activity);

        if (statusFilter === 'en_curso') {
          // Abiertos: se puede inscribir
          return canEnroll;
        }

        if (statusFilter === 'cerrado') {
          // Cerrados: NO se puede inscribir
          return !canEnroll;
        }

        return true;
      });
    }

    // Orden
    filtered = [...filtered].sort((a, b) => {
      let valA;
      let valB;

      if (sortBy === 'title') {
        valA = a.title.toLowerCase();
        valB = b.title.toLowerCase();
      } else {
        // startDate
        valA = a.startDate || '';
        valB = b.startDate || '';
      }

      if (valA < valB) return sortDir === 'asc' ? -1 : 1;
      if (valA > valB) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });

    setFilteredActivities(filtered);
    setCurrentPage(1);
  };

  const toggleSort = (field) => {
    if (sortBy === field) {
      setSortDir((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(field);
      setSortDir('asc');
    }
  };

  const handleChangePageSize = (e) => {
    const newSize = Number(e.target.value) || 12;
    setPageSize(newSize);
    setCurrentPage(1);
  };

  const handleChangePage = (newPage) => {
    const totalPages = Math.max(
      1,
      Math.ceil(filteredActivities.length / pageSize)
    );
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
  };

  const handleOpenDetails = (activity) => {
    setSelectedActivity(activity);
  };

  const handleCloseDetails = () => {
    setSelectedActivity(null);
  };

  const handleEnrollClick = (activity) => {
    setSelectedActivityForEnrollment(activity);
    setShowEnrollmentForm(true);
  };

  const handleCloseEnrollment = () => {
    setShowEnrollmentForm(false);
    setSelectedActivityForEnrollment(null);
  };

  const handleEnrollmentSuccess = () => {
    handleCloseEnrollment();
    loadAvailableActivities();
  };

  // Paginación derivada
  const totalItems = filteredActivities.length;
  const totalPages = Math.max(
    1,
    Math.ceil(totalItems / pageSize)
  );
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedActivities = filteredActivities.slice(
    startIndex,
    startIndex + pageSize
  );

  if (loading) {
    return (
      <div className="space-y-6">
        <div
          className="h-12 rounded-lg animate-pulse"
          style={{ backgroundColor: COLORS.LIGHT_ACCENT + '33' }}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <EventLoadingCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Barra superior: búsqueda + orden + estado + tamaño de página */}
      <div className="flex flex-col gap-4 md:gap-3">
        {/* Búsqueda */}
        <div className="relative">
          <Search
            size={18}
            style={{ color: COLORS.PRIMARY }}
            className="absolute left-3 top-3"
          />
          <input
            type="text"
            placeholder="Buscar por título o descripción..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            className="w-full pl-10 pr-4 py-2 rounded-lg border"
            style={{
              borderColor: COLORS.LIGHT_ACCENT,
              color: COLORS.TEXT_DARK,
            }}
          />
        </div>

        {/* Orden, estado, tamaño de página */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          {/* Ordenar */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs md:text-sm mr-1">Ordenar por:</span>
            <button
              type="button"
              onClick={() => toggleSort('title')}
              className="flex items-center gap-1 px-3 py-2 text-xs md:text-sm rounded-lg border"
              style={{ borderColor: COLORS.LIGHT_ACCENT }}
            >
              <ArrowUpDown size={14} />
              Título
            </button>
            <button
              type="button"
              onClick={() => toggleSort('startDate')}
              className="flex items-center gap-1 px-3 py-2 text-xs md:text-sm rounded-lg border"
              style={{ borderColor: COLORS.LIGHT_ACCENT }}
            >
              <ArrowUpDown size={14} />
              Fecha de inicio
            </button>
          </div>

          {/* Filtro por estado */}
          <div className="flex items-center gap-2">
            <span className="text-xs md:text-sm">Estado:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs md:text-sm rounded-lg border px-2 py-1"
              style={{ borderColor: COLORS.LIGHT_ACCENT }}
            >
              <option value="all">Todos</option>
              <option value="en_curso">En curso (abiertos)</option>
              <option value="cerrado">Cerrado</option>
            </select>
          </div>

          {/* Tamaño de página */}
          <div className="flex items-center gap-2">
            <span className="text-xs md:text-sm">Ver:</span>
            <select
              value={pageSize}
              onChange={handleChangePageSize}
              className="text-xs md:text-sm rounded-lg border px-2 py-1"
              style={{ borderColor: COLORS.LIGHT_ACCENT }}
            >
              <option value={12}>12</option>
              <option value={24}>24</option>
              <option value={36}>36</option>
            </select>
          </div>
        </div>
      </div>

      {/* Mensajes de error */}
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      {/* Events Grid */}
      {paginatedActivities.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedActivities.map((activity) => {
              const { label, canEnroll } =
                getEnrollmentState(activity);

              return (
                <div
                  key={activity.id}
                  className="rounded-lg border overflow-hidden flex flex-col"
                  style={{
                    backgroundColor: COLORS.BG_BASE,
                    borderColor: COLORS.LIGHT_ACCENT,
                  }}
                >
                  {/* Card preview reutilizable */}
                  <EventCard
                    item={activity}
                    onClick={() => handleOpenDetails(activity)}
                  />

                  {/* Footer con estado + botón de inscripción */}
                  <div
                    className="flex items-center justify-between px-4 py-3 border-t"
                    style={{
                      borderColor: COLORS.LIGHT_ACCENT,
                    }}
                  >
                    <span
                      className="text-xs font-semibold px-3 py-1 rounded-full"
                      style={{
                        backgroundColor:
                          COLORS.LIGHT_ACCENT + '22',
                        color: COLORS.PRIMARY,
                      }}
                    >
                      {label}
                    </span>

                    <button
                      onClick={() =>
                        canEnroll && handleEnrollClick(activity)
                      }
                      disabled={!canEnroll}
                      className="text-xs md:text-sm font-bold px-4 py-2 rounded-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                      style={{
                        backgroundColor: canEnroll
                          ? COLORS.PRIMARY
                          : '#E5E7EB',
                        color: canEnroll
                          ? COLORS.TEXT_LIGHT
                          : '#6B7280',
                      }}
                    >
                      {canEnroll ? 'INSCRIBIRME' : 'CERRADO'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Paginación */}
          <div className="flex items-center justify-between mt-4 text-xs md:text-sm">
            <span>
              Mostrando {paginatedActivities.length} de {totalItems}{' '}
              eventos
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleChangePage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded-lg border disabled:opacity-50"
                style={{ borderColor: COLORS.LIGHT_ACCENT }}
              >
                {'<'} Anterior
              </button>
              <span>
                Página {currentPage} de {totalPages}
              </span>
              <button
                type="button"
                onClick={() => handleChangePage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded-lg border disabled:opacity-50"
                style={{ borderColor: COLORS.LIGHT_ACCENT }}
              >
                Siguiente {'>'}
              </button>
            </div>
          </div>
        </>
      ) : (
        <div
          className="text-center py-12 rounded-lg border"
          style={{
            backgroundColor: COLORS.BG_BASE,
            borderColor: COLORS.LIGHT_ACCENT,
            color: COLORS.TEXT_DARK,
          }}
        >
          <p className="mb-2">No hay eventos disponibles en este momento</p>
          <p
            style={{ color: COLORS.PRIMARY }}
            className="text-sm"
          >
            Por favor, intenta más tarde o cambia tus criterios de
            búsqueda
          </p>
        </div>
      )}

      {/* Modal de detalle (EventModal) */}
      {selectedActivity && (
        <EventModal
          item={selectedActivity}
          onClose={handleCloseDetails}
        />
      )}

      {/* Enrollment Form Modal (se mantiene igual) */}
      {showEnrollmentForm && selectedActivityForEnrollment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div
            className="w-full max-w-2xl rounded-lg shadow-2xl my-8"
            style={{ backgroundColor: COLORS.BG_BASE }}
          >
            <EnrollmentForm
              activity={selectedActivityForEnrollment}
              onSuccess={handleEnrollmentSuccess}
              onCancel={handleCloseEnrollment}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default EventosDisponibles;
