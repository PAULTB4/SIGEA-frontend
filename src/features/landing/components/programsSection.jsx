// src/features/landing/components/programsSection.jsx
import React, { useState } from 'react';
import {
  ChevronRight,
  BookOpen,
  Award,
  Users,
} from 'lucide-react';
import styles from './programsSection.module.css';

// NUEVO: usamos el componente común
import {
  EventCard,
  EventModal,
  EventLoadingCard,
} from '../../../components/common/EventsCards';

const ICONS = {
  'Gestión ágil de Proyectos TI': BookOpen,
  'Diplomado en Inteligencia de Negocios': Award,
  'Conferencia de Seguridad en la Nube': Users,
  default: BookOpen,
};

const ProgramsSection = ({
  programs = [],
  loading = false,
  title = 'PROGRAMAS Y EVENTOS',
  showViewMore = true,
}) => {
  const [selectedProgram, setSelectedProgram] = useState(null);

  const handleOpen = (program) => {
    setSelectedProgram(program);
  };

  const handleClose = () => {
    setSelectedProgram(null);
  };

  return (
    <section id="programs" className={styles.programsSection}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>
          <span className={styles.titleUnderline}>
            {title}
          </span>
        </h2>

        {loading ? (
          <div className={styles.grid}>
            <EventLoadingCard />
            <EventLoadingCard />
            <EventLoadingCard />
          </div>
        ) : (
          <>
            <div className={styles.grid}>
              {programs.map((program) => (
                <EventCard
                  key={program.id}
                  item={program}
                  Icon={ICONS[program.title] || ICONS.default}
                  onClick={() => handleOpen(program)}
                />
              ))}
            </div>

            {showViewMore && (
              <div className={styles.viewMore}>
                <a href="/events" className={styles.viewMoreLink}>
                  Ver todos los eventos
                  <ChevronRight size={18} />
                </a>
              </div>
            )}
          </>
        )}
      </div>

      {selectedProgram && (
        <EventModal
          item={selectedProgram}
          onClose={handleClose}
        />
      )}
    </section>
  );
};

export default ProgramsSection;
