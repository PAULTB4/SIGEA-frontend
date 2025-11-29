/**
 * Design System - Tokens Central Export
 * Exportación unificada de todos los tokens de diseño
 */

import colors from './colors';
import typography from './typography';
import spacing from './spacing';
import shadows from './shadows';
import breakpoints from './breakpoints';

// Exportación individual (para imports específicos)
export { colors, typography, spacing, shadows, breakpoints };

// Exportación de tokens individuales más usados (conveniencia)
export const { brand, semantic, neutral, surfaces, text, borders } = colors;
export const { fontSize, fontWeight, lineHeight, fontFamily } = typography;
export const { spacing: spacingScale, borderRadius, zIndex } = spacing;

// Tema completo (para ThemeProvider o contextos)
export const theme = {
  colors,
  typography,
  spacing,
  shadows,
  breakpoints,
};

// Utilidades globales
export const utils = {
  // Generar clases de Tailwind dinámicamente
  tw: (...classes) => classes.filter(Boolean).join(' '),
  
  // Aplicar estilos condicionales
  cx: (base, conditional) => {
    return Object.keys(conditional).reduce((acc, key) => {
      if (conditional[key]) {
        return `${acc} ${key}`;
      }
      return acc;
    }, base);
  },
  
  // Obtener color con opacidad
  withOpacity: (color, opacity) => {
    if (color.startsWith('#')) {
      // Convertir hex a rgba
      const r = parseInt(color.slice(1, 3), 16);
      const g = parseInt(color.slice(3, 5), 16);
      const b = parseInt(color.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
    return color;
  },
};

// Exportación por defecto
export default theme;