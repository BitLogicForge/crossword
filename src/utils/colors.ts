/**
 * Color utility functions for generating lighter/darker variants
 * with optional adjustments towards other colors
 */

// Type definitions
type ColorOptions = {
  towards?: string;
  blendAmount?: number;
  desaturate?: number;
  saturate?: number;
};

type PaletteOptions = {
  lightAmount?: number;
  darkAmount?: number;
  method?: 'hsl' | 'tint-shade' | 'blend';
  towardsLight?: string | null;
  towardsDark?: string | null;
  desaturateLight?: number;
  saturateDark?: number;
};

type ColorPalette = {
  main: string;
  light: string;
  dark: string;
};
type RGB = [number, number, number];

type HSL = [number, number, number];

type ColorAnalysis = {
  rgb: RGB;
  hsl: HSL;
  luminance: number;
  brightness: number;
  contrastWithWhite: number;
  contrastWithBlack: number;
  isLight: boolean;
  isDark: boolean;
};

// Helper function to convert hex to HSL
function hexToHsl(hex: string): HSL {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h: number,
    s: number,
    l: number = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
      default:
        h = 0;
        break;
    }
    h /= 6;
  }

  return [h * 360, s * 100, l * 100];
}

// Helper function to convert HSL to hex
function hslToHex(h: number, s: number, l: number): string {
  h = h / 360;
  s = s / 100;
  l = l / 100;

  const hue2rgb = (p: number, q: number, t: number): number => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };

  let r: number, g: number, b: number;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  const toHex = (c: number): string => {
    const hex = Math.round(c * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

// Helper function to convert hex to RGB
function hexToRgb(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
}

// Helper function to convert RGB to hex
function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (c: number): string => {
    const hex = Math.round(c).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Generate lighter color variant using HSL lightness adjustment
 * @param hex - Original hex color
 * @param amount - Amount to lighten (0-1, default: 0.15)
 * @param options - Additional options
 * @returns Lighter hex color
 */
function lighten(hex: string, amount: number = 0.15, options: ColorOptions = {}): string {
  const [h, s, l] = hexToHsl(hex);
  let newL = Math.min(100, l + amount * 100);

  // Optional: adjust towards another color
  if (options.towards) {
    const [targetH, targetS] = hexToHsl(options.towards);
    const blend = options.blendAmount || 0.1;

    // Blend hue and saturation slightly towards target
    const newH = h + (targetH - h) * blend;
    const newS = s + (targetS - s) * blend;

    return hslToHex(newH, newS, newL);
  }

  // Optional: reduce saturation for more natural lighter colors
  if (options.desaturate) {
    const newS = Math.max(0, s - options.desaturate * 100);
    return hslToHex(h, newS, newL);
  }

  return hslToHex(h, s, newL);
}

/**
 * Generate darker color variant using HSL lightness adjustment
 * @param hex - Original hex color
 * @param amount - Amount to darken (0-1, default: 0.15)
 * @param options - Additional options
 * @returns Darker hex color
 */
function darken(hex: string, amount: number = 0.15, options: ColorOptions = {}): string {
  const [h, s, l] = hexToHsl(hex);
  let newL = Math.max(0, l - amount * 100);

  // Optional: adjust towards another color
  if (options.towards) {
    const [targetH, targetS] = hexToHsl(options.towards);
    const blend = options.blendAmount || 0.1;

    const newH = h + (targetH - h) * blend;
    const newS = s + (targetS - s) * blend;

    return hslToHex(newH, newS, newL);
  }

  // Optional: increase saturation for richer darker colors
  if (options.saturate) {
    const newS = Math.min(100, s + options.saturate * 100);
    return hslToHex(h, newS, newL);
  }

  return hslToHex(h, s, newL);
}

/**
 * Generate color tint (mix with white) - alternative lighter method
 * @param hex - Original hex color
 * @param amount - Amount of white to mix (0-1, default: 0.15)
 * @returns Tinted hex color
 */
function tint(hex: string, amount: number = 0.15): string {
  const [r, g, b] = hexToRgb(hex);
  const newR = r + (255 - r) * amount;
  const newG = g + (255 - g) * amount;
  const newB = b + (255 - b) * amount;
  return rgbToHex(newR, newG, newB);
}

/**
 * Generate color shade (mix with black) - alternative darker method
 * @param hex - Original hex color
 * @param amount - Amount of black to mix (0-1, default: 0.15)
 * @returns Shaded hex color
 */
function shade(hex: string, amount: number = 0.15): string {
  const [r, g, b] = hexToRgb(hex);
  const newR = r * (1 - amount);
  const newG = g * (1 - amount);
  const newB = b * (1 - amount);
  return rgbToHex(newR, newG, newB);
}

/**
 * Blend two colors together
 * @param color1 - First hex color
 * @param color2 - Second hex color
 * @param ratio - Blend ratio (0-1, 0 = all color1, 1 = all color2)
 * @returns Blended hex color
 */
function blendColors(color1: string, color2: string, ratio: number = 0.5): string {
  const [r1, g1, b1] = hexToRgb(color1);
  const [r2, g2, b2] = hexToRgb(color2);

  const r = r1 + (r2 - r1) * ratio;
  const g = g1 + (g2 - g1) * ratio;
  const b = b1 + (b2 - b1) * ratio;

  return rgbToHex(r, g, b);
}

/**
 * Generate a complete color palette from a main color
 * @param mainColor - Main hex color
 * @param options - Generation options
 * @returns Complete palette with light and dark variants
 */
function generatePalette(mainColor: string, options: PaletteOptions = {}): ColorPalette {
  const {
    lightAmount = 0.2,
    darkAmount = 0.25,
    method = 'hsl',
    towardsLight = null,
    towardsDark = null,
    desaturateLight = 0.1,
    saturateDark = 0.1,
  } = options;

  let light: string, dark: string;

  switch (method) {
    case 'tint-shade':
      light = tint(mainColor, lightAmount);
      dark = shade(mainColor, darkAmount);
      break;
    case 'blend':
      light = blendColors(mainColor, '#ffffff', lightAmount);
      dark = blendColors(mainColor, '#000000', darkAmount);
      break;
    default: // 'hsl'
      light = lighten(mainColor, lightAmount, {
        towards: towardsLight || undefined,
        desaturate: desaturateLight,
      });
      dark = darken(mainColor, darkAmount, {
        towards: towardsDark || undefined,
        saturate: saturateDark,
      });
  }

  return {
    main: mainColor,
    light: light,
    dark: dark,
  };
}

/**
 * Analyze color properties
 * @param hex - Hex color to analyze
 * @returns Color analysis including brightness, contrast ratios, etc.
 */
function analyzeColor(hex: string): ColorAnalysis {
  const [r, g, b] = hexToRgb(hex);
  const [h, s, l] = hexToHsl(hex);

  // Calculate relative luminance (for contrast ratios)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Calculate contrast ratios with white and black
  const contrastWithWhite = (1 + 0.05) / (luminance + 0.05);
  const contrastWithBlack = (luminance + 0.05) / (0 + 0.05);

  return {
    rgb: [r, g, b],
    hsl: [Math.round(h), Math.round(s), Math.round(l)],
    luminance: Math.round(luminance * 100) / 100,
    brightness: Math.round(luminance * 100),
    contrastWithWhite: Math.round(contrastWithWhite * 100) / 100,
    contrastWithBlack: Math.round(contrastWithBlack * 100) / 100,
    isLight: luminance > 0.5,
    isDark: luminance <= 0.5,
  };
}

// Example usage and testing
console.log('=== Color Palette Generator Examples ===\n');

const colors: Array<{ name: string; hex: string }> = [
  { name: 'Primary Green', hex: '#2e7d32' },
  { name: 'Secondary Amber', hex: '#f9a825' },
  { name: 'Error Red', hex: '#d32f2f' },
];

colors.forEach(({ name, hex }) => {
  console.log(`${name} (${hex}):`);
  console.log('  Analysis:', analyzeColor(hex));

  // Standard palette
  const standard = generatePalette(hex);
  console.log('  Standard:', standard);

  // Advanced palette with adjustments
  const advanced = generatePalette(hex, {
    method: 'hsl',
    towardsLight: '#ffffff',
    towardsDark: '#000000',
    desaturateLight: 0.15,
    saturateDark: 0.2,
  });
  console.log('  Advanced:', advanced);

  console.log('');
});

// Export functions for use
export {
  analyzeColor,
  blendColors,
  darken,
  generatePalette,
  hexToHsl,
  hexToRgb,
  hslToHex,
  lighten,
  rgbToHex,
  shade,
  tint,
};

export type { ColorAnalysis, ColorOptions, ColorPalette, PaletteOptions };
