// src/pages/EventsPage.jsx
import React, { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import eventsService from '../services/eventsService';

// Estilos de layout de sección (grid + titleUnderline)
import sectionStyles from '../features/landing/components/programsSection.module.css';

// Componente común de cards + modal
import {
  EventCard,
  EventModal,
} from '../components/common/EventsCards';

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

const EventsPage = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const fetchEvents = async () => {
      try {
        const { data, error } = await eventsService.getAllEvents();

        if (!isMounted) return;

        if (error) {
          console.warn('Error al obtener eventos:', error);
        }

        setEvents(data || []);
      } catch (err) {
        if (!isMounted) return;
        setError('Error al cargar los eventos. Intenta más tarde.');
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchEvents();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleOpen = (event) => {
    setSelectedEvent(event);
  };

  const handleClose = () => {
    setSelectedEvent(null);
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: COLORS.BG_BASE }}
    >
      {/* Header global */}
      <Header />

      {/* Contenido principal */}
      <main className="flex-1 pt-24 pb-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          {/* Botón Volver */}
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 mb-6 font-semibold transition-colors hover:opacity-80"
            style={{ color: COLORS.PRIMARY }}
          >
            <ArrowLeft size={20} />
            Volver
          </button>

          {/* Título principal centrado */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-wide">
              <span className={sectionStyles.titleUnderline}>
                TODOS LOS PROGRAMAS Y EVENTOS
              </span>
            </h1>
            <p
              className="mt-3 text-sm md:text-base max-w-2xl mx-auto"
              style={{ color: '#4B5563' }}
            >
              Explora los programas, diplomados, conferencias y talleres
              gestionados a través de SIGEA – Extensión y Formación Continua
              de la UNAS. Aquí encontrarás tanto los eventos vigentes como
              próximos lanzamientos.
            </p>
          </div>

          {/* Mensajes de estado */}
          {loading && (
            <p className="text-center text-sm" style={{ color: '#6B7280' }}>
              Cargando eventos...
            </p>
          )}

          {error && !loading && (
            <p className="text-center text-sm text-red-600">{error}</p>
          )}

          {/* Grid de cards */}
          {!loading && !error && events.length > 0 && (
            <div className={sectionStyles.grid}>
              {events.map((event) => (
                <EventCard
                  key={event.id}
                  item={event}
                  onClick={() => handleOpen(event)}
                />
              ))}
            </div>
          )}

          {!loading && !error && events.length === 0 && (
            <p className="text-center text-sm" style={{ color: '#6B7280' }}>
              No hay eventos disponibles en este momento.
            </p>
          )}
        </div>
      </main>

      {/* Footer global */}
      <Footer />

      {/* Modal de detalle */}
      {selectedEvent && (
        <EventModal item={selectedEvent} onClose={handleClose} />
      )}
    </div>
  );
};

export default EventsPage;
