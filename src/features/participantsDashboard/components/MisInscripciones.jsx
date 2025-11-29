// src/features/participantsDashboard/components/MisInscripciones.jsx
import React, { useState, useEffect } from 'react';
import { Search, ArrowUpDown } from 'lucide-react';
import participantService from '../../../services/participantService';
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

const normalizeEnrollmentToEvent = (enrollment) => {
  if (!enrollment) return null;

  const title =
    enrollment.title ||
    enrollment.activityTitle ||
    'Actividad sin título';

  const description =
    enrollment.description ||
    `Inscripción realizada el ${enrollment.enrolledDate || '—'}`;

  const startDate = enrollment.startDate || '';
  const endDate = enrollment.endDate || '';

  const date =
    startDate && endDate
      ? `${startDate} - ${endDate}`
      : startDate || endDate || '';

  const status = enrollment.status || '';
  const paymentStatus = enrollment.paymentStatus || '';

  const activa = status === 'en_curso';
  const pendiente = status === 'pendiente';
  const finalizada =
    status === 'finalizada' || status === 'completada';

  return {
    ...enrollment,
    title,
    description,
    date,
    startDate,
    endDate,
    modality: enrollment.modality || '—',
    location: enrollment.location || '',
    event: '',
    imageUrl: enrollment.imageUrl || '/images/flyer-prueba.png',
    status,
    paymentStatus,
    activa,
    pendiente,
    finalizada,
  };
};

const MisInscripciones = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('startDate'); // title | startDate
  const [sortDir, setSortDir] = useState('asc'); // asc | desc
  const [pageSize, setPageSize] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedEnrollment, setSelectedEnrollment] = useState(null);

  useEffect(() => {
    loadEnrollments();
  }, []);

  const loadEnrollments = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await participantService.getMyEnrollments();
      const items = (response.data || [])
        .map(normalizeEnrollmentToEvent)
        .filter(Boolean);
      setEnrollments(items);
    } catch (err) {
      logError(err, 'MisInscripciones.loadEnrollments');
      const errorInfo = handleApiError(err);
      setError(errorInfo.message);
    } finally {
      setLoading(false);
    }
  };

  // Filtrado + orden + paginación
  const term = searchTerm.toLowerCase();
  let filtered = enrollments.filter(
    (item) =>
      item.title.toLowerCase().includes(term) ||
      (item.description || '').toLowerCase().includes(term)
  );

  // Ordenamiento
  filtered.sort((a, b) => {
    let valA;
    let valB;

    if (sortBy === 'title') {
      valA = a.title.toLowerCase();
      valB = b.title.toLowerCase();
    } else {
      // fecha de inicio
      valA = a.startDate || '';
      valB = b.startDate || '';
    }

    if (valA < valB) return sortDir === 'asc' ? -1 : 1;
    if (valA > valB) return sortDir === 'asc' ? 1 : -1;
    return 0;
  });

  const totalItems = filtered.length;
  const totalPages = Math.max(
    1,
    Math.ceil(totalItems / pageSize)
  );

  const startIndex = (currentPage - 1) * pageSize;
  const paginated = filtered.slice(
    startIndex,
    startIndex + pageSize
  );

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
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <EventLoadingCard key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Barra superior: búsqueda + orden + tamaño de página */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Búsqueda */}
        <div className="relative flex-1">
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
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 py-2 rounded-lg border"
            style={{
              borderColor: COLORS.LIGHT_ACCENT,
              color: COLORS.TEXT_DARK,
            }}
          />
        </div>

        {/* Ordenar */}
        <div className="flex items-center gap-3">
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

        {/* Tamaño de página */}
        <div className="flex items-center gap-2">
          <span className="text-xs md:text-sm">
            Ver:
          </span>
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

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      {/* Grid de inscripciones */}
      {paginated.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginated.map((item) => (
              <div
                key={item.id}
                className="rounded-lg border overflow-hidden flex flex-col"
                style={{
                  backgroundColor: COLORS.BG_BASE,
                  borderColor: COLORS.LIGHT_ACCENT,
                }}
              >
                <EventCard
                  item={item}
                  onClick={() => setSelectedEnrollment(item)}
                />

                {/* Footer: estado / pago */}
                <div
                  className="flex items-center justify-between px-4 py-3 border-t text-xs md:text-sm"
                  style={{ borderColor: COLORS.LIGHT_ACCENT }}
                >
                  <span
                    className="px-3 py-1 rounded-full font-semibold"
                    style={{
                      backgroundColor:
                        COLORS.LIGHT_ACCENT + '22',
                      color: COLORS.PRIMARY,
                    }}
                  >
                    {item.status === 'en_curso'
                      ? 'En curso'
                      : item.status === 'pendiente'
                      ? 'Pendiente'
                      : item.status === 'finalizada' ||
                        item.status === 'completada'
                      ? 'Finalizada'
                      : item.status || 'Sin estado'}
                  </span>
                  <span
                    className="px-3 py-1 rounded-full font-semibold"
                    style={{
                      backgroundColor:
                        item.paymentStatus === 'PAGADO'
                          ? COLORS.SECONDARY + '22'
                          : COLORS.BRAND_ACCENT + '22',
                      color:
                        item.paymentStatus === 'PAGADO'
                          ? COLORS.SECONDARY
                          : COLORS.BRAND_ACCENT,
                    }}
                  >
                    {item.paymentStatus || 'Pago pendiente'}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Paginación */}
          <div className="flex items-center justify-between mt-4 text-xs md:text-sm">
            <span>
              Mostrando {paginated.length} de {totalItems}{' '}
              inscripciones
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  handleChangePage(currentPage - 1)
                }
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
                onClick={() =>
                  handleChangePage(currentPage + 1)
                }
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
          <p className="font-semibold mb-2">
            No tienes inscripciones registradas
          </p>
          <p
            style={{ color: COLORS.PRIMARY }}
            className="text-sm"
          >
            Inscríbete en un curso o evento desde la sección
            "Eventos disponibles".
          </p>
        </div>
      )}

      {/* Modal de detalle de la inscripción (usa EventModal) */}
      {selectedEnrollment && (
        <EventModal
          item={selectedEnrollment}
          onClose={() => setSelectedEnrollment(null)}
        />
      )}
    </div>
  );
};

export default MisInscripciones;
