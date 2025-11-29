/**
 * Design System - Spacing Tokens
 * Sistema de espaciado de 8px base (4px para casos especiales)
 */

// Spacing Scale (basado en múltiplos de 4px)
export const spacing = {
  0: '0',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  7: '1.75rem',   // 28px
  8: '2rem',      // 32px
  10: '2.5rem',   // 40px
  12: '3rem',     // 48px
  14: '3.5rem',   // 56px
  16: '4rem',     // 64px
  20: '5rem',     // 80px
  24: '6rem',     // 96px
  28: '7rem',     // 112px
  32: '8rem',     // 128px
  36: '9rem',     // 144px
  40: '10rem',    // 160px
  44: '11rem',    // 176px
  48: '12rem',    // 192px
  52: '13rem',    // 208px
  56: '14rem',    // 224px
  60: '15rem',    // 240px
  64: '16rem',    // 256px
  72: '18rem',    // 288px
  80: '20rem',    // 320px
  96: '24rem',    // 384px
};

// Semantic Spacing (nombres descriptivos)
export const semanticSpacing = {
  // Spacing interno de componentes
  componentXs: spacing[1],    // 4px
  componentSm: spacing[2],    // 8px
  componentMd: spacing[4],    // 16px
  componentLg: spacing[6],    // 24px
  componentXl: spacing[8],    // 32px
  
  // Spacing entre secciones
  sectionXs: spacing[8],      // 32px
  sectionSm: spacing[12],     // 48px
  sectionMd: spacing[16],     // 64px
  sectionLg: spacing[24],     // 96px
  sectionXl: spacing[32],     // 128px
  
  // Padding de contenedores
  containerXs: spacing[4],    // 16px
  containerSm: spacing[6],    // 24px
  containerMd: spacing[8],    // 32px
  containerLg: spacing[12],   // 48px
  containerXl: spacing[16],   // 64px
  
  // Gaps para layouts
  gapXs: spacing[2],          // 8px
  gapSm: spacing[3],          // 12px
  gapMd: spacing[4],          // 16px
  gapLg: spacing[6],          // 24px
  gapXl: spacing[8],          // 32px
};

// Border Radius
export const borderRadius = {
  none: '0',
  sm: '0.25rem',    // 4px
  base: '0.5rem',   // 8px
  md: '0.75rem',    // 12px
  lg: '1rem',       // 16px
  xl: '1.5rem',     // 24px
  '2xl': '2rem',    // 32px
  '3xl': '3rem',    // 48px
  full: '9999px',   // Círculo perfecto
};

// Border Width
export const borderWidth = {
  0: '0',
  1: '1px',
  2: '2px',
  4: '4px',
  8: '8px',
};

// Max Widths (para contenedores)
export const maxWidth = {
  xs: '20rem',      // 320px
  sm: '24rem',      // 384px
  md: '28rem',      // 448px
  lg: '32rem',      // 512px
  xl: '36rem',      // 576px
  '2xl': '42rem',   // 672px
  '3xl': '48rem',   // 768px
  '4xl': '56rem',   // 896px
  '5xl': '64rem',   // 1024px
  '6xl': '72rem',   // 1152px
  '7xl': '80rem',   // 1280px
  full: '100%',
  screen: '100vw',
};

// Container Padding (responsive)
export const containerPadding = {
  mobile: spacing[4],    // 16px
  tablet: spacing[6],    // 24px
  desktop: spacing[8],   // 32px
  wide: spacing[12],     // 48px
};

// Z-Index Scale (para layering)
export const zIndex = {
  base: 0,
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
  notification: 1080,
};

// Presets de Spacing (combinaciones comunes)
export const spacingPresets = {
  card: {
    padding: spacing[6],
    gap: spacing[4],
    borderRadius: borderRadius.xl,
  },
  
  button: {
    paddingX: spacing[6],
    paddingY: spacing[3],
    gap: spacing[2],
    borderRadius: borderRadius.lg,
  },
  
  input: {
    paddingX: spacing[4],
    paddingY: spacing[3],
    borderRadius: borderRadius.lg,
  },
  
  modal: {
    padding: spacing[6],
    gap: spacing[6],
    borderRadius: borderRadius['2xl'],
  },
  
  section: {
    paddingY: spacing[20],
    gap: spacing[12],
  },
};

export default {
  spacing,
  semantic: semanticSpacing,
  borderRadius,
  borderWidth,
  maxWidth,
  containerPadding,
  zIndex,
  presets: spacingPresets,
};