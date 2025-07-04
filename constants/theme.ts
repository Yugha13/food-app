import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';

const customColors = {
  primary: '#FF6B35',
  primaryContainer: '#FFE5DB',
  secondary: '#FFB800',
  secondaryContainer: '#FFF4CC',
  tertiary: '#6B73FF',
  tertiaryContainer: '#E0E3FF',
  background: '#FEFBFF',
  surface: '#FFFFFF',
  surfaceVariant: '#F5F5F5',
  surfaceContainer: '#F8F8F8',
  text: '#1C1B1F',
  onPrimary: '#FFFFFF',
  onSecondary: '#000000',
  onBackground: '#1C1B1F',
  onSurface: '#1C1B1F',
  onSurfaceVariant: '#49454F',
  outline: '#E5E5E5',
  outlineVariant: '#F0F0F0',
  error: '#BA1A1A',
  errorContainer: '#FFDAD6',
  onError: '#FFFFFF',
  onErrorContainer: '#410002',
  success: '#00C853',
  successContainer: '#C8E6C9',
  warning: '#FF9800',
  warningContainer: '#FFE0B2',
  info: '#2196F3',
  infoContainer: '#E3F2FD',
};

export const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...customColors,
  },
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#FFB4A0',
    primaryContainer: '#8C2E00',
    secondary: '#E6C200',
    secondaryContainer: '#3D2F00',
    tertiary: '#BDC2FF',
    tertiaryContainer: '#3E4578',
    background: '#141218',
    surface: '#1C1B1F',
    surfaceVariant: '#2B2930',
    text: '#E6E1E5',
    onPrimary: '#561E00',
    onSecondary: '#3D2F00',
    onBackground: '#E6E1E5',
    onSurface: '#E6E1E5',
    onSurfaceVariant: '#CAC4D0',
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
};

export const borderRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  full: 9999,
};

export const elevation = {
  none: 0,
  xs: 1,
  sm: 2,
  md: 4,
  lg: 8,
  xl: 12,
  xxl: 16,
};

export const typography = {
  displayLarge: {
    fontSize: 57,
    lineHeight: 64,
    fontWeight: '400' as const,
  },
  displayMedium: {
    fontSize: 45,
    lineHeight: 52,
    fontWeight: '400' as const,
  },
  displaySmall: {
    fontSize: 36,
    lineHeight: 44,
    fontWeight: '400' as const,
  },
  headlineLarge: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: '400' as const,
  },
  headlineMedium: {
    fontSize: 28,
    lineHeight: 36,
    fontWeight: '400' as const,
  },
  headlineSmall: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '400' as const,
  },
  titleLarge: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '500' as const,
  },
  titleMedium: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500' as const,
  },
  titleSmall: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500' as const,
  },
  bodyLarge: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400' as const,
  },
  bodyMedium: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400' as const,
  },
  bodySmall: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400' as const,
  },
  labelLarge: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500' as const,
  },
  labelMedium: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500' as const,
  },
  labelSmall: {
    fontSize: 11,
    lineHeight: 16,
    fontWeight: '500' as const,
  },
};