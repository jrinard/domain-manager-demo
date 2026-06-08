import type { Mode, OklchColor } from '../schema/derivations'

export interface NeutralFamily {
  id: string
  label: string
  // Base hue and chroma ranges for neutral in each mode
  light: { hue: number; chroma: number }
  dark: { hue: number; chroma: number }
  // Suggested lightness anchors for key roles (0..1)
  anchors: {
    bg: number
    fg: number
    border: number
    input: number
    navbar: number
    sidebar: number
    listOdd: number
    listEven: number
    bgContrastLow: number
    bgContrastMedium: number
    bgContrastHigh: number
  }
  // Optional dark-mode-specific anchors; if absent, fall back to anchors
  anchorsDark?: {
    bg: number
    fg: number
    border: number
    input: number
    navbar: number
    sidebar: number
    listOdd: number
    listEven: number
    bgContrastLow: number
    bgContrastMedium: number
    bgContrastHigh: number
  }
}

export const GREYSCALE_FAMILIES: NeutralFamily[] = [
  {
    id: 'zinc',
    label: 'Zinc',
    light: { hue: 285.8, chroma: 0.006 },
    dark: { hue: 285.8, chroma: 0.006 },
    anchors: {
      bg: 0.965,
      fg: 0.14,
      border: 0.91,
      input: 0.87,
      navbar: 0.97,
      sidebar: 0.96,
      listOdd: 0.97,
      listEven: 0.93,
      bgContrastLow: 0.935,
      bgContrastMedium: 0.85,
      bgContrastHigh: 0.56,
    },
    anchorsDark: {
      bg: 0.16,
      fg: 0.985,
      border: 0.27,
      input: 0.21,
      navbar: 0.19,
      sidebar: 0.21,
      listOdd: 0.21,
      listEven: 0.17,
      bgContrastLow: 0.19,
      bgContrastMedium: 0.24,
      bgContrastHigh: 0.3,
    },
  },
  {
    id: 'slate',
    label: 'Slate',
    light: { hue: 250, chroma: 0.006 },
    dark: { hue: 250, chroma: 0.006 },
    anchors: {
      bg: 0.965,
      fg: 0.14,
      border: 0.91,
      input: 0.87,
      navbar: 0.97,
      sidebar: 0.955,
      listOdd: 0.972,
      listEven: 0.94,
      bgContrastLow: 0.935,
      bgContrastMedium: 0.85,
      bgContrastHigh: 0.56,
    },
    anchorsDark: {
      bg: 0.16,
      fg: 0.985,
      border: 0.28,
      input: 0.22,
      navbar: 0.19,
      sidebar: 0.22,
      listOdd: 0.22,
      listEven: 0.18,
      bgContrastLow: 0.19,
      bgContrastMedium: 0.24,
      bgContrastHigh: 0.3,
    },
  },
  {
    id: 'gray',
    label: 'Gray',
    // Based on the provided gray palette (bluish neutral)
    // Hues ~258-265, chroma low; pick a modest neutral chroma
    light: { hue: 261.3, chroma: 0.008 },
    dark: { hue: 261.3, chroma: 0.008 },
    anchors: {
      // Map to approx 50/100/200/300 for UI contrast
      bg: 0.965, // 50
      fg: 0.14,
      border: 0.928, // 200
      input: 0.872, // 300
      navbar: 0.967, // 100
      sidebar: 0.945, // between 100-200
      listOdd: 0.97,
      listEven: 0.93,
      bgContrastLow: 0.935,
      bgContrastMedium: 0.85,
      bgContrastHigh: 0.56,
    },
    anchorsDark: {
      bg: 0.155, // 950
      fg: 0.985,
      border: 0.27,
      input: 0.21,
      navbar: 0.19,
      sidebar: 0.21,
      listOdd: 0.21,
      listEven: 0.17,
      bgContrastLow: 0.19,
      bgContrastMedium: 0.25,
      bgContrastHigh: 0.38,
    },
  },
  {
    id: 'neutral',
    label: 'Neutral',
    // True neutral (no hue/chroma)
    light: { hue: 0, chroma: 0 },
    dark: { hue: 0, chroma: 0 },
    anchors: {
      bg: 0.965, // 50
      fg: 0.145, // ~950 fg suggested
      border: 0.922, // 200
      input: 0.87, // 300
      navbar: 0.97, // 100
      sidebar: 0.955, // between 100-200
      listOdd: 0.97,
      listEven: 0.93,
      bgContrastLow: 0.935,
      bgContrastMedium: 0.85,
      bgContrastHigh: 0.56,
    },
    anchorsDark: {
      bg: 0.155, // 950
      fg: 0.985,
      border: 0.27,
      input: 0.21,
      navbar: 0.19,
      sidebar: 0.21,
      listOdd: 0.21,
      listEven: 0.17,
      bgContrastLow: 0.21,
      bgContrastMedium: 0.27,
      bgContrastHigh: 0.42,
    },
  },
  {
    id: 'stone',
    label: 'Stone',
    // Slightly warm/earthy neutral
    // Hues ~34-106 across the ramp, keep a stable mid hue
    light: { hue: 56, chroma: 0.008 },
    dark: { hue: 56, chroma: 0.008 },
    anchors: {
      bg: 0.965, // 50
      fg: 0.147, // 950
      border: 0.923, // 200
      input: 0.869, // 300
      navbar: 0.97, // 100
      sidebar: 0.955,
      listOdd: 0.972,
      listEven: 0.94,
      bgContrastLow: 0.935,
      bgContrastMedium: 0.85,
      bgContrastHigh: 0.56,
    },
    anchorsDark: {
      bg: 0.16,
      fg: 0.985,
      border: 0.275,
      input: 0.215,
      navbar: 0.19,
      sidebar: 0.22,
      listOdd: 0.22,
      listEven: 0.18,
      bgContrastLow: 0.21,
      bgContrastMedium: 0.27,
      bgContrastHigh: 0.42,
    },
  },
]

export function neutralFrom(
  family: NeutralFamily,
  mode: Mode,
  l: number,
): OklchColor {
  const spec = mode === 'light' ? family.light : family.dark
  return { mode: 'oklch', l, c: spec.chroma, h: spec.hue }
}
