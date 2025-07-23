export const COLOR_MODE = {
  LIGHT: 'light',
  DARK: 'dark',
} as const;

export type TColorMode = (typeof COLOR_MODE)[keyof typeof COLOR_MODE];
