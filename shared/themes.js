/**
 * Bảng màu dùng chung giữa giao diện web và bộ xuất PowerPoint.
 * Giá trị màu là chuỗi hex (#RRGGBB) để dễ dùng cho cả CSS lẫn pptxgenjs.
 */
export const THEMES = {
  aurora: {
    id: 'aurora',
    name: 'Aurora',
    emoji: '🌌',
    dark: true,
    bg: '#070B16',
    bg2: '#0E1730',
    card: '#121C36',
    card2: '#182647',
    accent: '#7C5CFF',
    accent2: '#22D3EE',
    text: '#F4F7FF',
    muted: '#9AA7C7',
    line: 'rgba(148,163,184,0.18)'
  },
  sunset: {
    id: 'sunset',
    name: 'Sunset',
    emoji: '🌅',
    dark: true,
    bg: '#160B14',
    bg2: '#2A1020',
    card: '#241020',
    card2: '#331729',
    accent: '#FF5C7A',
    accent2: '#FFB15C',
    text: '#FFF4F2',
    muted: '#C9A6AE',
    line: 'rgba(255,178,190,0.18)'
  },
  ocean: {
    id: 'ocean',
    name: 'Ocean',
    emoji: '🌊',
    dark: true,
    bg: '#04121E',
    bg2: '#08263A',
    card: '#0B2C42',
    card2: '#103A55',
    accent: '#38BDF8',
    accent2: '#2DD4BF',
    text: '#F0FAFF',
    muted: '#8FB3C7',
    line: 'rgba(143,179,199,0.2)'
  },
  forest: {
    id: 'forest',
    name: 'Forest',
    emoji: '🌿',
    dark: true,
    bg: '#07140F',
    bg2: '#0D241A',
    card: '#102C21',
    card2: '#163A2B',
    accent: '#34D399',
    accent2: '#A3E635',
    text: '#F2FFF7',
    muted: '#93B8A5',
    line: 'rgba(147,184,165,0.2)'
  },
  royal: {
    id: 'royal',
    name: 'Royal',
    emoji: '👑',
    dark: true,
    bg: '#0D0A1F',
    bg2: '#1A1235',
    card: '#221744',
    card2: '#2C1F57',
    accent: '#F5B942',
    accent2: '#E9D5FF',
    text: '#FFF9EC',
    muted: '#B9A9D6',
    line: 'rgba(185,169,214,0.2)'
  },
  mono: {
    id: 'mono',
    name: 'Mono',
    emoji: '⬛',
    dark: true,
    bg: '#0A0A0B',
    bg2: '#141416',
    card: '#1A1A1D',
    card2: '#232327',
    accent: '#F5F5F5',
    accent2: '#A3A3A3',
    text: '#FAFAFA',
    muted: '#8E8E93',
    line: 'rgba(255,255,255,0.12)'
  },
  candy: {
    id: 'candy',
    name: 'Candy',
    emoji: '🍬',
    dark: false,
    bg: '#FFF4FA',
    bg2: '#FFE8F2',
    card: '#FFFFFF',
    card2: '#FFF0F7',
    accent: '#EC4899',
    accent2: '#8B5CF6',
    text: '#2A1030',
    muted: '#8A5C74',
    line: 'rgba(236,72,153,0.16)'
  }
};

export const THEME_LIST = Object.values(THEMES);

export function getTheme(id) {
  return THEMES[id] || THEMES.aurora;
}
