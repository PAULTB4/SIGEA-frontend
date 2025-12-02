import React, { useRef, useEffect } from 'react';
import styles from './codeInput.module.css';

/**
 * Componente de input especializado para códigos de verificación
 * Muestra 6 casillas individuales para cada dígito
 */
export const CodeInput = ({ 
  value = '', 
  onChange, 
  disabled = false,
  error = false,
  autoFocus = true 
}) => {
  const inputRefs = useRef([]);
  const CODE_LENGTH = 6;

  useEffect(() => {
    if (autoFocus && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [autoFocus]);

  const handleChange = (index, digit) => {
    // Solo permitir números
    if (digit && !/^\d$/.test(digit)) {
      return;
    }

    const newValue = value.split('');
    newValue[index] = digit;
    const updatedValue = newValue.join('').slice(0, CODE_LENGTH);
    
    onChange(updatedValue);

    // Auto-focus al siguiente input si hay un dígito
    if (digit && index < CODE_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Backspace: borrar y mover al anterior
    if (e.key === 'Backspace') {
      e.preventDefault();
      
      if (value[index]) {
        // Si hay un valor, borrarlo
        const newValue = value.split('');
        newValue[index] = '';
        onChange(newValue.join(''));
      } else if (index > 0) {
        // Si no hay valor, mover al anterior y borrar
        const newValue = value.split('');
        newValue[index - 1] = '';
        onChange(newValue.join(''));
        inputRefs.current[index - 1]?.focus();
      }
    }
    
    // Flecha izquierda
    if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    
    // Flecha derecha
    if (e.key === 'ArrowRight' && index < CODE_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    const numericData = pastedData.replace(/\D/g, '').slice(0, CODE_LENGTH);
    
    if (numericData) {
      onChange(numericData);
      
      // Focus al último input con valor o al siguiente vacío
      const nextIndex = Math.min(numericData.length, CODE_LENGTH - 1);
      inputRefs.current[nextIndex]?.focus();
    }
  };

  const handleFocus = (index) => {
    // Seleccionar el contenido al hacer focus
    inputRefs.current[index]?.select();
  };

  return (
    <div className={styles.codeInputContainer}>
      {Array.from({ length: CODE_LENGTH }).map((_, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[index] || ''}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          onFocus={() => handleFocus(index)}
          disabled={disabled}
          className={`${styles.codeInput} ${error ? styles.error : ''} ${value[index] ? styles.filled : ''}`}
          aria-label={`Dígito ${index + 1} del código`}
        />
      ))}
    </div>
  );
};

export default CodeInput;