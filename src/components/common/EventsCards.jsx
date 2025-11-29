// src/components/common/EventsCards.jsx
import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Users,
  MapPin,
  X,
  CheckCircle2,
} from 'lucide-react';
import styles from './EventsCards.module.css';

// Skeleton de carga reutilizable
export const EventLoadingCard = () => (
  <div className={styles.loadingCard}>
    <div className={styles.loadingIcon}></div>
    <div className={styles.loadingLine}></div>
    <div className={styles.loadingLineShort}></div>
  </div>
);

/**
 * Card de preview (la tarjeta que se ve en el grid)
 *
 * Props:
 * - item: objeto del evento/programa
 * - onClick: función al hacer click
 * - Icon: icono opcional (lucide-react) para mostrar junto al título
 */
export const EventCard = ({ item, onClick, Icon }) => {
  if (!item) return null;

  const {
    title,
    shortDescription,
    description,
    date,
    duration,
    modality,
    event,       // algunos datos vienen como "event"
    eventType,   // por si en algún otro lado lo nombras así
    imageUrl,
  } = item;

  const summary = shortDescription || description;
  const typeLabel = eventType || event;

  return (
    <button
      type="button"
      className={styles.card}
      onClick={onClick}
    >
      {imageUrl && (
        <div className={styles.cardImageWrapper}>
          <img
            src={imageUrl}
            alt={`Flyer de ${title}`}
            className={styles.cardImage}
          />
        </div>
      )}

      <div className={styles.cardContent}>
        {Icon && <Icon size={24} className={styles.cardIcon} />}
        <h3 className={styles.cardTitle}>{title}</h3>

        {summary && (
          <p className={styles.cardDescription}>{summary}</p>
        )}

        {(date || duration || modality || typeLabel) && (
          <div className={styles.cardMeta}>
            {date && (
              <span className={styles.cardMetaItem}>
                <Calendar size={14} />
                <span>{date}</span>
              </span>
            )}
            {duration && (
              <span className={styles.cardMetaItem}>
                <Clock size={14} />
                <span>{duration}</span>
              </span>
            )}
            {modality && (
              <span className={styles.cardMetaItem}>
                <Users size={14} />
                <span>{modality}</span>
              </span>
            )}
            {typeLabel && (
              <span className={styles.cardMetaItem}>
                <span>{typeLabel}</span>
              </span>
            )}
          </div>
        )}
      </div>
    </button>
  );
};

/**
 * Modal de detalle del evento/programa
 *
 * Props:
 * - item: objeto del evento/programa
 * - onClose: función para cerrar
 */
export const EventModal = ({ item, onClose }) => {
  const {
    title,
    subtitle,
    description,
    date,
    duration,
    modality,
    location,
    event: eventType,
    imageUrl,
    ponencias = [],
    talleres = [],
    ponenciasPrice,
    talleresPrice,
    includesCertificate,
  } = item || {};

  const hasPonencias = ponencias && ponencias.length > 0;
  const hasTalleres = talleres && talleres.length > 0;

  // Estado de pestañas
  const [activeTab, setActiveTab] = useState(
    hasPonencias ? 'ponencias' : hasTalleres ? 'talleres' : 'info'
  );

  // NUEVO: estado para el modal de imagen ampliada
  const [isImageOpen, setIsImageOpen] = useState(false);

  if (!item) return null;

  const handleOpenImage = () => setIsImageOpen(true);
  const handleCloseImage = () => setIsImageOpen(false);

  return (
    <div
      className={styles.modalOverlay}
      onClick={onClose}
    >
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className={styles.modalClose}
          onClick={onClose}
          aria-label="Cerrar"
        >
          <X size={20} />
        </button>

        <div className={styles.modalLayout}>
          {imageUrl && (
            <div
              className={styles.modalImageWrapper}
              onClick={handleOpenImage}
              title="Haz clic para ampliar el flyer"
            >
              <img
                src={imageUrl}
                alt={`Flyer de ${title}`}
                className={styles.modalImage}
              />
            </div>
          )}

          <div className={styles.modalBody}>
            <h3 className={styles.modalTitle}>{title}</h3>
            {subtitle && (
              <p className={styles.modalSubtitle}>{subtitle}</p>
            )}

            {(date || duration || modality || location || eventType) && (
              <div className={styles.modalMeta}>
                {date && (
                  <div className={styles.modalMetaItem}>
                    <Calendar size={16} />
                    <span>{date}</span>
                  </div>
                )}
                {duration && (
                  <div className={styles.modalMetaItem}>
                    <Clock size={16} />
                    <span>{duration}</span>
                  </div>
                )}
                {modality && (
                  <div className={styles.modalMetaItem}>
                    <Users size={16} />
                    <span>{modality}</span>
                  </div>
                )}
                {location && (
                  <div className={styles.modalMetaItem}>
                    <MapPin size={16} />
                    <span>{location}</span>
                  </div>
                )}
                {eventType && (
                  <div className={styles.modalMetaItem}>
                    <span>{eventType}</span>
                  </div>
                )}
              </div>
            )}

            {includesCertificate && (
              <div className={styles.certificateBadge}>
                <CheckCircle2 size={16} />
                <span>Incluye certificado digital</span>
              </div>
            )}

            {description && (
              <p className={styles.modalDescription}>{description}</p>
            )}

            {(hasPonencias || hasTalleres) && (
              <div className={styles.modalTabsWrapper}>
                <div className={styles.modalTabs}>
                  {hasPonencias && (
                    <button
                      type="button"
                      className={
                        activeTab === 'ponencias'
                          ? `${styles.tabButton} ${styles.tabButtonActive}`
                          : styles.tabButton
                      }
                      onClick={() => setActiveTab('ponencias')}
                    >
                      Ponencias
                    </button>
                  )}
                  {hasTalleres && (
                    <button
                      type="button"
                      className={
                        activeTab === 'talleres'
                          ? `${styles.tabButton} ${styles.tabButtonActive}`
                          : styles.tabButton
                      }
                      onClick={() => setActiveTab('talleres')}
                    >
                      Talleres
                    </button>
                  )}
                </div>

                {hasPonencias && activeTab === 'ponencias' && (
                  <div className={styles.tabContentActive}>
                    <h4 className={styles.tabTitle}>Ponencias</h4>
                    <ul className={styles.tabList}>
                      {ponencias.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                    {ponenciasPrice && (
                      <p className={styles.priceText}>{ponenciasPrice}</p>
                    )}
                  </div>
                )}

                {hasTalleres && activeTab === 'talleres' && (
                  <div className={styles.tabContentActive}>
                    <h4 className={styles.tabTitle}>Talleres</h4>
                    <ul className={styles.tabList}>
                      {talleres.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                    {talleresPrice && (
                      <p className={styles.priceText}>{talleresPrice}</p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* NUEVO: modal de imagen en grande sobre todo */}
      {isImageOpen && (
        <div
          className={styles.imageModalOverlay}
          onClick={(e) => {
            // cerramos solo si hace click en el fondo oscuro
            e.stopPropagation();
            if (e.target === e.currentTarget) {
              handleCloseImage();
            }
          }}
        >
          <div className={styles.imageModal}>
            <button
              type="button"
              className={styles.imageModalClose}
              onClick={handleCloseImage}
              aria-label="Cerrar imagen"
            >
              ×
            </button>
            <img
              src={imageUrl}
              alt={`Flyer de ${title}`}
              className={styles.imageModalImage}
            />
          </div>
        </div>
      )}
    </div>
  );
};
