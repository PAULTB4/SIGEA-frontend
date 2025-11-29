
import { brand, semantic, text, surfaces, borders } from '../desingSystem/tokens/colors';

export const theme = {
  // Brand colors
  primary: brand.primary, // Usamos el objeto importado directamente
  primaryDark: brand.primaryDark,
  primaryLight: brand.primaryLight,
  
  secondary: brand.secondary,
  secondaryDark: brand.secondaryDark,
  secondaryLight: brand.secondaryLight,
  
  accent: brand.accent,
  lightAccent: brand.lightAccent,
  
  // Semantic colors
  success: semantic.success,
  error: semantic.error,
  warning: semantic.warning,
  info: semantic.info,
  
  // Text colors
  text: {
    primary: text.primary,
    secondary: text.secondary,
    tertiary: text.tertiary,
    inverse: text.inverse,
    disabled: text.disabled,
  },
  
  // Surface colors
  surface: {
    base: surfaces.base,
    card: surfaces.card,
    cardDark: surfaces.cardDark,
    elevated: surfaces.elevated,
  },
  
  // Border colors
  border: {
    light: borders.light,
    base: borders.base,
    dark: borders.dark,
    focus: borders.focus,
  }
};

/**
 * Helper para aplicar opacidad a colores hex
 */
export const withOpacity = (color, opacity) => {
  if (!color) return '#000000'; // Fallback de seguridad
  return `${color}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`;
};