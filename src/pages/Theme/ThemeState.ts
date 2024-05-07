import { atom } from 'recoil'

export type ThemeMode = 'dark' | 'light' | 'highcontrast'; // 테마 종류
export const ThemeState = atom<ThemeMode>({
    key: 'ThemeState',
    default: 'dark',
});

