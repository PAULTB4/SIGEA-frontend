import React, { useState } from 'react';
import styles from './nextEventSection.module.css';

const NextEventSection = ({ nextEvent, loading }) => {
    const [activeTab, setActiveTab] = useState('ponencias');
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (!nextEvent) {
        return null; // o un fallback mínimo
    }

    const {
        title,
        subtitle,
        dateText,
        location,
        flyerImage,
        ponencias = [],
        ponenciasPrice,
        talleres = [],
        talleresPrice,
        includesCertificate,
        payments = [],
        contacts = [],
        recommendations = [],
        website,
        email,
        registerUrl
    } = nextEvent;

    const handleRegisterClick = () => {
        // mientras no haya flujo definido, lo mandamos al auth
        window.location.href = registerUrl || '/auth?view=register';
    };

    return (
        <section id="next-event" className={styles.nextEventSection}>
            <h2 className={styles.sectionTitle}>
                <span className={styles.titleUnderline}>PRÓXIMO EVENTO</span>
            </h2>

            <div className={styles.container}>
                {/* Columna izquierda: Flyer */}
                <div className={styles.left}>
                    <img
                        src={flyerImage || '/images/flyer-prueba.png'}
                        alt={title}
                        className={styles.flyer}
                        onClick={() => setIsModalOpen(true)}
                    />
                </div>

                {/* Columna derecha: info + tabs */}
                <div className={styles.right}>
                    <h3 className={styles.eventName}>{title}</h3>
                    {subtitle && <h4 className={styles.eventSubtitle}>{subtitle}</h4>}

                    <p className={styles.eventDate}>
                        {dateText && (
                            <>
                                <strong>Fechas:</strong> {dateText}
                                <br />
                            </>
                        )}
                        {location && (
                            <>
                                <strong>Lugar:</strong> {location}
                            </>
                        )}
                    </p>

                    {/* Tabs */}
                    <div className={styles.tabs}>
                        <button
                            type="button"
                            className={`${styles.tabButton} ${activeTab === 'ponencias' ? styles.tabButtonActive : ''
                                }`}
                            onClick={() => setActiveTab('ponencias')}
                        >
                            Ponencias
                        </button>
                        <button
                            type="button"
                            className={`${styles.tabButton} ${activeTab === 'talleres' ? styles.tabButtonActive : ''
                                }`}
                            onClick={() => setActiveTab('talleres')}
                        >
                            Talleres
                        </button>
                    </div>

                    {/* Contenido pestañas */}
                    {activeTab === 'ponencias' && (
                        <div className={`${styles.tabContent} ${styles.tabContentActive}`}>
                            <h5 className={styles.subTitle}>Ponencias:</h5>
                            <ul className={styles.list}>
                                {ponencias.map((item, idx) => (
                                    <li key={idx}>{item}</li>
                                ))}
                            </ul>

                            {ponenciasPrice && (
                                <div className={styles.eventSection}>
                                    <h5 className={styles.subTitle}>Costos Ponencias:</h5>
                                    <p className={styles.priceText}>{ponenciasPrice}</p>
                                    {includesCertificate && (
                                        <p className={styles.helperText}>
                                            <em>Incluye certificados</em>
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'talleres' && (
                        <div className={`${styles.tabContent} ${styles.tabContentActive}`}>
                            <h5 className={styles.subTitle}>Talleres:</h5>
                            <ul className={styles.list}>
                                {talleres.map((item, idx) => (
                                    <li key={idx}>{item}</li>
                                ))}
                            </ul>

                            {talleresPrice && (
                                <div className={styles.eventSection}>
                                    <h5 className={styles.subTitle}>Costos por Taller:</h5>
                                    <p className={styles.priceText}>{talleresPrice}</p>
                                    {includesCertificate && (
                                        <p className={styles.helperText}>
                                            <em>Incluye certificados</em>
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Pagos / más info / recomendaciones */}
                    <div className={styles.extra}>
                        <div className={styles.extraBlock}>
                            <h5 className={styles.subTitle}>Pagos e Inscripciones:</h5>
                            {payments.map((pago, idx) => (
                                <p key={idx} className={styles.text}>
                                    {pago.icon && <span className={styles.icon}>{pago.icon}</span>}
                                    {pago.method && <strong>{pago.method}:</strong>} {pago.phone}{' '}
                                    {pago.owner && `– ${pago.owner}`}
                                </p>
                            ))}

                            <div className={styles.moreInfo}>
                                <h5 className={styles.subTitle}>Más información:</h5>
                                {contacts.map((contact, idx) => (
                                    <p key={idx} className={styles.text}>
                                        {contact.icon && <span className={styles.icon}>{contact.icon}</span>}
                                        {contact.text}
                                    </p>
                                ))}
                                {website && (
                                    <p className={styles.text}>
                                        🌐{' '}
                                        <a href={website} target="_blank" rel="noopener noreferrer">
                                            {website}
                                        </a>
                                    </p>
                                )}
                                {email && (
                                    <p className={styles.text}>
                                        ✉️{' '}
                                        <a href={`mailto:${email}`}>
                                            {email}
                                        </a>
                                    </p>
                                )}
                            </div>

                        </div>

                        <div className={styles.extraBlock}>
                            <h5 className={styles.subTitle}>Recomendaciones:</h5>
                            <ul className={styles.list}>
                                {recommendations.map((rec, idx) => (
                                    <li key={idx}>{rec}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            
                            <div className={styles.register}>
                                <button
                                    type="button"
                                    className={styles.registerButton}
                                    onClick={handleRegisterClick}
                                    disabled={loading}
                                >
                                    {loading ? 'Cargando...' : 'Inscribirse'}
                                </button>
                            </div>

            {/* Modal del flyer */}
            {isModalOpen && (
                <div
                    className={styles.modal}
                    onClick={(e) => {
                        if (e.target === e.currentTarget) setIsModalOpen(false);
                    }}
                >
                    <button
                        type="button"
                        className={styles.modalClose}
                        onClick={() => setIsModalOpen(false)}
                    >
                        ×
                    </button>
                    <img
                        src={flyerImage || '/images/flyer-prueba.png'}
                        alt={`${title} - Flyer`}
                        className={styles.modalImage}
                    />
                </div>
            )}
        </section>
    );
};

export default NextEventSection;
