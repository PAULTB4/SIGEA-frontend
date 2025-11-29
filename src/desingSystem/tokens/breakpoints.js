/**
 * Design System - Breakpoint Tokens
 * Media queries y sistema responsive
 */

// Breakpoints base (mobile-first)
export const breakpoints = {
  xs: '320px',    // Móviles pequeños
  sm: '640px',    // Móviles grandes / tablets pequeñas
  md: '768px',    // Tablets
  lg: '1024px',   // Laptops / Desktops pequeños
  xl: '1280px',   // Desktops
  '2xl': '1536px', // Pantallas grandes
};

// Breakpoints numéricos (para comparaciones)
export const breakpointValues = {
  xs: 320,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

// Media queries predefinidas (mobile-first)
export const mediaQueries = {
  xs: `@media (min-width: ${breakpoints.xs})`,
  sm: `@media (min-width: ${breakpoints.sm})`,
  md: `@media (min-width: ${breakpoints.md})`,
  lg: `@media (min-width: ${breakpoints.lg})`,
  xl: `@media (min-width: ${breakpoints.xl})`,
  '2xl': `@media (min-width: ${breakpoints['2xl']})`,
};

// Media queries max-width (desktop-first - menos común pero útil)
export const mediaQueriesMax = {
  xs: `@media (max-width: ${breakpoints.sm})`,
  sm: `@media (max-width: ${breakpoints.md})`,
  md: `@media (max-width: ${breakpoints.lg})`,
  lg: `@media (max-width: ${breakpoints.xl})`,
  xl: `@media (max-width: ${breakpoints['2xl']})`,
};

// Media queries por rango
export const mediaQueriesRange = {
  onlyXs: `@media (max-width: ${breakpoints.sm})`,
  onlySm: `@media (min-width: ${breakpoints.sm}) and (max-width: ${breakpoints.md})`,
  onlyMd: `@media (min-width: ${breakpoints.md}) and (max-width: ${breakpoints.lg})`,
  onlyLg: `@media (min-width: ${breakpoints.lg}) and (max-width: ${breakpoints.xl})`,
  onlyXl: `@media (min-width: ${breakpoints.xl}) and (max-width: ${breakpoints['2xl']})`,
  only2xl: `@media (min-width: ${breakpoints['2xl']})`,
};

// Utilidades para hooks personalizados
export const createMediaQuery = (minWidth, maxWidth) => {
  if (minWidth && maxWidth) {
    return `@media (min-width: ${minWidth}) and (max-width: ${maxWidth})`;
  }
  if (minWidth) {
    return `@media (min-width: ${minWidth})`;
  }
  if (maxWidth) {
    return `@media (max-width: ${maxWidth})`;
  }
  return '';
};

// Utilidad para detectar breakpoint actual (JS)
export const getCurrentBreakpoint = () => {
  const width = window.innerWidth;
  
  if (width >= breakpointValues['2xl']) return '2xl';
  if (width >= breakpointValues.xl) return 'xl';
  if (width >= breakpointValues.lg) return 'lg';
  if (width >= breakpointValues.md) return 'md';
  if (width >= breakpointValues.sm) return 'sm';
  return 'xs';
};

// Utilidad para responsive values
export const getResponsiveValue = (values) => {
  const currentBreakpoint = getCurrentBreakpoint();
  
  // Busca el valor más cercano al breakpoint actual
  const breakpointOrder = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
  const currentIndex = breakpointOrder.indexOf(currentBreakpoint);
  
  for (let i = currentIndex; i >= 0; i--) {
    const bp = breakpointOrder[i];
    if (values[bp] !== undefined) {
      return values[bp];
    }
  }
  
  return values.default || null;
};

// Presets de layout responsive
export const responsiveLayouts = {
  container: {
    xs: '100%',
    sm: breakpoints.sm,
    md: breakpoints.md,
    lg: breakpoints.lg,
    xl: breakpoints.xl,
    '2xl': breakpoints['2xl'],
  },
  
  grid: {
    xs: 'grid-cols-1',
    sm: 'grid-cols-2',
    md: 'grid-cols-3',
    lg: 'grid-cols-4',
    xl: 'grid-cols-5',
  },
  
  padding: {
    xs: '1rem',
    sm: '1.5rem',
    md: '2rem',
    lg: '3rem',
    xl: '4rem',
  },
};

// Tailwind breakpoint classes (para referencia)
export const tailwindBreakpoints = {
  sm: 'sm:',
  md: 'md:',
  lg: 'lg:',
  xl: 'xl:',
  '2xl': '2xl:',
};

export default {
  breakpoints,
  values: breakpointValues,
  mediaQueries,
  mediaQueriesMax,
  mediaQueriesRange,
  createMediaQuery,
  getCurrentBreakpoint,
  getResponsiveValue,
  layouts: responsiveLayouts,
  tailwind: tailwindBreakpoints,
};