/**
 * Auth Layout Component
 * Layout base para las pantallas de autenticación (login / registro / recuperación)
 * - Replica la estructura visual de inicio-registro-sesion.html
 * - NO toca la lógica de formularios ni de PasswordRecovery
 */

import React from 'react';
import styles from './authLayout.module.css';

export const AuthLayout = ({ children, view = 'login' }) => {
  const handleClose = () => {
    // Puedes ajustar esta ruta si quieres que cierre hacia otra página
    window.location.href = '/';
  };

  return (
    <div className={styles.authPage}>
      <div className={styles.container}>
        {/* Icono de cierre */}
        <button
          type="button"
          className={styles.closeIcon}
          onClick={handleClose}
          aria-label="Cerrar"
        >
          <img
            src="/images/x_paint.png"
            alt="Cerrar"
            className={styles.closeIconImage}
          />
        </button>

        {/* Sección izquierda: ilustración flotando */}
        <div className={styles.leftSection}>
          <img
            src="/images/png-mal-hecho.png"
            alt="Ilustración"
            className={styles.illustration}
          />
        </div>

        {/* Hojas decorativas */}
        <div className={`${styles.leafWrapper} ${styles.leafBackWrapper}`}>
          <img
            src="/images/hoja-back.png"
            alt="Decoración atrás"
            className={styles.leafBack}
          />
        </div>

        <div className={`${styles.leafWrapper} ${styles.leafFrontWrapper}`}>
          <img
            src="/images/hoja-front.png"
            alt="Decoración frente"
            className={styles.leafFront}
          />
        </div>

        {/* Sección derecha: tarjeta con los formularios */}
        <div className={styles.rightSection}>
          <div className={styles.formContainer}>
            {/* Aquí se renderiza el contenido: header, tabs, LoginForm, RegisterForm, PasswordRecovery, etc */}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
