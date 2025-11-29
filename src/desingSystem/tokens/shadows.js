/**
 * Design System - Shadow Tokens
 * Sistema de sombras para elevación y profundidad
 */

// Sombras por nivel de elevación
export const shadows = {
  none: 'none',
  
  // Elevación sutil
  xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  
  // Elevación pequeña (cards hover)
  sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
  
  // Elevación base (cards, dropdowns)
  base: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
  
  // Elevación media (modals, popovers)
  md: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
  
  // Elevación alta (dropdowns importantes)
  lg: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
  
  // Elevación muy alta (modales principales)
  xl: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  
  // Máxima elevación (elementos críticos)
  '2xl': '0 50px 100px -20px rgba(0, 0, 0, 0.5)',
  
  // Sombra interna
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
};

// Sombras con color de marca (para hover states)
export const coloredShadows = {
  primary: '0 10px 15px -3px rgba(89, 138, 235, 0.3), 0 4px 6px -4px rgba(89, 138, 235, 0.3)',
  secondary: '0 10px 15px -3px rgba(89, 200, 123, 0.3), 0 4px 6px -4px rgba(89, 200, 123, 0.3)',
  accent: '0 10px 15px -3px rgba(89, 235, 191, 0.3), 0 4px 6px -4px rgba(89, 235, 191, 0.3)',
  error: '0 10px 15px -3px rgba(239, 68, 68, 0.3), 0 4px 6px -4px rgba(239, 68, 68, 0.3)',
  success: '0 10px 15px -3px rgba(34, 197, 94, 0.3), 0 4px 6px -4px rgba(34, 197, 94, 0.3)',
};

// Sombras para estados interactivos
export const interactiveShadows = {
  default: shadows.sm,
  hover: shadows.md,
  active: shadows.xs,
  focus: '0 0 0 3px rgba(89, 138, 235, 0.5)',
  disabled: 'none',
};

// Sombras semánticas (por uso)
export const semanticShadows = {
  card: shadows.base,
  cardHover: shadows.md,
  
  button: shadows.sm,
  buttonHover: shadows.base,
  
  dropdown: shadows.lg,
  modal: shadows.xl,
  
  input: shadows.none,
  inputFocus: '0 0 0 3px rgba(89, 138, 235, 0.2)',
  
  tooltip: shadows.md,
  notification: shadows.lg,
};

// Transiciones para sombras (smooth hover effects)
export const shadowTransitions = {
  default: 'box-shadow 0.2s ease-in-out',
  fast: 'box-shadow 0.15s ease-in-out',
  slow: 'box-shadow 0.3s ease-in-out',
};

export default {
  shadows,
  colored: coloredShadows,
  interactive: interactiveShadows,
  semantic: semanticShadows,
  transitions: shadowTransitions,
};