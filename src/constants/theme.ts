export const colors = {
  brand: '#E63946',
  brandDark: '#C1121F',
  brandLight: '#FF6B6B',
  background: '#FFFFFF',
  surface: '#F8F9FA',
  text: '#1D3557',
  textMuted: '#6C757D',
  border: '#E9ECEF',
  success: '#2A9D8F',
  warning: '#F4A261',
} as const;

export const fonts = {
  regular: 'System',
  medium: 'System',
  bold: 'System',
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 24,
    xxl: 32,
  },
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const radii = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;
